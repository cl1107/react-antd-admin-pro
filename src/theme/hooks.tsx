import React, { createContext, useContext, useMemo, useState } from 'react';

const defaultTheme = 'light';
type ThemeContextType = {
  myTheme: string;
  setMyTheme: React.Dispatch<React.SetStateAction<string>>;
};

const ProThemeContext = createContext<ThemeContextType>({} as ThemeContextType);
const useProThemeContext = () => useContext(ProThemeContext);

const ProThemeProvider = ({ children }: { children: React.ReactNode }) => {
  const [myTheme, setMyTheme] = useState(defaultTheme);

  const themeProvider = useMemo(
    () => ({
      myTheme,
      setMyTheme,
    }),
    [myTheme, setMyTheme],
  );
  return <ProThemeContext.Provider value={themeProvider}>{children}</ProThemeContext.Provider>;
};

export { ProThemeProvider, useProThemeContext };
