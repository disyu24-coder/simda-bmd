importScripts('https://cdnjs.cloudflare.com/ajax/libs/PapaParse/5.4.1/papaparse.min.js');

let db = null;

// Membuka database IndexedDB yang sama dengan Main Thread
function initDB() {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open('SimdaBmdDB', 1);
    
    request.onupgradeneeded = (e) => {
      const database = e.target.result;
      if (!database.objectStoreNames.contains('assets')) {
        // Gunakan autoIncrement agar data bisa di-insert dengan mudah
        const store = database.createObjectStore('assets', { keyPath: 'id', autoIncrement: true });
        // Buat index untuk mempercepat pencarian/sorting jika dibutuhkan kelak
        store.createIndex('kode', 'kode', { unique: false });
        store.createIndex('skpd', 'skpd', { unique: false });
      }
    };
    
    request.onsuccess = (e) => {
      db = e.target.result;
      resolve(db);
    };
    
    request.onerror = (e) => {
      reject(e.target.error);
    };
  });
}

// Handler event message dari main thread
self.onmessage = async (e) => {
  const { action, url } = e.data;
  
  if (action === 'start') {
    try {
      postMessage({ type: 'status', message: 'Menghubungkan ke database...' });
      await initDB();
      
      postMessage({ type: 'status', message: 'Mengunduh file CSV dari Google Sheets...' });
      
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      postMessage({ type: 'status', message: 'Membersihkan data lama...' });
      await clearOldData();
      
      postMessage({ type: 'status', message: 'Memulai penguraian & penyimpanan data...' });
      
      // Menggunakan ReadableStream untuk membaca response secara streaming
      const reader = response.body.getReader();
      const decoder = new TextDecoder('utf-8');
      
      let headerMap = null;
      let parsedCount = 0;
      let batch = [];
      const BATCH_SIZE = 5000; // Simpan ke IndexedDB setiap 5000 baris agar optimal
      
      // Setup PapaParse dalam mode step/streaming
      Papa.parse(response.body, {
        header: true,
        dynamicTyping: false,
        skipEmptyLines: true,
        chunk: async (results, parser) => {
          // Pause parser saat menulis ke IndexedDB agar tidak kehabisan memori
          parser.pause();
          
          try {
            const mappedAssets = results.data.map((row, index) => {
              parsedCount++;
              
              // Map kolom secara fleksibel & case-insensitive
              const getVal = (keys) => {
                for (const key of keys) {
                  // Cari kecocokan case-insensitive
                  const actualKey = Object.keys(row).find(k => k.toLowerCase().trim() === key.toLowerCase().trim());
                  if (actualKey && row[actualKey] !== undefined && row[actualKey] !== null) {
                    return String(row[actualKey]).trim();
                  }
                }
                return '';
              };
              
              // Standardisasi Format Nilai (menambahkan Rp jika belum ada)
              let nilaiRaw = getVal(['nilai perolehan', 'nilai', 'harga']);
              let nilaiStr = '-';
              if (nilaiRaw && nilaiRaw !== '-') {
                const digits = nilaiRaw.replace(/[^0-9]/g, '');
                if (digits) {
                  nilaiStr = 'Rp ' + parseInt(digits, 10).toLocaleString('id');
                }
              }
              
              let nilaiBukuRaw = getVal(['nilai buku', 'nilaibuku']);
              let nilaiBukuStr = '-';
              if (nilaiBukuRaw && nilaiBukuRaw !== '-') {
                const digits = nilaiBukuRaw.replace(/[^0-9]/g, '');
                if (digits) {
                  nilaiBukuStr = 'Rp ' + parseInt(digits, 10).toLocaleString('id');
                }
              }
              
              const kibRaw = getVal(['kib', 'jenis kib', 'jenis_kib', 'kategori']);
              // Bersihkan KIB menjadi standard 'KIB A', 'KIB B', dll
              let kibNormalized = 'KIB B'; // default
              if (kibRaw) {
                const match = kibRaw.match(/KIB\s*[A-F]/i);
                if (match) {
                  kibNormalized = match[0].toUpperCase();
                }
              }
              
              return {
                no: parsedCount,
                kode: getVal(['kode barang', 'kode', 'kode_barang', 'no kode']) || '00.00.00.00.0000',
                nama: getVal(['nama barang', 'nama aset', 'nama', 'nama_barang']) || 'Aset Tanpa Nama',
                kib: kibNormalized,
                sertifikat: getVal(['no sertifikat', 'sertifikat', 'no_sertifikat']) || '-',
                merk: getVal(['merk', 'merk/tipe', 'merk_tipe', 'tipe']) || '-',
                ukuran: getVal(['ukuran', 'ukuran/spesifikasi', 'spesifikasi']) || '-',
                rangka: getVal(['rangka', 'no rangka', 'no_rangka']) || '-',
                mesin: getVal(['mesin', 'no mesin', 'no_mesin']) || '-',
                polisi: getVal(['polisi', 'no polisi', 'no_polisi', 'nopol']) || '-',
                bpkb: getVal(['bpkb', 'no bpkb', 'no_bpkb']) || '-',
                tahun: parseInt(getVal(['tahun', 'tahun perolehan', 'tahun_perolehan'])) || new Date().getFullYear(),
                jumlah: parseInt(getVal(['jumlah', 'jumlah barang', 'qty'])) || 1,
                nilai: nilaiStr,
                nilaiBuku: nilaiBukuStr,
                kondisi: getVal(['kondisi', 'status kondisi']) || 'Baik',
                skpd: getVal(['skpd', 'opd', 'instansi', 'unit kerja']) || 'Dinas Pendidikan'
              };
            });
            
            // Simpan ke IndexedDB
            await writeBatch(mappedAssets);
            
            postMessage({
              type: 'progress',
              parsedCount: parsedCount,
              message: `Memproses ${parsedCount.toLocaleString('id-ID')} baris data...`
            });
            
            // Lanjutkan parsing
            parser.resume();
          } catch (err) {
            postMessage({ type: 'error', error: 'Error saat menyimpan chunk: ' + err.message });
            parser.abort();
          }
        },
        complete: () => {
          postMessage({
            type: 'done',
            totalCount: parsedCount,
            message: `Selesai! Berhasil mensinkronisasi ${parsedCount.toLocaleString('id-ID')} baris data.`
          });
        },
        error: (error) => {
          postMessage({ type: 'error', error: 'Gagal mengurai CSV: ' + error.message });
        }
      });
      
    } catch (err) {
      postMessage({ type: 'error', error: err.message });
    }
  }
};

// Fungsi menghapus seluruh data lama dari IndexedDB secara asinkronus
function clearOldData() {
  return new Promise((resolve, reject) => {
    const transaction = db.transaction(['assets'], 'readwrite');
    const store = transaction.objectStore('assets');
    const request = store.clear();
    
    request.onsuccess = () => resolve();
    request.onerror = (e) => reject(e.target.error);
  });
}

// Fungsi menulis batch ke IndexedDB
function writeBatch(assetsBatch) {
  return new Promise((resolve, reject) => {
    const transaction = db.transaction(['assets'], 'readwrite');
    const store = transaction.objectStore('assets');
    
    transaction.oncomplete = () => {
      resolve();
    };
    
    transaction.onerror = (e) => {
      reject(e.target.error);
    };
    
    assetsBatch.forEach(asset => {
      store.add(asset);
    });
  });
}
