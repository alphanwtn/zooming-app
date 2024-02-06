/* eslint-disable @next/next/no-img-element */
import React from 'react';
import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import HomePage from '../page';

jest.mock('next/image', () => ({
  __esModule: true,
  default: () => <img alt='fake' />,
}));

describe('HomePage', () => {
  it('Contains a list of images', () => {
    render(<HomePage />);

    const imageList = screen.getByRole('list');

    expect(imageList).toBeInTheDocument();
  });
});
