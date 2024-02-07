import { IMAGE_FOLDER } from '@/config/app-config';
import { extractFilenamesFromFolder, filenameToBasename } from '@/utils/assets-filenames-utils';

export default function sitemap() {
  const imageFilenames = extractFilenamesFromFolder(IMAGE_FOLDER);
  const imagePagesXml = imageFilenames.map((filename) => {
    const basename = filenameToBasename(filename);

    return {
      url: process.env.HOST_URL + basename,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.8,
    };
  });

  return [
    {
      url: process.env.HOST_URL,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1,
    },
    ...imagePagesXml,
  ];
}
