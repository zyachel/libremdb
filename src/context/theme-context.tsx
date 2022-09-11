import React, { useState, createContext, ReactNode } from 'react';

const getInitialTheme = () => {
  // for server-side rendering, as window isn't availabe there
  if (typeof window === 'undefined') return 'light';

  const userPrefersTheme = window.localStorage.getItem('theme') || null;
  const browserPrefersDarkTheme = window.matchMedia(
    '(prefers-color-scheme: dark)'
  ).matches;

  if (userPrefersTheme) return userPrefersTheme;
  else if (browserPrefersDarkTheme) return 'dark';
  else return 'light';
};

const updateMetaTheme = () => {
  const meta = document.querySelector(
    'meta[name="theme-color"]'
  ) as HTMLMetaElement;
  const footerClr = window.getComputedStyle(document.body).backgroundColor;

  meta.content = footerClr;
};

const initialContext = {
  theme: '',
  setTheme: (theme: string) => {},
};

export const themeContext = createContext(initialContext);

const ThemeProvider = ({ children }: { children: ReactNode }) => {
  const [curTheme, setCurTheme] = useState(getInitialTheme);

  const setTheme = (theme: string) => {
    setCurTheme(theme);
    window.localStorage.setItem('theme', theme);
    document.documentElement.dataset.theme = theme;
    updateMetaTheme();
  };

  const providerValue = {
    theme: curTheme,
    setTheme: setTheme,
  };

  return (
    <themeContext.Provider value={providerValue}>
      {children}
    </themeContext.Provider>
  );
};

export default ThemeProvider;
