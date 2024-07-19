import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import imageFull from "../../assets/images/image-full.png";
import imageBottom from "../../assets/images/image-bottom.png";
import Home from "../pages/Home";

const ParallaxEffect = () => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <div ref={ref} className="w-full h-screen overflow-hidden relative">
      <motion.div
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: `url(${imageFull})`,
          backgroundPosition: "bottom",
          backgroundSize: "cover",
          y: backgroundY,
        }}
      />
      <motion.div className="absolute inset-0 z-20 flex items-center justify-center">
        <Home />
      </motion.div>
      <div
        className="absolute inset-0 z-10"
        style={{
          backgroundImage: `url(${imageBottom})`,
          backgroundPosition: "bottom",
          backgroundSize: "cover",
        }}
      />
    </div>
  );
};

export default ParallaxEffect;
