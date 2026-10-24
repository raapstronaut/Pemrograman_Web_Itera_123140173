import { describe, it, expect } from 'vitest';
import { renderHook } from '@testing-library/react';
import useBookStats from '../hooks/useBookStats';

describe('useBookStats', () => {
  it('menghitung jumlah dan persentase buku dengan benar', () => {
    const books = [
      { id: '1', status: 'milik' },
      { id: '2', status: 'milik' },
      { id: '3', status: 'baca' },
      { id: '4', status: 'beli' },
    ];

    const { result } = renderHook(() => useBookStats(books));

    expect(result.current.total).toBe(4);
    expect(result.current.milik).toBe(2);
    expect(result.current.baca).toBe(1);
    expect(result.current.beli).toBe(1);
    expect(result.current.milikPercent).toBe(50);
    expect(result.current.bacaPercent).toBe(25);
    expect(result.current.beliPercent).toBe(25);
  });
});