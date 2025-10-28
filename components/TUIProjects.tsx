"use client";

import React, { useState, useEffect } from "react";
import projectsData from "@/data/projects.json";
import { useAccordion } from "./contexts/AccordionContext";

interface Technology {
  id: number;
  name: string;
  icon: string;
  level: string;
  color: string;
}

interface ProjectItem {
  id: string;
  name: string;
  repository: string;
  description: string;
  technologies: Technology[];
  features: string[];
  status: string;
  demo_url?: string;
}

export const TUIProjects = () => {
  const [activeItem, setActiveItem] = useState<string>("a");
  const { focusedPanel, setFocusedPanel, resetTrigger } = useAccordion();
  const projectsDataArray: ProjectItem[] = projectsData;
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

      const currentIndex = projectsDataArray.findIndex(item => item.id === activeItem);
      
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
          if (nextIndex < projectsDataArray.length) {
            setActiveItem(projectsDataArray[nextIndex].id);
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
            setActiveItem(projectsDataArray[prevIndex].id);
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
  }, [activeItem, projectsDataArray, focusedPanel]);

  return (
    <div className="flex gap-4 max-h-[70vh]">
      {/* Left Panel - Projects List */}
      <div className="w-1/3 min-w-[300px]">
        <div className="p-2 h-full overflow-y-auto tui-scrollbar">
          <div className="text-lavender text-lg font-bold mb-4">
            ~/Projects
          </div>
          
          <div className="space-y-1">
            {projectsDataArray.map((item) => (
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
                    {item.name}
                  </span>
                  <span className={`font-mono text-sm text-right ${
                    activeItem === item.id ? "text-base" : "text-green"
                  }`}>
                    {item.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Right Panel - Project Details */}
      <div 
        className={`flex-1 ${focusedPanel === "right" ? "ring-1 ring-surface0" : ""}`}
      >
        <div ref={rightPanelRef} className="p-4 h-full overflow-y-auto tui-scrollbar">
          {projectsDataArray
            .filter((item) => item.id === activeItem)
            .map((item) => (
              <div key={item.id} className="space-y-3">
                {/* Project Header */}
                <div className="flex items-center gap-4">
                  <div className="text-green text-xl font-bold">
                    {item.name}
                  </div>
                  <div className={`px-2 py-1 rounded text-xs font-mono ${
                    item.status === "completed" 
                      ? "bg-green text-base" 
                      : item.status === "in progress"
                      ? "bg-yellow text-base"
                      : "bg-red text-base"
                  }`}>
                    {item.status}
                  </div>
                </div>

                {/* Description */}
                <div className="text-subtext0 text-sm leading-relaxed">
                  {item.description}
                </div>

                {/* Repository Link */}
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-teal font-mono">
                    <span className="text-green">{'>'}</span>
                    <span>Repository</span>
                  </div>
                  
                  <div className="pl-4">
                    <a 
                      href={item.repository} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-blue hover:text-sapphire underline text-sm"
                    >
                      <span className="nf-fa-github_alt text-pink"></span> {item.repository}
                    </a>
                  </div>
                </div>

                {/* Demo Link */}
                {item.demo_url && (
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-peach font-mono">
                      <span className="text-green">{'>'}</span>
                      <span>Live Demo</span>
                    </div>
                    
                    <div className="pl-4">
                      <a 
                        href={item.demo_url} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-blue hover:text-sapphire underline text-sm"
                      >
                        <span className="nf-md-web text-sapphire"></span> {item.demo_url}
                      </a>
                    </div>
                  </div>
                )}

                {/* Technologies Section */}
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-mauve font-mono">
                    <span className="text-green">{'>'}</span>
                    <span>Technologies</span>
                  </div>
                  
                  <div className="pl-4 flex flex-wrap gap-2">
                    {item.technologies.map((tech, index) => (
                      <div 
                        key={index} 
                        className={`px-2 py-1 rounded text-xs font-mono bg-surface1 text-${tech.color} flex items-center gap-1`}
                      >
                        <span className={tech.icon}></span>
                        <span>{tech.name}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Features Section */}
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-peach font-mono">
                    <span className="text-green">{'>'}</span>
                    <span>Key Features</span>
                  </div>
                  
                  <div className="space-y-2 pl-4">
                    {item.features.map((feature, index) => (
                      <div key={index} className="flex items-start gap-3">
                        <span className="text-green text-sm mt-1">•</span>
                        <p className="text-subtext0 text-sm leading-relaxed">
                          {feature}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};
