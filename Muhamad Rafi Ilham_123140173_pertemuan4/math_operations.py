# Nama : Muhamad Rafi Ilham
# NIM  : 123140173

PI = 3.14159

# Perhitungan Persegi
def luas_persegi(sisi):
    """Menghitung luas persegi dari panjang sisi, menghasilkan float."""
    return sisi ** 2


def keliling_persegi(sisi):
    """Menghitung keliling persegi dari panjang sisi, menghasilkan float."""
    return 4 * sisi


# Perhitungan Persegi Panjang
def luas_persegi_panjang(panjang, lebar):
    """Menghitung luas persegi panjang, menghasilkan float."""
    return panjang * lebar


def keliling_persegi_panjang(panjang, lebar):
    """Menghitung keliling persegi panjang, menghasilkan float."""
    return 2 * (panjang + lebar)


# Perhitungan Lingkaran
def luas_lingkaran(jari_jari):
    """Menghitung luas lingkaran dari jari-jari, menghasilkan float."""
    return PI * jari_jari ** 2


def keliling_lingkaran(jari_jari):
    """Menghitung keliling lingkaran dari jari-jari, menghasilkan float."""
    return 2 * PI * jari_jari


# Konversi Suhu
def celsius_ke_fahrenheit(celsius):
    """Mengonversi suhu Celsius ke Fahrenheit, menghasilkan float."""
    return (celsius * 9 / 5) + 32


def celsius_ke_kelvin(celsius):
    """Mengonversi suhu Celsius ke Kelvin, menghasilkan float."""
    return celsius + 273.15
