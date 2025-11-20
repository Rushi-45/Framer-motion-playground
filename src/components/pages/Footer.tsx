import { motion } from "framer-motion";
import { FiMail, FiLinkedin, FiInstagram, FiGithub } from "react-icons/fi";
import { Link } from "react-scroll";

const Footer = () => {
  return (
    <footer className="w-full bg-gray-900 text-white py-8 px-6">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-sm text-gray-400"
        >
          © {new Date().getFullYear()} Rushi Chudasama. All rights reserved.
        </motion.p>

        <motion.ul
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="flex gap-6 text-sm"
        >
          {["home", "about", "projects", "skills", "contact"].map((section) => (
            <li key={section}>
              <Link
                to={section}
                smooth={true}
                duration={500}
                offset={-70}
                className="cursor-pointer text-gray-400 hover:text-white transition duration-300"
              >
                {section.charAt(0).toUpperCase() + section.slice(1)}
              </Link>
            </li>
          ))}
        </motion.ul>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="flex gap-4"
        >
          <a
            href="mailto:rushi.positive@gmail.com"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Send email to Rushi Chudasama"
          >
            <FiMail className="text-xl text-gray-400 hover:text-red-400 transition duration-300" />
          </a>
          <a
            href="https://www.linkedin.com/in/rushi-chudasama-63473819a/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Visit Rushi Chudasama's LinkedIn profile"
          >
            <FiLinkedin className="text-xl text-gray-400 hover:text-blue-400 transition duration-300" />
          </a>
          <a
            href="https://www.instagram.com/rushiii.js"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Visit Rushi Chudasama's Instagram profile"
          >
            <FiInstagram className="text-xl text-gray-400 hover:text-pink-400 transition duration-300" />
          </a>
          <a
            href="https://github.com/Rushi-45"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Visit Rushi Chudasama's GitHub profile"
          >
            <FiGithub className="text-xl text-gray-400 hover:text-gray-300 transition duration-300" />
          </a>
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer;
