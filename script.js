const DEFAULT_ASSETS = [
  { no:1, kode:'02.01.02.01.0001', nama:'Gedung Kantor Dinas Pendidikan', kib:'KIB C', merk:'-', ukuran:'500 m²', rangka:'-', mesin:'-', polisi:'-', bpkb:'-', tahun:2018, jumlah:1, nilai:'Rp 4.200.000.000', kondisi:'Baik', skpd:'Dinas Pendidikan' },
  { no:2, kode:'02.06.01.01.0012', nama:'Kendaraan Dinas Roda 4 (Toyota Innova)', kib:'KIB B', merk:'Toyota', ukuran:'Innova Reborn', rangka:'MHFBE12G9K123456', mesin:'2TR-1234567', polisi:'DW 1234 AB', bpkb:'BPKB-0012345', tahun:2021, jumlah:1, nilai:'Rp 385.000.000', kondisi:'Baik', skpd:'BPKAD' },
  { no:3, kode:'02.03.12.01.0034', nama:'Laptop Lenovo ThinkPad E14', kib:'KIB B', merk:'Lenovo', ukuran:'14"', rangka:'-', mesin:'-', polisi:'-', bpkb:'-', tahun:2023, jumlah:5, nilai:'Rp 14.500.000', kondisi:'Baik', skpd:'Dinas Kesehatan' },
  { no:4, kode:'01.01.11.01.0005', nama:'Tanah Bangunan Puskesmas Tempe', kib:'KIB A', merk:'-', ukuran:'1.200 m²', rangka:'-', mesin:'-', polisi:'-', bpkb:'-', tahun:2005, jumlah:1, nilai:'Rp 2.100.000.000', kondisi:'Baik', skpd:'Dinas Kesehatan' },
  { no:5, kode:'02.06.01.02.0088', nama:'Sepeda Motor Honda Beat', kib:'KIB B', merk:'Honda', ukuran:'110cc', rangka:'MH1JM1110KK123456', mesin:'JM11E1123456', polisi:'DW 5678 CD', bpkb:'BPKB-0023456', tahun:2019, jumlah:2, nilai:'Rp 21.000.000', kondisi:'Rusak Ringan', skpd:'Dinas Perhubungan' },
  { no:6, kode:'02.07.02.03.0021', nama:'AC Split 2 PK Panasonic', kib:'KIB B', merk:'Panasonic', ukuran:'2 PK', rangka:'-', mesin:'-', polisi:'-', bpkb:'-', tahun:2020, jumlah:3, nilai:'Rp 8.400.000', kondisi:'Baik', skpd:'Setda Wajo' },
  { no:7, kode:'02.01.02.05.0003', nama:'Gedung Puskesmas Majauleng', kib:'KIB C', merk:'-', ukuran:'400 m²', rangka:'-', mesin:'-', polisi:'-', bpkb:'-', tahun:2016, jumlah:1, nilai:'Rp 3.750.000.000', kondisi:'Rusak Ringan', skpd:'Dinas Kesehatan' },
  { no:8, kode:'02.03.16.01.0099', nama:'Printer Canon iR-ADV', kib:'KIB B', merk:'Canon', ukuran:'A3', rangka:'-', mesin:'-', polisi:'-', bpkb:'-', tahun:2018, jumlah:1, nilai:'Rp 45.000.000', kondisi:'Rusak Berat', skpd:'BPKAD' },
  { no:9, kode:'02.06.01.01.0031', nama:'Kendaraan Operasional Avanza', kib:'KIB B', merk:'Toyota', ukuran:'Avanza 1.5 G', rangka:'MHFBE12G9K654321', mesin:'2NR-7654321', polisi:'DW 9012 EF', bpkb:'BPKB-0034567', tahun:2020, jumlah:1, nilai:'Rp 280.000.000', kondisi:'Baik', skpd:'Dinas PU' },
  { no:10, kode:'02.03.12.05.0112', nama:'Server Dell PowerEdge', kib:'KIB B', merk:'Dell', ukuran:'Rack 2U', rangka:'-', mesin:'-', polisi:'-', bpkb:'-', tahun:2022, jumlah:2, nilai:'Rp 185.000.000', kondisi:'Baik', skpd:'Diskominfo' },
  { no:11, kode:'02.06.01.01.0045', nama:'Mobil Ambulance', kib:'KIB B', merk:'Isuzu', ukuran:'ELF', rangka:'ISUZU123456', mesin:'4JB1-789012', polisi:'DW 3456 GH', bpkb:'BPKB-0045678', tahun:2023, jumlah:1, nilai:'Rp 520.000.000', kondisi:'Baik', skpd:'Dinas Kesehatan' },
  { no:12, kode:'02.03.12.05.0078', nama:'Komputer Desktop', kib:'KIB B', merk:'ASUS', ukuran:'Core i5', rangka:'-', mesin:'-', polisi:'-', bpkb:'-', tahun:2024, jumlah:10, nilai:'Rp 85.000.000', kondisi:'Baik', skpd:'Dinas Pendidikan' }
];

let ASSETS = []; let filteredAssets = []; = [];
let currentDetailAsset = null;
let exportOrientation = 'portrait';

function saveToStorage() {
  localStorage.setItem('assets', JSON.stringify(ASSETS));
}

function updateTotalAssetBadge() {
  const badge = document.getElementById('totalAssetBadge');
  if (badge) badge.textContent = ASSETS.length;
}

function parseRp(value) {
  if (value == null) return 0;
  const digits = String(value).replace(/[^0-9]/g, '');
  return Number(digits) || 0;
}

function formatRp(value) {
  return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(value).replace(/\u00A0/g, ' ');
}

const KIB_CATEGORIES = [
  { kib: 'KIB A', name: 'KIB A — Tanah', color: '#1D4ED8' },
  { kib: 'KIB B', name: 'KIB B — Peralatan & Mesin', color: '#059669' },
  { kib: 'KIB C', name: 'KIB C — Gedung & Bangunan', color: '#D97706' },
  { kib: 'KIB D', name: 'KIB D — Jalan & Jaringan', color: '#7C3AED' },
  { kib: 'KIB E', name: 'KIB E — Aset Lainnya', color: '#EC4899' },
  { kib: 'KIB F', name: 'KIB F — Konstruksi Dalam Pengerjaan', color: '#3B82F6' }
];

