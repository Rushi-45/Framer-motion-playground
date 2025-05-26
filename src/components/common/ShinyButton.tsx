import { motion } from "framer-motion";
import "../../assets/styles/ShinyButton.css";
import { useEffect, useState } from "react";

interface ShinyButtonProps {
  title: string;
}

const ShinyButton: React.FC<ShinyButtonProps> = ({ title }) => {
  const [playShine, setPlayShine] = useState(true);

  useEffect(() => {
    setPlayShine(false);
    setTimeout(() => setPlayShine(true), 50);
  }, []);

  return (
    <motion.button
      onMouseEnter={() => setPlayShine(true)}
      onMouseLeave={() => setPlayShine(false)}
      whileTap={{ scale: 0.97 }}
      className="p-2 rounded-md relative bg-gray-900 text-white overflow-hidden"
    >
      <span className="relative z-10">{title}</span>

      {playShine && (
        <motion.div
          key={playShine ? "active" : "inactive"}
          initial={{ x: "-150%" }}
          animate={{ x: "150%" }}
          transition={{ duration: 1.2, ease: "linear" }}
          className="absolute inset-0 bg-linear-to-r from-transparent via-white/40 to-transparent w-full h-full"
        />
      )}
    </motion.button>
  );
};

export default ShinyButton;
