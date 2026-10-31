# Nama : Muhamad Rafi Ilham
# NIM  : 123140173

import math_operations
from math_operations import celsius_ke_fahrenheit, celsius_ke_kelvin


def main():
    """Menguji fungsi geometri dan konversi suhu dari modul matematika."""

    print("=" * 50)
    print("PROGRAM MODUL MATEMATIKA PYTHON".center(50))
    print("=" * 50)

    # 1. Perhitungan Persegi
    sisi = 5

    print("\n1. PERSEGI")
    print("-" * 50)
    print(f"Panjang sisi : {sisi}")
    print(f"Luas         : {math_operations.luas_persegi(sisi):.2f}")
    print(f"Keliling     : {math_operations.keliling_persegi(sisi):.2f}")

    # 2. Perhitungan Persegi Panjang
    panjang = 10
    lebar = 6

    print("\n2. PERSEGI PANJANG")
    print("-" * 50)
    print(f"Panjang      : {panjang}")
    print(f"Lebar        : {lebar}")
    print(f"Luas         : {math_operations.luas_persegi_panjang(panjang, lebar):.2f}")
    print(f"Keliling     : {math_operations.keliling_persegi_panjang(panjang, lebar):.2f}")

    # 3. Perhitungan Lingkaran
    jari_jari = 7

    print("\n3. LINGKARAN")
    print("-" * 50)
    print(f"Jari-jari    : {jari_jari}")
    print(f"Luas         : {math_operations.luas_lingkaran(jari_jari):.2f}")
    print(f"Keliling     : {math_operations.keliling_lingkaran(jari_jari):.2f}")

    # 4. Konversi Suhu
    suhu_celsius = 30

    print("\n4. KONVERSI SUHU")
    print("-" * 50)
    print(f"Celsius      : {suhu_celsius:.2f} °C")
    print(f"Fahrenheit   : {celsius_ke_fahrenheit(suhu_celsius):.2f} °F")
    print(f"Kelvin       : {celsius_ke_kelvin(suhu_celsius):.2f} K")

    print("=" * 50)


if __name__ == "__main__":
    main()
