import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  RiHome2Line,
  RiUserLine,
  RiFolderLine,
  RiFlashlightLine,
  RiMailLine,
} from "react-icons/ri";
import { useState } from "react";

const Header = () => {
  const [isContactHovered, setIsContactHovered] = useState(false);
  console.log(isContactHovered, "isContactHovered");

  return (
    <header className="bg-gray-800 py-4 text-white flex justify-between items-center">
      <div className="pl-6 flex items-center">
        <motion.div
          whileHover={{ rotate: 540, scale: 1.1 }}
          whileTap={{ rotate: -540 }}
          transition={{ duration: 0.5 }}
        >
          <RiHome2Line className="text-2xl mr-2" />
        </motion.div>
        <h1 className="text-2xl font-bold">My Portfolio</h1>
        <motion.div
          className="mb-4"
          initial={{ x: 0 }}
          animate={{
            x: isContactHovered ? 1550 : 0,
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
          className="mb-4"
          initial={{ x: 1540, opacity: 0 }}
          animate={{
            y: isContactHovered ? 20 : 0,
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
          className="mb-4"
          initial={{ x: 1540, y: 20, opacity: 0 }}
          animate={{
            x: isContactHovered ? 1610 : 1550,
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
          className="mb-4"
          initial={{ x: 1600, y: 20, opacity: 0 }}
          animate={{
            y: isContactHovered ? 0 : 20,
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
        </motion.div>
      </div>

      <nav className="flex justify-end pr-16">
        <ul className="flex">
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
            whileHover={{ scale: 1.1 }}
            transition={{ duration: 0.2 }}
            onHoverStart={() => setIsContactHovered(true)}
            onHoverEnd={() => setIsContactHovered(false)}
            className="mr-6"
          >
            <Link to="/contact" className="text-white hover:text-yellow-400">
              Contact
            </Link>
          </motion.li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
