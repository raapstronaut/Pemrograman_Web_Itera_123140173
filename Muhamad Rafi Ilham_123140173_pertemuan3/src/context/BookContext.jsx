import PropTypes from 'prop-types';
import { createContext, useContext } from 'react';
import useLocalStorage from '../hooks/useLocalStorage';

const BookContext = createContext(null);

export function BookProvider({ children }) {
  const [books, setBooks] = useLocalStorage(
    'paw_books_pertemuan3',
    []
  );

  // Menambahkan buku baru
  const addBook = (book) => {
    const newBook = {
      ...book,
      id: `${Date.now()}-${Math.random().toString(36).slice(2)}`,
    };

    setBooks((prevBooks) => [...prevBooks, newBook]);
  };

  // Menghapus buku berdasarkan ID
  const deleteBook = (id) => {
    setBooks((prevBooks) =>
      prevBooks.filter((book) => book.id !== id)
    );
  };

  // Mengedit informasi buku
  const updateBook = (id, updatedData) => {
    setBooks((prevBooks) =>
      prevBooks.map((book) =>
        book.id === id
          ? { ...book, ...updatedData }
          : book
      )
    );
  };

  return (
    <BookContext.Provider
      value={{
        books,
        addBook,
        deleteBook,
        updateBook,
      }}
    >
      {children}
    </BookContext.Provider>
  );
}

BookProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export function useBooks() {
  const context = useContext(BookContext);

  if (!context) {
    throw new Error(
      'useBooks harus digunakan di dalam BookProvider'
    );
  }

  return context;
}