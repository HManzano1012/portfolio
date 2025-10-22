"use client";
import { Menu } from "./Menu";
import { Sections } from "./Sections";
import { useState, useEffect } from "react";

export const Portfolio = () => {
  const [currentActive, setCurrentActive] = useState(1);
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
      }
    };

    // Add event listener
    window.addEventListener("keydown", handleKeyDown);

    // Cleanup
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [links.length]);

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
