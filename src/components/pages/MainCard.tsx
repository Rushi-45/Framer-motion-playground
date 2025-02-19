import { motion } from "framer-motion";
import { useState } from "react";
import CardWithHeader from "./CardHeader";

export default function MainCard() {
  const [hovered, setHovered] = useState(false);
  return (
    <>
      <motion.div
        className="text-center bg-primary text-secondary pt-8 flex flex-col items-center"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 50 }}
        transition={{ duration: 0.5 }}
      >
        <div className="flex justify-center mb-6">
          <CardWithHeader />
        </div>
        <motion.div
          className="colorful-button--wrapper mb-12"
          transition={{ duration: 1.4 }}
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
    </>
  );
}
