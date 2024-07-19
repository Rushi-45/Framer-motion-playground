import { motion } from "framer-motion";

const skills = [
  "JavaScript",
  "React",
  "TypeScript",
  "Node.js",
  "CSS",
  "HTML",
  // Add more skills as needed
];

const Skills = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: -50 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 50 }}
      transition={{ duration: 0.5 }}
    >
      <h1>My Skills</h1>
      <ul>
        {skills.map((skill, index) => (
          <li key={index}>{skill}</li>
        ))}
      </ul>
    </motion.div>
  );
};

export default Skills;
