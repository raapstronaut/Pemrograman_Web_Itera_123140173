import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import BookFilter from '../components/BookFilter/BookFilter';

describe('BookFilter', () => {
  it('mengirim kata kunci pencarian', () => {
    const onSearchChange = vi.fn();

    render(
      <BookFilter
        searchTerm=""
        statusFilter="semua"
        onSearchChange={onSearchChange}
        onFilterChange={vi.fn()}
      />
    );

    fireEvent.change(screen.getByLabelText('Cari Buku'), {
      target: { value: 'Atomic' },
    });

    expect(onSearchChange).toHaveBeenCalledWith('Atomic');
  });

  it('mengirim pilihan filter status', () => {
    const onFilterChange = vi.fn();

    render(
      <BookFilter
        searchTerm=""
        statusFilter="semua"
        onSearchChange={vi.fn()}
        onFilterChange={onFilterChange}
      />
    );

    fireEvent.change(screen.getByLabelText('Filter Status'), {
      target: { value: 'baca' },
    });

    expect(onFilterChange).toHaveBeenCalledWith('baca');
  });
});