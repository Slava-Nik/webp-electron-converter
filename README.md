# WebP Converter

This Electron (React + TS) Desktop Application is designed to help users convert images to WebP format with ease. The app has a killer feature that allows users to drag and drop an entire project folder containing images to it, and it will automatically search all subfolders recursively and convert all images to WebP format. The converted images are then placed in the same directory where the specific image was found, making the process easy and straightforward.

Users can also set up the required quality for the converted images and see how much size was saved.

Additionally, the app has a dark theme feature that takes the current theme of the user system. This feature makes it easier for users to use the app in their preferred environment without straining their eyes.

The app has been tested for macOS and has been designed to provide a smooth and seamless user experience. WebP Converter is an essential tool for web developers and designers who need to optimize their images for the web.


## Project Setup
#


#### 1. Set up WebP dependency.
The Image Converter to WebP Electron Desktop Application has a [WebP dependency](https://developers.google.com/speed/webp/docs/cwebp). This dependency is required for the app to work properly.
This can be installed using the following command:

```bash
brew install webp
```

After installing the WebP dependency, you need to set up the path of cwebp by running the following command in your terminal:
```which cwebp```.
This command will display the path of cwebp, which you need to copy.
After that, you need to update the .env file in the project directory with the path to cwebp. Open the .env file and replace the existing value of CWEBP_PATH.

#
#### 2. Install project dependencies.
To install the project dependencies, run the following command in your terminal: ```npm install```. This command will install all the necessary dependencies required for the project to run.

#
#### 3. Start or build the project.
To start the project, run the following command in your terminal: ```npm run dev```. This command will start the project in development mode.

If you want to build the project for your system, run one of the following commands in your terminal based on your system: ```npm run build:win``` for Windows, ```npm run build:mac``` for Mac OS, or ```npm run build:linux``` for Linux. P.S The app has been tested for macOS only, the build for Mac OS already exists in the dist folder.
