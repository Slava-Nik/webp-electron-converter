export {};

declare global {
  interface Window {
    filesApi: {
      openFileByPath: (path: string) => void;
    };
  }
}
