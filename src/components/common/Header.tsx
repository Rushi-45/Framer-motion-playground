import { motion } from "framer-motion";
import { RiHome2Line } from "react-icons/ri";
import { Link } from "react-scroll";

const Header = () => {
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
      </div>

      <nav className="flex justify-end pr-16">
        <ul className="flex items-center">
          {["home", "about", "projects", "skills", "contact"].map((section) => (
            <motion.li
              key={section}
              whileHover={{ scale: 1.1 }}
              transition={{ duration: 0.2 }}
              className="mr-6"
            >
              <Link
                to={section} // Match section id
                smooth={true}
                duration={500}
                offset={-70} // Offset for fixed header
                className="cursor-pointer text-white hover:text-yellow-400"
              >
                {section.charAt(0).toUpperCase() + section.slice(1)}
              </Link>
            </motion.li>
          ))}
        </ul>
      </nav>
    </header>
  );
};

export default Header;
