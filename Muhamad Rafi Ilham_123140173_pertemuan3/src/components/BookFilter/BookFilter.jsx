import PropTypes from 'prop-types';

function BookFilter({
  searchTerm,
  statusFilter,
  onSearchChange,
  onFilterChange,
}) {
  return (
    <div className="book-filters">
      <div className="filter-group">
        <label htmlFor="search-book">Cari Buku</label>
        <input
          id="search-book"
          type="search"
          placeholder="Cari judul atau penulis..."
          value={searchTerm}
          onChange={(event) => onSearchChange(event.target.value)}
        />
      </div>

      <div className="filter-group">
        <label htmlFor="filter-status">Filter Status</label>
        <select
          id="filter-status"
          value={statusFilter}
          onChange={(event) => onFilterChange(event.target.value)}
        >
          <option value="semua">Semua Status</option>
          <option value="milik">Milik</option>
          <option value="baca">Sedang Dibaca</option>
          <option value="beli">Ingin Dibeli</option>
        </select>
      </div>
    </div>
  );
}

BookFilter.propTypes = {
  searchTerm: PropTypes.string.isRequired,
  statusFilter: PropTypes.oneOf([
    'semua',
    'milik',
    'baca',
    'beli',
  ]).isRequired,
  onSearchChange: PropTypes.func.isRequired,
  onFilterChange: PropTypes.func.isRequired,
};

export default BookFilter;