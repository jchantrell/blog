import { useState } from "react";

const themeLoader = () => {
  const lightTheme = { bgColor: "#FFFEFE", spinColor: "#1F2937" };
  const darkTheme = { bgColor: "#2A303C", spinColor: "#FFFEFE" };
  if (typeof localStorage !== "undefined") {
    let theme = localStorage.getItem("theme");
    if (theme == "light") {
      return lightTheme;
    } else if (theme == "dark") {
      return darkTheme;
    } else {
      if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
        return darkTheme;
      } else {
        return lightTheme;
      }
    }
  }
};

export default themeLoader;
