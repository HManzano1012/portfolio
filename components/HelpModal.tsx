"use client";
import React, { useState, useEffect } from "react";

export default function HelpModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [focusedKeybind, setFocusedKeybind] = useState(0);

  // Define keybinds for navigation
  const keybinds = [
    { key: "Tab / Shift+Tab", description: "Navigate between main sections" },
    { key: "j / k", description: "Navigate accordion items (up/down)" },
    { key: "h / l", description: "Switch between accordion panels (left/right)" },
    { key: "Enter", description: "Select item / Open accordion" },
    { key: "Shift + T", description: "Open theme selector" },
    { key: "?", description: "Show this help" },
    { key: "j / k", description: "Navigate themes" },
    { key: "Enter", description: "Select theme" },
    { key: "Esc", description: "Close theme selector" },
    { key: "j / k", description: "Scroll help content" },
    { key: "Esc", description: "Close help modal" },
    { key: "Esc", description: "Close any modal" }
  ];

  // Handle keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      // ? to open/close help modal
      if (event.key === "?") {
        event.preventDefault();
        setIsOpen(!isOpen);
      }
      // ESC to close
      else if (event.key === "Escape" && isOpen) {
        setIsOpen(false);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen]);

  // Handle navigation with j/k when modal is open
  useEffect(() => {
    const handleNavigationKeyDown = (event: KeyboardEvent) => {
      if (!isOpen) return;

      // Check if theme selector is open
      const themeModal = document.querySelector('[data-theme-modal]');
      if (themeModal) {
        return; // Don't process navigation events if theme modal is open
      }

      if (event.key === "j" || event.key === "k" || event.key === "ArrowDown" || event.key === "ArrowUp") {
        event.preventDefault();
        if (event.key === "j" || event.key === "ArrowDown") {
          setFocusedKeybind((prev) => (prev + 1) % keybinds.length);
        } else {
          setFocusedKeybind((prev) => (prev - 1 + keybinds.length) % keybinds.length);
        }
      }
    };

    window.addEventListener("keydown", handleNavigationKeyDown);
    return () => window.removeEventListener("keydown", handleNavigationKeyDown);
  }, [isOpen, keybinds.length]);

  // Auto-scroll to focused keybind
  useEffect(() => {
    if (isOpen) {
      const focusedElement = document.querySelector(`[data-keybind-index="${focusedKeybind}"]`);
      if (focusedElement) {
        focusedElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    }
  }, [focusedKeybind, isOpen]);

  return (
    <>
      {/* Help Button (hidden, only for accessibility) */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="sr-only"
        aria-label="Show help"
      >
        Help
      </button>

      {/* Help Modal Overlay */}
      {isOpen && (
        <>
          {/* Backdrop */}
          <div
            className="fixed inset-0 z-50 bg-black bg-opacity-50"
            onClick={() => setIsOpen(false)}
          />

          {/* Help Modal */}
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4" data-help-modal>
            <div className="bg-base border border-lavender w-full max-w-2xl">
              {/* Header */}
              <div className="px-4 py-3 border-b border-lavender bg-base">
                <div className="flex items-center gap-2 text-sm font-mono text-lavender">
                  <span className="nf-md-help-circle"></span>
                  <span>keyboard shortcuts</span>
                </div>
              </div>

              {/* Help Content */}
              <div className="py-4 px-4 max-h-[60vh] overflow-y-auto tui-scrollbar">
                <div className="space-y-1">
                  {keybinds.map((keybind, index) => (
                    <div
                      key={index}
                      data-keybind-index={index}
                      className={`flex items-center justify-between py-2 px-2 transition-colors duration-200 ${
                        index === focusedKeybind
                          ? "bg-mantle text-base"
                          : "hover:bg-surface1"
                      }`}
                    >
                      <span className="text-text font-mono">{keybind.key}</span>
                      <span className="text-subtext0">{keybind.description}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Footer */}
              <div className="px-4 py-3 border-t border-lavender bg-base">
                <div className="text-xs font-mono text-subtext0">
                  <span className="text-green">{'>'}</span> <span className="text-lavender">j/k</span> navigate, <span className="text-lavender">esc</span> close
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
}
