import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import App from '../App';

describe('React Router', () => {
  it('menampilkan halaman 404 untuk URL yang tidak dikenal', () => {
    window.history.pushState({}, '', '/halaman-salah');

    render(<App />);

    expect(
      screen.getByRole('heading', {
        name: 'Halaman Tidak Ditemukan',
      })
    ).toBeInTheDocument();

    window.history.replaceState({}, '', '/');
  });
});