import { useState } from 'react';
import PropTypes from 'prop-types';

function BookForm({ editingBook, onSubmitBook, onCancelEdit }) {
  const [title, setTitle] = useState(editingBook?.title ?? '');
  const [author, setAuthor] = useState(editingBook?.author ?? '');
  const [status, setStatus] = useState(editingBook?.status ?? 'milik');
  const [error, setError] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();

    // Validasi judul dan penulis
    if (!title.trim() || !author.trim()) {
      setError('Judul dan penulis wajib diisi.');
      return;
    }

    const bookData = {
      title: title.trim(),
      author: author.trim(),
      status,
    };

    onSubmitBook(bookData);

    // Kosongkan form setelah menambah buku
    if (!editingBook) {
      setTitle('');
      setAuthor('');
      setStatus('milik');
    }

    setError('');
  };

  return (
    <form className="book-form" onSubmit={handleSubmit}>
      <h2>
        {editingBook ? 'Edit Buku' : 'Tambah Buku Baru'}
      </h2>

      <label htmlFor="book-title">Judul Buku</label>
      <input
        id="book-title"
        type="text"
        placeholder="Masukkan judul buku"
        value={title}
        onChange={(event) => {
          setTitle(event.target.value);
          setError('');
        }}
      />

      <label htmlFor="book-author">Penulis</label>
      <input
        id="book-author"
        type="text"
        placeholder="Masukkan nama penulis"
        value={author}
        onChange={(event) => {
          setAuthor(event.target.value);
          setError('');
        }}
      />

      <label htmlFor="book-status">Status Buku</label>
      <select
        id="book-status"
        value={status}
        onChange={(event) => setStatus(event.target.value)}
      >
        <option value="milik">Milik</option>
        <option value="baca">Sedang Dibaca</option>
        <option value="beli">Ingin Dibeli</option>
      </select>

      {error && (
        <p className="form-error" role="alert">
          {error}
        </p>
      )}

      <div className="form-actions">
        <button type="submit">
          {editingBook ? 'Simpan Perubahan' : 'Tambah Buku'}
        </button>

        {editingBook && (
          <button
            type="button"
            className="cancel-btn"
            onClick={onCancelEdit}
          >
            Batal
          </button>
        )}
      </div>
    </form>
  );
}

BookForm.propTypes = {
  editingBook: PropTypes.shape({
    id: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number,
    ]).isRequired,
    title: PropTypes.string.isRequired,
    author: PropTypes.string.isRequired,
    status: PropTypes.oneOf(['milik', 'baca', 'beli']).isRequired,
  }),
  onSubmitBook: PropTypes.func.isRequired,
  onCancelEdit: PropTypes.func.isRequired,
};

export default BookForm;