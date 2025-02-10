import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  FaReact,
  FaHtml5,
  FaCss3Alt,
  FaNodeJs,
  FaGithub,
} from "react-icons/fa";
import { SiTypescript, SiFramer, SiRedux } from "react-icons/si";
import { IoLogoJavascript } from "react-icons/io";

const skills = [
  { id: 1, name: "React", icon: <FaReact />, bgColor: "bg-white" }, // React's icon has default blue color, background white
  {
    id: 2,
    name: "JavaScript",
    icon: <IoLogoJavascript />,
    bgColor: "bg-yellow-500",
  },
  { id: 3, name: "TypeScript", icon: <SiTypescript />, bgColor: "bg-blue-300" },
  {
    id: 4,
    name: "Framer Motion",
    icon: <SiFramer />,
    bgColor: "bg-purple-500",
  },
  { id: 5, name: "HTML", icon: <FaHtml5 />, bgColor: "bg-red-500" },
  { id: 6, name: "CSS", icon: <FaCss3Alt />, bgColor: "bg-blue-400" },
  { id: 7, name: "Redux", icon: <SiRedux />, bgColor: "bg-purple-600" },
  { id: 8, name: "Node.js", icon: <FaNodeJs />, bgColor: "bg-green-500" },
  { id: 9, name: "GitHub", icon: <FaGithub />, bgColor: "bg-gray-700" },
];

const DraggableSkills = () => {
  const [positions, setPositions] = useState(
    skills.map(() => ({
      x: Math.random() * 300 - 150,
      y: Math.random() * 200 - 100,
    }))
  );

  return (
    <div className="relative w-[500px] h-[250px] flex items-center justify-center bg-gray-900 rounded-lg">
      {skills.map((skill, index) => (
        <motion.div
          key={skill.id}
          drag
          dragConstraints={{ top: -100, left: -200, right: 200, bottom: 100 }}
          dragTransition={{ bounceStiffness: 600, bounceDamping: 20 }}
          whileDrag={{ scale: 1.2 }}
          initial={{ x: positions[index].x, y: positions[index].y }}
          className={`absolute w-16 h-16 flex items-center justify-center ${skill.bgColor} rounded-full shadow-lg cursor-grab active:cursor-grabbing`}
        >
          {skill.icon &&
            React.cloneElement(skill.icon, {
              size: 40,
              className: "text-current",
            })}
        </motion.div>
      ))}
    </div>
  );
};

export default DraggableSkills;
