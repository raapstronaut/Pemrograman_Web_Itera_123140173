
"use strict";

// ========================================
// 1. KONFIGURASI DAN HELPER
// ========================================

const STORAGE_KEY = "paw_dashboard_tasks";
const QUOTE_API = "https://dummyjson.com/quotes/random";

// Mencegah input dianggap sebagai kode HTML
const escapeHtml = (value) =>
  String(value).replace(/[&<>"']/g, (char) => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#39;"
  })[char]);

// Mengubah tanggal menjadi format Indonesia
const formatTanggal = (tanggal) =>
  new Date(`${tanggal}T00:00:00`).toLocaleDateString(
    "id-ID",
    {
      day: "numeric",
      month: "long",
      year: "numeric"
    }
  );

// Menghitung sisa hari menuju deadline
const hitungSelisihHari = (tanggal) => {
  const sekarang = new Date();

  sekarang.setHours(0, 0, 0, 0);

  return Math.round(
    (new Date(`${tanggal}T00:00:00`) - sekarang) / 86400000
  );
};


// ========================================
// 2. CLASS TASK ITEM
// ========================================

class TaskItem {
  constructor({ id, name, course, deadline, done = false }) {
    this.id = id || `${Date.now()}-${Math.random().toString(36).slice(2)}`;
    this.name = name.trim();
    this.course = course.trim();
    this.deadline = deadline;
    this.done = done;
  }
}


// ========================================
// 3. CLASS DASHBOARD APP
// ========================================

class DashboardApp {
  constructor() {

    // Mengambil elemen HTML
    this.taskForm = document.getElementById("taskForm");
    this.taskId = document.getElementById("taskId");
    this.taskName = document.getElementById("taskName");
    this.taskCourse = document.getElementById("taskCourse");
    this.taskDeadline = document.getElementById("taskDeadline");
    this.taskList = document.getElementById("taskList");

    this.submitBtn = document.getElementById("submitBtn");
    this.cancelBtn = document.getElementById("cancelBtn");
    this.formTitle = document.getElementById("form-title");

    this.quoteText = document.getElementById("quoteText");
    this.quoteAuthor = document.getElementById("quoteAuthor");
    this.refreshQuote = document.getElementById("refreshQuote");

    // Filter awal
    this.filter = "all";

    // Ambil data tugas dari localStorage
    this.tasks = this.loadTasks();

    // Jalankan fitur dashboard
    this.setupEvents();
    this.renderTasks();
    this.loadQuote();
  }


  // ======================================
  // 4. LOCAL STORAGE
  // ======================================

  loadTasks() {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);

      const data = saved ? JSON.parse(saved) : [];

      if (!Array.isArray(data)) {
        return [];
      }

