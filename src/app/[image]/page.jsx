import ZoomArea from "@/components/zoom-area";
import { ALT_TEXT_PREFIX, IMAGE_EXTENSION, IMAGE_FOLDER } from "@/config/app-config";
import {
  basenameToFormattedName,
  extractFilenamesFromFolder,
  filenameToBasename,
} from "@/utils/assets-filenames-utils";
import Link from "next/link";
import React from "react";
import styles from "./page.module.css";

export default function ImagePage({ params }) {
  const imageBasename = params.image;
  const imageName = basenameToFormattedName(imageBasename);
  const imageSrc = IMAGE_FOLDER + imageBasename + IMAGE_EXTENSION;
  const imageAlt = ALT_TEXT_PREFIX + imageName.toLowerCase();

  return (
    <main className={styles.image_page}>
      <h2>{imageName}</h2>
      <ZoomArea imageSrc={imageSrc} imageAlt={imageAlt} />
      <Link href="/">Back to home ↩</Link>
    </main>
  );
}

export async function generateStaticParams() {
  const imageFilenames = await extractFilenamesFromFolder(IMAGE_FOLDER);
  const imageBasenames = imageFilenames.map((filename) => filenameToBasename(filename));

  return imageBasenames.map((basename) => ({
    image: basename,
  }));
}
