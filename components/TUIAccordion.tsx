"use client";

import { useState } from "react";
import data from "@/data/data.json";

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
  const experienceData: ExperienceItem[] = data.experience_section;

  return (
    <div className="flex gap-4 max-h-[70vh]">
      {/* Left Panel - Experience List */}
      <div className="w-1/3 min-w-[300px]">
        <div className="p-2 h-full overflow-y-auto">
          <div className="text-lavender text-lg font-bold mb-4">
            ~/Experience
          </div>
          
          <div className="space-y-1">
            {experienceData.map((item) => (
              <div
                key={item.id}
                className={`cursor-pointer p-2 transition-all duration-200 ${
                  activeItem === item.id
                    ? "bg-teal text-base"
                    : "hover:text-text text-subtext0"
                }`}
                onClick={() => setActiveItem(item.id)}
              >
                <div className="flex items-center justify-between w-full">
                  <span className="font-mono text-sm flex-shrink-0">
                    [{item.id}] {item.period}
                  </span>
                  <span className={`font-mono text-sm flex-shrink-0 ${
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
      <div className="flex-1">
        <div className="p-4 h-full overflow-y-auto scrollbar-thin scrollbar-thumb-surface1 scrollbar-track-transparent">
          {experienceData
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
