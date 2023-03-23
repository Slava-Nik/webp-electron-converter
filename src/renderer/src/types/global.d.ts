export {};
import { Image, SystemTheme } from '../../../preload';

interface convertImagesResponse {
  inputPath?: string;
  newSize?: number;
  error?: string;
}

declare global {
  interface Window {
    api: {
      filesApi: {
        openFileByPath: (path: string) => void;
        convertImagesListToWebp: (imagesList: Image[], quality: number) => convertImagesResponse[];
      };
      themeApi: {
        getSystemTheme: () => Promise<SystemTheme>;
        handleSystemThemeUpdate: (callback) => void;
      };
    };
  }
}