      // Mendukung data dashboard versi sebelumnya
      return data
        .filter((item) =>
          item && item.name && item.course && item.deadline
        )
        .map((item) =>
          new TaskItem({
            ...item,
            id: String(item.id || ""),
            done: item.done === true
          })
        );

    } catch (error) {
      console.error("Gagal membaca localStorage:", error);
      return [];
    }
  }

  saveTasks() {
    try {
      localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify(this.tasks)
      );
    } catch (error) {
      console.error("Gagal menyimpan data:", error);
      alert("Data gagal disimpan di browser.");
    }
  }


  // ======================================
  // 5. EVENT LISTENER
  // ======================================

  setupEvents() {

    // Ketika form disubmit
    this.taskForm.addEventListener("submit", (event) => {
      event.preventDefault();
      this.handleSubmit();
    });

    // Tombol batal edit
    this.cancelBtn.addEventListener("click", () => {
      this.resetForm();
    });

    // Tombol mengambil kutipan baru
    this.refreshQuote.addEventListener("click", () => {
      this.loadQuote();
    });

    // Tombol pada setiap kartu tugas
    this.taskList.addEventListener("click", (event) => {
      const button = event.target.closest(
        "button[data-action]"
      );

      if (!button) return;

      const { action, id } = button.dataset;

      if (action === "edit") {
        this.editTask(id);
      }

      if (action === "delete") {
        this.deleteTask(id);
      }

      if (action === "toggle") {
        this.toggleTask(id);
      }
    });

    // Tombol filter tugas
    document.querySelectorAll("[data-filter]").forEach(
      (button) => {

        button.addEventListener("click", () => {
          this.filter = button.dataset.filter;

          document.querySelectorAll("[data-filter]").forEach(
            (item) => {
              const aktif =
                item.dataset.filter === this.filter;

              item.classList.toggle("active", aktif);

              item.setAttribute(
                "aria-pressed",
                String(aktif)
              );
            }
          );

          this.renderTasks();
        });

      }
    );
  }


  // ======================================
  // 6. TAMBAH / SIMPAN EDIT TUGAS
  // ======================================

  handleSubmit() {

    const name = this.taskName.value.trim();
    const course = this.taskCourse.value.trim();
    const deadline = this.taskDeadline.value;

    if (!name || !course || !deadline) {
      alert("Mata kuliah, tugas, dan deadline wajib diisi.");
      return;
    }

    const perubahan = {
      name,
      course,
      deadline
    };

    const editedId = this.taskId.value;

    if (editedId) {

      // EDIT: menggunakan map dan spread operator
      this.tasks = this.tasks.map((task) =>
        task.id === editedId
          ? new TaskItem({ ...task, ...perubahan })
          : task
      );

    } else {

      // TAMBAH: menggunakan class TaskItem
      const tugasBaru = new TaskItem(perubahan);

      this.tasks = [...this.tasks, tugasBaru];
    }

    this.saveTasks();
    this.resetForm();
    this.renderTasks();
  }


  // ======================================
  // 7. EDIT TUGAS
  // ======================================

  editTask(id) {

    const task = this.tasks.find(
      (item) => item.id === id
    );

    if (!task) return;

    // Masukkan data lama ke form
    this.taskId.value = task.id;
    this.taskCourse.value = task.course;
    this.taskName.value = task.name;
    this.taskDeadline.value = task.deadline;

    this.formTitle.textContent = "Edit tugas";
    this.submitBtn.textContent = "Simpan perubahan";
    this.cancelBtn.hidden = false;

    this.taskCourse.focus();

    document.querySelector(".form-panel").scrollIntoView({
      behavior: "smooth",
      block: "start"
    });
  }


  // ======================================
  // 8. HAPUS TUGAS
  // ======================================

  deleteTask(id) {

    const yakin = confirm(
      "Yakin ingin menghapus tugas ini?"
    );

    if (!yakin) return;

    this.tasks = this.tasks.filter(
      (task) => task.id !== id
    );

    this.saveTasks();

    if (this.taskId.value === id) {
      this.resetForm();
    }

    this.renderTasks();
  }


  // ======================================
  // 9. TANDAI TUGAS SELESAI
  // ======================================

  toggleTask(id) {

    this.tasks = this.tasks.map((task) =>
      task.id === id
        ? new TaskItem({
            ...task,
            done: !task.done
          })
        : task
    );

    this.saveTasks();
    this.renderTasks();
  }


  // ======================================
  // 10. RESET FORM
  // ======================================

  resetForm() {

    this.taskForm.reset();
    this.taskId.value = "";

    this.formTitle.textContent = "Tambah tugas";
    this.submitBtn.textContent = "+ Simpan tugas";
    this.cancelBtn.hidden = true;
  }


  // ======================================
  // 11. MENAMPILKAN DAFTAR TUGAS
  // ======================================

  renderTasks() {

    // Hitung statistik
    const total = this.tasks.length;

    const selesai = this.tasks.filter(
      (task) => task.done
    ).length;
    const belum = total - selesai;


    // Perbarui angka statistik
    document.getElementById("totalTasks").textContent =
      total;

    document.getElementById("pendingTasks").textContent =
      belum;

    document.getElementById("doneTasks").textContent =
      selesai;

    document.getElementById("taskCount").textContent =
      `${total} tugas`;

    // Filter daftar tugas
    const daftar = this.tasks.filter((task) => {

      if (this.filter === "done") {
        return task.done;
      }

      if (this.filter === "pending") {
        return !task.done;
      }

      return true;
    });

    // Kalau daftar kosong
    if (daftar.length === 0) {

      const pesan = total === 0
        ? "Tambah tugas pertamamu lewat formulir di samping."
        : "Tidak ada tugas pada filter ini.";

      this.taskList.innerHTML = `
        <div class="empty-state">

          <span aria-hidden="true">✦</span>

          <h3>
            ${total === 0
              ? "Belum ada tugas"
              : "Daftar masih kosong"}
          </h3>

          <p>${pesan}</p>

        </div>
      `;

      return;
    }

    // Membuat kartu tugas dengan map dan template literal
    this.taskList.innerHTML = daftar.map(
      ({ id, name, course, deadline, done }) => {

        const jarak = hitungSelisihHari(deadline);

        let label = "Sudah Dikerjakan";
        if (!done) {
            if (jarak < 0) {
                label = `Terlambat ${Math.abs(jarak)} hari`;
            }else if (jarak === 0) {
                label = "Deadline hari ini";
            }else {
                label = `${jarak} hari lagi`;
            }
        }
        const warna = done
          ? "deadline-safe"
          : jarak < 0
            ? "deadline-warning"
            : jarak <= 3
              ? "deadline-soon"
              : "";

        return `
          <article class="task-card ${done ? "completed" : ""}">

            <div class="task-card-top">

              <span class="course-tag">
                ${escapeHtml(course)}
              </span>

              <span class="status-tag ${done ? "is-done" : ""}">
                ${done ? "Selesai" : "Belum selesai"}
              </span>

            </div>

            <h3>${escapeHtml(name)}</h3>

            <div class="deadline">

              <span>
                ◷ ${escapeHtml(formatTanggal(deadline))}
              </span>

              <span class="${warna}">
                ${label}
              </span>

            </div>

            <div class="task-actions">

              <button
                type="button"
                class="action-btn complete-btn"
                data-action="toggle"
                data-id="${escapeHtml(id)}"
              >
                ${done
                  ? "↶ Batalkan selesai"
                  : "✓ Tandai selesai"}
              </button>

              <button
                type="button"
                class="action-btn"
                data-action="edit"
                data-id="${escapeHtml(id)}"
              >
                Edit
              </button>

              <button
                type="button"
                class="action-btn delete-btn"
                data-action="delete"
                data-id="${escapeHtml(id)}"
              >
                Hapus
              </button>

            </div>

          </article>
        `;

      }
    ).join("");
  }


  // ======================================
  // 12. ASYNC / AWAIT - FETCH API
  // ======================================

  async loadQuote() {

    this.quoteText.textContent = "Memuat kutipan...";
    this.quoteAuthor.textContent = "";
    this.refreshQuote.disabled = true;

    try {

      const response = await fetch(QUOTE_API);

      if (!response.ok) {
        throw new Error("API tidak dapat diakses");
      }

      const { quote, author } = await response.json();

      this.quoteText.textContent = `“${quote}”`;
      this.quoteAuthor.textContent = `— ${author}`;

    } catch (error) {

      console.error(
        "Gagal mengambil kutipan:",
        error
      );

      this.quoteText.textContent =
        "Kutipan belum dapat dimuat. Coba lagi saat terhubung internet.";

    } finally {

      this.refreshQuote.disabled = false;
    }
  }
}


// ========================================
// 13. MENJALANKAN APLIKASI
// ========================================

const dashboard = new DashboardApp();