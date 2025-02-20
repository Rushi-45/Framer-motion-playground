import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Link } from "react-scroll";

const sections = ["home", "about", "projects", "skills", "contact"];

const Header = () => {
  const [active, setActive] = useState("home");

  useEffect(() => {
    const handleScroll = () => {
      const currentSection = sections.find((section) => {
        const el = document.getElementById(section);
        if (!el) return false;
        const rect = el.getBoundingClientRect();
        return (
          rect.top <= window.innerHeight / 2 &&
          rect.bottom >= window.innerHeight / 2
        );
      });

      if (currentSection) setActive(currentSection);
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <header className="fixed top-4 left-1/2 transform -translate-x-1/2 flex justify-center z-50">
      <nav className="relative flex items-center space-x-2 rounded-full border border-white/10 bg-white/10 px-6 py-2 backdrop-blur-md shadow-lg">
        {sections.map((section) => (
          <motion.div
            key={section}
            className="relative cursor-pointer flex flex-col items-center"
            onClick={() => setActive(section)}
          >
            {active === section && (
              <motion.div
                layoutId="tubeLight"
                className="absolute -top-3 left-[30%]  h-1 w-8 bg-white rounded-full shadow-[0px_5px_15px_3px_rgba(255,255,255,0.9)]"
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
              />
            )}

            {active === section && (
              <motion.div
                layoutId="activeIndicator"
                className="absolute inset-0 -z-10 bg-white/20 rounded-full"
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
              />
            )}

            <Link
              to={section}
              smooth={true}
              duration={500}
              offset={-70}
              spy={true}
              className={`relative px-4 py-1.5 text-sm font-light transition-colors ${
                active === section
                  ? "text-white font-semibold"
                  : "text-white/70 hover:text-white/90"
              }`}
            >
              {section.charAt(0).toUpperCase() + section.slice(1)}
            </Link>
          </motion.div>
        ))}

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="relative px-4 py-1.5 text-sm font-light text-white/90 bg-white/10 rounded-full transition-all duration-300 hover:bg-white/15"
        >
          Book a Call
          <motion.div className="absolute bottom-0 h-1/3 w-full rounded-full bg-white opacity-30 blur-sm" />
        </motion.button>
      </nav>
    </header>
  );
};

export default Header;
