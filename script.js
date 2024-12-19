document.addEventListener("DOMContentLoaded", function () {
  console.log("Halaman Portofolio Khairul Aji Syafi’i telah dimuat.");
});
function login() {
  let cek = 0;
  var nama = prompt("Masukan nama panggilan  anda Maksimal 6 karakter");
  if (nama.length > 6) {
    nama = "Anonim";
    cek = 1;
    alert("Nama melebihi Jumlah karakter,gagal login");
  } else if (nama.length <= 0) {
    nama = "Anonim";
    cek = 1;
    alert("Nama kosong,gagal login");
  }
  if (cek == 0) {
    var status = prompt(
      "Masukkan status Anda(pelajar dsb) maksimal 10 karakter"
    );
    if (status.length > 10) {
      status = "Undefined";
      cek = 1;
      alert("Status melebihi Jumlah karakter,gagal login");
    } else if (status.length <= 0) {
      status = "Undefined";
      cek = 1;
      alert("Status kosong,gagal login");
    }
  }
  document.getElementById("Name").innerHTML = nama;
  document.getElementById("Status").innerHTML = status;
}
