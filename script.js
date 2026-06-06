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

let ASSETS = JSON.parse(localStorage.getItem('assets')) || DEFAULT_ASSETS;


function saveToStorage() {
  localStorage.setItem('assets', JSON.stringify(ASSETS));
}

function updateTotalAssetBadge() {
  const badge = document.getElementById('totalAssetBadge');
  if (badge) badge.textContent = ASSETS.length;
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
    const matchSearch = searchTerm === '' || 
      asset.kode.toLowerCase().includes(searchTerm) || 
      asset.nama.toLowerCase().includes(searchTerm);
    const matchSkpd = filterSkpd === '' || asset.skpd === filterSkpd;
    const matchKib = filterKib === '' || asset.kib === filterKib;
    const matchKondisi = filterKondisi === '' || asset.kondisi === filterKondisi;
    return matchSearch && matchSkpd && matchKib && matchKondisi;
  });
}

function renderInventarisTable() {
  const isAdmin = !document.body.classList.contains('tamu-mode');
  const filtered = getFilteredAssets();
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
        <td><span class="kode-chip">${a.kode}</span></td>
        <td><strong>${a.nama}</strong></td>
        <td>${a.kib}</td>
        <td>${a.merk}</td>
        <td>${a.ukuran}</td>
        <td>${a.rangka}</td>
        <td>${a.mesin}</td>
        <td>${a.polisi}</td>
        <td>${a.bpkb}</td>
        <td>${a.tahun}</td>
        <td>${a.jumlah}</td>
        <td class="nilai-text">${a.nilai}</td>
        <td><span class="status-pill ${KONDISI_CLASS[a.kondisi]}">${a.kondisi}</span></td>
        ${isAdmin ? `<td><div class="row-actions"><button class="action-btn view" onclick='event.stopPropagation(); showAssetDetail("${a.kode}")'>🔍</button><button class="action-btn edit" onclick='event.stopPropagation(); editAsset("${a.kode}")'>✏️</button><button class="action-btn delete" onclick='event.stopPropagation(); deleteAsset("${a.kode}")'>🗑️</button></div></td>` : ''}
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

function filterInventaris() {
  currentPage = 1;
  renderInventarisTable();
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
  const map = {
    detailKode: asset.kode,
    detailNama: asset.nama,
    detailKib: asset.kib,
    detailSkpd: asset.skpd,
    detailMerk: asset.merk,
    detailUkuran: asset.ukuran,
    detailTahun: asset.tahun,
    detailJumlah: asset.jumlah,
    detailNilai: asset.nilai,
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
  if(id === 'dashboard') renderTopOpd();
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
    if (currentRole === 'tamu') document.body.classList.add('tamu-mode');
    else document.body.classList.remove('tamu-mode');
    renderInventarisTable();
    const loginPage = document.getElementById('loginPage');
    if(loginPage) loginPage.classList.add('hidden');
    if(loading) loading.classList.remove('show');
    showToast('✅ Selamat datang, ' + (currentRole==='admin'?found.nama:(opd.split('(')[0].trim()||opd)) + '!');
    if(document.getElementById('page-dashboard').style.display !== 'none') renderTopOpd();
  }, 500);
}

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
  switchRole('admin');
  renderInventarisTable();
}

document.addEventListener('DOMContentLoaded', () => {
  loadTheme();
  renderInventarisTable();
  renderTopOpd();
  updateTotalAssetBadge();
});