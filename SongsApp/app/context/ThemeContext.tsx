import React, { createContext, useContext, useState } from "react";


const THEMES = {
  light: {
    background: "#FFF9F7",
    footer: "#F6D6DC",
    border: "#E8BFC8",
    text: "#3F3A3A",
    muted: "#8B7E7E",
    icon: "#3F3A3A",
    active: "#D9778F",
  },

  dark: {
    background: "#0f172a",
    footer: "#1e293b",
    border: "#334155",
    text: "#ffffff",
    muted: "#94a3b8",
    icon: "#ffffff",
    active: "#fbbf24",
  },
};


const ThemeContext = createContext<any>(null);



export function ThemeProvider({
  children,
}:{
  children:React.ReactNode;
}){


  const [theme,setTheme] =
    useState<"light"|"dark">("light");



  const toggleTheme = () => {

    setTheme(
      current =>
        current === "light"
        ? "dark"
        : "light"
    );

  };



  return (

    <ThemeContext.Provider
      value={{
        theme,
        colors:THEMES[theme],
        toggleTheme,
      }}
    >

      {children}

    </ThemeContext.Provider>

  );

}



export function useTheme(){

  return useContext(ThemeContext);

}