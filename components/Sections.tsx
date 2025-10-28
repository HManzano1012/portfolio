import { AboutMe } from "./sections/AboutMe";
import { TUIAccordion } from "./TUIAccordion";
import { TUIEducation } from "./TUIEducation";
import { TUIProjects } from "./TUIProjects";

export const Sections = (props) => {
  return (
    <div className="mt-5 w-100 ">
      <section className={`${props.currentActive != 1 ? "hidden" : ""}`}>
        <AboutMe />
      </section>
      <section className={`${props.currentActive != 2 ? "hidden" : ""} max-h-[70vh]`}>
        <TUIAccordion />
      </section>
      <section className={`${props.currentActive != 3 ? "hidden" : ""} max-h-[70vh]`}>
        <TUIEducation />
      </section>
      <section className={`${props.currentActive != 4 ? "hidden" : ""} max-h-[70vh]`}>
        <TUIProjects />
      </section>
    </div>
  );
};
