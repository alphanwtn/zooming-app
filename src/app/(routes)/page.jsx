import styles from "./page.module.css";
import { assetsFileNamesExtractor } from "@/utils/assets-filenames-extractor";
import { fileNameToBaseName } from "@/utils/filename-to-basename";
import Link from "next/link";
import React from "react";
import Image from "next/image";

export default async function HomePage() {
  const imageFileNames = await assetsFileNamesExtractor();

  return (
    <main className={styles.home_page}>
      <h2 className={styles.instruction}>Click on the image to zoom in:</h2>
      <ul className={styles.image_hub}>
        {imageFileNames.map((filename, index) => (
          <li key={index}>
            <Link href={fileNameToBaseName(filename)}>
              <Image
                className={styles.image}
                src={"/assets/" + filename}
                width={160}
                height={160}
                alt="alt text to be defined"
                priority
              />
            </Link>
          </li>
        ))}
      </ul>
    </main>
  );
}
