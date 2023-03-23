const { ipcMain, nativeTheme } = require('electron');

enum SystemTheme {
  DARK = 'dark',
  LIGHT = 'light'
}

export const initialiseThemeApiMethods = (mainWindow) => {
  ipcMain.handle('getSystemTheme', () =>
    nativeTheme.shouldUseDarkColors ? SystemTheme.DARK : SystemTheme.LIGHT
  );

  nativeTheme.on('updated', () => {
    const isDarkMode = nativeTheme.shouldUseDarkColors;
    mainWindow.webContents.send(
      'system-theme-changed',
      isDarkMode ? SystemTheme.DARK : SystemTheme.LIGHT
    );
  });
};
