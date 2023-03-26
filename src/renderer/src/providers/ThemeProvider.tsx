import { createContext, useEffect, useState } from 'react';
import { ConfigProvider as AntdConfigProvider, theme as antdTheme } from 'antd';
import { ThemeProvider as SCThemeProvider } from 'styled-components';
import { SystemTheme } from '../types/general';

export const ThemeContext = createContext({ isDark: false });

interface ThemeProviderProps {
  children: React.ReactNode;
}

const ThemeProvider = ({ children }: ThemeProviderProps) => {
  const [currentTheme, setTheme] = useState<SystemTheme>(SystemTheme.LIGHT);

  useEffect(() => {
    const initializeSystemTheme = async () => {
      const theme = await window.api.themeApi.getSystemTheme();
      setTheme(theme);
      window.api.themeApi.handleSystemThemeUpdate((_event, systemTheme) => {
        setTheme(systemTheme);
      });
    };
    initializeSystemTheme();
  }, []);

  const isDark = currentTheme === SystemTheme.DARK;
  const { defaultAlgorithm, darkAlgorithm } = antdTheme;

  return (
    <ThemeContext.Provider value={{ isDark }}>
      <SCThemeProvider theme={{ isDark }}>
        <AntdConfigProvider
          theme={{
            algorithm: isDark ? darkAlgorithm : defaultAlgorithm,
            token: {
              colorPrimary: isDark ? '#ffccc7' : '#0958d9'
            }
          }}
        >
          {children}
        </AntdConfigProvider>
      </SCThemeProvider>
    </ThemeContext.Provider>
  );
};

export default ThemeProvider;
