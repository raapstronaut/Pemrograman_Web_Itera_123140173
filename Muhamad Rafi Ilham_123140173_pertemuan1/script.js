const formBarang = document.getElementById("form-barang");
const namaBarangInput = document.getElementById("nama-barang");
const hargaInput = document.getElementById("harga");
const qtyInput = document.getElementById("qty");

const errorNama = document.getElementById("error-nama");
const errorHarga = document.getElementById("error-harga");
const errorQty = document.getElementById("error-qty");

const keranjangBody = document.getElementById("keranjang-body");
const totalBelanjaEl = document.getElementById("total-belanja");
const diskonEl = document.getElementById("diskon");
const totalAkhirEl = document.getElementById("total-akhir");

const uangBayarInput = document.getElementById("uang-bayar");
const pesanBayar = document.getElementById("pesan-bayar");
const kembalianEl = document.getElementById("kembalian");
const btnReset = document.getElementById("btn-reset");

function formatRupiah(angka) {
    return "Rp" + angka.toLocaleString("id-ID");
}

let keranjang = JSON.parse(localStorage.getItem("keranjang")) || [];

function simpanKeranjang() {
    localStorage.setItem("keranjang", JSON.stringify(keranjang));
}

function validasiForm() {
    let valid = true;

    errorNama.textContent = "";
    errorHarga.textContent = "";
    errorQty.textContent = "";

    const nama = namaBarangInput.value.trim();
    const harga = Number(hargaInput.value);
    const qty = Number(qtyInput.value);

    if (nama.length < 3) {
        errorNama.textContent = "Nama barang minimal 3 karakter.";
        valid = false;
    }

    if (hargaInput.value === "" || harga < 500) {
        errorHarga.textContent = "Harga minimal Rp500.";
        valid = false;
    }

    if (qtyInput.value === "" || qty < 1 || !Number.isInteger(qty)) {
        errorQty.textContent = "Qty harus angka bulat minimal 1.";
        valid = false;
    }

    return valid;
}

formBarang.addEventListener("submit", function(event) {
    event.preventDefault();

    if (!validasiForm()) {
        return;
    }

    const barangBaru = {
        nama: namaBarangInput.value.trim(),
        harga: Number(hargaInput.value),
        qty: Number(qtyInput.value)
    };

    keranjang.push(barangBaru);
    simpanKeranjang();
    tampilkanKeranjang();
    formBarang.reset();
});

function tampilkanKeranjang() {
    keranjangBody.innerHTML = "";

    keranjang.forEach(function(item, index) {
        const subtotal = item.harga * item.qty;

        keranjangBody.innerHTML += `
            <tr>
                <td>${index + 1}</td>
                <td>${item.nama}</td>
                <td>${formatRupiah(item.harga)}</td>
                <td>${item.qty}</td>
                <td>${formatRupiah(subtotal)}</td>
                <td><button onclick="hapusItem(${index})">Hapus</button></td>
            </tr>
        `;
    });

    const hasil = hitungTotal();

    totalBelanjaEl.textContent = formatRupiah(hasil.totalBelanja);
    diskonEl.textContent = formatRupiah(hasil.diskon);
    totalAkhirEl.textContent = formatRupiah(hasil.totalAkhir);

    hitungKembalian();
}

function hapusItem(index) {
    keranjang.splice(index, 1);
    simpanKeranjang();
    tampilkanKeranjang();
}

function hitungTotal() {
    let totalBelanja = 0;

    for (let item of keranjang) {
        totalBelanja += item.harga * item.qty;
    }

    let diskon = 0;

    if (totalBelanja >= 50000) {
        diskon = totalBelanja * 0.10;
    }

    const totalAkhir = totalBelanja - diskon;

    return {
        totalBelanja,
        diskon,
        totalAkhir
    };
}

function hitungKembalian() {
    const hasil = hitungTotal();

    pesanBayar.textContent = "";

    if (uangBayarInput.value === "") {
        kembalianEl.textContent = "Rp0";
        return;
    }

    const uangBayar = Number(uangBayarInput.value);

    if (uangBayar < hasil.totalAkhir) {
        pesanBayar.textContent = "Uang belum mencukupi.";
        kembalianEl.textContent = "Rp0";
        return;
    }

    const kembalian = uangBayar - hasil.totalAkhir;
    kembalianEl.textContent = formatRupiah(kembalian);
}

uangBayarInput.addEventListener("input", hitungKembalian);

btnReset.addEventListener("click", function() {
    keranjang = [];
    localStorage.removeItem("keranjang");

    formBarang.reset();
    uangBayarInput.value = "";

    errorNama.textContent = "";
    errorHarga.textContent = "";
    errorQty.textContent = "";
    pesanBayar.textContent = "";
    kembalianEl.textContent = "Rp0";

    tampilkanKeranjang();
});

tampilkanKeranjang();