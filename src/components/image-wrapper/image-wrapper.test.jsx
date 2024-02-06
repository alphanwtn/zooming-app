/* eslint-disable @next/next/no-img-element */
import React from 'react';
import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import ZoomArea from '../zoom-area/zoom-area';

jest.mock('next/image', () => ({
  __esModule: true,
  default: () => <img alt='fake' />,
}));

describe('ImageWrapper', () => {
  it('Contains an image and a loader inside', () => {
    render(<ZoomArea imageSrc='/fake/adress' imageAlt='no image' />);

    const images = screen.queryAllByRole('img');

    expect(images.length).toBe(2);
  });
});
