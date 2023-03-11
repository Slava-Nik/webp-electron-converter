import { contextBridge, ipcRenderer } from 'electron';

const filesApi = {
  openFileByPath: (path: string) => ipcRenderer.invoke('openFileByPath', { path })
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
