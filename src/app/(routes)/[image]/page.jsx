import { assetsFileNamesExtractor } from "@/utils/assets-filenames-extractor";
import { fileNameToBaseName } from "@/utils/filename-to-basename";
import Image from "next/image";
import Link from "next/link";
import React from "react";

export default function ImagePage({ params }) {
  const imageFileName = params.image;

  return (
    <main>
      <h2>Page : {imageFileName}</h2>
      <Image
        src={`/assets/${imageFileName}.png`}
        alt="alt text to be defined"
        width={500}
        height={500}
      />
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
