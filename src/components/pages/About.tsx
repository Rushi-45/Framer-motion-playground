import { motion } from "framer-motion";

const About = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: -50 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 50 }}
      transition={{ duration: 0.5 }}
    >
      <h1>About Me</h1>
      <p>Here's a little background about me...</p>
      <img src="/src/assets/images/profile.jpg" alt="Your Name" />
    </motion.div>
  );
};

export default About;
