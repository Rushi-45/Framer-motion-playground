import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import CardWithHeader from "./CardHeader";

interface MainCardProps {
  projectEnter: (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
  projectLeave: (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
}

const MainCard: React.FC<MainCardProps> = ({ projectEnter, projectLeave }) => {
  const ref = useRef(null);

  const isInView = useInView(ref, { once: true, amount: 0.2 });
  return (
    <>
      <motion.div
        className="text-center text-secondary pt-8 flex flex-col items-center"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 50 }}
        transition={{ duration: 0.5 }}
      >
        <motion.div
          className="flex justify-center mb-6"
          ref={ref}
          onMouseEnter={projectEnter}
          onMouseLeave={projectLeave}
          initial={{ opacity: 0, y: 100, scale: 0.9 }}
          animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
          exit={{ opacity: 0, y: -100 }}
          transition={{
            duration: 4,
            ease: [0.16, 1, 0.3, 1],
          }}
          whileHover={{ scale: 1.05, transition: { duration: 0.3 } }}
        >
          <CardWithHeader />
        </motion.div>
      </motion.div>
    </>
  );
};
export default MainCard;