function getCategorySummary() {
  const summary = KIB_CATEGORIES.map(cat => ({ ...cat, count: 0, value: 0 }));
  ASSETS.forEach(asset => {
    const assetKib = String(asset.kib || '').split(' — ')[0].trim();
    const category = summary.find(item => item.kib === assetKib);
    if (category) {
      category.count += asset.jumlah || 0;
      category.value += parseRp(asset.nilai);
    }
  });
  return summary;
}

function renderCategoryAset() {
  const list = document.getElementById('categoryList');
  if (!list) return;
  const categories = getCategorySummary();
  const maxCount = Math.max(...categories.map(item => item.count), 1);
  list.innerHTML = categories.map(item => {
    const percent = Math.round((item.count / maxCount) * 100);
    return `
      <div class="cat-item">
        <div class="cat-dot" style="background:${item.color}"></div>
        <div style="flex:1">
          <div class="cat-name">${item.name}</div>
          <div class="cat-bar-wrap"><div class="cat-bar" style="width:${percent}%;background:${item.color}"></div></div>
        </div>
        <div style="display:flex; flex-direction:column; align-items:flex-end; gap:4px; min-width:120px;">
          <div class="cat-value">${formatRp(item.value)}</div>
          <div class="cat-meta-row"><div class="cat-count">${item.count}</div><div class="cat-pct">${percent}%</div></div>
        </div>
      </div>
    `;
  }).join('');
}

function updateOpdStats() {
  const opdMap = new Map();
  ASSETS.forEach(a => {
    opdMap.set(a.skpd, (opdMap.get(a.skpd) || 0) + a.jumlah);
  });
  return Array.from(opdMap.entries())
    .map(([name, total]) => ({ name, total }))
    .sort((a, b) => b.total - a.total)
    .slice(0, 10);
}

let sortedOpds = updateOpdStats();
const KONDISI_CLASS = { 'Baik':'baik', 'Rusak Ringan':'rusak-ringan', 'Rusak Berat':'rusak-berat' };

function debounce(fn, delay) {
  let timer;
  return function(...args) {
    clearTimeout(timer);
    timer = setTimeout(() => fn.apply(this, args), delay);
  };
}

function escapeHtml(str) {
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
}

function highlight(text, term) {
  if (!term) return escapeHtml(text == null ? '' : text);
  const s = String(text == null ? '' : text);
  const escapedTerm = term.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  try {
    const re = new RegExp(`(${escapedTerm})`, 'ig');
    return escapeHtml(s).replace(re, '<mark>$1</mark>');
  } catch (e) {
    return escapeHtml(s);
  }
}

function updateRealTimeClock() {
  const now = new Date();
  const hours = String(now.getHours()).padStart(2,'0');
  const minutes = String(now.getMinutes()).padStart(2,'0');
  const seconds = String(now.getSeconds()).padStart(2,'0');
  const timeString = `${hours}:${minutes}:${seconds}`;
  const hour = now.getHours();
  let period = 'WITA';
  if (hour >= 4 && hour < 10) period = 'PAGI';
  else if (hour >= 10 && hour < 15) period = 'SIANG';
  else if (hour >= 15 && hour < 18) period = 'SORE';
  else if (hour >= 18 && hour < 22) period = 'MALAM';
  const days = ['MINGGU','SENIN','SELASA','RABU','KAMIS','JUMAT','SABTU'];
  const months = ['Januari','Februari','Maret','April','Mei','Juni','Juli','Agustus','September','Oktober','November','Desember'];
  const dayName = days[now.getDay()];
  const date = now.getDate();
  const monthName = months[now.getMonth()];
  const year = now.getFullYear();
  const fullDateString = `${date} ${monthName} ${year}`;
  const clockEl = document.getElementById('realTimeClock');
  if (clockEl) clockEl.textContent = timeString;
  const periodEl = document.getElementById('timePeriod');
  if (periodEl) periodEl.textContent = period;
  const dayEl = document.getElementById('dayName');
  if (dayEl) dayEl.textContent = dayName;
  const dateEl = document.getElementById('fullDate');
  if (dateEl) dateEl.textContent = fullDateString;
  const updateEl = document.getElementById('lastUpdateTime');
  if (updateEl) updateEl.textContent = `${date} ${monthName} ${year}, ${timeString} WITA`;
}
setInterval(updateRealTimeClock, 1000);
updateRealTimeClock();

let currentPage = 1;
let rowsPerPage = 10;

function getFilteredAssets() {
  const searchInput = document.getElementById('inventarisSearchInput');
  const searchTerm = searchInput ? searchInput.value.toLowerCase() : '';
  const filterSkpd = document.getElementById('filterSkpd')?.value || '';
  const filterKib = document.getElementById('filterKib')?.value || '';
  const filterKondisi = document.getElementById('filterKondisi')?.value || '';
  
  return ASSETS.filter(asset => {
    const combinedFields = [
      asset.kode,
      asset.nama,
      asset.merk,
      asset.ukuran,
      asset.rangka,
      asset.mesin,
      asset.polisi,
      asset.bpkb,
      asset.nilai,
      asset.tahun,
      asset.skpd
    ].map(v => (v === undefined || v === null) ? '' : String(v).toLowerCase()).join(' ');

    const matchSearch = searchTerm === '' || combinedFields.includes(searchTerm);
    const matchSkpd = filterSkpd === '' || asset.skpd === filterSkpd;
    const matchKib = filterKib === '' || asset.kib === filterKib;
    const matchKondisi = filterKondisi === '' || asset.kondisi === filterKondisi;
    return matchSearch && matchSkpd && matchKib && matchKondisi;
  });
}

