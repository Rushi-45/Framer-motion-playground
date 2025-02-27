import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import Carousel from "../common/Carousel";

interface ProjectsProps {
  projectEnter: (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
  projectLeave: (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
}

const Projects: React.FC<ProjectsProps> = ({ projectEnter, projectLeave }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5 }}
      className="bg-primary text-white py-16 px-8 md:px-16 lg:px-32 rounded-lg"
    >
      {/* <MainCard projectEnter={projectEnter} projectLeave={projectLeave} /> */}

      <Carousel projectEnter={projectEnter} projectLeave={projectLeave} />
    </motion.div>
  );
};

export default Projects;
