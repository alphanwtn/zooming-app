/* eslint-disable @next/next/no-img-element */
import React from 'react';
import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import ZoomArea from './zoom-area';

jest.mock('next/image', () => ({
  __esModule: true,
  default: () => <img alt='fake' />,
}));

describe('ZoomArea', () => {
  it('Contains a header html tag', () => {
    render(<ZoomArea imageSrc='/fake/adress' imageAlt='no image' />);

    const image = screen.getByRole('img');

    expect(image).toBeInTheDocument();
  });
});
