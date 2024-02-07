import React from 'react';
import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import Footer from '../footer/footer';

describe('Header', () => {
  it('Contains a footer html tag', () => {
    render(<Footer />);

    const footer = screen.getByRole('contentinfo');

    expect(footer).toBeInTheDocument();
    expect(footer.nodeName).toBe('FOOTER');
  });
});
