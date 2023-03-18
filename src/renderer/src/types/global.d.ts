export {};
import { Image } from '../../../preload';

interface convertImagesResponse {
  inputPath?: string;
  newSize?: number;
  error?: string;
}

declare global {
  interface Window {
    filesApi: {
      openFileByPath: (path: string) => void;
      convertImagesListToWebp: (imagesList: Image[], quality: number) => convertImagesResponse[];
    };
  }
}
