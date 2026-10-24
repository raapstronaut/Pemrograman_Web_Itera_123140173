import { Link } from 'react-router-dom';

function NotFound() {
  return (
    <main className="not-found">
      <h1>404</h1>
      <h2>Halaman Tidak Ditemukan</h2>
      <p>
        Halaman yang Anda cari tidak tersedia.
      </p>

      <Link to="/" className="back-home">
        Kembali ke Beranda
      </Link>
    </main>
  );
}

export default NotFound;