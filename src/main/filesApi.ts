const { ipcMain } = require('electron');
const { shell } = require('electron');

export const initialiseFilesApiMethods = () => {
  ipcMain.handle('openFileByPath', (_event, { path }) => {
    if (path) shell.showItemInFolder(path);
  });
};
