import { Link } from "react-router-dom";
import { animate, motion, stagger, useAnimate } from "framer-motion";
import { RiHome2Line } from "react-icons/ri";
import { useState } from "react";

const randomNumberBetween = (min: number, max: number) => {
  return Math.floor(Math.random() * (max - min + 1) + min);
};

type AnimationSequence = Parameters<typeof animate>[0];
const Header = () => {
  const [isContactHovered, setIsContactHovered] = useState(false);
  const [scope, animate] = useAnimate();
  console.log(isContactHovered, "isContactHovered");

  const onButtonClick = () => {
    const sparkles = Array.from({ length: 20 });
    const sparklesAnimation: AnimationSequence = sparkles.map((_, index) => [
      `.sparkle-${index}`,
      {
        x: randomNumberBetween(-100, 100),
        y: randomNumberBetween(-100, 100),
        scale: randomNumberBetween(1.5, 2.5),
        opacity: 1,
      },
      {
        duration: 0.4,
        at: "<",
      },
    ]);

    const sparklesFadeOut: AnimationSequence = sparkles.map((_, index) => [
      `.sparkle-${index}`,
      {
        opacity: 0,
        scale: 0,
      },
      {
        duration: 0.3,
        at: "<",
      },
    ]);

    const sparklesReset: AnimationSequence = sparkles.map((_, index) => [
      `.sparkle-${index}`,
      {
        x: 0,
        y: 0,
      },
      {
        duration: 0.000001,
      },
    ]);

    animate([
      ...sparklesReset,
      [".letter", { y: -32 }, { duration: 0.2, delay: stagger(0.05) }],
      ["button", { scale: 0.8 }, { duration: 0.1, at: "<" }],
      ["button", { scale: 1 }, { duration: 0.1 }],
      ...sparklesAnimation,
      [".letter", { y: 0 }, { duration: 0.000001 }],
      ...sparklesFadeOut,
    ]);
  };
  return (
    <header className="fixed top-0 left-0 w-full bg-primary-light text-secondary-light py-4 flex justify-between items-center z-50">
      <div className="pl-6 flex items-center">
        <motion.div
          whileHover={{ rotate: 540, scale: 1.1 }}
          whileTap={{ rotate: -540 }}
          transition={{ duration: 0.5 }}
        >
          <RiHome2Line className="text-2xl mr-2" />
        </motion.div>
        <h1 className="text-2xl font-bold">My Portfolio</h1>
        {/* <motion.div
          className="mb-4 z-10"
          initial={{ x: 0, y: -5 }}
          animate={{
            x: isContactHovered ? 1562 : 0,
            opacity: isContactHovered ? 1 : 0,
            transition: { duration: 0.5 },
          }}
        >
          <svg
            width="10"
            height="10"
            viewBox="0 0 100 100"
            xmlns="http://www.w3.org/2000/svg"
            style={{ display: "block", margin: "auto" }}
          >
            <circle cx="50" cy="50" r="50" fill="white" />
          </svg>
        </motion.div>
        <motion.div
          className="mb-4 z-10"
          initial={{ x: 1552, opacity: 0 }}
          animate={{
            y: isContactHovered ? 22 : 0,
            opacity: isContactHovered ? 1 : 0,
            transition: {
              y: { duration: 0.2, delay: 0.5 },
              opacity: { duration: 0.2, delay: 0.5 },
            },
          }}
        >
          <svg
            width="10"
            height="10"
            viewBox="0 0 100 100"
            xmlns="http://www.w3.org/2000/svg"
            style={{ display: "block", margin: "auto" }}
          >
            <circle cx="50" cy="50" r="50" fill="white" />
          </svg>
        </motion.div>
        <motion.div
          className="mb-4 z-10"
          initial={{ x: 1540, y: 20, opacity: 0 }}
          animate={{
            x: isContactHovered ? 1630 : 1550,
            opacity: isContactHovered ? 1 : 0,
            transition: {
              x: { duration: 0.2, delay: 0.7 },
              opacity: { duration: 0.2, delay: 0.7 },
            },
          }}
        >
          <svg
            width="10"
            height="10"
            viewBox="0 0 100 100"
            xmlns="http://www.w3.org/2000/svg"
            style={{ display: "block", margin: "auto" }}
          >
            <circle cx="50" cy="50" r="50" fill="white" />
          </svg>
        </motion.div>
        <motion.div
          className="mb-4 z-10"
          initial={{ x: 1620, y: 20, opacity: 0 }}
          animate={{
            y: isContactHovered ? -5 : 20,
            opacity: isContactHovered ? 1 : 0,
            transition: {
              y: { duration: 0.2, delay: 0.9 },
              opacity: { duration: 0.2, delay: 0.9 },
            },
          }}
        >
          <svg
            width="10"
            height="10"
            viewBox="0 0 100 100"
            xmlns="http://www.w3.org/2000/svg"
            style={{ display: "block", margin: "auto" }}
          >
            <circle cx="50" cy="50" r="50" fill="white" />
          </svg>
        </motion.div> */}
      </div>

      <nav className="flex justify-end pr-16">
        <ul className="flex items-center">
          {" "}
          {/* Added items-center to vertically align items */}
          <motion.li
            whileHover={{ scale: 1.1 }}
            transition={{ duration: 0.2 }}
            className="mr-6"
          >
            <Link to="/" className="text-white hover:text-yellow-400">
              Home
            </Link>
          </motion.li>
          <motion.li
            whileHover={{ scale: 1.1 }}
            transition={{ duration: 0.2 }}
            className="mr-6"
          >
            <Link to="/about" className="text-white hover:text-yellow-400">
              About
            </Link>
          </motion.li>
          <motion.li
            whileHover={{ scale: 1.1 }}
            transition={{ duration: 0.2 }}
            className="mr-6"
          >
            <Link to="/projects" className="text-white hover:text-yellow-400">
              Projects
            </Link>
          </motion.li>
          <motion.li
            whileHover={{ scale: 1.1 }}
            transition={{ duration: 0.2 }}
            className="mr-6"
          >
            <Link to="/skills" className="text-white hover:text-yellow-400">
              Skills
            </Link>
          </motion.li>
          <motion.li
            ref={scope}
            whileHover={{
              scale: 1.1,
              boxShadow: "0px 0px 10px 2px #4FD1C5",
            }}
            transition={{
              duration: 0.7,
              ease: "easeInOut",
              scale: { duration: 0.7, ease: "easeInOut" },
            }}
            onHoverStart={() => setIsContactHovered(true)}
            onHoverEnd={() => setIsContactHovered(false)}
            className="relative px-3 hover:-my-2 mx-2 radius-md border-transparent"
            onClick={onButtonClick}
          >
            <Link to="/contact" className="text-white hover:text-yellow-400">
              <span className="sr-only">Contact</span>
              <span className="block h-8 overflow-hidden" aria-hidden>
                {["C", "o", "n", "t", "a", "c", "t"].map((letter, index) => (
                  <span
                    data-letter={letter}
                    className="letter relative inline-block h-8 leading-8 after:absolute after:left-0 after:top-full after:h-8 after:content-[attr(data-letter)]"
                    key={`${letter}-${index}`}
                  >
                    {letter}
                  </span>
                ))}
              </span>
              <span
                aria-hidden
                className="pointer-events-none absolute inset-0 -z-10 block"
              >
                {Array.from({ length: 20 }).map((_, index) => (
                  <svg
                    className={`absolute left-1/2 top-1/2 opacity-0 sparkle-${index}`}
                    key={index}
                    viewBox="0 0 122 117"
                    width="10"
                    height="10"
                    style={{ transform: "translate(-50%, -50%)" }}
                  >
                    <path
                      className="fill-[#4FD1C5]"
                      d="M64.39,2,80.11,38.76,120,42.33a3.2,3.2,0,0,1,1.83,5.59h0L91.64,74.25l8.92,39a3.2,3.2,0,0,1-4.87,3.4L61.44,96.19,27.09,116.73a3.2,3.2,0,0,1-4.76-3.46h0l8.92-39L1.09,47.92A3.2,3.2,0,0,1,3,42.32l39.74-3.56L58.49,2a3.2,3.2,0,0,1,5.9,0Z"
                    />
                  </svg>
                ))}
              </span>
            </Link>
          </motion.li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
