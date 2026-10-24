import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import BookForm from '../components/BookForm/BookForm';

describe('BookForm', () => {
  it('menampilkan error ketika judul dan penulis kosong', () => {
    const onSubmitBook = vi.fn();

    render(
      <BookForm
        editingBook={null}
        onSubmitBook={onSubmitBook}
        onCancelEdit={vi.fn()}
      />
    );

    fireEvent.click(
      screen.getByRole('button', { name: 'Tambah Buku' })
    );

    expect(
      screen.getByRole('alert')
    ).toHaveTextContent('Judul dan penulis wajib diisi.');

    expect(onSubmitBook).not.toHaveBeenCalled();
  });

  it('mengirim data ketika formulir diisi dengan benar', () => {
    const onSubmitBook = vi.fn();

    render(
      <BookForm
        editingBook={null}
        onSubmitBook={onSubmitBook}
        onCancelEdit={vi.fn()}
      />
    );

    fireEvent.change(screen.getByLabelText('Judul Buku'), {
      target: { value: 'Atomic Habits' },
    });

    fireEvent.change(screen.getByLabelText('Penulis'), {
      target: { value: 'James Clear' },
    });

    fireEvent.click(
      screen.getByRole('button', { name: 'Tambah Buku' })
    );

    expect(onSubmitBook).toHaveBeenCalledWith({
      title: 'Atomic Habits',
      author: 'James Clear',
      status: 'milik',
    });
  });
});