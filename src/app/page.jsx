import { ALT_TEXT_PREFIX, IMAGE_FOLDER } from "@/config/app-config";
import {
  basenameToFormattedName,
  extractFilenamesFromFolder,
  filenameToBasename,
} from "@/utils/assets-filenames-utils";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import styles from "./page.module.css";

export default async function HomePage() {
  const imageFilenames = await extractFilenamesFromFolder(IMAGE_FOLDER);

  return (
    <main className={styles.home_page}>
      <h2 className={styles.instruction}>Click on the image to zoom in:</h2>
      <ul className={styles.image_hub}>
        {imageFilenames.map((filename, index) => {
          const basename = filenameToBasename(filename);
          const imageSrc = IMAGE_FOLDER + filename;
          const imageAlt = ALT_TEXT_PREFIX + basenameToFormattedName(basename).toLowerCase();
          return (
            <li key={index}>
              <Link href={basename}>
                <Image className={styles.image} src={imageSrc} width={160} height={160} alt={imageAlt} priority />
              </Link>
            </li>
          );
        })}
      </ul>
    </main>
  );
}
