import { motion, useMotionValue, useTransform, animate } from "framer-motion";
import { useEffect } from "react";

const cursorVariants = {
  blinking: {
    opacity: [0, 0, 1, 1],
    transition: {
      duration: 1,
      repeat: Infinity,
      repeatDelay: 0,
      ease: "linear",
      times: [0, 0.5, 0.5, 1],
    },
  },
};

const CursorBlinker = () => (
  <motion.span
    variants={cursorVariants}
    animate="blinking"
    className="inline-block h-[1em] mb-4 w-[3px] translate-y-1 bg-white align-middle ml-1 rounded"
  />
);

interface TypewriterTextProps {
  text: string | string[];
  duration?: number;
  delay?: number;
  className?: string;
}

const TypewriterText: React.FC<TypewriterTextProps> = ({
  text,
  duration = 1.5,
  delay = 1,
  className,
}) => {
  const texts = Array.isArray(text) ? text : [text];
  const textIndex = useMotionValue(0);
  const baseText = useTransform(textIndex, (latest) => texts[latest] || "");
  const count = useMotionValue(0);
  const rounded = useTransform(count, (latest) => Math.round(latest));
  const displayText = useTransform(rounded, (latest) =>
    baseText.get().slice(0, latest)
  );
  const updatedThisRound = useMotionValue(true);

  useEffect(() => {
    const controls = animate(count, 60, {
      type: "tween",
      duration,
      ease: "easeIn",
      repeat: Infinity,
      repeatType: "reverse",
      repeatDelay: delay,
      onUpdate(latest) {
        if (updatedThisRound.get() === true && latest > 0) {
          updatedThisRound.set(false);
        } else if (updatedThisRound.get() === false && latest === 0) {
          if (textIndex.get() === texts.length - 1) {
            textIndex.set(0);
          } else {
            textIndex.set(textIndex.get() + 1);
          }
          updatedThisRound.set(true);
        }
      },
    });
    return controls.stop;
  }, [texts.join("|"), duration, delay]);

  return (
    <span className={className}>
      <motion.span>{displayText}</motion.span>
      <CursorBlinker />
    </span>
  );
};

export default TypewriterText;
