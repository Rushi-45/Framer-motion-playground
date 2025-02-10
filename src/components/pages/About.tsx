import { motion } from "framer-motion";
import "./About.css";
import { HobbiesSection } from "./Hobbies";
import HoverDevCards from "../common/HoverFillCards";
import { FiMail, FiLinkedin, FiInstagram, FiGithub } from "react-icons/fi";
import SkillsBox from "../common/SkillsBox";

const About = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: -50 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 50 }}
      transition={{ duration: 0.5 }}
      className="about-container bg-primary text-secondary"
    >
      <motion.h1
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.2, duration: 0.5 }}
        className="about-title"
      >
        About Me
      </motion.h1>

      <motion.img
        src="/src/assets/images/profile.jpg"
        alt="Rushi Chudasama"
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.4, duration: 0.5 }}
        className="w-52 h-52 mx-auto rounded-full border-4 border-accent border-[#ff6b6b] shadow-lg"
      />

      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6, duration: 0.5 }}
        className="intro-section"
      >
        <p>
          Hi there! I'm <span className="highlight">Rushi Chudasama</span>, a{" "}
          <span className="highlight">Front-end Developer</span> with{" "}
          <span className="highlight">3 years</span> of experience crafting
          seamless and interactive web experiences. I specialize in{" "}
          <span className="highlight">
            React, TypeScript, Redux, and Tailwind CSS
          </span>
          , combining clean code with smooth animations using{" "}
          <span className="highlight">Framer Motion</span>. Whether it's
          building complex business logic or adding subtle UI interactions, I
          love bringing ideas to life with precision and creativity.
        </p>
      </motion.div>

      <HobbiesSection />

      <SkillsBox />

      <div className="flex gap-8 w-full place-content-center text-slate-900 mt-12">
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
      </div>
    </motion.div>
  );
};

export default About;
