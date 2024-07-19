import { motion } from "framer-motion";

const projects = [
  {
    id: 1,
    name: "Project One",
    description: "Description of project one",
    link: "#",
  },
  {
    id: 2,
    name: "Project Two",
    description: "Description of project two",
    link: "#",
  },
  // Add more projects as needed
];

const Projects = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: -50 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 50 }}
      transition={{ duration: 0.5 }}
    >
      <h1>My Projects</h1>
      <ul>
        {projects.map((project) => (
          <li key={project.id}>
            <h2>{project.name}</h2>
            <p>{project.description}</p>
            <a href={project.link} target="_blank" rel="noopener noreferrer">
              View Project
            </a>
          </li>
        ))}
      </ul>
    </motion.div>
  );
};

export default Projects;
