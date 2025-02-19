import { useRef } from "react";
import { motion, useScroll, useSpring, useTransform } from "framer-motion";
import "../../assets/styles/gradient.css";
import LandingArea from "./LandingArea";
import spinner from "../../assets/images/spinner.webp";

interface HomeProps {
  contactEnter: (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
  contactLeave: (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
}

const Home: React.FC<HomeProps> = ({ contactEnter, contactLeave }) => {
  const containerRef = useRef(null);

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
      className="text-center bg-primary text-secondary pt-12 min-h-screen flex flex-col justify-center items-center"
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
        >
          <motion.span
            className="inline-block px-4 py-1 mt-12 text-sm text-white bg-[#1e1e1e]/80 border border-[#333] rounded-full backdrop-blur-sm backdrop-filter"
            onMouseEnter={contactEnter}
            onMouseLeave={contactLeave}
          >
            Hello, I'm Rushi 👋
          </motion.span>
        </motion.div>
        <LandingArea />

        <motion.img
          src={spinner}
          alt="Rotating Flower"
          className="w-[35rem] h-[35rem]"
          style={{ rotate: smoothRotation }}
          transition={{ duration: 2, ease: "easeInOut" }}
        />
      </div>
    </motion.div>
  );
};

export default Home;
