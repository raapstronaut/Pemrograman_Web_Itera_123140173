import { useBooks } from '../../context/BookContext';
import useBookStats from '../../hooks/useBookStats';
import astronaut from '../../assets/astronaut.svg';

function Stats() {
  const { books } = useBooks();
  const stats = useBookStats(books);

  const statusData = [
    {
      label: 'Milik',
      count: stats.milik,
      percent: stats.milikPercent,
      className: 'milik',
    },
    {
      label: 'Sedang Dibaca',
      count: stats.baca,
      percent: stats.bacaPercent,
      className: 'baca',
    },
    {
      label: 'Ingin Dibeli',
      count: stats.beli,
      percent: stats.beliPercent,
      className: 'beli',
    },
  ];

  return (
    <div className="stats-page">

      {/* HEADER */}
      <header className="app-header">
        <div className="hero-inner">

          <div className="hero-content">
            <span className="hero-label">
              BOOK COLLECTION OVERVIEW
            </span>

            <h1>
              Statistik
              <span> Koleksi Buku.</span>
            </h1>

            <p>
              Pantau jumlah buku dan lihat distribusi
              koleksi berdasarkan statusnya.
            </p>

            <div className="hero-info">
              <span className="hero-indicator" />
              Ringkasan koleksi pribadi
            </div>
          </div>

          <div className="hero-illustration">
            <img
              src={astronaut}
              alt="Ilustrasi astronaut dan planet"
            />
          </div>

        </div>
      </header>

      {/* KARTU STATISTIK */}
      <main className="stats-container">

        <div className="stats-cards">

          <div className="stats-card">
            <p>Total Buku</p>
            <strong>{stats.total}</strong>
          </div>

          {statusData.map((item) => (
            <div
              className="stats-card"
              key={item.className}
            >
              <p>{item.label}</p>
              <strong>{item.count}</strong>
            </div>
          ))}

        </div>

        {/* DISTRIBUSI STATUS */}
        <section className="stats-panel">

          <h2>Distribusi Status Buku</h2>

          {stats.total === 0 ? (
            <p className="stats-empty">
              Belum ada buku. Tambahkan buku melalui
              halaman Beranda.
            </p>
          ) : (
            <div className="stats-progress-list">

              {statusData.map((item) => (
                <div
                  className="stats-progress-item"
                  key={item.className}
                >

                  <div className="stats-progress-label">
                    <span>{item.label}</span>

                    <span>
                      {item.count} buku ({item.percent}%)
                    </span>
                  </div>

                  <div
                    className="stats-progress-track"
                    role="progressbar"
                    aria-label={`Persentase ${item.label}`}
                    aria-valuenow={item.percent}
                    aria-valuemin={0}
                    aria-valuemax={100}
                  >
                    <div
                      className={`stats-progress-fill ${item.className}`}
                      style={{
                        width: `${item.percent}%`,
                      }}
                    />
                  </div>

                </div>
              ))}

            </div>
          )}

        </section>

      </main>
    </div>
  );
}

export default Stats;