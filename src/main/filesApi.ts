const { ipcMain, shell } = require('electron');
const { exec } = require('child_process');
const fs = require('fs');
const path = require('path');
const shellQuote = require('shell-quote');

type ConversionResult = {
  inputPath: string;
  status: 'fulfilled' | 'rejected';
  size?: number;
  reason?: string;
};

export const initialiseFilesApiMethods = () => {
  ipcMain.handle('openFileByPath', (_event, { path }) => {
    if (path) shell.showItemInFolder(path);
  });

  ipcMain.handle('convertImagesListToWebp', async (_event, { imagesList, quality = 80 }) => {
    if (!imagesList) return;

    const promises: Promise<ConversionResult>[] = [];

    imagesList.forEach((inputPath) => {
      const extname = path.extname(inputPath);
      const outputPath = `${inputPath.slice(0, -extname.length)}.webp`;
      const escapedInputPath = shellQuote.quote([inputPath]);
      const escapedOutputPath = shellQuote.quote([outputPath]);
      const command = `cwebp -q ${quality} ${escapedInputPath} -o ${escapedOutputPath}`;

      const promise = new Promise<ConversionResult>((resolve, reject) => {
        exec(command, (error) => {
          if (error) {
            reject({
              inputPath,
              status: 'rejected',
              reason: `Error converting ${inputPath} to WebP format: ${error.message}`
            });
            return;
          }
          fs.stat(outputPath, (err, stats) => {
            if (err) {
              reject({
                inputPath,
                status: 'rejected',
                reason: `Error getting size of ${outputPath}: ${err.message}`
              });
              return;
            }
            resolve({ inputPath, status: 'fulfilled', size: stats.size });
          });
        });
      });
      promises.push(promise);
    });

    const result = await Promise.allSettled(promises)
      .then((results) => {
        const resultsObject = results.map((result) => {
          if (result.status === 'fulfilled') {
            return {
              inputPath: result.value.inputPath,
              newSize: result.value.size
            };
          }
          return {
            inputPath: result?.reason?.inputPath,
            error: result?.reason?.reason
          };
        });
        return resultsObject;
      })
      .catch((error) => {
        console.error('Error converting images to WebP format:', error);
      });

    return result;
  });
};
