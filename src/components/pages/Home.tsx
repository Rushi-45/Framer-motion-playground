import React, { useState } from "react";
import { motion } from "framer-motion";
import "../../assets/styles/gradient.css";

const Home = () => {
  const text = "Welcome to My Portfolio";
  const [hovered, setHovered] = useState(false);

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

  return (
    <motion.div
      className="text-center"
      initial={{ opacity: 0, y: -50 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 50 }}
      transition={{ duration: 0.5 }}
    >
      <motion.h1
        className="text-4xl md:text-6xl font-bold mb-4"
        variants={containerVariants}
        initial="initial"
        whileHover="hover"
      >
        {splitText(text)}
      </motion.h1>
      <motion.div
        className="flex justify-center mb-6"
        animate={{
          y: ["0px", "15px", "0px"],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          repeatType: "loop",
        }}
      >
        <div className="bg-white rounded-lg shadow-lg p-6 max-w-sm flex flex-col items-center">
          <img
            src="https://via.placeholder.com/150"
            alt="Profile"
            className="w-32 h-32 rounded-full mb-4"
          />
          <h2 className="text-2xl font-semibold mb-2">Your Name</h2>
          <p className="text-lg mb-4">Your Job Title</p>
          <p className="text-base text-gray-700">Based in Your Location</p>
        </div>
      </motion.div>
      <motion.div
        className="colorful-button--wrapper"
        onHoverStart={() => setHovered(true)}
        onHoverEnd={() => setHovered(false)}
        whileHover={{
          transition: { duration: 0.6 },
        }}
        whileTap={{ scale: 0.9 }}
      >
        <div className="colorful-button--color red"></div>
        <div className="colorful-button--color orange"></div>
        <div className="colorful-button--color yellow"></div>
        <div className="colorful-button--color green"></div>
        <motion.a
          href="#"
          className="download-resume"
          style={{
            backgroundColor: hovered ? "transparent" : "#3B82F6",
            color: hovered ? "white" : "white",
          }}
        >
          <motion.div
            className="button-text primary"
            initial={{ y: 0 }}
            animate={{ y: hovered ? -100 : 0, transition: { duration: 0.6 } }}
          >
            Download Resume
          </motion.div>
          <motion.div
            className="button-text secondary"
            initial={{ y: 100 }}
            animate={{ y: hovered ? 0 : 100, transition: { duration: 0.6 } }}
          >
            Download Resume
          </motion.div>
        </motion.a>
      </motion.div>
    </motion.div>
  );
};

export default Home;
