import React, { useEffect, useRef, useState } from "react";
import { skills } from "../../constants/skills";
import { motion, useInView } from "framer-motion";
import toast, { Toaster } from "react-hot-toast";

const DraggableSkills = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  // Get screen-dependent values dynamically
  const getScreenValues = () => {
    const width = window.innerWidth;
    const height = window.innerHeight;

    if (width >= 1024) {
      return {
        container: { width: 800, height: 400 },
        positionRange: { x: 700, y: 250, xOffset: 350, yOffset: 125 },
        dragConstraints: { top: -130, left: -350, right: 350, bottom: 130 },
      };
    } else if (width >= 640) {
      return {
        container: { width: width * 0.75, height: height * 0.5 },
        positionRange: {
          x: width * 0.6,
          y: height * 0.22,
          xOffset: width * 0.3,
          yOffset: height * 0.11,
        },
        dragConstraints: {
          top: -(height * 0.18),
          left: -(width * 0.3),
          right: width * 0.3,
          bottom: height * 0.18,
        },
      };
    } else {
      return {
        container: { width: width * 0.95, height: height * 0.45 },
        positionRange: {
          x: width * 0.7,
          y: height * 0.28,
          xOffset: width * 0.35,
          yOffset: height * 0.14,
        },
        dragConstraints: {
          top: -(height * 0.18),
          left: -(width * 0.35),
          right: width * 0.35,
          bottom: height * 0.18,
        },
      };
    }
  };

  const [screenValues, setScreenValues] = useState(getScreenValues());

  useEffect(() => {
    const handleResize = () => setScreenValues(getScreenValues());
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Adjust positions based on screen size
  const [positions, setPositions] = useState(
    skills.map(() => ({
      x:
        Math.random() * screenValues.positionRange.x -
        screenValues.positionRange.xOffset,
      y:
        Math.random() * screenValues.positionRange.y -
        screenValues.positionRange.yOffset,
    }))
  );

  useEffect(() => {
    if (isInView) {
      const timeout = setTimeout(() => {
        toast("Drag the skills to play around!", {
          position: "bottom-center",
          duration: 4000,
          icon: "🖱️",
          style: {
            background: "linear-gradient(135deg, #6e45e2, #88d3ce)",
            color: "#fff",
            fontWeight: "bold",
            borderRadius: "8px",
            padding: "12px 16px",
            boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.2)",
            fontSize: "16px",
          },
        });
      }, 2000);

      return () => clearTimeout(timeout);
    }
  }, [isInView]);

  return (
    <motion.div
      ref={ref}
      className="flex flex-col items-center space-y-4 px-4"
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7 }}
    >
      <Toaster />

      <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-8 sm:mb-12">
        Tech Stack
      </h2>

      <div
        className="relative flex items-center justify-center bg-[#2D3748] rounded-lg p-4 sm:p-6"
        style={{
          width: screenValues.container.width,
          height: screenValues.container.height,
          minWidth: "250px",
          maxWidth: "90vw",
          minHeight: "200px",
          maxHeight: "50vh",
        }}
      >
        {skills.map((skill, index) => (
          <motion.div
            key={skill.id}
            drag
            dragConstraints={screenValues.dragConstraints}
            dragTransition={{ bounceStiffness: 600, bounceDamping: 20 }}
            whileDrag={{ scale: 1.2 }}
            initial={{ x: positions[index].x, y: positions[index].y }}
            className={`absolute w-12 h-12 sm:w-16 sm:h-16 flex items-center justify-center 
              ${skill.bgColor} rounded-full shadow-lg cursor-grab active:cursor-grabbing`}
          >
            {skill.icon &&
              React.cloneElement(skill.icon, {
                size: window.innerWidth < 400 ? 30 : 40,
                className: `sm:text-2xl ${skill.textColor}`,
              })}
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

export default DraggableSkills;
