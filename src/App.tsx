import { BrowserRouter as Router } from "react-router-dom";
import "./App.css";
import Header from "./components/common/Header";
import "./index.css";
import Home from "./components/pages/Home";
import About from "./components/pages/About";
import Projects from "./components/pages/Projects";
import Skills from "./components/pages/Skills";
import Contact from "./components/pages/Contact";
import { useRef, useState } from "react";
import useMouse from "@react-hook/mouse-position";
import { motion } from "framer-motion";
import SpotlightCard from "./components/common/SpotlightCard";
import Footer from "./components/pages/Footer";

const App = () => {
  const [cursorText, setCursorText] = useState("");
  const [cursorVariant, setCursorVariant] = useState("default");
  const containerRef = useRef(null);

  const mouse = useMouse(containerRef, {
    enterDelay: 100,
    leaveDelay: 100,
  });
  let mouseXPosition = 0;
  let mouseYPosition = 0;

  mouseXPosition = mouse.clientX ?? 0;
  mouseYPosition = mouse.clientY ?? 0;

  const variants = {
    default: {
      opacity: 1,
      height: 10,
      width: 10,
      fontSize: "16px",
      backgroundColor: "white",
      x: mouseXPosition,
      y: mouseYPosition,
      transition: {
        type: "spring",
        mass: 0.6,
      },
    },
    project: {
      opacity: 0.8,
      backgroundColor: "#fff",
      color: "#000",
      height: 80,
      width: 80,
      fontSize: "18px",
      x: mouseXPosition - 32,
      y: mouseYPosition - 32,
    },
    contact: {
      opacity: 1,
      backgroundColor: "#FFBCBC",
      color: "#000",
      height: 64,
      width: 64,
      fontSize: "32px",
      x: mouseXPosition - 48,
      y: mouseYPosition - 48,
    },
  };

  const spring = {
    type: "spring",
    stiffness: 500,
    damping: 28,
  };

  function projectEnter() {
    setCursorText("Drag");
    setCursorVariant("project");
  }

  function projectLeave() {
    setCursorText("");
    setCursorVariant("default");
  }

  function contactEnter() {
    setCursorText("👋");
    setCursorVariant("contact");
  }

  function contactLeave() {
    setCursorText("");
    setCursorVariant("default");
  }

  return (
    <Router>
      <SpotlightCard
        className="custom-spotlight-card"
        spotlightColor="rgba(0, 229, 255, 0.2)"
      >
        <div ref={containerRef} className="bg-custom">
          <motion.div
            variants={variants}
            className="fixed z-[100] flex items-center justify-center top-0 left-0 h-[10px] w-[10px] bg-white rounded-full pointer-events-none text-white text-center text-sm"
            animate={cursorVariant}
            transition={spring}
          >
            <span className="flex-auto text-inherit pointer-events-none m-auto">
              {cursorText}
            </span>
          </motion.div>
          <Header />
          <section id="home" className="text-center text-secondary">
            <Home contactEnter={contactEnter} contactLeave={contactLeave} />
          </section>
          <section id="about" className="min-h-screen ">
            <About contactEnter={contactEnter} contactLeave={contactLeave} />
          </section>
          <section id="projects" className="min-h-screen">
            <Projects projectEnter={projectEnter} projectLeave={projectLeave} />
          </section>
          <section id="skills" className="min-h-screen">
            <Skills />
          </section>
          <section id="contact" className="min-h-screen">
            <Contact />
          </section>
          <Footer />
        </div>
      </SpotlightCard>
    </Router>
  );
};

export default App;
