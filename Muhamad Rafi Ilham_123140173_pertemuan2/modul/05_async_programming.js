// =======================================
// LATIHAN ASYNC PROGRAMMING
// =======================================

const API = "https://jsonplaceholder.typicode.com";

// Fungsi pembantu mengambil data API
const ambilJSON = async (url) => {
  const response = await fetch(url);

  if (!response.ok) {
    throw new Error(`HTTP Error: ${response.status}`);
  }

  return await response.json();
};

// Penanganan error terpusat
const jalankanAman = async (element, proses) => {
  try {
    return await proses();
  } catch (error) {
    element.textContent = `Error ditangani: ${error.message}`;
    return null;
  }
};


// =======================================
// LATIHAN 1: Fetch Beberapa Endpoint
// =======================================

async function latihanGabungAPI() {
  const output = document.getElementById("hasilGabung");
  output.textContent = "Memuat data...";

  await jalankanAman(output, async () => {
    const [user, todos] = await Promise.all([
      ambilJSON(`${API}/users/1`),
      ambilJSON(`${API}/todos?userId=1&_limit=3`)
    ]);

    const hasil = {
      nama: user.name,
      email: user.email,
      daftarTugas: todos.map(todo => todo.title)
    };

    output.textContent = JSON.stringify(hasil, null, 2);
    console.log("Latihan Async 1:", hasil);
  });
}


// =======================================
// LATIHAN 2: Retry Exponential Backoff
// =======================================

const tunggu = (ms) => {
  return new Promise(resolve => setTimeout(resolve, ms));
};

async function retryWithBackoff(
  proses,
  maxPercobaan = 3,
  jedaAwal = 300
) {
  for (let i = 1; i <= maxPercobaan; i++) {
    try {
      return await proses();
    } catch (error) {
      if (i === maxPercobaan) {
        throw error;
      }

      await tunggu(jedaAwal * 2 ** (i - 1));
    }
  }
}

async function latihanRetry() {
  const output = document.getElementById("hasilRetry");

  let percobaan = 0;
  output.textContent = "Memulai retry...";

  await jalankanAman(output, async () => {
    const hasil = await retryWithBackoff(async () => {
      percobaan++;

      output.textContent = `Percobaan ke-${percobaan}`;

      // Simulasi dua kegagalan pertama
      if (percobaan < 3) {
        throw new Error("Request simulasi gagal");
      }

      return "Request berhasil!";
    });

    output.textContent =
      `${hasil} Total percobaan: ${percobaan}`;

    console.log("Latihan Async 2:", hasil);
  });
}


// =======================================
// LATIHAN 3: Loading States
// =======================================

async function latihanLoading() {
  const output = document.getElementById("hasilLoading");

  output.textContent = "Loading...";

  await jalankanAman(output, async () => {
    const post = await ambilJSON(`${API}/posts/1`);

    output.textContent = `Selesai! Judul: ${post.title}`;

    console.log("Latihan Async 3:", post.title);
  });
}


// =======================================
// LATIHAN 4: Async Error Boundary
// =======================================

async function latihanErrorBoundary() {
  const output = document.getElementById("hasilError");

  output.textContent = "Menjalankan operasi...";

  // Simulasi Promise yang gagal
  await jalankanAman(output, async () => {
    await Promise.reject(
      new Error("Operasi async sengaja digagalkan")
    );
  });

  console.log("Latihan Async 4: Error berhasil ditangani");
}


// Tombol menjalankan latihan 1 sampai 4
document.getElementById("runAsyncBtn").addEventListener(
  "click",
  () => {
    Promise.all([
      latihanGabungAPI(),
      latihanRetry(),
      latihanLoading(),
      latihanErrorBoundary()
    ]);
  }
);


// =======================================
// LATIHAN 5: Pagination dengan Async/Await
// =======================================

let halaman = 1;
const batas = 5;

const todoList = document.getElementById("todoList");
const pageInfo = document.getElementById("pageInfo");
const pageStatus = document.getElementById("pageStatus");
const prevBtn = document.getElementById("prevBtn");
const nextBtn = document.getElementById("nextBtn");

let sedangMemuat = false;

async function tampilkanHalaman() {
  if (sedangMemuat) return;

  sedangMemuat = true;
  prevBtn.disabled = true;
  nextBtn.disabled = true;

  pageStatus.textContent = "Memuat halaman...";
  todoList.replaceChildren();

  try {
    const todos = await ambilJSON(
      `${API}/todos?_page=${halaman}&_limit=${batas}`
    );

    todos.forEach(todo => {
      const li = document.createElement("li");

      li.textContent =
        `${todo.completed ? "Selesai" : "Belum"} - ${todo.title}`;

      todoList.appendChild(li);
    });

    pageInfo.textContent = `Halaman ${halaman}`;
    pageStatus.textContent = "Data berhasil dimuat.";

    prevBtn.disabled = halaman === 1;
    nextBtn.disabled = todos.length < batas;

    console.log("Latihan Async 5:", todos);

  } catch (error) {
    pageStatus.textContent = `Error: ${error.message}`;
    prevBtn.disabled = halaman === 1;
  } finally {
    sedangMemuat = false;
  }
}

prevBtn.addEventListener("click", () => {
  if (!sedangMemuat && halaman > 1) {
    halaman--;
    tampilkanHalaman();
  }
});

nextBtn.addEventListener("click", () => {
  if (!sedangMemuat) {
    halaman++;
    tampilkanHalaman();
  }
});

// Menampilkan halaman pertama
tampilkanHalaman();


// =======================================
// LATIHAN 6: Debounced Search Async API
// =======================================

const searchInput = document.getElementById("searchInput");
const searchStatus = document.getElementById("searchStatus");
const userList = document.getElementById("userList");

let debounceTimer;
let pencarianTerbaru = 0;

searchInput.addEventListener("input", () => {
  clearTimeout(debounceTimer);

  const keyword = searchInput.value.trim();
  const nomorPencarian = ++pencarianTerbaru;

  userList.replaceChildren();

  if (keyword === "") {
    searchStatus.textContent = "Ketik nama pengguna.";
    return;
  }

  searchStatus.textContent = "Menunggu input selesai...";

  debounceTimer = setTimeout(async () => {
    searchStatus.textContent = "Mencari data...";

    try {
      const users = await ambilJSON(
        `${API}/users?name_like=${encodeURIComponent(keyword)}`
      );

      // Abaikan respons pencarian lama
      if (nomorPencarian !== pencarianTerbaru) return;

      userList.replaceChildren();

      if (users.length === 0) {
        searchStatus.textContent = "Pengguna tidak ditemukan.";
        return;
      }

      users.forEach(user => {
        const li = document.createElement("li");
        li.textContent = `${user.name} - ${user.email}`;
        userList.appendChild(li);
      });

      searchStatus.textContent =
        `Ditemukan ${users.length} pengguna.`;

      console.log("Latihan Async 6:", users);

    } catch (error) {
      if (nomorPencarian === pencarianTerbaru) {
        searchStatus.textContent = `Error: ${error.message}`;
      }
    }
  }, 500);
});
