// =======================================
// LATIHAN 1: Product dan Inheritance
// =======================================

{
  class Product {
    constructor(name, price) {
      this.name = name;
      this.price = price;
    }

    getInfo() {
      return `${this.name} - Rp${this.price.toLocaleString("id-ID")}`;
    }
  }

  class DigitalProduct extends Product {
    constructor(name, price, fileSize) {
      super(name, price);
      this.fileSize = fileSize;
    }

    getInfo() {
      return `${super.getInfo()} | Ukuran: ${this.fileSize} MB`;
    }
  }

  class PhysicalProduct extends Product {
    constructor(name, price, weight) {
      super(name, price);
      this.weight = weight;
    }

    getInfo() {
      return `${super.getInfo()} | Berat: ${this.weight} kg`;
    }
  }

  const ebook = new DigitalProduct(
    "E-Book JavaScript", 100000, 5
  );

  const keyboard = new PhysicalProduct(
    "Keyboard", 350000, 0.8
  );

  console.log("Latihan 1:", ebook.getInfo());
  console.log("Latihan 1:", keyboard.getInfo());

  console.log("Inheritance Digital:", ebook instanceof Product);
  console.log("Inheritance Physical:", keyboard instanceof Product);
}


// =======================================
// LATIHAN 2: Getter dan Setter
// =======================================

{
  class User {
    constructor(name, birthYear) {
      this.name = name;
      this.birthYear = birthYear;
    }

    get age() {
      return new Date().getFullYear() - this._birthYear;
    }

    set birthYear(year) {
      this._birthYear = year;
    }

    getInfo() {
      return `${this.name}, umur ${this.age} tahun`;
    }
  }

  const user = new User("John", 2005);

  console.log("Latihan 2 - Awal:", user.getInfo());

  user.birthYear = 2004;

  console.log("Latihan 2 - Setelah diubah:", user.getInfo());
}


// =======================================
// LATIHAN 3: Computed Property Names
// =======================================

{
  const prefix = "mahasiswa";
  const id = 123;
  const nama = "Andi";

  const dataMahasiswa = {
    [`${prefix}_id`]: id,
    [`${prefix}_nama`]: nama,
    [`${prefix}_jurusan`]: "Informatika"
  };

  console.log("Latihan 3 - Dynamic Keys:", dataMahasiswa);
}


// =======================================
// LATIHAN 4: Default Params + Destructuring
// =======================================

{
  const tampilkanMahasiswa = ({
    nama = "Guest",
    jurusan = "Informatika",
    semester = 1
  } = {}) => {
    return `Nama: ${nama}, Jurusan: ${jurusan}, Semester: ${semester}`;
  };

  const mahasiswa = {
    nama: "Andi",
    jurusan: "Informatika",
    semester: 3
  };

  console.log("Latihan 4 - Dengan Data:");
  console.log(tampilkanMahasiswa(mahasiswa));

  console.log("Latihan 4 - Default:");
  console.log(tampilkanMahasiswa());
}
