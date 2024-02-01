import { promises as fs } from "fs";
import path from "path";

export async function assetsFileNamesExtractor() {
  const assetsDirectory = path.join(process.cwd(), "public/assets");
  const fileNames = await fs.readdir(assetsDirectory);

  return fileNames;
}
