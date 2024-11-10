import { AboutMe } from "./sections/AboutMe";

export const Sections = (props) => {
  return (
    <div className="mt-5 w-100 ">
      <section className={`${props.currentActive != 1 ? "hidden" : ""}`}>
        <AboutMe />
      </section>
      <section className={`${props.currentActive != 2 ? "hidden" : ""}`}>
        ecperience
      </section>
      <section className={`${props.currentActive != 3 ? "hidden" : ""}`}>
        educations
      </section>
      <section className={`${props.currentActive != 4 ? "hidden" : ""}`}>
        proyext
      </section>
    </div>
  );
};
