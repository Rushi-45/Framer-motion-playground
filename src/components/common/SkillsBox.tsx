import React, { useState } from "react";
import { skills } from "../../constants/skills";
import { motion } from "framer-motion";

const DraggableSkills = () => {
  const [positions, setPositions] = useState(
    skills.map(() => ({
      x: Math.random() * 700 - 350,
      y: Math.random() * 300 - 150,
    }))
  );

  return (
    <div className="flex flex-col items-center space-y-4">
      <h2 className="text-3xl font-bold text-white">My Tech Stack</h2>

      <div className="relative w-[800px] h-[400px] flex items-center justify-center bg-gray-900 rounded-lg">
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
