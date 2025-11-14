import {
  motion,
  useMotionTemplate,
  useMotionValue,
  useSpring,
} from "framer-motion";
import myImage from "../../assets/images/profile.jpg";
import { useRef } from "react";
import { FiGithub, FiLinkedin, FiMail } from "react-icons/fi";

export const TiltHoverCard = () => {
  const ROTATION_RANGE = 32.5;
  const HALF_ROTATION_RANGE = 32.5 / 2;

  const ref = useRef<HTMLDivElement>(null);

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const xSpring = useSpring(x);
  const ySpring = useSpring(y);

  const transform = useMotionTemplate`rotateX(${xSpring}deg) rotateY(${ySpring}deg)`;

  const handleMouseMove = (e: any) => {
    if (!ref.current) return [0, 0];

    const rect = ref.current.getBoundingClientRect();

    const width = rect.width;
    const height = rect.height;

    const mouseX = (e.clientX - rect.left) * ROTATION_RANGE;
    const mouseY = (e.clientY - rect.top) * ROTATION_RANGE;

    const rX = (mouseY / height - HALF_ROTATION_RANGE) * -1;
    const rY = mouseX / width - HALF_ROTATION_RANGE;

    x.set(rX);
    y.set(rY);
  };
  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={ref}
      className="relative h-full w-full rounded-xl bg-transparent group focus:outline-none"
      transition={{ duration: 0.4, ease: "easeOut" }}
      style={{
        transformStyle: "preserve-3d",
        transform,
      }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      tabIndex={0}
      aria-label="Rushi Chudasama profile card"
    >
      <div
        style={{
          transform: "translateZ(75px)",
          transformStyle: "preserve-3d",
        }}
        className="absolute inset-4 grid place-content-center rounded-xl bg-white shadow-lg group-hover:shadow-2xl group-hover:shadow-blue-300 transition-shadow duration-300"
      >
        <motion.img
          src={myImage}
          alt="Rushi Chudasama - Frontend Developer"
          className="mx-auto text-4xl text-black rounded-full shadow"
          style={{ transform: "translateZ(75px)" }}
          width={200}
          height={200}
          loading="eager"
          fetchPriority="high"
        />
      </div>
    </motion.div>
  );
};
