export interface File {
  name: string;
  path: string;
  size: number;
  type: string;
}
export interface ConversionResult {
  inputPath?: string;
  newSize?: number;
  error?: string;
}

export enum SystemTheme {
  DARK = 'dark',
  LIGHT = 'light'
}
