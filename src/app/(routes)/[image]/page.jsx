import { assetsFileNamesExtractor } from "@/utils/assets-filenames-extractor";
import { fileNameToBaseName } from "@/utils/filename-to-basename";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import styles from "./page.module.css";
import ZoomArea from "@/components/zoom-area";

export default function ImagePage({ params }) {
  const imageFileName = params.image;

  return (
    <main className={styles.image_page}>
      <h2>Page : {imageFileName}</h2>
      <ZoomArea>
        <Image
          src={`/assets/${imageFileName}.png`}
          alt="alt text to be defined"
          width={500}
          height={500}
        />
      </ZoomArea>

      <Link href="/">↩️ Back to home</Link>
    </main>
  );
}

export async function generateStaticParams() {
  const imageFileNames = await assetsFileNamesExtractor();
  const imageBaseNames = imageFileNames.map((name) => fileNameToBaseName(name));

  return imageBaseNames.map((imageFileSrc) => ({
    image: imageFileSrc,
  }));
}
