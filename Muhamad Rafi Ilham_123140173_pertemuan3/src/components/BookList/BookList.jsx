import PropTypes from 'prop-types';

const statusLabels = {
  milik: 'Milik',
  baca: 'Sedang Dibaca',
  beli: 'Ingin Dibeli',
};

function BookList({ books, totalBooks, onEditBook, onDeleteBook }) {
  if (books.length === 0) {
    return (
      <p className="empty-message">
        {totalBooks === 0
          ? 'Belum ada buku. Tambahkan buku pertama Anda!'
          : 'Tidak ada buku yang sesuai dengan pencarian atau filter.'}
      </p>
    );
  }

  return (
    <div className="book-list">
      {books.map((book) => (
        <div className="book-card" key={book.id}>
          <div className="book-info">
            <h3>{book.title}</h3>
            <p>Penulis: {book.author}</p>

            <span className={`book-status status-${book.status}`}>
              {statusLabels[book.status]}
            </span>
          </div>

          <div className="book-actions">
            <button
              type="button"
              className="edit-btn"
              onClick={() => onEditBook(book)}
            >
              Edit
            </button>

            <button
              type="button"
              className="delete-btn"
              onClick={() => onDeleteBook(book.id)}
            >
              Hapus
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}

const bookShape = PropTypes.shape({
  id: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ]).isRequired,
  title: PropTypes.string.isRequired,
  author: PropTypes.string.isRequired,
  status: PropTypes.oneOf(['milik', 'baca', 'beli']).isRequired,
});

BookList.propTypes = {
  books: PropTypes.arrayOf(bookShape).isRequired,
  totalBooks: PropTypes.number.isRequired,
  onEditBook: PropTypes.func.isRequired,
  onDeleteBook: PropTypes.func.isRequired,
};

export default BookList;