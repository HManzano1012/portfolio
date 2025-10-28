"use client";

import React, { useState, useEffect } from "react";
import educationData from "@/data/education.json";
import { useAccordion } from "./contexts/AccordionContext";

interface EducationItem {
  id: string;
  period: string;
  issuer: string;
  certificate_name: string;
  type: string;
  description: string;
  status: string;
  certificate_url?: string;
  course_url?: string;
  active: boolean;
}

export const TUIEducation = () => {
  const [activeItem, setActiveItem] = useState<string>("a");
  const { focusedPanel, setFocusedPanel } = useAccordion();
  const educationDataArray: EducationItem[] = educationData;
  const rightPanelRef = React.useRef<HTMLDivElement>(null);

  // Keyboard navigation for accordion
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
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

      const currentIndex = educationDataArray.findIndex(item => item.id === activeItem);
      
      if (event.key === "j" || event.key === "ArrowDown" || (event.ctrlKey && event.key === "n")) {
        event.preventDefault();
        if (focusedPanel === "right" && rightPanelRef.current) {
          // Scroll down in the right panel
          rightPanelRef.current.scrollBy({ top: 50, behavior: 'smooth' });
        } else {
          // Move down to next accordion item
          const nextIndex = currentIndex + 1;
          if (nextIndex < educationDataArray.length) {
            setActiveItem(educationDataArray[nextIndex].id);
            // Reset scroll position when changing accordion items
            if (rightPanelRef.current) {
              rightPanelRef.current.scrollTop = 0;
            }
          }
        }
      } else if (event.key === "k" || event.key === "ArrowUp" || (event.ctrlKey && event.key === "p")) {
        event.preventDefault();
        if (focusedPanel === "right" && rightPanelRef.current) {
          // Scroll up in the right panel
          rightPanelRef.current.scrollBy({ top: -50, behavior: 'smooth' });
        } else {
          // Move up to previous accordion item
          const prevIndex = currentIndex - 1;
          if (prevIndex >= 0) {
            setActiveItem(educationDataArray[prevIndex].id);
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
  }, [activeItem, educationDataArray, focusedPanel]);

  return (
    <div className="flex gap-4 max-h-[70vh]">
      {/* Left Panel - Education List */}
      <div className="w-1/3 min-w-[300px]">
        <div className="p-2 h-full overflow-y-auto tui-scrollbar">
          <div className="text-lavender text-lg font-bold mb-4">
            ~/Education
          </div>
          
          <div className="space-y-1">
            {educationDataArray.map((item) => (
              <div
                key={item.id}
                className={`cursor-pointer p-2 transition-all duration-200 ${
                  activeItem === item.id
                    ? "text-base"
                    : "hover:text-text text-subtext0"
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
                    {item.issuer}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Right Panel - Education Details */}
      <div 
        className={`flex-1 ${focusedPanel === "right" ? "ring-1 ring-surface0" : ""}`}
      >
        <div ref={rightPanelRef} className="p-4 h-full overflow-y-auto tui-scrollbar">
          {educationDataArray
            .filter((item) => item.id === activeItem)
            .map((item) => (
              <div key={item.id} className="space-y-3">
                {/* Issuer Header */}
                <div className="flex items-center gap-4">
                  <div className="text-green text-xl font-bold">
                    {item.issuer}
                  </div>
                </div>

                {/* Certificate Name */}
                <div className="text-lavender text-lg font-semibold">
                  {item.certificate_name}
                </div>

                {/* Type and Status */}
                <div className="flex items-center gap-4">
                  <div className="text-peach text-sm font-mono">
                    Type: {item.type}
                  </div>
                  <div className={`text-sm font-mono px-2 py-1 ${
                    item.status === "completed" 
                      ? "bg-green text-base" 
                      : "bg-yellow text-base"
                  }`}>
                    {item.status === "completed" ? " Completed" : " In Progress"}
                  </div>
                </div>

                {/* Description */}
                <div className="text-subtext0 text-sm leading-relaxed">
                  {item.description}
                </div>

                {/* Certificate URL */}
                {item.certificate_url && (
                  <div className="space-y-1">
                    <div className="flex items-center gap-2 text-teal font-mono">
                      <span className="text-green">{'>'}</span>
                      <span>Certificate</span>
                    </div>
                    <div className="pl-4">
                      <a 
                        href={item.certificate_url} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-blue hover:text-sky underline text-sm"
                      >
                         View Certificate PDF
                      </a>
                    </div>
                  </div>
                )}

                {/* Course URL */}
                {item.course_url && (
                  <div className="space-y-1">
                    <div className="flex items-center gap-2 text-mauve font-mono">
                      <span className="text-green">{'>'}</span>
                      <span>Course/Certificate Page</span>
                    </div>
                    <div className="pl-4">
                      <a 
                        href={item.course_url} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-blue hover:text-sky underline text-sm"
                      >
                         Visit Course Page
                      </a>
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
