// =======================================
// LATIHAN 1: Nested Destructuring 3 Level
// =======================================

{
  const mahasiswa = {
    nama: "Andi",
    akademik: {
      semester: 3,
      kampus: {
        nama: "ITERA",
        lokasi: {
          kota: "Lampung Selatan",
          provinsi: "Lampung"
        }
      }
    }
  };

  const {
    akademik: {
      kampus: {
        lokasi: { kota, provinsi }
      }
    }
  } = mahasiswa;

  console.log("Latihan 1 - Kota:", kota);
  console.log("Latihan 1 - Provinsi:", provinsi);
}


// =======================================
// LATIHAN 2: Statistik Rest Parameters
// =======================================

{
  const hitungStatistik = (...numbers) => {
    const min = Math.min(...numbers);
    const max = Math.max(...numbers);

    const total = numbers.reduce(
      (sum, num) => sum + num, 0
    );

    const average = total / numbers.length;

    return { min, max, average };
  };

  const hasil = hitungStatistik(10, 20, 30, 40, 50);

  console.log("Latihan 2 - Statistik:", hasil);
}


// =======================================
// LATIHAN 3: Merge 3 Objects
// =======================================

{
  const dataPribadi = {
    nama: "Andi",
    usia: 20,
    status: "mahasiswa"
  };

  const dataAkademik = {
    kampus: "ITERA",
    jurusan: "Informatika",
    status: "aktif"
  };

  const dataTerbaru = {
    usia: 21,
    status: "lulus",
    tahunLulus: 2026
  };

  const hasilGabungan = {
    ...dataPribadi,
    ...dataAkademik,
    ...dataTerbaru
  };

  console.log("Latihan 3 - Merge Objects:", hasilGabungan);
}


// =======================================
// LATIHAN 4: Destructuring dalam for...of
// =======================================

{
  const mahasiswa = [
    { nama: "Andi", jurusan: "Informatika", ipk: 3.8 },
    { nama: "Budi", jurusan: "Teknik Elektro", ipk: 3.6 },
    { nama: "Citra", jurusan: "Teknik Sipil", ipk: 3.9 }
  ];

  console.log("Latihan 4 - Data Mahasiswa:");

  for (const { nama, jurusan, ipk } of mahasiswa) {
    console.log(
      `Nama: ${nama}, Jurusan: ${jurusan}, IPK: ${ipk}`
    );
  }
}
