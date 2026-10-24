import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import BookList from '../components/BookList/BookList';

const dummyBooks = [
  {
    id: '1',
    title: 'Atomic Habits',
    author: 'James Clear',
    status: 'milik',
  },
];

describe('BookList', () => {
  it('menampilkan pesan ketika daftar buku kosong', () => {
    render(
      <BookList
        books={[]}
        totalBooks={0}
        onEditBook={vi.fn()}
        onDeleteBook={vi.fn()}
      />
    );

    expect(
      screen.getByText(/Belum ada buku/i)
    ).toBeInTheDocument();
  });

  it('memanggil fungsi hapus dengan ID buku', () => {
    const onDeleteBook = vi.fn();

    render(
      <BookList
        books={dummyBooks}
        totalBooks={1}
        onEditBook={vi.fn()}
        onDeleteBook={onDeleteBook}
      />
    );

    fireEvent.click(
      screen.getByRole('button', { name: 'Hapus' })
    );

    expect(onDeleteBook).toHaveBeenCalledWith('1');
  });
});