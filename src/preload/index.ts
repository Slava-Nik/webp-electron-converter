import { contextBridge, ipcRenderer } from 'electron';

export enum SystemTheme {
  DARK = 'dark',
  LIGHT = 'light'
}

interface Image {
  path: string;
}

const filesApi = {
  openFileByPath: (path: string) => ipcRenderer.invoke('openFileByPath', { path }),
  convertImagesListToWebp: async (imagesList: Image[], quality: number) => {
    const response = await ipcRenderer.invoke('convertImagesListToWebp', { imagesList, quality });

    return response;
  }
};

const themeApi = {
  getSystemTheme: () => ipcRenderer.invoke('getSystemTheme'),
  handleSystemThemeUpdate: (callback: (e: any, theme: SystemTheme) => void) =>
    ipcRenderer.on('system-theme-changed', callback)
};

const windowApi = {
  filesApi,
  themeApi
};

if (process.contextIsolated) {
  try {
    contextBridge.exposeInMainWorld('api', windowApi);
  } catch (error) {
    console.error(error);
  }
} else {
  // @ts-ignore (define in dts)
  window.api = api;
}
