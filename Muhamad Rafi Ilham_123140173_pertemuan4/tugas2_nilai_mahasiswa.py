# Nama : Muhamad Rafi Ilham
# NIM  : 123140173

def hitung_nilai_akhir(uts, uas, tugas):
    """Menghitung nilai akhir (float) dari nilai UTS, UAS, dan tugas."""
    return (0.30 * uts) + (0.40 * uas) + (0.30 * tugas)


def tentukan_grade(nilai):
    """Menentukan grade A-E (str) berdasarkan nilai akhir."""
    if nilai >= 80:
        return "A"
    elif nilai >= 70:
        return "B"
    elif nilai >= 60:
        return "C"
    elif nilai >= 50:
        return "D"
    else:
        return "E"


def main():
    """Mengolah data mahasiswa dan menampilkan hasil penilaian."""
    mahasiswa = [
        {"nama": "Rapi", "nim": "123140173", "nilai_uts": 85, "nilai_uas": 90, "nilai_tugas": 88},
        {"nama": "Andi", "nim": "123140101", "nilai_uts": 75, "nilai_uas": 78, "nilai_tugas": 80},
        {"nama": "Siti", "nim": "123140102", "nilai_uts": 65, "nilai_uas": 68, "nilai_tugas": 70},
        {"nama": "Budi", "nim": "123140103", "nilai_uts": 55, "nilai_uas": 52, "nilai_tugas": 58},
        {"nama": "Dina", "nim": "123140104", "nilai_uts": 40, "nilai_uas": 45, "nilai_tugas": 48},
    ]

    print("=" * 65)
    print("PROGRAM PENGELOLAAN NILAI MAHASISWA".center(65))
    print("=" * 65)

    print(f"{'No':<5}{'Nama':<15}{'NIM':<15}{'Nilai Akhir':<17}{'Grade':<8}")
    print("-" * 65)

    for nomor, data in enumerate(mahasiswa, start=1):
        nilai = hitung_nilai_akhir(
            data["nilai_uts"],
            data["nilai_uas"],
            data["nilai_tugas"]
        )

        data["nilai_akhir"] = nilai
        data["grade"] = tentukan_grade(nilai)

        print(
            f"{nomor:<5}"
            f"{data['nama']:<15}"
            f"{data['nim']:<15}"
            f"{nilai:<17.2f}"
            f"{data['grade']:<8}"
        )

    tertinggi = max(mahasiswa, key=lambda m: m["nilai_akhir"])
    terendah = min(mahasiswa, key=lambda m: m["nilai_akhir"])

    print("=" * 65)
    print("\nHASIL ANALISIS NILAI")
    print("-" * 65)
    print(f"Nilai tertinggi : {tertinggi['nama']} ({tertinggi['nim']})")
    print(f"Nilai akhir     : {tertinggi['nilai_akhir']:.2f} | Grade {tertinggi['grade']}")

    print()
    print(f"Nilai terendah  : {terendah['nama']} ({terendah['nim']})")
    print(f"Nilai akhir     : {terendah['nilai_akhir']:.2f} | Grade {terendah['grade']}")
    print("=" * 65)


if __name__ == "__main__":
    main()
