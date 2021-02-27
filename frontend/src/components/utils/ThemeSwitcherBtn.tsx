import React, { useContext } from "react";

import { ThemeContext } from "./ThemeProvider";

const ThemeSwitcherBtn: React.FC<unknown> = () => {
  const themeContext = useContext(ThemeContext);

  return (
    <label className="dark-switch">
      <input checked={themeContext.theme === "dark"} type="checkbox" onChange={themeContext.toggle} />
      <span className="slider">🌞 🌛</span>
    </label>
  );
};

export default ThemeSwitcherBtn;
