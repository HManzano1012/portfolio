import ThemeSwitcher from "./ThemeSwitcher";

export const Menu = (props) => {
  const activeLink = `font-extrabold text-lavender border-lavender mx-1`;

  return (
    <div>
      <div className="hidden md:flex justify-between items-center w-full md:w-auto md:order-1">
        <div className="container mx-auto flex flex-wrap items-center justify-between  ">
          <ul className="flex-col md:flex-row flex text-sm lg:text-md ">
            {props.links.map((link) => (
              <li
                key={link.id}
                className={`border-b-2 py-2 px-6 w-100 ${
                  //
                  props.currentActive == link.id
                    ? activeLink
                    : `text-subtext1 border-subtext1 font-medium`
                }`}
                onClick={() => {
                  props.setCurrentActive(link.id);
                }}
              >
                <a href="#" aria-current="page">
                  {link.text}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};
