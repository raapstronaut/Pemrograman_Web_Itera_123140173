import { useState } from 'react';
import { useBooks } from '../../context/BookContext';
import BookForm from '../../components/BookForm/BookForm';
import BookList from '../../components/BookList/BookList';
import BookFilter from '../../components/BookFilter/BookFilter';

import astronaut from '../../assets/astronaut.svg';

function Home() {
  const {
    books,
    addBook,
    updateBook,
    deleteBook,
  } = useBooks();

  const [editingBook, setEditingBook] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('semua');

  // Menambahkan buku atau memperbarui buku
  const handleSubmitBook = (bookData) => {
    if (editingBook) {
      updateBook(editingBook.id, bookData);
      setEditingBook(null);
    } else {
      addBook(bookData);
    }
  };

  // Menghapus buku berdasarkan ID
  const handleDeleteBook = (id) => {
    deleteBook(id);

    if (editingBook?.id === id) {
      setEditingBook(null);
    }
  };

  // Pencarian berdasarkan judul / penulis
  // dan filter berdasarkan status buku
  const filteredBooks = books.filter((book) => {
    const keyword = searchTerm.toLowerCase().trim();

    const matchesSearch =
      book.title.toLowerCase().includes(keyword) ||
      book.author.toLowerCase().includes(keyword);

    const matchesStatus =
      statusFilter === 'semua' ||
      book.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  return (
    <div className="home">

      {/* HEADER */}
      <header className="app-header">
        <div className="hero-inner">

          <div className="hero-content">
            <span className="hero-label">
              PERSONAL BOOK MANAGEMENT
            </span>

            <h1>
              Jelajahi Koleksi
              <span> Bukumu.</span>
            </h1>

            <p>
              Kelola buku yang kamu miliki, sedang dibaca,
              dan ingin dibeli dalam satu tempat.
            </p>

            <div className="hero-info">
              <span className="hero-indicator" />
              Rapstory — Manajemen Buku Pribadi
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

      {/* KONTEN UTAMA */}
      <main className="container">

        {/* FORM TAMBAH DAN EDIT */}
        <BookForm
          key={editingBook?.id ?? 'new'}
          editingBook={editingBook}
          onSubmitBook={handleSubmitBook}
          onCancelEdit={() => setEditingBook(null)}
        />

        {/* DAFTAR BUKU */}
        <section className="book-section">
          <h2>Daftar Buku ({books.length})</h2>

          <BookFilter
            searchTerm={searchTerm}
            statusFilter={statusFilter}
            onSearchChange={setSearchTerm}
            onFilterChange={setStatusFilter}
          />

          <BookList
            books={filteredBooks}
            totalBooks={books.length}
            onEditBook={setEditingBook}
            onDeleteBook={handleDeleteBook}
          />
        </section>

      </main>
    </div>
  );
}

export default Home;