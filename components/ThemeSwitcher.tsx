"use client";
import React, { useState, useEffect } from "react";
import useTheme, { Theme } from "./hooks/useTheme";

export default function ThemeSwitcher() {
  const { theme, themes, changeTheme, isLoaded } = useTheme();
  const [isOpen, setIsOpen] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(0);

  const themeKeys = Object.keys(themes) as Theme[];

  const handleThemeChange = (newTheme: Theme) => {
    changeTheme(newTheme);
    setIsOpen(false);
  };

  // Update selectedIndex when theme changes (only when not navigating with keyboard)
  useEffect(() => {
    if (isLoaded && !isOpen) {
      const currentIndex = themeKeys.findIndex(key => key === theme);
      setSelectedIndex(currentIndex >= 0 ? currentIndex : 0);
    }
  }, [theme, isLoaded, themeKeys, isOpen]);

  // Handle keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (!isOpen) return;

      // Prevent default for navigation keys
      if (["j", "k", "Enter", "Escape"].includes(event.key)) {
        event.preventDefault();
      }

      switch (event.key) {
        case "j":
        case "ArrowDown":
          setSelectedIndex((prev) => (prev + 1) % themeKeys.length);
          break;
        case "k":
        case "ArrowUp":
          setSelectedIndex((prev) => (prev - 1 + themeKeys.length) % themeKeys.length);
          break;
        case "Enter":
          handleThemeChange(themeKeys[selectedIndex]);
          break;
        case "Escape":
          setIsOpen(false);
          break;
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, selectedIndex, themeKeys]);

  // Handle Shift + T to open/close
  useEffect(() => {
    const handleShiftT = (event: KeyboardEvent) => {
      if (event.shiftKey && event.key === "T") {
        event.preventDefault();
        if (!isOpen) {
          // Set selected index to current theme when opening
          const currentIndex = themeKeys.findIndex(key => key === theme);
          setSelectedIndex(currentIndex >= 0 ? currentIndex : 0);
        }
        setIsOpen(!isOpen);
      }
    };

    window.addEventListener("keydown", handleShiftT);
    return () => window.removeEventListener("keydown", handleShiftT);
  }, [isOpen, theme, themeKeys]);

  return (
    <>
      {/* TUI Theme Button (hidden, only for accessibility) */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="sr-only"
        aria-label="Change theme"
      >
        Theme Selector
      </button>

      {/* TUI Modal Overlay */}
      {isOpen && (
        <>
          {/* Backdrop */}
          <div
            className="fixed inset-0 z-50 bg-black bg-opacity-50"
            onClick={() => setIsOpen(false)}
          />
          
          {/* TUI Modal */}
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <div className="bg-base border border-green w-full max-w-md">
              {/* Header */}
              <div className="px-4 py-3 border-b border-green bg-base">
                <div className="flex items-center gap-2 text-sm font-mono text-green">
                  <span className="nf-md-palette"></span>
                  <span>themes</span>
                </div>
              </div>
              
              {/* Theme Options */}
              <div className="py-2">
                {Object.entries(themes).map(([themeKey, themeInfo], index) => (
                  <button
                    key={themeKey}
                    onClick={() => handleThemeChange(themeKey as Theme)}
                    className={`w-full px-4 py-3 text-left text-sm font-mono transition-colors duration-200 flex items-center justify-between ${
                      index === selectedIndex
                        ? "bg-lavender text-base"
                        : "text-text hover:bg-surface1"
                    }`}
                  >
                  <div className="flex items-center gap-3">
                    <div>
                      <div className="font-semibold">{themeKey}</div>
                    </div>
                  </div>
                    {theme === themeKey && (
                      <span className="nf-fa-check text-green"></span>
                    )}
                  </button>
                ))}
              </div>
              
              {/* Footer */}
              <div className="px-4 py-3 border-t border-green bg-base">
                <div className="text-xs font-mono text-subtext0">
                  <span className="text-green">{'>'}</span> <span className="text-lavender">j/k</span> navigate, <span className="text-lavender">enter</span> select, <span className="text-lavender">esc</span> close
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
}
