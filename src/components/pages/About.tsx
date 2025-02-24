import {
  animate,
  motion,
  useInView,
  useMotionValue,
  useTransform,
} from "framer-motion";
import { useEffect, useRef } from "react";
import myImage from "../../assets/images/profile.jpg";
import { HobbiesSection } from "./Hobbies";
import DraggableSkills from "../common/SkillsBox";
import HoverDevCards from "../common/HoverFillCards";
import { FiMail, FiLinkedin, FiInstagram, FiGithub } from "react-icons/fi";

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
      className="bg-black text-white py-16 px-8 md:px-16 lg:px-32 rounded-lg"
    >
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        <div
          className="w-[450px] h-[450px] overflow-hidden rounded-lg mx-auto"
          onMouseEnter={contactEnter}
          onMouseLeave={contactLeave}
        >
          <motion.img
            src={myImage}
            alt="Rushi Chudasama"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.5 }}
            className="rounded-lg shadow-lg"
          />
        </div>
        <div>
          <motion.button
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.5 }}
            className="inline-block px-4 py-1 text-sm text-white bg-[#1e1e1e]/80 border border-[#333] rounded-full backdrop-blur-sm backdrop-filter"
          >
            About
          </motion.button>

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
      <div className="relative mx-auto w-[800px] h-[400px] flex items-center justify-center bg-gray-900 rounded-lg my-12">
        <DraggableSkills />
      </div>
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.5 }}
        className="flex gap-8 w-full place-content-center text-slate-900 mt-12"
      >
        <div className="p-4">
          <div className="grid gap-4 grid-cols-2 lg:grid-cols-4">
            <HoverDevCards
              title="Email"
              subtitle="Get in touch"
              href="mailto:rushi.positive@gmail.com"
              Icon={FiMail}
              color="red"
            />
            <HoverDevCards
              title="LinkedIn"
              subtitle="Professional Profile"
              href="https://www.linkedin.com/in/rushi-chudasama-63473819a/"
              Icon={FiLinkedin}
              color="blue"
            />
            <HoverDevCards
              title="Instagram"
              subtitle="Follow me"
              href="https://www.instagram.com/rushiii.js"
              Icon={FiInstagram}
              color="pink"
            />
            <HoverDevCards
              title="GitHub"
              subtitle="Open Source Contributions"
              href="https://github.com/Rushi-45/"
              Icon={FiGithub}
              color="gray"
            />
          </div>
        </div>
      </motion.div>
    </motion.section>
  );
};

export default About;
