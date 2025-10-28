"use client";

import { useState, useEffect, useRef } from "react";
import aboutMe from "@/data/about_me.json";
import technologies from "@/data/technologies.json";

const TypingAnimation = ({ text, onComplete }: { text: string; onComplete?: () => void }) => {
  const [displayedText, setDisplayedText] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const elementRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !isVisible) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (elementRef.current) {
      observer.observe(elementRef.current);
    }

    return () => observer.disconnect();
  }, [isVisible]);

  useEffect(() => {
    if (!isVisible) return;

    const handleScroll = () => {
      if (!elementRef.current) return;
      
      const elementRect = elementRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      
      // Calculate when element reaches lower 1/4 of screen
      const elementCenter = elementRect.top + elementRect.height / 2;
      const lowerQuarter = windowHeight * 0.75; // Lower 1/4 of screen
      
      // Calculate progress based on element position
      // When element center reaches lower 1/4 of screen, animation should be complete
      const distanceToLowerQuarter = Math.abs(elementCenter - lowerQuarter);
      const maxDistance = windowHeight / 2; // Maximum distance for full animation
      let scrollProgress = Math.max(0, Math.min(1, 1 - (distanceToLowerQuarter / maxDistance)));
      
      // Ensure animation completes when element is past the lower 1/4 of screen
      if (elementCenter <= lowerQuarter) {
        scrollProgress = 1;
      }
      
      // Calculate how many characters should be visible based on scroll progress
      const targetIndex = Math.floor(scrollProgress * text.length);
      
      if (targetIndex > currentIndex) {
        setCurrentIndex(targetIndex);
        setDisplayedText(text.slice(0, targetIndex));
        
        // Check if animation is complete
        if (targetIndex >= text.length && onComplete) {
          onComplete();
        }
      }
    };

    // Initial check
    handleScroll();
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [text, currentIndex, onComplete, isVisible]);

  return <div ref={elementRef}><span>{displayedText}</span></div>;
};

export const AboutMe = () => {
  const about_me_text = aboutMe.about_me_text;
  const skill_knowledge = aboutMe.skills;
  const technologiesData = technologies;
  const [isTitleComplete, setIsTitleComplete] = useState(false);
  const [isSkillsTitleComplete, setIsSkillsTitleComplete] = useState(false);
  const [isTechTitleComplete, setIsTechTitleComplete] = useState(false);

  return (
    <div>
      {/* Mobile-only title */}
      <div className="lg:hidden text-lavender text-lg font-bold mb-6 font-mono text-center">
        <TypingAnimation 
          text="~/.about_me" 
          onComplete={() => setIsTitleComplete(true)}
        />
      </div>
      
      {/* Description text - only show on mobile after title is complete */}
      <div className={`lg:hidden grid grid-cols-1 p-4 xl:p-10 text-center text-sm md:text-md xl:text-lg text-subtext1 transition-opacity duration-500 ${
        isTitleComplete ? 'opacity-100' : 'opacity-0'
      }`}>
        {about_me_text}
      </div>
      
      {/* Desktop description - always visible */}
      <div className="hidden lg:grid grid-cols-1 p-4 xl:p-10 text-center text-sm md:text-md xl:text-lg text-subtext1">
        {about_me_text}
      </div>
      
      {/* Mobile-only Skills title */}
      <div className="lg:hidden text-lg py-4 font-bold text-lavender font-mono text-center">
        <TypingAnimation 
          text="~/Skills and Knowlegde" 
          onComplete={() => setIsSkillsTitleComplete(true)}
        />
      </div>
      
      {/* Desktop Skills title - always visible */}
      <div className="hidden lg:block text-lg lg:text-sm xl:text-lg py-4 xl-py-7 font-bold text-lavender font-mono text-center lg:text-left">
        ~/Skills and Knowlegde
      </div>
      
      {/* Skills content - only show on mobile after skills title is complete */}
      <div className={`lg:hidden grid grid-cols-1 text-sm md:text-md xl:text-lg py-4 xl-py-7 transition-opacity duration-500 ${
        isSkillsTitleComplete ? 'opacity-100' : 'opacity-0'
      }`}>
        <div className="grid grid-cols-1 my-2 xl:my-4 px-0 lg:px-10">
          {skill_knowledge.map((skill) => (
            <div key={skill.id} className="py-2">
              <label className="font-bold text-subtext0">
                &gt; {skill.label}
              </label>
              <p className="px-5 text-md  text-subtext1">{skill.description}</p>
            </div>
          ))}
        </div>
      </div>
      
      {/* Desktop Skills content - always visible */}
      <div className="hidden lg:grid grid-cols-1 text-sm md:text-md xl:text-lg py-4 xl-py-7">
        <div className="grid grid-cols-1 my-2 xl:my-4 px-0 lg:px-10">
          {skill_knowledge.map((skill) => (
            <div key={skill.id} className="py-2">
              <label className="font-bold text-subtext0">
                &gt; {skill.label}
              </label>
              <p className="px-5 text-md  text-subtext1">{skill.description}</p>
            </div>
          ))}
        </div>
      </div>
      
      {/* Mobile-only Technology title */}
      <div className="lg:hidden text-lg py-4 font-bold text-lavender font-mono text-center">
        <TypingAnimation 
          text="~/Technology" 
          onComplete={() => setIsTechTitleComplete(true)}
        />
      </div>
      
      {/* Desktop Technology title - always visible */}
      <div className="hidden lg:block text-lg lg:text-sm xl:text-lg py-4 xl-py-7 font-bold text-lavender font-mono text-center lg:text-left">
        ~/Technology
      </div>
      
      {/* Technology content - only show on mobile after tech title is complete */}
      <div className={`lg:hidden grid grid-cols-2 text-sm md:text-md xl:text-lg py-2 xl-py-7 px-4 transition-opacity duration-500 ${
        isTechTitleComplete ? 'opacity-100' : 'opacity-0'
      }`}>
        {technologiesData.map((technology) => (
          <div key={technology.id} className="py-1">
            <div className="text-subtext1">
              <span
                className={`${technology.icon}  text-${technology.color}`}
              ></span>
              &nbsp;
              {technology.name}
            </div>
          </div>
        ))}
      </div>
      
      {/* Desktop Technology content - always visible */}
      <div className="hidden lg:grid grid-cols-2 md:grid-cols-4 xl:grid-cols-4 text-sm md:text-md xl:text-lg py-2 xl-py-7 px-4 lg:px-0">
        {technologiesData.map((technology) => (
          <div key={technology.id} className="py-1">
            <div className="text-subtext1">
              <span
                className={`${technology.icon}  text-${technology.color}`}
              ></span>
              &nbsp;
              {technology.name}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
