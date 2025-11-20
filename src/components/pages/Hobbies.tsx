import { motion, AnimatePresence, useInView } from "framer-motion";
import { useState, useRef } from "react";
import { hobbies } from "../../constants/projects";

export const HobbiesSection = () => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ delay: 0.8, duration: 0.5 }}
      className="hobbies-section px-4 sm:px-8 md:px-12 lg:px-16"
    >
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-6 mt-8">
        {hobbies.map((hobby, idx) => (
          <div
            key={hobby.name}
            className="relative group block p-2 h-full w-full"
            onMouseEnter={() => setHoveredIndex(idx)}
            onMouseLeave={() => setHoveredIndex(null)}
          >
            <AnimatePresence>
              {hoveredIndex === idx && (
                <motion.span
                  className="absolute inset-0 h-full w-full bg-[#2D3748] block rounded-3xl"
                  layoutId="hoverBackground"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1, transition: { duration: 0.15 } }}
                  exit={{
                    opacity: 0,
                    transition: { duration: 0.15, delay: 0.2 },
                  }}
                />
              )}
            </AnimatePresence>
            <div className="rounded-2xl h-full w-full p-4 overflow-hidden bg-linear-to-br from-[#2D3748]/40 to-[#2D3748] border border-transparent group-hover:border-slate-700 relative z-50 flex flex-col items-center justify-center">
              <div className="relative z-50">
                <div className="p-4 flex flex-col items-center">
                  <div className="text-4xl text-red-400 mb-2">{hobby.icon}</div>
                  <p className="text-white text-lg text-center">{hobby.name}</p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </motion.div>
  );
};
