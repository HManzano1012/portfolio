"use client";
import { Menu } from "./Menu";
import { Sections } from "./Sections";
import { AccordionProvider, useAccordion } from "./contexts/AccordionContext";
import { useState, useEffect } from "react";

const PortfolioContent = () => {
  const [currentActive, setCurrentActive] = useState(1);
  const { resetFocusedPanel, resetAccordionItems } = useAccordion();
  const links = [
    { id: 1, text: "[1] ~/Me" },
    { id: 2, text: "[2] ~/Experience" },
    { id: 3, text: "[3] ~/Education" },
    { id: 4, text: "[4] ~/Project" },
  ];

  // Keyboard navigation for sections
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Tab") {
        // Check if any popup is open
        const themeModal = document.querySelector('[data-theme-modal]');
        const helpModal = document.querySelector('[data-help-modal]');
        
        if (themeModal || helpModal) {
          return; // Don't process Tab navigation if any popup is open
        }
        
        event.preventDefault();
        
        if (event.shiftKey) {
          // Shift + Tab: Go to previous section
          setCurrentActive((prev) => {
            const newIndex = prev - 1;
            return newIndex < 1 ? links.length : newIndex;
          });
        } else {
          // Tab: Go to next section
          setCurrentActive((prev) => {
            const newIndex = prev + 1;
            return newIndex > links.length ? 1 : newIndex;
          });
        }
        
        // Reset focused panel and accordion items when changing sections
        resetAccordionItems();
      }
    };

    // Add event listener
    window.addEventListener("keydown", handleKeyDown);

    // Cleanup
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [links.length, resetFocusedPanel]);

  return (
    <div>
      <section className="py-8">
        <Menu
          links={links}
          currentActive={currentActive}
          setCurrentActive={setCurrentActive}
        />
        <Sections currentActive={currentActive} />
      </section>
    </div>
  );
};

export const Portfolio = () => {
  return (
    <AccordionProvider>
      <PortfolioContent />
    </AccordionProvider>
  );
};
