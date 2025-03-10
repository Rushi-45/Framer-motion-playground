import React, { useEffect, useRef, useState } from "react";
import { skills } from "../../constants/skills";
import { motion, useInView } from "framer-motion";
import toast, { Toaster } from "react-hot-toast";

const DraggableSkills = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });
  const [positions, setPositions] = useState(
    skills.map(() => ({
      x: Math.random() * 700 - 350,
      y: Math.random() * 300 - 150,
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
    <div ref={ref} className="flex flex-col items-center space-y-4">
      <Toaster />

      <h2 className="text-3xl font-bold text-white mb-12">Tech Stack</h2>

      <div className="relative w-[800px] h-[400px] flex items-center justify-center bg-[#2D3748] rounded-lg">
        {skills.map((skill, index) => (
          <motion.div
            key={skill.id}
            drag
            dragConstraints={{ top: -160, left: -350, right: 350, bottom: 160 }}
            dragTransition={{ bounceStiffness: 600, bounceDamping: 20 }}
            whileDrag={{ scale: 1.2 }}
            initial={{ x: positions[index].x, y: positions[index].y }}
            className={`absolute w-16 h-16 flex items-center justify-center ${skill.bgColor} rounded-full shadow-lg cursor-grab active:cursor-grabbing`}
          >
            {skill.icon &&
              React.cloneElement(skill.icon, {
                size: 40,
                className: skill.textColor,
              })}
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default DraggableSkills;
