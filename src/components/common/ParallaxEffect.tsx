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
        style={{ y: backgroundY, willChange: "transform" }}
      >
        <img
          src={imageFull}
          alt="Parallax background layer"
          className="absolute inset-0 w-full h-full object-cover object-bottom"
          loading="eager"
          fetchPriority="high"
          width={1920}
          height={1080}
          decoding="async"
        />
      </motion.div>

      <motion.div className="absolute inset-0 z-20 flex items-center justify-center">
        <Home contactEnter={() => {}} contactLeave={() => {}} />
      </motion.div>

      <div className="absolute inset-0 z-10">
        <img
          src={imageBottom}
          alt="Parallax foreground layer"
          className="absolute inset-0 w-full h-full object-cover object-bottom"
          loading="lazy"
          fetchPriority="low"
          width={1920}
          height={1080}
          decoding="async"
        />
      </div>
    </div>
  );
};

export default ParallaxEffect;
