/* eslint-disable @next/next/no-img-element */
import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import ZoomArea from '../zoom-area/zoom-area';

jest.mock('next/image', () => ({
  __esModule: true,
  default: () => <img alt='fake' />,
}));

describe('ZoomArea', () => {
  it('Contains a image and a loader inside', () => {
    render(<ZoomArea imageSrc='/fake/adress' imageAlt='no image' />);

    const images = screen.queryAllByRole('img');

    expect(images.length).toBe(2);
  });

  test('Cursor do not appears at init', () => {
    render(<ZoomArea imageSrc='/fake/adress' imageAlt='no image' />);

    expect(screen.queryByTestId('cursor-div')).toBeNull();
  });
});
