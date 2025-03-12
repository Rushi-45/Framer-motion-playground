import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-scroll";
import { FiMenu, FiX } from "react-icons/fi";
import { sections, sidebarVariants } from "../../constants/headers";

const itemVariants = {
  hidden: { opacity: 0, x: -20 },
  visible: (i: number) => ({
    opacity: 1,
    x: 0,
    transition: { delay: i * 0.1, duration: 0.5, ease: "easeOut" },
  }),
};

const Header = () => {
  const [active, setActive] = useState("home");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleBookCall = () => {
    window.open("https://calendly.com/rushi-positive", "_blank");
  };

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

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsMobileMenuOpen(false);
      }
    };

    const handleClickOutside = (event: MouseEvent) => {
      if (
        isMobileMenuOpen &&
        event.target instanceof HTMLElement &&
        !event.target.closest(".mobile-menu")
      ) {
        setIsMobileMenuOpen(false);
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    document.addEventListener("click", handleClickOutside);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.removeEventListener("click", handleClickOutside);
    };
  }, [isMobileMenuOpen]);

  return (
    <header className="fixed top-4 left-1/2 transform -translate-x-1/2 flex justify-between items-center w-full px-6 md:px-0 md:justify-center z-[1000]">
      <motion.button
        className="md:hidden absolute left-6 top-3 text-white text-2xl z-[1001]"
        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        animate={{ rotate: isMobileMenuOpen ? 180 : 0 }}
        transition={{ duration: 0.3 }}
      >
        <motion.div
          animate={{ rotate: isMobileMenuOpen ? 90 : 0 }}
          transition={{ duration: 0.3 }}
        >
          {isMobileMenuOpen ? <FiX /> : <FiMenu />}
        </motion.div>
      </motion.button>

      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.nav
            initial="closed"
            animate="open"
            exit="exit"
            variants={sidebarVariants}
            className="fixed pt-16 -top-4 -left-[4px] h-screen w-64 bg-gradient-to-br from-black/80 to-gray-900/90 text-white flex flex-col items-start p-8 rounded-lg backdrop-blur-lg shadow-xl border border-white/10 mobile-menu"
          >
            {sections.map((section, i) => (
              <motion.div
                key={section}
                className="relative cursor-pointer my-2"
                custom={i}
                initial="hidden"
                animate="visible"
                exit="hidden"
                variants={itemVariants}
                onClick={() => {
                  setActive(section);
                  setIsMobileMenuOpen(false);
                }}
              >
                {active === section && (
                  <motion.div
                    layout
                    initial={{ y: -6, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: 6, opacity: 0 }}
                    className="absolute -left-4 top-[2px] h-6 w-[6px] bg-white/90 rounded-md shadow-[0px_0px_15px_3px_rgba(255,255,255,0.9)]"
                    transition={{ type: "spring", stiffness: 300, damping: 20 }}
                  />
                )}
                <Link
                  to={section}
                  smooth={true}
                  duration={500}
                  offset={-70}
                  spy={true}
                  className={`text-lg font-medium transition-colors ${
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
              className="relative px-6 py-2 mt-4 text-sm font-medium text-white border border-white/30 rounded-full transition-all duration-300 hover:bg-white/20"
              onClick={handleBookCall}
            >
              <div
                className={`text-[#b5b5b5a4] bg-clip-text inline-block ${"animate-shine"} `}
                style={{
                  backgroundImage:
                    "linear-gradient(120deg, rgba(255, 255, 255, 0) 40%, rgba(255, 255, 255, 0.8) 50%, rgba(255, 255, 255, 0) 60%)",
                  backgroundSize: "200% 100%",
                  WebkitBackgroundClip: "text",
                  animationDuration: "2s",
                }}
              >
                Book a Call
              </div>
            </motion.button>
          </motion.nav>
        )}
      </AnimatePresence>

      <nav className="hidden md:flex relative items-center space-x-2 rounded-full border border-white/10 bg-white/10 px-6 py-2 backdrop-blur-md shadow-lg">
        {sections.map((section) => (
          <motion.div
            key={section}
            className="relative cursor-pointer flex flex-col items-center"
            onClick={() => setActive(section)}
          >
            {active === section && (
              <motion.div
                layoutId="tubeLight"
                className="absolute -top-3 left-[30%] h-1 w-8 bg-white rounded-full shadow-[0px_5px_15px_3px_rgba(255,255,255,0.9)]"
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
          onClick={handleBookCall}
        >
          Book a Call
          <motion.div className="absolute bottom-0 h-1/3 w-full rounded-full bg-white opacity-30 blur-sm" />
        </motion.button>
      </nav>
    </header>
  );
};

export default Header;