function renderInventarisTable() {
  const isAdmin = !document.body.classList.contains('tamu-mode');
  const filtered = getFilteredAssets();
  const searchTerm = document.getElementById('inventarisSearchInput')?.value.toLowerCase() || '';
  const totalItems = filtered.length;
  const totalPages = Math.ceil(totalItems / rowsPerPage);
  
  if (currentPage < 1) currentPage = 1;
  if (currentPage > totalPages && totalPages > 0) currentPage = totalPages;
  
  const start = (currentPage - 1) * rowsPerPage;
  const end = start + rowsPerPage;
  const pageData = filtered.slice(start, end);
  
  const panelSub = document.getElementById('inventarisPanelSub');
  if (panelSub) {
    if (filtered.length !== ASSETS.length) {
      panelSub.innerHTML = `Menampilkan ${filtered.length} dari ${ASSETS.length} aset · Kabupaten Wajo`;
    } else {
      panelSub.innerHTML = `Total ${ASSETS.length} aset terdaftar · Kabupaten Wajo`;
    }
  }
  
  const tbody = document.getElementById('inventarisTableBody');
  if (tbody) {
    tbody.innerHTML = pageData.map((a, idx) => `
      <tr class="clickable-row" onclick='showAssetDetail("${a.kode}")'>
        <td>${start + idx + 1}</td>
        <td><span class="kode-chip">${highlight(a.kode, searchTerm)}</span></td>
        <td><strong>${highlight(a.nama, searchTerm)}</strong></td>
        <td>${highlight(a.kib, searchTerm)}</td>
        <td>${highlight(a.sertifikat || '-', searchTerm)}</td>
        <td>${highlight(a.merk, searchTerm)}</td>
        <td>${highlight(a.ukuran, searchTerm)}</td>
        <td>${highlight(a.rangka, searchTerm)}</td>
        <td>${highlight(a.mesin, searchTerm)}</td>
        <td>${highlight(a.polisi, searchTerm)}</td>
        <td>${highlight(a.bpkb, searchTerm)}</td>
        <td>${highlight(String(a.tahun), searchTerm)}</td>
        <td>${highlight(String(a.jumlah), searchTerm)}</td>
        <td class="nilai-text">${highlight(a.nilai, searchTerm)}</td>
        <td class="nilai-text">${highlight(a.nilaiBuku || '-', searchTerm)}</td>
        <td><span class="status-pill ${KONDISI_CLASS[a.kondisi]}">${highlight(a.kondisi, searchTerm)}</span></td>
        ${isAdmin ? `<td class="admin-only">${highlight(a.skpd, searchTerm)}</td><td><div class="row-actions"><button class="action-btn view" onclick='event.stopPropagation(); showAssetDetail("${a.kode}")'>🔍</button><button class="action-btn edit" onclick='event.stopPropagation(); editAsset("${a.kode}")'>✏️</button><button class="action-btn delete" onclick='event.stopPropagation(); deleteAsset("${a.kode}")'>🗑️</button></div></td>` : ''}
      </tr>
    `).join('');
  }
  
  const startNum = totalItems === 0 ? 0 : start + 1;
  const endNum = Math.min(end, totalItems);
  const infoEl = document.getElementById('paginationInfo');
  if (infoEl) {
    infoEl.textContent = totalItems === 0 ? '0 data' : `${startNum}–${endNum} dari ${totalItems} data`;
  }
  
  const btnsContainer = document.getElementById('paginationBtns');
  if (btnsContainer) {
    let btnsHtml = `<button class="page-btn" onclick="changePage(${currentPage - 1})" ${currentPage === 1 ? 'disabled style="opacity:0.5"' : ''}>‹</button>`;
    let startPage = Math.max(1, currentPage - 2);
    let endPage = Math.min(totalPages, startPage + 4);
    if (endPage - startPage < 4 && startPage > 1) {
      startPage = Math.max(1, totalPages - 4);
      endPage = totalPages;
    }
    for (let i = startPage; i <= endPage; i++) {
      btnsHtml += `<button class="page-btn ${i === currentPage ? 'active' : ''}" onclick="changePage(${i})">${i}</button>`;
    }
    btnsHtml += `<button class="page-btn" onclick="changePage(${currentPage + 1})" ${currentPage === totalPages || totalPages === 0 ? 'disabled style="opacity:0.5"' : ''}>›</button>`;
    btnsContainer.innerHTML = btnsHtml;
  }
}

function changePage(page) {
  const filtered = getFilteredAssets();
  const totalPages = Math.ceil(filtered.length / rowsPerPage);
  if (page >= 1 && page <= totalPages) {
    currentPage = page;
    renderInventarisTable();
  }
}

const _debouncedRenderInventaris = debounce(() => {
  currentPage = 1;
  renderInventarisTable();
}, 250);

function filterInventaris() {
  _debouncedRenderInventaris();
}

function renderTopOpd() {
  const container = document.getElementById('topOpdContainer');
  if(!container) return;
  sortedOpds = updateOpdStats();
  const maxTotal = sortedOpds[0]?.total || 1;
  container.innerHTML = sortedOpds.map((opd, idx) => {
    const percent = (opd.total / maxTotal) * 100;
    const isTop3 = idx < 3;
    const rankIcon = idx === 0 ? '👑' : (idx === 1 ? '🥈' : (idx === 2 ? '🥉' : ''));
    return `<div class="opd-rank-item"><div class="rank-number ${isTop3 ? 'special' : ''}">${idx+1}</div><div class="opd-info"><div class="opd-name">${opd.name} ${rankIcon ? `<span class="crown-icon">${rankIcon}</span>` : ''}</div><div class="opd-stats"><span class="stat-badge">📦 ${opd.total} aset</span><div class="opd-bar-container"><div class="opd-bar" style="width: ${percent}%;"></div></div></div></div><div class="opd-value">${Math.round(percent)}%</div></div>`;
  }).join('');
}

function editAsset(kode) {
  alert('Fitur edit untuk kode ' + kode + ' akan segera hadir.');
}

function deleteAsset(kode) {
  if(confirm('Hapus aset dengan kode ' + kode + '?')) {
    const index = ASSETS.findIndex(a => a.kode === kode);
    if(index !== -1) {
      ASSETS.splice(index, 1);
      ASSETS.forEach((a, i) => a.no = i + 1);
      updateTotalAssetBadge();
      renderTopOpd();
      filterInventaris();
        saveToStorage();
        showToast('✅ Aset berhasil dihapus!');
    }
  }
}

function showAssetDetail(kode) {
  const asset = ASSETS.find(a => a.kode === kode);
  if (!asset) return;
  currentDetailAsset = asset;
  const map = {
    detailKode: asset.kode,
    detailNama: asset.nama,
    detailKib: asset.kib,
    detailSertifikat: asset.sertifikat,
    detailSkpd: asset.skpd,
    detailMerk: asset.merk,
    detailUkuran: asset.ukuran,
    detailTahun: asset.tahun,
    detailJumlah: asset.jumlah,
    detailNilai: asset.nilai,
    detailNilaiBuku: asset.nilaiBuku,
    detailKondisi: asset.kondisi,
    detailRangka: asset.rangka,
    detailMesin: asset.mesin,
    detailPolisi: asset.polisi,
    detailBpkb: asset.bpkb,
  };
  Object.entries(map).forEach(([id, value]) => {
    const el = document.getElementById(id);
    if (el) el.textContent = value || '-';
  });
  const overlay = document.getElementById('detailOverlay');
  if (overlay) overlay.classList.add('open');
}

