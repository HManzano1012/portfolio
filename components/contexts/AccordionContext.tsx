"use client";
import React, { createContext, useContext, useState, ReactNode } from "react";

interface AccordionContextType {
  focusedPanel: "left" | "right";
  setFocusedPanel: (panel: "left" | "right") => void;
  resetFocusedPanel: () => void;
}

const AccordionContext = createContext<AccordionContextType | undefined>(undefined);

export const AccordionProvider = ({ children }: { children: ReactNode }) => {
  const [focusedPanel, setFocusedPanel] = useState<"left" | "right">("left");

  const resetFocusedPanel = () => {
    setFocusedPanel("left");
  };

  return (
    <AccordionContext.Provider value={{ focusedPanel, setFocusedPanel, resetFocusedPanel }}>
      {children}
    </AccordionContext.Provider>
  );
};

export const useAccordion = () => {
  const context = useContext(AccordionContext);
  if (context === undefined) {
    throw new Error("useAccordion must be used within an AccordionProvider");
  }
  return context;
};
