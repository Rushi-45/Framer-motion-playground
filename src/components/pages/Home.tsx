import { useEffect, useState } from "react";
import {
  animate,
  motion,
  useMotionValue,
  useMotionValueEvent,
  useTransform,
} from "framer-motion";
import "../../assets/styles/gradient.css";
import CardWithHeader from "./CardHeader";
import { Reveal } from "../common/Reveal";
import { initParticlesEngine } from "@tsparticles/react";
import { loadSlim } from "@tsparticles/slim";

const Home = () => {
  const experience = useMotionValue(0);
  const roundedExperience = useTransform(experience, Math.round);
  const [text, setText] = useState(
    `Hey, I'm Rushi and I have ${roundedExperience.get()} years of experience!`
  );
  useMotionValueEvent(roundedExperience, "change", (latest) => {
    setText(`Hey, I'm Rushi and I have ${latest} years of experience!`);
  });

  const [hovered, setHovered] = useState(false);
  const [init, setInit] = useState(false);

  // this should be run only once per application lifetime
  useEffect(() => {
    initParticlesEngine(async (engine) => {
      // you can initiate the tsParticles instance (engine) here, adding custom shapes or presets
      // this loads the tsparticles package bundle, it's the easiest method for getting everything ready
      // starting from v2 you can add only the features you need reducing the bundle size
      //await loadAll(engine);
      //await loadFull(engine);
      await loadSlim(engine);
      //await loadBasic(engine);
    }).then(() => {
      setInit(true);
    });

    const timeout = setTimeout(() => {
      const experienceAnimation = animate(experience, 3, { duration: 0.5 });
      return () => experienceAnimation.stop();
    }, 1000);

    return () => clearTimeout(timeout);
  }, []);
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
      className="text-center bg-primary text-secondary pt-8"
      initial={{ opacity: 0, y: -50 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 50 }}
      transition={{ duration: 0.5 }}
    >
      <motion.div
        className="text-center bg-primary text-secondary pt-8 flex flex-col items-center"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 50 }}
        transition={{ duration: 0.5 }}
      >
        <Reveal>
          <motion.h1
            className="text-4xl md:text-6xl font-bold mb-4"
            variants={containerVariants}
            initial="initial"
            whileHover="hover"
          >
            {splitText(text)}
          </motion.h1>
        </Reveal>
        <div className="flex justify-center mb-6">
          <CardWithHeader />
        </div>
        <motion.div
          className="colorful-button--wrapper mb-12"
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
            className={`download-resume bg-primary ${
              hovered ? "text-white" : "text-secondary"
            }`}
            style={{
              backgroundColor: hovered ? "transparent" : "#3B82F6",
              color: hovered ? "white" : "white",
            }}
          >
            <motion.div
              className="button-text primary"
              initial={{ y: 0 }}
              animate={{
                y: hovered ? -100 : 0,
                transition: { duration: 0.6 },
              }}
            >
              Download Resume
            </motion.div>
            <motion.div
              className="button-text secondary"
              initial={{ y: 100 }}
              animate={{
                y: hovered ? 0 : 100,
                transition: { duration: 0.6 },
              }}
            >
              Download Resume
            </motion.div>
          </motion.a>
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

export default Home;
