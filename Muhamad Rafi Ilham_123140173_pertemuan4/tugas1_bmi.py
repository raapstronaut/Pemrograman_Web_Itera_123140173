# Nama : Muhamad Rafi Ilham
# NIM  : 123140173

def konversi_tinggi(tinggi):
    """Mengubah tinggi badan dari cm atau meter menjadi meter (float)."""
    if tinggi > 3:
        return tinggi / 100
    return tinggi

def hitung_bmi(berat, tinggi):
    """Menghitung BMI dari berat (kg) dan tinggi (m), menghasilkan float."""
    return berat / (tinggi ** 2)

def tentukan_kategori(bmi):
    """Menentukan kategori berat badan dari nilai BMI (float), menghasilkan str."""
    if bmi < 18.5:
        return "Berat badan kurang"
    elif bmi < 25:
        return "Berat badan normal"
    elif bmi < 30:
        return "Berat badan berlebih"
    else:
        return "Obesitas"

def main():
    """Menerima input pengguna dan menampilkan hasil perhitungan BMI."""
    print("=" * 45)
    print("PROGRAM PENGHITUNG BMI".center(45))
    print("=" * 45)

    try:
        berat = float(input("Berat badan (kg)   : "))
        tinggi = float(input("Tinggi badan (m/cm): "))

        if berat <= 0 or tinggi <= 0:
            print("\nError: Berat dan tinggi harus lebih dari 0.")
            return

        tinggi_meter = konversi_tinggi(tinggi)
        bmi = hitung_bmi(berat, tinggi_meter)
        kategori = tentukan_kategori(bmi)

        print("\n" + "=" * 45)
        print("HASIL PERHITUNGAN".center(45))
        print("=" * 45)
        print(f"Berat badan  : {berat:.2f} kg")
        print(f"Tinggi badan : {tinggi_meter:.2f} m")
        print(f"Nilai BMI    : {bmi:.2f}")
        print(f"Kategori     : {kategori}")
        print("=" * 45)

    except ValueError:
        print("\nError: Masukkan angka yang valid.")


if __name__ == "__main__":
    main()