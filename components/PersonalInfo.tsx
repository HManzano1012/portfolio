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
      style={{
        position: "absolute",
        top: "50%",
        transform: "translateY(-50%)",
      }}
      className="text-sm md:text-md lg:text-lg"
    >
      <div
        className="border-surface1"
        style={{
          width: 200,
          height: 200,
          borderRadius: "50%",
          margin: "auto",
          borderWidth: 5,
          borderStyle: "solid",
        }}
      ></div>

      <div style={{ paddingTop: 50 }}>
        {personal_info.map((info) => (
          <div key={info.title} className="text-text">
            <div style={styleInfoText} className={`text-${info.icon_color}`}>
              <span className={`${info.icon} text-${info.icon_color}`}></span>
            </div>
            {info.value}
          </div>
        ))}
      </div>

      <div style={{ textAlign: "center", marginTop: 50 }}>
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