function closeDetailModal() {
  const overlay = document.getElementById('detailOverlay');
  if (overlay) overlay.classList.remove('open');
}

function handleDetailOverlayClick(e) {
  if (e.target === document.getElementById('detailOverlay')) closeDetailModal();
}

function toggleTheme() {
  const body = document.body;
  const toggle = document.getElementById('themeToggle');
  if(body.classList.contains('dark')) {
    body.classList.remove('dark');
    if(toggle) toggle.innerHTML = '🌙';
    localStorage.setItem('theme','light');
  } else {
    body.classList.add('dark');
    if(toggle) toggle.innerHTML = '☀️';
    localStorage.setItem('theme','dark');
  }
}

function loadTheme() {
  if(localStorage.getItem('theme') === 'dark') {
    document.body.classList.add('dark');
    const toggle = document.getElementById('themeToggle');
    if(toggle) toggle.innerHTML = '☀️';
  }
}

const PAGES = ['dashboard','inventaris','mutasi','penghapusan','penyusutan','pemeliharaan','pemanfaatan','kib','laporan','master','pengguna'];
function showPage(id) {
  PAGES.forEach(p => {
    const el = document.getElementById('page-'+p);
    if(el) el.style.display = p === id ? '' : 'none';
  });
  document.querySelectorAll('.nav-item').forEach(n => n.classList.remove('active'));
  if(event && event.currentTarget) event.currentTarget.classList.add('active');
  const titles = {
    dashboard:'Dashboard', inventaris:'Data Inventaris', mutasi:'Mutasi BMD',
    penghapusan:'Penghapusan', penyusutan:'Penyusutan', pemeliharaan:'Pemeliharaan',
    pemanfaatan:'Pemanfaatan', kib:'KIB', laporan:'Laporan', master:'Data Master', pengguna:'Pengguna'
  };
  const pageTitle = document.getElementById('pageTitle');
  if(pageTitle) pageTitle.textContent = (titles[id] || id) + ' BMD';
  const breadcrumbSub = document.getElementById('breadcrumbSub');
  if(breadcrumbSub) breadcrumbSub.textContent = titles[id] || id;
  if(id === 'dashboard') {
    renderCategoryAset();
    renderTopOpd();
  }
  if(id === 'inventaris') renderInventarisTable();
}

function openModal() {
  const modal = document.getElementById('modalOverlay');
  if(modal) modal.classList.add('open');
}
function closeModal() {
  const modal = document.getElementById('modalOverlay');
  if(modal) modal.classList.remove('open');
}
function handleOverlayClick(e) {
  if(e.target === document.getElementById('modalOverlay')) closeModal();
}

function saveAsset() {
  const kode = document.getElementById('fKode')?.value.trim();
  const nama = document.getElementById('fNama')?.value.trim();
  if (!kode || !nama) {
    alert('Kode dan Nama Barang wajib diisi!');
    return;
  }
  const newAsset = {
    no: ASSETS.length + 1,
    kode: kode,
    nama: nama,
    kib: document.getElementById('fKib')?.value || 'KIB B — Peralatan & Mesin',
    merk: document.getElementById('fMerk')?.value || '-',
    ukuran: document.getElementById('fUkuran')?.value || '-',
    rangka: document.getElementById('fRangka')?.value || '-',
    mesin: document.getElementById('fMesin')?.value || '-',
    polisi: document.getElementById('fPolisi')?.value || '-',
    bpkb: document.getElementById('fBpkb')?.value || '-',
    tahun: parseInt(document.getElementById('fTahun')?.value) || new Date().getFullYear(),
    jumlah: parseInt(document.getElementById('fJumlah')?.value) || 1,
    nilai: 'Rp ' + (parseInt(document.getElementById('fNilai')?.value.replace(/\D/g,'')||0)).toLocaleString('id'),
    kondisi: document.getElementById('fKondisi')?.value || 'Baik',
    skpd: document.getElementById('fSkpd')?.value || 'Dinas Pendidikan'
  };
  ASSETS.unshift(newAsset);
  saveToStorage();
  updateTotalAssetBadge();
  renderTopOpd();
  filterInventaris();
  closeModal();
  showToast('✅ Aset "'+nama+'" berhasil ditambahkan!');
  
  const fields = ['fKode','fNama','fMerk','fUkuran','fRangka','fMesin','fPolisi','fBpkb','fTahun','fJumlah','fNilai'];
  fields.forEach(id => {
    const el = document.getElementById(id);
    if(el) el.value = '';
  });
  const kondisiEl = document.getElementById('fKondisi');
  if(kondisiEl) kondisiEl.value = 'Baik';
  const skpdEl = document.getElementById('fSkpd');
  if(skpdEl) skpdEl.value = 'Dinas Pendidikan';
  const kibEl = document.getElementById('fKib');
  if(kibEl) kibEl.value = 'KIB B — Peralatan & Mesin';
  const jumlahEl = document.getElementById('fJumlah');
  if(jumlahEl) jumlahEl.value = '1';
}

function showToast(msg) {
  const t = document.getElementById('toast');
  if(t) {
    t.textContent = msg;
    t.classList.add('show');
    setTimeout(() => t.classList.remove('show'), 3000);
  }
}

const USERS = { admin: { pass:'admin123', role:'admin', nama:'Admin BPKAD', avatar:'AD' }, tamu: { pass:'tamu123', role:'tamu', nama:'Pengguna Tamu', avatar:'TM' } };
let currentRole = 'admin';
let currentOpd = '';

function switchRole(role) {
  currentRole = role;
  const tabAdmin = document.getElementById('tabAdmin');
  const tabTamu = document.getElementById('tabTamu');
  const opdField = document.getElementById('opdField');
  const loginError = document.getElementById('loginError');
  if(tabAdmin) tabAdmin.classList.toggle('active', role==='admin');
  if(tabTamu) tabTamu.classList.toggle('active', role==='tamu');
  if(opdField) opdField.classList.toggle('visible', role==='tamu');
  if(loginError) loginError.classList.remove('show');
}

