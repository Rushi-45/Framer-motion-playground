import { useRef, useState } from "react";
import {
  motion,
  useInView,
  useScroll,
  useSpring,
  useTransform,
} from "framer-motion";
import "../../assets/styles/gradient.css";
import LandingArea from "./LandingArea";
import spinner from "../../assets/images/spinner.webp";

interface HomeProps {
  contactEnter: (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
  contactLeave: (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
}

const Home: React.FC<HomeProps> = ({ contactEnter, contactLeave }) => {
  const [hovered, setHovered] = useState(false);

  const containerRef = useRef(null);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const scrollRotation = useTransform(scrollYProgress, [0, 1], [0, 720]);

  const smoothRotation = useSpring(scrollRotation, {
    stiffness: 50,
    damping: 20,
  });

  return (
    <motion.div
      className="text-center text-secondary pt-12 min-h-screen flex flex-col justify-center items-center px-4 md:px-8"
      initial={{ opacity: 0, y: -50 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 50 }}
      transition={{ duration: 0.5 }}
      ref={containerRef}
    >
      <div className="flex flex-col justify-center items-center">
        <motion.div
          className="transform"
          initial={{ y: "-1rem" }}
          animate={{ y: 0 }}
          transition={{ duration: 1 }}
          onMouseEnter={contactEnter}
          onMouseLeave={contactLeave}
        >
          <motion.h1 className="inline-block px-4 py-1 mt-12 text-sm text-white bg-[#1e1e1e]/80 border border-[#333] rounded-full backdrop-blur-xs">
            Hello, I'm Rushi 👋
          </motion.h1>
        </motion.div>

        <LandingArea />

        <motion.img
          src={spinner}
          alt="Rotating Flower"
          className="w-60 h-60 sm:w-[20rem] sm:h-80 md:w-120 md:h-120 lg:w-140 lg:h-140"
          style={{ rotate: smoothRotation }}
          transition={{ duration: 2, ease: "easeInOut" }}
        />
      </div>

      <motion.div
        ref={ref}
        className="colorful-button--wrapper mt-6 mb-12 flex justify-center w-full"
        transition={{ duration: 1.4 }}
        onHoverStart={() => setHovered(true)}
        onHoverEnd={() => setHovered(false)}
        whileHover={{
          transition: { duration: 0.6 },
        }}
        whileTap={{ scale: 0.9 }}
      >
        <div className="flex justify-center w-full">
          <div className="colorful-button--color red"></div>
          <div className="colorful-button--color orange"></div>
          <div className="colorful-button--color yellow"></div>
          <div className="colorful-button--color green"></div>
          <motion.a
            href="#"
            className={`download-resume bg-primary ${
              hovered ? "text-white" : "text-secondary"
            } flex items-center justify-center px-6 py-3 rounded-lg font-medium `}
            style={{
              backgroundColor: hovered ? "transparent" : "#3B82F6",
              color: hovered ? "white" : "white",
            }}
            initial={{ opacity: 0, y: 100, scale: 0.9 }}
            animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
            exit={{ opacity: 0, y: -100 }}
            transition={{
              duration: 3,
              ease: [0.16, 1, 0.3, 1],
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
        </div>
      </motion.div>
    </motion.div>
  );
};

export default Home;
