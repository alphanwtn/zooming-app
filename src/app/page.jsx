/* eslint-disable react/no-danger */
import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ALT_TEXT_PREFIX, IMAGE_FOLDER } from '@/config/app-config';
import { IMAGES_AUTHOR } from '@/config/author-data';
import {
  basenameToFormattedName,
  extractFilenamesFromFolder,
  filenameToBasename,
} from '@/utils/assets-filenames-utils';
import generateImageMetadata from '@/utils/generate-image-metadata';
import styles from './page.module.css';

export default async function HomePage() {
  const imageFilenames = await extractFilenamesFromFolder(IMAGE_FOLDER);

  const imagesMetadata = imageFilenames.map((filename) => {
    const basename = filenameToBasename(filename);

    return generateImageMetadata(basename, IMAGES_AUTHOR);
  });

  const jsonLd = {
    '@context': 'http://schema.org',
    '@type': 'ItemList',
    itemListElement: imagesMetadata,
  };

  return (
    <main className={styles.home_page}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <h2>Hi there! 👋</h2>
      <p>Click on the image you want to zoom in on:</p>
      <ul className={styles.image_hub}>
        {imageFilenames.map((filename) => {
          const basename = filenameToBasename(filename);
          const imageSrc = IMAGE_FOLDER + filename;
          const imageAlt = ALT_TEXT_PREFIX + basenameToFormattedName(basename).toLowerCase();
          return (
            <li key={filename}>
              <Link href={basename}>
                <Image
                  className={styles.image}
                  src={imageSrc}
                  width={200}
                  height={200}
                  alt={imageAlt}
                  priority
                />
              </Link>
            </li>
          );
        })}
      </ul>
    </main>
  );
}