function togglePass() {
  const inp = document.getElementById('loginPass');
  const tog = document.getElementById('passToggle');
  if(inp && tog) {
    if(inp.type === 'password') {
      inp.type='text';
      tog.textContent='🙈';
    } else {
      inp.type='password';
      tog.textContent='👁️';
    }
  }
}

function doLogin() {
  const user = document.getElementById('loginUser')?.value.trim().toLowerCase() || '';
  const pass = document.getElementById('loginPass')?.value || '';
  const opd = document.getElementById('loginOpd')?.value || '';
  const errEl = document.getElementById('loginError');
  const errMsg = document.getElementById('loginErrorMsg');
  if(errEl) errEl.classList.remove('show');
  if (currentRole === 'tamu' && !opd) {
    if(errMsg) errMsg.textContent = 'Pilih OPD terlebih dahulu.';
    if(errEl) errEl.classList.add('show');
    return;
  }
  if (!user || !pass) {
    if(errMsg) errMsg.textContent = 'Isi nama pengguna dan kata sandi.';
    if(errEl) errEl.classList.add('show');
    return;
  }
  const found = USERS[user];
  if (!found || found.pass !== pass || found.role !== currentRole) {
    if(errMsg) errMsg.textContent = 'Nama pengguna atau kata sandi salah.';
    if(errEl) errEl.classList.add('show');
    return;
  }
  const loading = document.getElementById('loginLoading');
  if(loading) loading.classList.add('show');
  setTimeout(() => {
    const displayName = currentRole === 'tamu' ? opd : found.nama;
    const roleLabel = currentRole === 'tamu' ? (opd.length>25?opd.substring(0,22)+'…':opd) : 'Admin BPKAD';
    const sidebarAvatar = document.getElementById('sidebarAvatar');
    const sidebarName = document.getElementById('sidebarName');
    const sidebarRole = document.getElementById('sidebarRole');
    const topbarBadge = document.getElementById('topbarRoleBadge');
    if(sidebarAvatar) sidebarAvatar.textContent = found.avatar;
    if(sidebarName) sidebarName.textContent = displayName.length>30?displayName.substring(0,27)+'…':displayName;
    if(sidebarRole) sidebarRole.textContent = roleLabel;
    if(topbarBadge) {
      if (currentRole === 'admin') {
        topbarBadge.className = 'role-badge admin';
        topbarBadge.textContent = '🔐 Admin';
      } else {
        topbarBadge.className = 'role-badge tamu';
        topbarBadge.textContent = '👤 ' + (opd.length>20?opd.substring(0,17)+'…':opd);
      }
    }
    const adminOnly = document.querySelectorAll('.admin-only');
    adminOnly.forEach(el => el.style.display = currentRole === 'admin' ? '' : 'none');
    if (currentRole === 'tamu') {
      document.body.classList.add('tamu-mode');
      currentOpd = opd;
    } else {
      document.body.classList.remove('tamu-mode');
      currentOpd = '';
    }
    renderInventarisTable();
    const loginPage = document.getElementById('loginPage');
    if(loginPage) loginPage.classList.add('hidden');
    if(loading) loading.classList.remove('show');
    renderDashboardOpdLabel();
    showToast('✅ Selamat datang, ' + (currentRole==='admin'?found.nama:(opd.split('(')[0].trim()||opd)) + '!');
    if(document.getElementById('page-dashboard').style.display !== 'none') renderTopOpd();
  }, 500);
}

function toggleExportMenu() {
  const menu = document.getElementById('exportMenu');
  if (menu) menu.classList.toggle('show');
}

function setExportOrientation(value) {
  exportOrientation = value;
}

function closeExportMenu() {
  const menu = document.getElementById('exportMenu');
  if (menu) menu.classList.remove('show');
}

function formatExportValue(value) {
  return value == null || value === '' ? '-' : String(value);
}

