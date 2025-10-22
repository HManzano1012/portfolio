"use client";
import { Menu } from "./Menu";
import { Sections } from "./Sections";
import { useState } from "react";

export const Portfolio = () => {
  const [currentActive, setCurrentActive] = useState(1);
  const links = [
    { id: 1, text: "[1] ~/Me" },
    { id: 2, text: "[2] ~/Experience" },
    { id: 3, text: "[3] ~/Education" },
    { id: 4, text: "[4] ~/Project" },
  ];
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
