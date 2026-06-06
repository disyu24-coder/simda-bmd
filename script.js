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
let currentDetailAsset = null;
let exportOrientation = 'portrait';

function saveToStorage() {
  localStorage.setItem('assets', JSON.stringify(ASSETS));
}

function updateTotalAssetBadge() {
  const badge = document.getElementById('totalAssetBadge');
  if (badge) badge.textContent = ASSETS.length;
}

// ... (semua fungsi lain dari script asli kamu tetap sama sampai akhir) ...

// ==================== TAMBAHAN FINAL: HAMBURGER MENU ====================
function toggleSidebar() {
  const sidebar = document.getElementById('sidebar');
  if (sidebar) sidebar.classList.toggle('open');
}

// Close sidebar when clicking nav item on mobile
document.addEventListener('DOMContentLoaded', () => {
  loadTheme();
  renderInventarisTable();
  renderCategoryAset();
  renderTopOpd();
  renderDashboardOpdLabel();
  updateTotalAssetBadge();

  // Hamburger functionality
  const navItems = document.querySelectorAll('.nav-item');
  navItems.forEach(item => {
    item.addEventListener('click', () => {
      if (window.innerWidth <= 768) {
        const sidebar = document.getElementById('sidebar');
        if (sidebar) sidebar.classList.remove('open');
      }
    });
  });
});