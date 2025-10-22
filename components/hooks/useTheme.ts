"use client";
import { useEffect, useState } from "react";

export type Theme = "latte" | "frappe" | "macchiato" | "mocha";

const themes: { [key in Theme]: { name: string; description: string } } = {
  latte: { name: "Latte", description: "Light theme" },
  frappe: { name: "Frappe", description: "Medium theme" },
  macchiato: { name: "Macchiato", description: "Dark theme" },
  mocha: { name: "Mocha", description: "Darkest theme" },
};

export default function useTheme() {
  const [theme, setTheme] = useState<Theme>("latte");
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    // Get theme from localStorage or default to latte
    const savedTheme = localStorage.getItem("theme") as Theme;
    if (savedTheme && themes[savedTheme]) {
      setTheme(savedTheme);
    }
    setIsLoaded(true);
  }, []);

  useEffect(() => {
    // Only apply theme after component is loaded
    if (!isLoaded) return;
    
    // Apply theme to document
    const root = window.document.documentElement;
    
    // Remove all theme classes
    Object.keys(themes).forEach((themeName) => {
      root.classList.remove(themeName);
    });
    
    // Add current theme class
    root.classList.add(theme);
    
    // Save to localStorage
    localStorage.setItem("theme", theme);
  }, [theme, isLoaded]);

  const changeTheme = (newTheme: Theme) => {
    setTheme(newTheme);
  };

  return {
    theme,
    themes,
    changeTheme,
    isLoaded,
  };
}
