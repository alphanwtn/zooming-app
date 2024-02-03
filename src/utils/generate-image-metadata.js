import { IMAGE_EXTENSION, IMAGE_FOLDER } from "@/config/app-config";
import { basenameToFormattedName } from "./assets-filenames-utils";

/**
 * Generates structured JSON metadata for an image object.
 *
 * @param {string} imageBasename - The base name of the image.
 * @param {string} author - The name of the image author.
 * @returns {object} A JSON object adhering to "schema.org" representing image metadata.
 */
export function generateImageMetadata(imageBasename, author) {
  const imageName = basenameToFormattedName(imageBasename);

  return {
    "@context": "https://schema.org/",
    "@type": "ImageObject",
    contentUrl: process.env.HOST_URL + IMAGE_FOLDER + imageBasename + IMAGE_EXTENSION,
    creditText: imageName,
    creator: {
      "@type": "Person",
      name: author,
    },
  }; 
}
