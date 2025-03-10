import { motion, useInView } from "framer-motion";
import DraggableSkills from "../common/SkillsBox";
import { useRef } from "react";

const Skills = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5 }}
      className="text-white py-16 px-8 md:px-16 lg:px-32 rounded-lg"
    >
      <div className="relative mx-auto w-[800px] h-[400px] flex items-center justify-center rounded-lg">
        <DraggableSkills />
      </div>
    </motion.div>
  );
};

export default Skills;
