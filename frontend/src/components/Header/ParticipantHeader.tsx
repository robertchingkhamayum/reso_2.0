import { scroller } from "react-scroll";
import { Link as RouterLink, useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { CgProfile } from "react-icons/cg";

const ParticipantHeader = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [activeSection, setActiveSection] = useState("");

  const handleNavClick = (section: "home" | "event" | "about") => {
    if (location.pathname !== "/") {
      navigate("/", { replace: true });

      setTimeout(() => {
        scroller.scrollTo(section, {
          smooth: true,
          duration: 500,
          offset: -70,
        });
      }, 50);
    } else {
      scroller.scrollTo(section, {
        smooth: true,
        duration: 500,
        offset: -70,
      });
    }
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  useEffect(() => {
    if (location.pathname !== "/") {
      setActiveSection(""); // Reset active section if not on home page
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { threshold: 0.6 } // Adjust for better tracking
    );

    const sections = document.querySelectorAll("section");
    sections.forEach((section) => observer.observe(section));

    return () => {
      sections.forEach((section) => observer.unobserve(section));
    };
  }, [location.pathname]);

  const sections: Array<"home" | "event" | "about"> = [
    "home",
    "event",
    "about",
  ];
  return (
    <nav className="fixed top-0 left-0 w-full p-4 pr-7 shadow flex justify-between border-b border-red-500 z-50 bg-zinc-900">
      <div className="text-white flex items-center">
        {sections.map((section) => (
          <span
            key={section}
            className={`ml-7 cursor-pointer transition duration-300 hover:text-red-400 ${
              location.pathname === "/" && activeSection === section
                ? "text-red-400 font-bold "
                : location.pathname !== "/"
                ? "text-white"
                : ""
            }`}
            onClick={() => handleNavClick(section)}
          >
            {section.charAt(0).toUpperCase() + section.slice(1)}
          </span>
        ))}
      </div>

      <div className="text-white flex items-center">
        <RouterLink
          to="/register"
          className={`mr-5 transition duration-300 hover:text-red-400 ${
            location.pathname === "/register"
              ? "text-red-400 font-bold "
              : "text-white"
          }`}
        >
          Register
        </RouterLink>
        <RouterLink
          to="/profile"
          className={`transition duration-300 hover:text-red-400 ${
            location.pathname === "/profile"
              ? "text-red-400 font-bold "
              : "text-white"
          }`}
        >
          <CgProfile className="size-7" />
        </RouterLink>
      </div>
    </nav>
  );
};

export default ParticipantHeader;
