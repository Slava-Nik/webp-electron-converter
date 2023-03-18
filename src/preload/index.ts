import { contextBridge, ipcRenderer } from 'electron';

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

if (process.contextIsolated) {
  try {
    contextBridge.exposeInMainWorld('filesApi', filesApi);
  } catch (error) {
    console.error(error);
  }
} else {
  // @ts-ignore (define in dts)
  window.api = api;
}
