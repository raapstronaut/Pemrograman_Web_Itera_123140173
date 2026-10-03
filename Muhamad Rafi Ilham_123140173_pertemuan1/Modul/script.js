// LATIHAN 1 - BIODATA SENDIRI
const namaKalian = ' Muhamad Rafi Ilham';
const prodi = 'Teknik Informatika';
const angkatan = 2023;

const biodataOutput = document.getElementById('biodata-output');

biodataOutput.innerHTML = `
<p>Nama:<strong>${namaKalian}</strong></p>
<p>Program Studi: ${prodi}</p>
<p>Angkatan: ${angkatan}</p>
`;

// LATIHAN 2 - CEK TAHUN KABISAT
function cekKabisat(tahun) {
    if ((tahun % 4 === 0 && tahun % 100 !== 0) || (tahun % 400 === 0)) {
        return true;
    } else {
        return false;
    }
}

const tahunInput = document.getElementById('tahun');
const btnKabisat = document.getElementById('btn-kabisat');
const kabisatOutput = document.getElementById('kabisat-output');

btnKabisat.addEventListener('click', function() {
    const tahun = Number(tahunInput.value);
    if (tahunInput.value === '') {
        kabisatOutput.innerHTML = "<p>Silakan masukkan tahun terlebih dahulu.</p>";
            return;
        }
        const hasil = cekKabisat(tahun);
        if (hasil === true) {
            kabisatOutput.innerHTML = `<p>Tahun <strong>${tahun}</strong> merupakan tahun kabisat.</p>`;
        } else {
            kabisatOutput.innerHTML = `<p>Tahun <strong>${tahun}</strong> bukan tahun kabisat.</p>`;
        }
    }
);

// LATIHAN 3 - TABEL PERKALIAN 1-5
const perkalianOutput =document.getElementById("perkalian-output");
let tabelPerkalian = `
    <table>
        <thead>
            <tr><th>Perkalian</th><th>Hasil</th></tr>
        </thead>
        <tbody>
`;

for (let i = 1; i <= 5; i++) {
    for (let j = 1; j <= 5; j++) {
        const hasil = i * j;
        tabelPerkalian += `
            <tr>
                <td>${i} × ${j}</td>
                <td>${hasil}</td>
            </tr>
        `;
    }
}
tabelPerkalian += `</tbody></table>`;
perkalianOutput.innerHTML = tabelPerkalian;

// LATIHAN 4 - NILAI TERTINGGI DAN TERENDAH
const nilaiSiswa = [85, 92, 78, 90, 88];
const nilaiTertinggi = Math.max(...nilaiSiswa);
const nilaiTerendah = Math.min(...nilaiSiswa);
const nilaiOutput = document.getElementById("nilai-output");

nilaiOutput.innerHTML = `
    <p>Data Nilai:<strong>${nilaiSiswa.join(", ")}</strong></p>
    <p>Nilai Tertinggi:<strong>${nilaiTertinggi}</strong></p>
    <p>Nilai Terendah:<strong>${nilaiTerendah}</strong></p>
`;

// LATIHAN 5 - AMBIL DATA USER
const btnUser = document.getElementById("btn-user");
const userOutput = document.getElementById("user-output");

btnUser.addEventListener("click",async function() {
        userOutput.innerHTML ="<p>Sedang mengambil data...</p>";

        try {
            const response = await fetch("https://jsonplaceholder.typicode.com/users");
            const data = await response.json();
            userOutput.innerHTML = "<h3>3 User Pertama</h3>";

            data.slice(0, 3).forEach(
                function(user) {
                    userOutput.innerHTML += `
                        <div>
                            <p>Nama:<strong>${user.name}</strong></p>
                            <p>Email:<strong>${user.email}</strong></p>
                            <hr>
                        </div>`;
                }
            );
        }

        catch (error) {
            userOutput.innerHTML = `
                <p>Gagal mengambil data:${error.message}</p>`;
        }
    }
);