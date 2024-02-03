import { IMAGE_EXTENSION } from "@/config/app-config";
import { promises as fs } from "fs";
import path from "path";

/* 
  Naming conventions:
    Filename : "1-my-file.png"
    Basename : "1-my-file"
    Formatted name : "My file"
*/

/**
 * Extracts filenames from a folder relative to the "public" directory.
 * All files must have the expected extension defined in app config file.
 * @param {string} relativePathFromPublic - The relative path from the "public" directory.
 * @returns {Promise<string[]>} - A promise that resolves to an array of filenames with the specified extension in the folder.
 * @throws {Error} - If there is an error reading the folder or if files have different extensions.
 */
export async function extractFilenamesFromFolder(relativePathFromPublic) {
  const absoluteFolderPath = path.join(process.cwd(), "public/" + relativePathFromPublic);

  try {
    const filenames = await fs.readdir(absoluteFolderPath);

    const allFilesHaveExpectedExtension = filenames.every(
      (filename) => path.extname(filename).toLowerCase() === IMAGE_EXTENSION.toLowerCase()
    );

    if (!allFilesHaveExpectedExtension) {
      throw new Error(`Not all files have the expected extension (${IMAGE_EXTENSION}).`);
    }

    return filenames;
  } catch (error) {
    throw new Error(`Error reading folder: ${error.message}`);
  }
}

/**
 * Converts a file name to its base name by removing the file extension.
 * @param {string} filename - The name of the file.
 * @returns {string} - The base name of the file (without the extension).
 */
export function filenameToBasename(filename) {
  return filename.split(".")[0];
}

/**
 * Formats a base name by removing prefixes, replacing hyphens with spaces,
 * and capitalizing the first letter.
 * @param {string} basename - The base name of the file.
 * @returns {string} - The formatted name.
 */
export function basenameToFormattedName(basename) {
  let words = basename.split("-");
  words.shift();

  let formattedName = words.join(" ");
  formattedName = formattedName.charAt(0).toUpperCase() + formattedName.slice(1);

  return formattedName;
}
