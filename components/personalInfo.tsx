import { flavors, flavorEntries, version } from "@catppuccin/palette";
import Image from "next/image";
import Link from "next/link";
import data from "@/data/data.json";

export const PersonalInfo = () => {
  const styleInfoText = {
    width: 60,
    display: "inline-block",
    textAlign: "center",
  };
  const personal_info = data.personal_info;
  const personal_social_media = data.socials;

  const icon_colors = {
    sky: flavors.macchiato.colors.sky.hex,
    green: flavors.macchiato.colors.green.hex,
    yellow: flavors.macchiato.colors.yellow.hex,
    lavender: flavors.macchiato.colors.lavender.hex,
    blue: flavors.macchiato.colors.blue.hex,
    pink: flavors.macchiato.colors.pink.hex,
    red: flavors.macchiato.colors.red.hex,
    text: flavors.macchiato.colors.text.hex,
    sapphire: flavors.macchiato.colors.sapphire.hex,
  };

  return (
    <div
      style={{
        fontSize: 20,
        position: "absolute",
        top: "50%",
        transform: "translateY(-50%)",
      }}
    >
      <Image
        src="/profile.jpg"
        width={200}
        height={200}
        style={{
          maxWidth: 200,
          borderRadius: "50%",
          margin: "auto",
          overflow: "hidden",
          borderWidth: 5,
          borderColor: "#303347",
        }}
        alt="Profile photo"
      />

      <div style={{ paddingTop: 50 }}>
        {personal_info.map((info) => (
          <div key={info.title}>
            <div style={styleInfoText}>
              <span
                className={info.icon}
                style={{ color: icon_colors[info.icon_color] }}
              ></span>
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
              className={social_media.icon}
              style={{ color: icon_colors[social_media.icon_color] }}
            ></span>
          </Link>
        ))}
      </div>
    </div>
  );
};