function escapeXml(text) {
  return String(text)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

function createCrc32Table() {
  const table = new Uint32Array(256);
  for (let i = 0; i < 256; i++) {
    let c = i;
    for (let j = 0; j < 8; j++) {
      c = (c & 1) ? 0xEDB88320 ^ (c >>> 1) : c >>> 1;
    }
    table[i] = c;
  }
  return table;
}

const CRC32_TABLE = createCrc32Table();

function crc32(bytes) {
  let crc = 0xFFFFFFFF;
  for (let i = 0; i < bytes.length; i++) {
    crc = CRC32_TABLE[(crc ^ bytes[i]) & 0xFF] ^ (crc >>> 8);
  }
  return (crc ^ 0xFFFFFFFF) >>> 0;
}

function uint8ArrayFromString(str) {
  return new TextEncoder().encode(str);
}

function createZip(files) {
  const fileEntries = [];
  let offset = 0;
  const centralDirectory = [];

  files.forEach(file => {
    const nameBytes = uint8ArrayFromString(file.name);
    const dataBytes = typeof file.data === 'string' ? uint8ArrayFromString(file.data) : file.data;
    const crc = crc32(dataBytes);
    const localHeader = new Uint8Array(30 + nameBytes.length);
    const localView = new DataView(localHeader.buffer);
    localView.setUint32(0, 0x04034b50, true);
    localView.setUint16(4, 20, true);
    localView.setUint16(6, 0, true);
    localView.setUint16(8, 0, true);
    localView.setUint16(10, 0, true);
    localView.setUint32(12, crc, true);
    localView.setUint32(16, dataBytes.length, true);
    localView.setUint32(20, dataBytes.length, true);
    localView.setUint16(24, nameBytes.length, true);
    localView.setUint16(26, 0, true);
    localHeader.set(nameBytes, 30);

    fileEntries.push(localHeader, dataBytes);

    const centralHeader = new Uint8Array(46 + nameBytes.length);
    const centralView = new DataView(centralHeader.buffer);
    centralView.setUint32(0, 0x02014b50, true);
    centralView.setUint16(4, 20, true);
    centralView.setUint16(6, 20, true);
    centralView.setUint16(8, 0, true);
    centralView.setUint16(10, 0, true);
    centralView.setUint16(12, 0, true);
    centralView.setUint32(14, crc, true);
    centralView.setUint32(18, dataBytes.length, true);
    centralView.setUint32(22, dataBytes.length, true);
    centralView.setUint16(26, nameBytes.length, true);
    centralView.setUint16(28, 0, true);
    centralView.setUint16(30, 0, true);
    centralView.setUint16(32, 0, true);
    centralView.setUint16(34, 0, true);
    centralView.setUint32(36, 0, true);
    centralView.setUint32(40, offset, true);
    centralHeader.set(nameBytes, 46);

    centralDirectory.push(centralHeader);
    offset += localHeader.length + dataBytes.length;
  });

  const centralSize = centralDirectory.reduce((sum, entry) => sum + entry.length, 0);
  const endRecord = new Uint8Array(22);
  const endView = new DataView(endRecord.buffer);
  endView.setUint32(0, 0x06054b50, true);
  endView.setUint16(4, 0, true);
  endView.setUint16(6, 0, true);
  endView.setUint16(8, centralDirectory.length, true);
  endView.setUint16(10, centralDirectory.length, true);
  endView.setUint32(12, centralSize, true);
  endView.setUint32(16, offset, true);
  endView.setUint16(20, 0, true);

  return new Blob([...fileEntries, ...centralDirectory, endRecord], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
}

function buildXlsxBlob(headers, rows) {
  let sheetData = [`<row r="1">`, ...headers.map((h, idx) => `<c r="${String.fromCharCode(65 + idx)}1" t="inlineStr"><is><t>${escapeXml(h)}</t></is></c>`), `</row>`].join('');
  rows.forEach((row, rowIndex) => {
    const cells = row.map((cell, colIndex) => {
      const value = cell == null ? '' : cell;
      const address = `${String.fromCharCode(65 + colIndex)}${rowIndex + 2}`;
      return typeof value === 'number'
        ? `<c r="${address}" t="n"><v>${value}</v></c>`
        : `<c r="${address}" t="inlineStr"><is><t>${escapeXml(value)}</t></is></c>`;
    }).join('');
    sheetData += `<row r="${rowIndex + 2}">${cells}</row>`;
  });
  const maxLengths = headers.map((header, idx) => {
    const headerLen = String(header).length;
    const colMax = rows.reduce((max, row) => Math.max(max, String(row[idx] || '').length), headerLen);
    return Math.min(50, Math.max(8, Math.ceil(colMax * 1.1)));
  });
  const colsXml = maxLengths.map((width, idx) => `<col min="${idx + 1}" max="${idx + 1}" width="${width}" customWidth="1"/>`).join('');
  const sheetXml = `<?xml version="1.0" encoding="UTF-8"?>
<worksheet xmlns="http://schemas.openxmlformats.org/spreadsheetml/2006/main" xmlns:r="http://schemas.openxmlformats.org/officeDocument/2006/relationships">
  <sheetPr/>
  <dimension ref="A1:${String.fromCharCode(65 + headers.length - 1)}${rows.length + 1}"/>
  <sheetViews>
    <sheetView workbookViewId="0"/>
  </sheetViews>
  <cols>${colsXml}</cols>
  <sheetData>${sheetData}</sheetData>
</worksheet>`;
  const workbookXml = `<?xml version="1.0" encoding="UTF-8"?>
<workbook xmlns="http://schemas.openxmlformats.org/spreadsheetml/2006/main" xmlns:r="http://schemas.openxmlformats.org/officeDocument/2006/relationships">
  <workbookPr defaultThemeVersion="124226"/>
  <sheets>
    <sheet name="Sheet1" sheetId="1" r:id="rId1"/>
  </sheets>
</workbook>`;
  const workbookRelsXml = `<?xml version="1.0" encoding="UTF-8"?>
<Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships">
  <Relationship Id="rId1" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/worksheet" Target="worksheets/sheet1.xml"/>
  <Relationship Id="rId2" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/styles" Target="styles.xml"/>
</Relationships>`;
  const relsXml = `<?xml version="1.0" encoding="UTF-8"?>
<Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships">
  <Relationship Id="rId1" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/officeDocument" Target="xl/workbook.xml"/>
  <Relationship Id="rId2" Type="http://schemas.openxmlformats.org/package/2006/relationships/metadata/core-properties" Target="docProps/core.xml"/>
  <Relationship Id="rId3" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/extended-properties" Target="docProps/app.xml"/>
</Relationships>`;
  const stylesXml = `<?xml version="1.0" encoding="UTF-8"?>
<styleSheet xmlns="http://schemas.openxmlformats.org/spreadsheetml/2006/main">
  <fonts count="1"><font><sz val="11"/><color theme="1"/><name val="Calibri"/><family val="2"/></font></fonts>
  <fills count="2"><fill><patternFill patternType="none"/></fill><fill><patternFill patternType="gray125"/></fill></fills>
  <borders count="1"><border><left/><right/><top/><bottom/><diagonal/></border></borders>
  <cellStyleXfs count="1"><xf numFmtId="0" fontId="0" fillId="0" borderId="0"/></cellStyleXfs>
  <cellXfs count="1"><xf numFmtId="0" fontId="0" fillId="0" borderId="0" xfId="0"/></cellXfs>
  <cellStyles count="1"><cellStyle name="Normal" xfId="0" builtinId="0"/></cellStyles>
</styleSheet>`;
  const coreXml = `<?xml version="1.0" encoding="UTF-8"?>
<cp:coreProperties xmlns:cp="http://schemas.openxmlformats.org/package/2006/metadata/core-properties" xmlns:dc="http://purl.org/dc/elements/1.1/" xmlns:dcterms="http://purl.org/dc/terms/" xmlns:dcmitype="http://purl.org/dc/dcmitype/" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance">
  <dc:creator>SIMDA BMD</dc:creator>
  <cp:lastModifiedBy>SIMDA BMD</cp:lastModifiedBy>
  <dcterms:created xsi:type="dcterms:W3CDTF">${new Date().toISOString()}</dcterms:created>
  <dcterms:modified xsi:type="dcterms:W3CDTF">${new Date().toISOString()}</dcterms:modified>
</cp:coreProperties>`;
  const appXml = `<?xml version="1.0" encoding="UTF-8"?>
<Properties xmlns="http://schemas.openxmlformats.org/officeDocument/2006/extended-properties" xmlns:vt="http://schemas.openxmlformats.org/officeDocument/2006/docPropsVTypes">
  <TotalTime>0</TotalTime>
  <Application>Microsoft Excel</Application>
  <DocSecurity>0</DocSecurity>
  <ScaleCrop>false</ScaleCrop>
  <HeadingPairs>
    <vt:vector size="2" baseType="variant">
      <vt:variant><vt:lpstr>Worksheets</vt:lpstr></vt:variant>
      <vt:variant><vt:i4>1</vt:i4></vt:variant>
    </vt:vector>
  </HeadingPairs>
  <TitlesOfParts>
    <vt:vector size="1" baseType="lpstr">
      <vt:lpstr>Sheet1</vt:lpstr>
    </vt:vector>
  </TitlesOfParts>
  <Company></Company>
  <LinksUpToDate>false</LinksUpToDate>
  <SharedDoc>false</SharedDoc>
  <HyperlinksChanged>false</HyperlinksChanged>
  <AppVersion>16.0300</AppVersion>
</Properties>`;
  const contentTypesXml = `<?xml version="1.0" encoding="UTF-8"?>
<Types xmlns="http://schemas.openxmlformats.org/package/2006/content-types">
  <Default Extension="rels" ContentType="application/vnd.openxmlformats-package.relationships+xml"/>
  <Default Extension="xml" ContentType="application/xml"/>
  <Override PartName="/docProps/core.xml" ContentType="application/vnd.openxmlformats-package.core-properties+xml"/>
  <Override PartName="/docProps/app.xml" ContentType="application/vnd.openxmlformats-officedocument.extended-properties+xml"/>
  <Override PartName="/xl/workbook.xml" ContentType="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet.main+xml"/>
  <Override PartName="/xl/worksheets/sheet1.xml" ContentType="application/vnd.openxmlformats-officedocument.spreadsheetml.worksheet+xml"/>
  <Override PartName="/xl/styles.xml" ContentType="application/vnd.openxmlformats-officedocument.spreadsheetml.styles+xml"/>
</Types>`;

  return createZip([
    { name: '[Content_Types].xml', data: contentTypesXml },
    { name: '_rels/.rels', data: relsXml },
    { name: 'docProps/core.xml', data: coreXml },
    { name: 'docProps/app.xml', data: appXml },
    { name: 'xl/workbook.xml', data: workbookXml },
    { name: 'xl/_rels/workbook.xml.rels', data: workbookRelsXml },
    { name: 'xl/styles.xml', data: stylesXml },
    { name: 'xl/worksheets/sheet1.xml', data: sheetXml }
  ]);
}

function openPrintWindow(title, contentHtml, pageSize = 'A4') {
  const printWindow = window.open('', '_blank', 'width=1000,height=800');
  if (!printWindow) {
    alert('Gagal membuka jendela cetak. Periksa pengaturan popup browser.');
    return;
  }
  printWindow.document.write(`
    <html>
      <head>
        <title>${title}</title>
        <style>
          body { font-family: "Segoe UI", Arial, sans-serif; margin: 20px; color: #111; }
          h1 { font-size: 24px; margin-bottom: 16px; }
          table { width: 100%; border-collapse: collapse; margin-top: 16px; }
          th, td { border: 1px solid #444; padding: 8px 10px; text-align: left; vertical-align: top; }
          th { background: #f4f4f4; }
          .detail-section { margin-top: 12px; }
          .detail-row { margin-bottom: 8px; }
          .detail-label { font-weight: 700; min-width: 180px; display: inline-block; }
          @page { size: ${pageSize}; margin: 18mm; }
          @media print { button { display: none; } }
        </style>
      </head>
      <body>
        <h1>${title}</h1>
        ${contentHtml}
      </body>
    </html>
  `);
  printWindow.document.close();
  printWindow.focus();
  setTimeout(() => {
    printWindow.print();
  }, 500);
}

function exportPdf() {
  closeExportMenu();
  const assets = getFilteredAssets();
  if (!assets.length) {
    alert('Tidak ada data inventaris untuk diekspor.');
    return;
  }
  const rows = assets.map(asset => `
    <tr>
      <td>${formatExportValue(asset.kode)}</td>
      <td>${formatExportValue(asset.nama)}</td>
      <td>${formatExportValue(asset.kib)}</td>
      <td>${formatExportValue(asset.sertifikat)}</td>
      <td>${formatExportValue(asset.merk)}</td>
      <td>${formatExportValue(asset.ukuran)}</td>
      <td>${formatExportValue(asset.tahun)}</td>
      <td>${formatExportValue(asset.jumlah)}</td>
      <td>${formatExportValue(asset.nilai)}</td>
      <td>${formatExportValue(asset.nilaiBuku)}</td>
      <td>${formatExportValue(asset.kondisi)}</td>
      <td>${formatExportValue(asset.skpd)}</td>
    </tr>
  `).join('');
  const now = new Date();
  const formattedDate = `${String(now.getDate()).padStart(2,'0')}/${String(now.getMonth()+1).padStart(2,'0')}/${now.getFullYear()}`;
  const content = `
    <div>Dokumen export Inventaris BMD — ${formattedDate}</div>
    <table>
      <thead>
        <tr>
          <th>Kode Barang</th>
          <th>Nama Aset</th>
          <th>KIB</th>
          <th>No Sertifikat</th>
          <th>Merk</th>
          <th>Ukuran</th>
          <th>Tahun</th>
          <th>Jumlah</th>
          <th>Nilai Perolehan</th>
          <th>Nilai Buku</th>
          <th>Kondisi</th>
          <th>SKPD</th>
        </tr>
      </thead>
      <tbody>${rows}</tbody>
    </table>
  `;
  openPrintWindow('Export PDF Inventaris BMD', content, `A4 ${exportOrientation}`);
  showToast('✅ Export PDF Inventaris sedang diproses.');
}

function exportCsv() {
  closeExportMenu();
  const assets = getFilteredAssets();
  if (!assets.length) {
    alert('Tidak ada data inventaris untuk diekspor.');
    return;
  }
  const headers = ['KODE BARANG','NAMA ASET','KIB','NO SERTIFIKAT','MERK','UKURAN','TAHUN','JUMLAH','NILAI PEROLEHAN','NILAI BUKU','KONDISI','SKPD'];
  const rows = assets.map(asset => [
    asset.kode,
    asset.nama,
    asset.kib,
    asset.sertifikat || '-',
    asset.merk,
    asset.ukuran,
    asset.tahun,
    asset.jumlah,
    asset.nilai,
    asset.nilaiBuku || '-',
    asset.kondisi,
    asset.skpd
  ]);
  const csvContent = '\uFEFF' + [headers, ...rows]
    .map(row => row.map(value => `"${String(value).replace(/"/g, '""')}"`).join(';'))
    .join('\r\n');
  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const link = document.createElement('a');
  link.href = URL.createObjectURL(blob);
  link.download = `inventaris-${new Date().toISOString().slice(0,10)}.csv`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  showToast('✅ File CSV telah disiapkan dan diunduh.');
}

function exportXlsx() {
  closeExportMenu();
  const assets = getFilteredAssets();
  if (!assets.length) {
    alert('Tidak ada data inventaris untuk diekspor.');
    return;
  }
  const headers = ['KODE BARANG','NAMA ASET','KIB','NO SERTIFIKAT','MERK','UKURAN','TAHUN','JUMLAH','NILAI PEROLEHAN','NILAI BUKU','KONDISI','SKPD'];
  const rows = assets.map(asset => [
    formatExportValue(asset.kode),
    formatExportValue(asset.nama),
    formatExportValue(asset.kib),
    formatExportValue(asset.sertifikat),
    formatExportValue(asset.merk),
    formatExportValue(asset.ukuran),
    formatExportValue(asset.tahun),
    formatExportValue(asset.jumlah),
    formatExportValue(asset.nilai),
    formatExportValue(asset.nilaiBuku),
    formatExportValue(asset.kondisi),
    formatExportValue(asset.skpd)
  ]);
  const blob = buildXlsxBlob(headers, rows);
  const link = document.createElement('a');
  link.href = URL.createObjectURL(blob);
  link.download = `inventaris-${new Date().toISOString().slice(0,10)}.xlsx`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  showToast('✅ File Excel telah disiapkan dan diunduh.');
}

function exportDetailPdf() {
  if (!currentDetailAsset) {
    alert('Pilih detail aset terlebih dahulu untuk dicetak.');
    return;
  }
  const asset = currentDetailAsset;
  const content = `
    <div class="detail-section"><div class="detail-row"><span class="detail-label">Kode Barang:</span> ${formatExportValue(asset.kode)}</div></div>
    <div class="detail-section"><div class="detail-row"><span class="detail-label">Nama Aset:</span> ${formatExportValue(asset.nama)}</div></div>
    <div class="detail-section"><div class="detail-row"><span class="detail-label">Jenis KIB:</span> ${formatExportValue(asset.kib)}</div></div>
    <div class="detail-section"><div class="detail-row"><span class="detail-label">No Sertifikat:</span> ${formatExportValue(asset.sertifikat)}</div></div>
    <div class="detail-section"><div class="detail-row"><span class="detail-label">SKPD:</span> ${formatExportValue(asset.skpd)}</div></div>
    <div class="detail-section"><div class="detail-row"><span class="detail-label">Merk:</span> ${formatExportValue(asset.merk)}</div></div>
    <div class="detail-section"><div class="detail-row"><span class="detail-label">Ukuran / Spesifikasi:</span> ${formatExportValue(asset.ukuran)}</div></div>
    <div class="detail-section"><div class="detail-row"><span class="detail-label">Tahun:</span> ${formatExportValue(asset.tahun)}</div></div>
    <div class="detail-section"><div class="detail-row"><span class="detail-label">Jumlah:</span> ${formatExportValue(asset.jumlah)}</div></div>
    <div class="detail-section"><div class="detail-row"><span class="detail-label">Nilai Perolehan:</span> ${formatExportValue(asset.nilai)}</div></div>
    <div class="detail-section"><div class="detail-row"><span class="detail-label">Nilai Buku:</span> ${formatExportValue(asset.nilaiBuku)}</div></div>
    <div class="detail-section"><div class="detail-row"><span class="detail-label">Kondisi:</span> ${formatExportValue(asset.kondisi)}</div></div>
    <div class="detail-section"><div class="detail-row"><span class="detail-label">No Rangka:</span> ${formatExportValue(asset.rangka)}</div></div>
    <div class="detail-section"><div class="detail-row"><span class="detail-label">No Mesin:</span> ${formatExportValue(asset.mesin)}</div></div>
    <div class="detail-section"><div class="detail-row"><span class="detail-label">No Polisi:</span> ${formatExportValue(asset.polisi)}</div></div>
    <div class="detail-section"><div class="detail-row"><span class="detail-label">BPKB:</span> ${formatExportValue(asset.bpkb)}</div></div>
  `;
  openPrintWindow('Detail Aset', content, '210mm 330mm');
  showToast('✅ Detail aset sedang dicetak.');
}

document.addEventListener('click', (event) => {
  const menu = document.getElementById('exportMenu');
  const dropdown = event.target.closest('.export-dropdown');
  if (!dropdown && menu) {
    menu.classList.remove('show');
  }
});

function doLogout() {
  if (!confirm('Keluar dari sistem?')) return;
  const loginPage = document.getElementById('loginPage');
  const loading = document.getElementById('loginLoading');
  const loginUser = document.getElementById('loginUser');
  const loginPass = document.getElementById('loginPass');
  const loginOpd = document.getElementById('loginOpd');
  const loginError = document.getElementById('loginError');
  if(loginPage) loginPage.classList.remove('hidden');
  if(loading) loading.classList.remove('show');
  if(loginUser) loginUser.value = '';
  if(loginPass) loginPass.value = '';
  if(loginOpd) loginOpd.value = '';
  if(loginError) loginError.classList.remove('show');
  document.body.classList.remove('tamu-mode');
  currentOpd = '';
  switchRole('admin');
  renderDashboardOpdLabel();
  renderInventarisTable();
}

function renderDashboardOpdLabel() {
  const labelEl = document.getElementById('dashboardOpdLabel');
  if (!labelEl) return;
  if (currentRole === 'tamu' && currentOpd) {
    labelEl.textContent = `1 OPD · ${currentOpd}`;
  } else {
    labelEl.textContent = '63 SKPD · Kab. Wajo';
  }
}
async function loadAssetsFromJson() {

    try {

        const response = await fetch('assets.json');

        const data = await response.json();

        ASSETS = data;

        filteredAssets = [...ASSETS];

        renderInventarisTable();
        renderCategoryAset();
        renderTopOpd();
        renderDashboardOpdLabel();
        updateTotalAssetBadge();

        console.log(`Loaded ${ASSETS.length} assets`);

    } catch (err) {

        console.error('Gagal memuat assets.json', err);

    }
}
document.addEventListener('DOMContentLoaded', async () => {

    loadTheme();

    await loadAssetsFromJson();

});
