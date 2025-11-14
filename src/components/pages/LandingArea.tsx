import { motion } from "framer-motion";

const LandingArea = () => {
  const text = `Frontend Developer`;

  const splitText = (text: string) => {
    return text.split("").map((char, index) => (
      <motion.span
        key={index}
        variants={letterVariants}
        className="inline-block"
      >
        {char === " " ? <span className="inline-block w-2" /> : char}
      </motion.span>
    ));
  };

  const containerVariants = {
    hover: {
      transition: {
        staggerChildren: 0.02,
      },
    },
    initial: { y: 0 },
  };

  const letterVariants = {
    initial: { y: 0 },
    hover: {
      y: -15,
      transition: {
        type: "spring" as const,
        stiffness: 300,
        damping: 20,
      },
    },
  };

  return (
    <motion.h1
      className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold text-center mb-6 sm:mb-8 mt-2 sm:mt-4 flex justify-center items-center"
      variants={containerVariants}
      initial={{ opacity: 0, y: 200 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 0.5 }}
      whileHover="hover"
    >
      {splitText(text)}
    </motion.h1>
  );
};

export default LandingArea;
