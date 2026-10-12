// =======================================
// LATIHAN 1: groupBy Menggunakan reduce()
// =======================================

{
  const mahasiswa = [
    { nama: "Andi", jurusan: "Informatika" },
    { nama: "Budi", jurusan: "Teknik Elektro" },
    { nama: "Citra", jurusan: "Informatika" },
    { nama: "Dina", jurusan: "Teknik Elektro" }
  ];

  const groupBy = (data, key) => {
    return data.reduce((hasil, item) => {
      const kategori = item[key];

      if (!hasil[kategori]) {
        hasil[kategori] = [];
      }

      hasil[kategori].push(item);

      return hasil;
    }, {});
  };

  const hasil = groupBy(mahasiswa, "jurusan");

  console.log("Latihan 1 - GroupBy:", hasil);
}


// =======================================
// LATIHAN 2: Rata-rata Array of Objects
// =======================================

{
  const mahasiswa = [
    { nama: "Andi", nilai: 80 },
    { nama: "Budi", nilai: 90 },
    { nama: "Citra", nilai: 85 }
  ];

  const hitungRataRata = (data) => {
    if (data.length === 0) return 0;

    const total = data.reduce(
      (sum, item) => sum + item.nilai, 0
    );

    return total / data.length;
  };

  const rataRata = hitungRataRata(mahasiswa);

  console.log("Latihan 2 - Rata-rata:", rataRata);
}


// =======================================
// LATIHAN 3: Nested Array Menjadi Flat
// =======================================

{
  const mataKuliah = [
    {
      nama: "Pengembangan Aplikasi Web",
      tugas: ["HTML", "CSS", "JavaScript"]
    },
    {
      nama: "Pemrograman",
      tugas: ["Array", "Function"]
    }
  ];

  const hasilFlat = mataKuliah.flatMap(
    ({ nama, tugas }) => {
      return tugas.map(item => ({
        mataKuliah: nama,
        tugas: item
      }));
    }
  );

  console.log("Latihan 3 - Flat Array:", hasilFlat);
}


// =======================================
// LATIHAN 4: Filter, Map, Reduce
// =======================================

{
  const products = [
    { nama: "Laptop", harga: 8000000, jumlah: 2, kategori: "tech" },
    { nama: "Keyboard", harga: 500000, jumlah: 3, kategori: "tech" },
    { nama: "Meja", harga: 1200000, jumlah: 1, kategori: "furniture" },
    { nama: "Mouse", harga: 250000, jumlah: 4, kategori: "tech" }
  ];

  // Memilih produk kategori tech
  const produkTech = products.filter(
    item => item.kategori === "tech"
  );

  // Menghitung subtotal masing-masing produk
  const subtotal = produkTech.map(
    item => ({
      nama: item.nama,
      total: item.harga * item.jumlah
    })
  );

  // Menghitung total keseluruhan
  const totalHarga = subtotal.reduce(
    (sum, item) => sum + item.total, 0
  );

  console.log("Latihan 4 - Produk Tech:", produkTech);
  console.log("Latihan 4 - Subtotal:", subtotal);
  console.log("Latihan 4 - Total Harga:", totalHarga);
}
