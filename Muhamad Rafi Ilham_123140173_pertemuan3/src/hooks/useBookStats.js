import { useMemo } from 'react';

function useBookStats(books) {
  return useMemo(() => {
    const total = books.length;

    const milik = books.filter(
      (book) => book.status === 'milik'
    ).length;

    const baca = books.filter(
      (book) => book.status === 'baca'
    ).length;

    const beli = books.filter(
      (book) => book.status === 'beli'
    ).length;

    const percentage = (count) =>
      total > 0 ? Math.round((count / total) * 100) : 0;

    return {
      total,
      milik,
      baca,
      beli,
      milikPercent: percentage(milik),
      bacaPercent: percentage(baca),
      beliPercent: percentage(beli),
    };
  }, [books]);
}

export default useBookStats;