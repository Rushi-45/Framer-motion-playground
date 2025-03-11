import {
  animate,
  motion,
  useInView,
  useMotionValue,
  useTransform,
} from "framer-motion";
import { useEffect, useRef } from "react";
import { HobbiesSection } from "./Hobbies";
import { TiltHoverCard } from "../common/TiltHoverCard";

interface AboutProps {
  contactEnter: (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
  contactLeave: (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
}

const About: React.FC<AboutProps> = ({ contactEnter, contactLeave }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  const experience = useMotionValue(0);
  const hours = useMotionValue(0);
  const projects = useMotionValue(0);
  const clients = useMotionValue(0);
  const roundedExperience = useTransform(experience, Math.round);
  const roundedHours = useTransform(hours, Math.round);
  const roundedProjects = useTransform(projects, Math.round);
  const roundedClients = useTransform(clients, Math.round);

  useEffect(() => {
    if (isInView) {
      const animation1 = animate(experience, 3, { duration: 2.5 });
      const animation2 = animate(hours, 5000, { duration: 2.5 });
      const animation3 = animate(projects, 15, { duration: 2.5 });
      const animation4 = animate(clients, 10, { duration: 2.5 });

      return () => {
        animation1.stop();
        animation2.stop();
        animation3.stop();
        animation4.stop();
      };
    }
  }, [isInView]);

  return (
    <motion.section
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5 }}
      className="text-white py-16 px-8 md:px-16 lg:px-32 rounded-lg"
    >
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        <motion.div
          className="w-[450px] h-[450px] overflow-hidden rounded-lg mx-auto"
          onMouseEnter={contactEnter}
          onMouseLeave={contactLeave}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={isInView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.5 }}
        >
          <TiltHoverCard />
        </motion.div>
        <div>
          <motion.h1
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="text-4xl font-medium tracking-tight md:text-5xl"
          >
            I am a <span className="text-[#808080]">Front-end Developer</span> &
            <span className="text-blue-500"> React Enthusiast</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.4, duration: 0.5 }}
            className="mt-4 text-[#808080] leading-relaxed"
          >
            I create dynamic and interactive websites with a focus on{" "}
            <span className="text-white font-semibold">performance</span> and{" "}
            <span className="text-white font-semibold">modern UI/UX</span>. I
            work extensively with{" "}
            <span className="text-white font-semibold">
              React, TypeScript, Tailwind CSS, and Framer Motion
            </span>
            . My goal is to build smooth, high-quality experiences that users
            love.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.6, duration: 0.5 }}
            className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-6"
          >
            <div>
              <div className="flex items-center">
                <motion.p className="text-3xl font-bold text-white">
                  {roundedExperience}
                </motion.p>
                <span className="text-3xl font-bold text-white">+</span>
              </div>

              <p className="text-gray-400">Years of experience</p>
            </div>
            <div>
              <div className="flex items-center">
                <motion.p className="text-3xl font-bold text-white">
                  {roundedClients}
                </motion.p>
                <span className="text-3xl font-bold text-white">+</span>
              </div>
              <p className="text-gray-400">Clients</p>
            </div>
            <div>
              <div className="flex items-center">
                <motion.p className="text-3xl font-bold text-white">
                  {roundedProjects}
                </motion.p>
                <span className="text-3xl font-bold text-white">+</span>
              </div>
              <p className="text-gray-400">Projects Completed</p>
            </div>
            <div>
              <div className="flex items-center">
                <motion.p className="text-3xl font-bold text-white">
                  {roundedHours}
                </motion.p>
                <span className="text-3xl font-bold text-white">+</span>
              </div>
              <p className="text-gray-400">Hours of Development</p>
            </div>
          </motion.div>
        </div>
      </div>
      <HobbiesSection />
    </motion.section>
  );
};

export default About;
