import '@testing-library/jest-dom';
import generateImageMetadata from './generate-image-metadata';
import { basenameToFormattedName, filenameToBasename } from './assets-filenames-utils';

describe('generate-image-metadata', () => {
  it('Creates correct image metadata', () => {
    const imageBasename = '3-mon-image';
    const author = 'Michel';

    const meta = generateImageMetadata(imageBasename, author);

    expect(meta).toEqual({
      '@context': 'https://schema.org/',
      '@type': 'ImageObject',
      contentUrl: 'https://rzc-tech-test.vercel.app/assets/3-mon-image.webp',
      creditText: 'Mon image',
      creator: { '@type': 'Person', name: 'Michel' },
    });
  });
});

describe('assets-filenames-utils', () => {
  it('Formats filenames to basenames properly', () => {
    const filename = '3-test-image.png';

    const result = filenameToBasename(filename);

    expect(result).toBe('3-test-image');
  });

  it('Formats basename to formatted words properly', () => {
    const basename = '3-test-image';

    const result = basenameToFormattedName(basename);

    expect(result).toBe('Test image');
  });
});
