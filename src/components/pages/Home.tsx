import { useEffect, useState } from "react";
import { animate, motion, useMotionValue } from "framer-motion";
import "../../assets/styles/gradient.css";
import { initParticlesEngine } from "@tsparticles/react";
import { loadSlim } from "@tsparticles/slim";
import LandingArea from "./LandingArea";
import MainCard from "./MainCard";

const Home = () => {
  const experience = useMotionValue(0);

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
  return (
    <motion.div
      className="text-center bg-primary text-secondary pt-12"
      initial={{ opacity: 0, y: -50 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 50 }}
      transition={{ duration: 0.5 }}
    >
      <div className="flex justify-center items-center">
        <LandingArea />
      </div>
      <MainCard />
    </motion.div>
  );
};

export default Home;
