"use client";

import React, { useState, useEffect } from "react";
import experienceData from "@/data/experience.json";
import { useAccordion } from "./contexts/AccordionContext";

interface ExperienceItem {
  id: string;
  period: string;
  company: string;
  position: string;
  description: string;
  active: boolean;
  independent: boolean;
  company_contact?: {
    name: string;
    position: string;
    email: string;
    phone: string;
  };
  functions: string[];
  achievements: string[];
}

export const TUIAccordion = () => {
  const [activeItem, setActiveItem] = useState<string>("a");
  const { focusedPanel, setFocusedPanel, resetTrigger } = useAccordion();
  const experienceDataArray: ExperienceItem[] = experienceData;
  const rightPanelRef = React.useRef<HTMLDivElement>(null);
  const lastKeyTimeRef = React.useRef<number>(0);

  // Reset active item when resetTrigger changes
  useEffect(() => {
    setActiveItem("a");
    if (rightPanelRef.current) {
      rightPanelRef.current.scrollTop = 0;
    }
  }, [resetTrigger]);

  // Keyboard navigation for accordion
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      const now = Date.now();
      
      // Check if theme selector is open
      const themeModal = document.querySelector('[data-theme-modal]');
      if (themeModal) {
        return; // Don't process keyboard events if theme modal is open
      }

      // Check if help modal is open
      const helpModal = document.querySelector('[data-help-modal]');
      if (helpModal) {
        return; // Don't process keyboard events if help modal is open
      }

      // Check if we're in an input field or textarea
      if (event.target instanceof HTMLInputElement || event.target instanceof HTMLTextAreaElement) {
        return;
      }

      const currentIndex = experienceDataArray.findIndex(item => item.id === activeItem);
      
      if (event.key === "j" || event.key === "ArrowDown" || (event.ctrlKey && event.key === "n")) {
        event.preventDefault();
        
        // Debounce rapid key presses
        if (now - lastKeyTimeRef.current < 100) {
          return;
        }
        lastKeyTimeRef.current = now;
        
        if (focusedPanel === "right" && rightPanelRef.current) {
          // Scroll down in the right panel
          rightPanelRef.current.scrollBy({ top: 50, behavior: 'smooth' });
        } else {
          // Move down to next accordion item
          const nextIndex = currentIndex + 1;
          if (nextIndex < experienceDataArray.length) {
            setActiveItem(experienceDataArray[nextIndex].id);
            // Reset scroll position when changing accordion items
            if (rightPanelRef.current) {
              rightPanelRef.current.scrollTop = 0;
            }
          }
        }
      } else if (event.key === "k" || event.key === "ArrowUp" || (event.ctrlKey && event.key === "p")) {
        event.preventDefault();
        
        // Debounce rapid key presses
        if (now - lastKeyTimeRef.current < 100) {
          return;
        }
        lastKeyTimeRef.current = now;
        
        if (focusedPanel === "right" && rightPanelRef.current) {
          // Scroll up in the right panel
          rightPanelRef.current.scrollBy({ top: -50, behavior: 'smooth' });
        } else {
          // Move up to previous accordion item
          const prevIndex = currentIndex - 1;
          if (prevIndex >= 0) {
            setActiveItem(experienceDataArray[prevIndex].id);
            // Reset scroll position when changing accordion items
            if (rightPanelRef.current) {
              rightPanelRef.current.scrollTop = 0;
            }
          }
        }
      } else if (event.key === "h" || event.key === "ArrowLeft") {
        event.preventDefault();
        // Move to left panel (headers)
        setFocusedPanel("left");
      } else if (event.key === "l" || event.key === "ArrowRight") {
        event.preventDefault();
        // Move to right panel (body)
        setFocusedPanel("right");
      }
    };

    // Add event listener
    window.addEventListener("keydown", handleKeyDown);

    // Cleanup
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [activeItem, experienceDataArray, focusedPanel]);

  return (
    <div className="flex flex-col lg:flex-row gap-4 max-h-[70vh]">
      {/* Left Panel - Experience List */}
      <div className="w-full lg:w-1/3 lg:min-w-[300px]">
        <div className="p-2 h-full overflow-y-auto tui-scrollbar">
          <div className="text-lavender text-lg font-bold mb-4">
            ~/Experience
          </div>
          
          <div className="space-y-1">
            {experienceDataArray.map((item) => (
              <div
                key={item.id}
                className={`cursor-pointer p-2 transition-all duration-200 ${
                  activeItem === item.id
                    ? "text-base"
                    : "text-subtext0"
                } ${
                  activeItem === item.id 
                    ? (focusedPanel === "left" ? "bg-teal" : "bg-overlay0")
                    : ""
                }`}
                onClick={() => {
                  setActiveItem(item.id);
                  // Reset scroll position when clicking accordion items
                  if (rightPanelRef.current) {
                    rightPanelRef.current.scrollTop = 0;
                  }
                }}
              >
                <div className="flex items-center justify-between w-full">
                  <span className="font-mono text-sm flex-shrink-0">
                    {item.period}
                  </span>
                  <span className={`font-mono text-sm text-right ${
                    activeItem === item.id ? "text-base" : "text-green"
                  }`}>
                    {item.independent || item.company === "black" ? "-" : item.company}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Right Panel - Experience Details */}
      <div 
        className={`flex-1 ${focusedPanel === "right" ? "ring-1 ring-surface0" : ""}`}
      >
        <div ref={rightPanelRef} className="p-4 h-full overflow-y-auto tui-scrollbar">
          {experienceDataArray
            .filter((item) => item.id === activeItem)
            .map((item) => (
              <div key={item.id} className="space-y-3">
                {/* Company Header */}
                <div className="flex items-center gap-4">
                  <div className="text-green text-xl font-bold">
                    {item.independent || item.company === "black" ? "-" : item.company}
                  </div>
                </div>

                {/* Position */}
                <div className="text-lavender text-lg font-semibold">
                  {item.position}
                  {item.independent && <span className="text-yellow ml-2">(Freelance)</span>}
                </div>

                {/* Description */}
                <div className="text-subtext0 text-sm leading-relaxed">
                  {item.description}
                </div>

                {/* Functions Section */}
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-teal font-mono">
                    <span className="text-green">{'>'}</span>
                    <span>Functions</span>
                  </div>
                  
                  <div className="space-y-2 pl-4">
                    {item.functions.map((func, index) => (
                      <div key={index} className="flex items-start gap-3">
                        <span className="text-red text-sm mt-1">•</span>
                        <p className="text-subtext0 text-sm leading-relaxed">
                          {func}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Achievements Section */}
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-peach font-mono">
                    <span className="text-green">{'>'}</span>
                    <span>Achievements</span>
                  </div>
                  
                  <div className="space-y-2 pl-4">
                    {item.achievements.map((achievement, index) => (
                      <div key={index} className="flex items-start gap-3">
                        <span className="text-green text-sm mt-1">✓</span>
                        <p className="text-subtext0 text-sm leading-relaxed">
                          {achievement}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Company Contact */}
                {item.company_contact && (
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-mauve font-mono">
                      <span className="text-green">{'>'}</span>
                      <span>Reference Contact</span>
                    </div>
                    
                    <div className="pl-4 space-y-1">
                      <div className="text-subtext0 text-sm">
                        <span className="text-lavender font-semibold">{item.company_contact.name}</span>
                        <span className="text-subtext1 ml-2">({item.company_contact.position})</span>
                      </div>
                      <div className="text-subtext0 text-sm">
                        <span className="text-yellow nf-md-email text-yellow"></span> {item.company_contact.email}
                      </div>
                      <div className="text-subtext0 text-sm">
                        <span className="text-green nf-md-phone text-green"></span> {item.company_contact.phone}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};
