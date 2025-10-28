import Link from "next/link";
import personalInfo from "@/data/personal_info.json";
import socials from "@/data/socials.json";

export const PersonalInfo = () => {
  const styleInfoText = {
    width: 60,
    display: "inline-block",
    alignItems: "center",
  };

  const personal_info = personalInfo;
  const personal_social_media = socials;

  return (
    <div
      className="lg:absolute lg:top-1/2 lg:transform lg:-translate-y-1/2 w-full lg:w-auto h-screen lg:h-auto flex flex-col justify-center items-center"
      style={{
        position: "static",
        top: "auto",
        transform: "none",
      }}
    >
      <div
        className="border-surface1 mx-auto w-32 h-32 lg:w-48 lg:h-48 mb-8 lg:mb-0"
        style={{
          borderRadius: "50%",
          borderWidth: 5,
          borderStyle: "solid",
        }}
      ></div>

      <div className="pt-0 lg:pt-8">
        {personal_info.map((info) => (
          <div key={info.title} className="text-text">
            <div style={styleInfoText} className={`text-${info.icon_color}`}>
              <span className={`${info.icon} text-${info.icon_color}`}></span>
            </div>
            {info.value}
          </div>
        ))}
      </div>

      <div style={{ textAlign: "center", marginTop: 30 }}>
        {personal_social_media.map((social_media) => (
          <Link
            href={social_media.value}
            target="__blank"
            style={{ marginLeft: 20 }}
            key={social_media.title}
          >
            <span
              className={`${social_media.icon} text-${social_media.icon_color}`}
            ></span>
          </Link>
        ))}
      </div>
    </div>
  );
};
