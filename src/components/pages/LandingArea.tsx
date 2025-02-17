import { useScroll, useTransform, motion } from "framer-motion";
import React, { useEffect, useRef, useState } from "react";
import { Reveal } from "../common/Reveal";

const LandingArea = () => {
  const [text, setText] = useState(`Hey, I'm Rushi`);

  // Function to split the text into individual letters
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

  // Variants for parent container
  const containerVariants = {
    hover: {
      transition: {
        staggerChildren: 0.02,
      },
    },
  };

  // Variants for each letter
  const letterVariants = {
    initial: { y: 0 },
    hover: {
      y: -10,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 20,
      },
    },
  };

  return (
    <>
      <Reveal>
        <motion.h1
          className="text-4xl md:text-6xl font-bold mb-4 mt-8 flex justify-center items-center"
          variants={containerVariants}
          initial="initial"
          whileHover="hover"
        >
          {splitText(text)}
        </motion.h1>
      </Reveal>
    </>
  );
};

export default LandingArea;
