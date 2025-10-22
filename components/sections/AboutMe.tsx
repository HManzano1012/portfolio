import aboutMe from "@/data/about_me.json";
import technologies from "@/data/technologies.json";

export const AboutMe = () => {
  const about_me_text = aboutMe.about_me_text;
  const skill_knowledge = aboutMe.skills;
  const technologiesData = technologies;

  return (
    <div>
      <div className="grid grid-cols-1  p-4 xl:p-10 text-center text-sm md:text-md xl:text-lg text-subtext1">
        {about_me_text}
      </div>
      <span
        className={`text-sm md:text-md xl:text-lg py-4 xl-py-7 font-bold text-lavender`}
      >
        ~/Skills and Knowlegde
      </span>
      <div className="grid grid-cols-1 text-sm md:text-md xl:text-lg py-4 xl-py-7 ">
        <div className="grid grid-cols-1 my-2 xl:my-4 px-10">
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
      <span className="text-sm md:text-md xl:text-lg py-4 xl-py-7 font-bold text-lavender">
        ~/Technology
      </span>
      <div className="grid grid-cols-1 md:grid-cols-4 xl:grid-cols-4  text-sm md:text-md xl:text-lg py-2 xl-py-7 ">
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
