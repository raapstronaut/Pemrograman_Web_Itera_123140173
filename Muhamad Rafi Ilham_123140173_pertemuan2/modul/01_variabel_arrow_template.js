// =======================================
// LATIHAN 1: Mengubah nilai const
// =======================================

{
  const PI = 3.14159;

  console.log("Latihan 1 - Nilai awal PI:", PI);

  try {
    PI = 3.15;
  } catch (error) {
    console.log("Latihan 1 - Error:", error.message);
  }
}


// =======================================
// LATIHAN 2: Perbandingan var dan let
// =======================================

{
  var namaVar = "Nilai awal";

  {
    var namaVar = "Nilai dalam block";
    console.log("var dalam block:", namaVar);
  }

  console.log("var luar block:", namaVar);

  let namaLet = "Nilai awal";

  {
    let namaLet = "Nilai dalam block";
    console.log("let dalam block:", namaLet);
  }

  console.log("let luar block:", namaLet);
}


// =======================================
// LATIHAN 3: Berbagai Arrow Functions
// =======================================

{
  const tambah = (a, b) => {
    return a + b;
  };

  const kali = (a, b) => a * b;

  const kuadrat = x => x * x;

  const salam = () => "Halo, JavaScript!";

  const buatMahasiswa = (nama, umur) => ({
    nama,
    umur
  });

  console.log("Tambah:", tambah(5, 3));
  console.log("Kali:", kali(4, 3));
  console.log("Kuadrat:", kuadrat(5));
  console.log("Salam:", salam());
  console.log("Mahasiswa:", buatMahasiswa("Andi", 20));
}


// =======================================
// LATIHAN 4: Template Literals HTML
// =======================================

{
  const nama = "Andi";
  const mataKuliah = "Pengembangan Aplikasi Web";
  const status = "Belum Selesai";

  const kartuTugas = `
    <div class="kartu-tugas">
      <h2>Informasi Tugas Kuliah</h2>
      <p>Nama: ${nama}</p>
      <p>Mata Kuliah: ${mataKuliah}</p>
      <p>Status: ${status}</p>
    </div>
  `;

  console.log("Latihan 4 - HTML String:");
  console.log(kartuTugas);
}
