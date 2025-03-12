export const sections = ["home", "about", "projects", "skills", "contact"];

export const sidebarVariants = {
  open: {
    clipPath: `circle(150% at 40px 40px)`,
    transition: {
      type: "spring",
      stiffness: 20,
      restDelta: 2,
    },
  },
  closed: {
    clipPath: "circle(30px at 40px 40px)",
    transition: {
      delay: 0.2,
      type: "spring",
      stiffness: 400,
      damping: 40,
    },
  },
  exit: {
    clipPath: "circle(0px at 40px 40px)",
    transition: {
      duration: 0.5,
      ease: "easeInOut",
    },
  },
};
