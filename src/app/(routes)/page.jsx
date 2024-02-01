import styles from "./page.module.css";
import { assetsFileNamesExtractor } from "@/utils/assets-filenames-extractor";
import { fileNameToBaseName } from "@/utils/filename-to-basename";
import Link from "next/link";
import React from "react";

export default async function Home() {
  const imageFileNames = await assetsFileNamesExtractor();
  const imageBaseNames = imageFileNames.map((name) => fileNameToBaseName(name));

  return (
    <main className={styles.main}>
      <h1>Welcome to the Zooming App !</h1>
      <h2>Choose an an image you want to zoom in on :</h2>
      <ul>
        {imageBaseNames.map((baseName, index) => (
          <li key={index}>
            <Link href={baseName}>{baseName}</Link>
          </li>
        ))}
      </ul>
    </main>
  );
}
