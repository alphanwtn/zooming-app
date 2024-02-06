/* eslint-disable @next/next/no-img-element */
import React from 'react';
import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import ImagePage from '../[image]/page';

jest.mock('../../../components/zoom-area/zoom-area', () => ({
  __esModule: true,
  default: () => (
    <div>
      <img alt='fake' />
    </div>
  ),
}));

describe('HomePage', () => {
  it('Contains an image', () => {
    render(<ImagePage params={{ image: '1-test-image' }} />);

    const image = screen.getByRole('img');

    expect(image).toBeInTheDocument();
  });
});
