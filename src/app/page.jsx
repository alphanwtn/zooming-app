import { ALT_TEXT_PREFIX, IMAGE_FOLDER } from "@/config/app-config";
import {
  basenameToFormattedName,
  extractFilenamesFromFolder,
  filenameToBasename,
} from "@/utils/assets-filenames-utils";
import { GALLERY_AUTHOR } from "@/config/metadata";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import styles from "./page.module.css";
import { generateImageMetadata } from "@/utils/generate-image-metadata";

export default async function HomePage() {
  const imageFilenames = await extractFilenamesFromFolder(IMAGE_FOLDER);

  const imagesMetadata = imageFilenames.map((filename) => {
    const basename = filenameToBasename(filename);

    return generateImageMetadata(basename, GALLERY_AUTHOR);
  });

  const jsonLd = {
    "@context": "http://schema.org",
    "@type": "ItemList",
    itemListElement: imagesMetadata,
  };

  return (
    <main className={styles.home_page}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <h2>Hi there! 👋</h2>
      <p>
        Discover stunning visuals with our virtual magnifying glass! Easily select and zoom in on details for a closer
        look. Perfect for art and photography enthusiasts. Start exploring today!
      </p>
      <ul className={styles.image_hub}>
        {imageFilenames.map((filename, index) => {
          const basename = filenameToBasename(filename);
          const imageSrc = IMAGE_FOLDER + filename;
          const imageAlt = ALT_TEXT_PREFIX + basenameToFormattedName(basename).toLowerCase();
          return (
            <li key={index}>
              <Link href={basename}>
                <Image className={styles.image} src={imageSrc} width={200} height={200} alt={imageAlt} priority />
              </Link>
            </li>
          );
        })}
      </ul>
    </main>
  );
}
