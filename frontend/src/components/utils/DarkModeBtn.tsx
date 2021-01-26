import React, { useEffect, useState } from "react";

const DarkModeSwitch: React.FC<unknown> = () => {
  const [theme, setTheme] = useState(localStorage.getItem("theme"));

  useEffect(() => {
    if (!theme) {
      const dark = window.matchMedia("(prefers-color-scheme: dark)").matches;
      if (dark) document.documentElement.classList.add("dark");
    } else if (theme === "dark") {
      document.documentElement.classList.add("dark");
    }
  });

  const toggleDark = () => {
    document.documentElement.classList.toggle("dark");
    const newTheme = theme === "dark" ? "light" : "dark";
    localStorage.setItem("theme", newTheme);
    setTheme(newTheme);
  };

  return (
    <label className="dark-switch">
      <input checked={theme === "dark"} type="checkbox" onChange={toggleDark} />
      <span className="slider">🌞 🌛</span>
    </label>
  );
};

export default DarkModeSwitch;
