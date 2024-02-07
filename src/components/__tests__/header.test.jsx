import React from 'react';
import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import Header from '../header/header';

describe('Header', () => {
  it('Contains a header html tag', () => {
    render(<Header />);

    const heading = screen.getByRole('banner');

    expect(heading).toBeInTheDocument();
    expect(heading.nodeName).toBe('HEADER');
  });
});
