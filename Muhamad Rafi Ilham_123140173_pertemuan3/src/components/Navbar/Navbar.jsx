import { NavLink } from 'react-router-dom';

function Navbar() {
  return (
    <nav className="navbar" aria-label="Navigasi utama">
      <div className="navbar-content">

        <NavLink to="/" className="brand-link">
          <span className="brand-logo">R.</span>

          <span className="brand-text">
            <strong>Rapstory</strong>
            <small>Manajemen Buku Pribadi</small>
          </span>
        </NavLink>

        <div className="navbar-links">
          <NavLink
            to="/"
            end
            className={({ isActive }) =>
              isActive
                ? 'nav-link active'
                : 'nav-link'
            }
          >
            Beranda
          </NavLink>

          <NavLink
            to="/stats"
            className={({ isActive }) =>
              isActive
                ? 'nav-link active'
                : 'nav-link'
            }
          >
            Statistik
          </NavLink>
        </div>

      </div>
    </nav>
  );
}

export default Navbar;