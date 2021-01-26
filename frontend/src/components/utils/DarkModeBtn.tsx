import React from "react";

type DarkModeSwitchState = {
  theme: string | null;
};
class DarkModeSwitch extends React.Component<unknown, DarkModeSwitchState> {
  state = {
    theme: localStorage.getItem("theme"),
  };
  componentDidMount() {
    const darkn = () => {
      document.documentElement.classList.add("dark");
      this.setState({ theme: "dark" });
    };
    const { theme } = this.state;
    if (!theme) {
      const dark = window.matchMedia("(prefers-color-scheme: dark)").matches;
      if (dark) darkn();
    } else if (theme === "dark") {
      darkn();
    }
  }

  toggleDark = () => {
    const { theme } = this.state;
    document.documentElement.classList.toggle("dark");
    const newTheme = theme === "dark" ? "light" : "dark";
    localStorage.setItem("theme", newTheme);
    this.setState({ theme: newTheme });
  };

  render() {
    const { theme } = this.state;
    return (
      <label className="dark-switch">
        <input checked={theme === "dark"} type="checkbox" onChange={this.toggleDark} />
        <span className="slider">🌞 🌛</span>
      </label>
    );
  }
}

export default DarkModeSwitch;
