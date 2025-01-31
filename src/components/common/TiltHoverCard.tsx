import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";

export const TiltHoverCard = ({
  icon: Icon,
  title,
  link,
}: {
  icon: any;
  title: string;
  link: string;
}) => {
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x, { stiffness: 100, damping: 20 });
  const mouseYSpring = useSpring(y, { stiffness: 100, damping: 20 });

  const rotateX = useTransform(
    mouseYSpring,
    [-0.5, 0.5],
    ["7.5deg", "-7.5deg"]
  );
  const rotateY = useTransform(
    mouseXSpring,
    [-0.5, 0.5],
    ["-7.5deg", "7.5deg"]
  );

  const handleMouseMove = (e: any) => {
    const rect = e.target.getBoundingClientRect();

    const height = rect.height;
    const width = rect.width;

    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;

    const xPercent = mouseX / width - 0.5;
    const yPercent = mouseY / height - 0.5;

    x.set(xPercent);
    y.set(yPercent);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };
  return (
    <motion.a
      href={link}
      target="_blank"
      rel="noopener noreferrer"
      className="relative h-32 w-32 rounded-xl bg-gradient-to-br from-indigo-300 to-violet-300"
      transition={{ duration: 0.4, ease: "easeOut" }}
      style={{
        transformStyle: "preserve-3d",
        rotateX,
        rotateY,
      }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <div
        style={{ transform: "translateZ(75px)", transformStyle: "preserve-3d" }}
        className="absolute inset-4 grid place-content-center rounded-xl bg-white shadow-lg"
      >
        <Icon
          className="mx-auto text-4xl text-black"
          style={{ transform: "translateZ(75px)" }}
        />
      </div>
    </motion.a>
  );
};
