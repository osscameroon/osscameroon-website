import React, { useState } from "react";

export const LIGHT = "light";
export const DARK = "dark";

type ThemeContextType = {
  theme: string;
  toggle?: () => void;
};

const themeContextInit: ThemeContextType = {
  theme: localStorage.getItem("theme") || LIGHT,
};

export const ThemeContext = React.createContext(themeContextInit);

type ThemeProviderProps = {
  children: React.ReactNode;
};

const ThemeProvider = ({ children }: ThemeProviderProps) => {
  const [theme, setTheme] = useState(themeContextInit.theme);
  document.documentElement.classList.add(theme);

  const toggle = () => {
    const newTheme = theme === DARK ? LIGHT : DARK;
    document.documentElement.classList.replace(theme, newTheme);
    localStorage.setItem("theme", newTheme);
    setTheme(newTheme);
  };

  return <ThemeContext.Provider value={{ theme, toggle }}> {children} </ThemeContext.Provider>;
};

export default ThemeProvider;
