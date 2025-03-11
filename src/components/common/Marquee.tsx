import { motion } from "framer-motion";

interface MarqueeProps {
  text: string;
  speed?: number;
}

const Marquee = ({ text, speed = 6 }: MarqueeProps) => {
  return (
    <div className="relative w-80 overflow-hidden bg-gray-100 p-2 rounded-full border border-neutral-300 shadow-sm flex items-center">
      <div className="relative flex items-center space-x-2 pl-4">
        <div className="relative">
          <div className="size-4 rounded-full bg-green-400"></div>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="size-4 animate-ping rounded-full bg-green-300"></div>
          </div>
        </div>
      </div>

      <div className="w-full overflow-hidden">
        <motion.div
          className="flex whitespace-nowrap space-x-8 pl-8"
          animate={{ x: ["100%", "-100%"] }}
          transition={{ repeat: Infinity, duration: speed, ease: "linear" }}
        >
          <p className="text-neutral-900 font-semibold uppercase">{text}</p>
          <p className="text-neutral-900 font-semibold uppercase">{text}</p>
        </motion.div>
      </div>
    </div>
  );
};

export default Marquee;
