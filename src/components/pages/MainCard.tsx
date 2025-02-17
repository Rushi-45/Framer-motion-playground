import { motion, useInView, useScroll, useTransform } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import CardWithHeader from "./CardHeader";

export default function MainCard() {
  const targetRef = useRef<HTMLDivElement | null>(null);
  const [hovered, setHovered] = useState(false);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["end end", "end start"],
  });
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 0.8]);
  const position = useTransform(scrollYProgress, (pos) =>
    pos >= 1 ? "relative" : "fixed"
  );

  useEffect(() => {
    const updateMousePosition = (ev: MouseEvent) => {
      if (!targetRef.current) return;
      const { clientX, clientY } = ev;
      targetRef.current.style.setProperty("--x", `${clientX}px`);
      targetRef.current.style.setProperty("--y", `${clientY}px`);
    };

    window.addEventListener("mousemove", updateMousePosition);

    return () => {
      window.removeEventListener("mousemove", updateMousePosition);
    };
  }, []);
  return (
    <>
      <motion.section
        style={{ opacity }}
        ref={targetRef}
        id="home"
        className="min-h-screen bg-primary relative h-screen text-white before:pointer-events-none before:fixed before:inset-0 before:z-0 before:bg-[radial-gradient(circle_farthest-side_at_var(--x,_100px)_var(--y,_100px),_var(--color-secondary)_0%,_transparent_100%)] before:opacity-40"
      >
        <motion.div
          style={{ position, scale, x: "-50%" }}
          className="fixed left-1/2 z-10 flex flex-col items-center"
        >
          <motion.div
            className="text-center bg-primary text-secondary pt-8 flex flex-col items-center"
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
            transition={{ duration: 0.5 }}
          >
            <div className="flex justify-center mb-6">
              <CardWithHeader />
            </div>
            <motion.div
              className="colorful-button--wrapper mb-12"
              ref={ref}
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : {}}
              transition={{ duration: 1.4 }}
              onHoverStart={() => setHovered(true)}
              onHoverEnd={() => setHovered(false)}
              whileHover={{
                transition: { duration: 0.6 },
              }}
              whileTap={{ scale: 0.9 }}
            >
              <div className="colorful-button--color red"></div>
              <div className="colorful-button--color orange"></div>
              <div className="colorful-button--color yellow"></div>
              <div className="colorful-button--color green"></div>
              <motion.a
                href="#"
                className={`download-resume bg-primary ${
                  hovered ? "text-white" : "text-secondary"
                }`}
                style={{
                  backgroundColor: hovered ? "transparent" : "#3B82F6",
                  color: hovered ? "white" : "white",
                }}
              >
                <motion.div
                  className="button-text primary"
                  initial={{ y: 0 }}
                  animate={{
                    y: hovered ? -100 : 0,
                    transition: { duration: 0.6 },
                  }}
                >
                  Download Resume
                </motion.div>
                <motion.div
                  className="button-text secondary"
                  initial={{ y: 100 }}
                  animate={{
                    y: hovered ? 0 : 100,
                    transition: { duration: 0.6 },
                  }}
                >
                  Download Resume
                </motion.div>
              </motion.a>
            </motion.div>
          </motion.div>
        </motion.div>
      </motion.section>
    </>
  );
}
