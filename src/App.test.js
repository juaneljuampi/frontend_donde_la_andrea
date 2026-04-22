import { render, screen, waitFor } from '@testing-library/react';
import Home from '../pages/home'; 


beforeEach(() => {
  global.fetch = jest.fn(() =>
    Promise.resolve({
      json: () => Promise.resolve([]), 
    })
  );
});

test('renderiza Home sin errores', async () => {
  render(<Home />);
  expect(screen.getByText(/No hay productos disponibles/i)).toBeInTheDocument();
});

test('renderiza el Navbar', () => {
  render(<Home />);
  expect(screen.getByRole('navigation')).toBeInTheDocument();
});

test('renderiza el Buscador', () => {
  render(<Home />);
  expect(screen.getByRole('textbox')).toBeInTheDocument();
});

test('renderiza el Footer', () => {
  render(<Home />);
  expect(screen.getByText(/Natura/i)).toBeInTheDocument(); // ajusta si el texto es distinto
});

test('renderiza el carrusel de productos', async () => {
  render(<Home />);
  await waitFor(() => {
    expect(screen.getByText(/No hay productos disponibles/i)).toBeInTheDocument();
  });
});
