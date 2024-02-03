import ZoomArea from "@/components/zoom-area";
import { assetsFileNamesExtractor } from "@/utils/assets-filenames-extractor";
import { fileNameToBaseName } from "@/utils/filename-to-basename";
import Link from "next/link";
import React from "react";
import styles from "./page.module.css";

export default function ImagePage({ params }) {
  const imageFileName = params.image;

  return (
    <main className={styles.image_page}>
      <h2>{imageFileName}</h2>
      <ZoomArea imageSrc={`/assets/${imageFileName}.png`} />
      <Link href="/">Back to home ↩</Link>
    </main>
  );
}

export async function generateStaticParams() {
  const imageFileNames = await assetsFileNamesExtractor();
  const imageBaseNames = imageFileNames.map((filename) => fileNameToBaseName(filename));

  return imageBaseNames.map((baseName) => ({
    image: baseName,
  }));
}
