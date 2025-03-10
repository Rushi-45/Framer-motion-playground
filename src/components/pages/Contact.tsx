import { motion, useInView } from "framer-motion";
import { FiMail, FiLinkedin, FiInstagram, FiGithub } from "react-icons/fi";
import { useRef, useState } from "react";
import HoverDevCards from "../common/HoverFillCards";

interface ContactProps {
  contactEnter: (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => void;
  contactLeave: (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => void;
}

const Contact: React.FC<ContactProps> = ({ contactEnter, contactLeave }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form Submitted", formData);
    setFormData({ name: "", email: "", message: "" });
  };

  return (
    <div className="w-full min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 text-white py-16 px-6">
      <motion.div
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center mb-12"
      >
        <h2 className="text-5xl font-extrabold">Let's Connect 🚀</h2>
        <p className="text-gray-400 mt-3 text-lg">
          Got a project? Want to collaborate? Drop a message!
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="max-w-4xl mx-auto gap-12 p-8 bg-opacity-30 bg-white/10 backdrop-blur-lg rounded-xl shadow-xl"
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="flex justify-center items-center p-2"
        >
          <div className="w-full max-w-4xl p-10 bg-opacity-30 bg-white/10 backdrop-blur-lg rounded-xl shadow-xl">
            <form onSubmit={handleSubmit} className="space-y-6">
              <motion.div
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.2 }}
              >
                <input
                  type="text"
                  name="name"
                  placeholder="👤 Hey there! What's your name?"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full px-5 py-3 rounded-lg border border-gray-500 bg-transparent text-white placeholder-gray-300 focus:ring-2 focus:ring-blue-500 transition-all duration-300"
                />
              </motion.div>

              <motion.div
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.2 }}
              >
                <input
                  type="email"
                  name="email"
                  placeholder="📧 Drop your best email here!"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full px-5 py-3 rounded-lg border border-gray-500 bg-transparent text-white placeholder-gray-300 focus:ring-2 focus:ring-blue-500 transition-all duration-300"
                />
              </motion.div>

              <motion.div
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.2 }}
              >
                <textarea
                  name="message"
                  placeholder="💬 Tell me about your project..."
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={4}
                  className="w-full px-5 py-3 rounded-lg border border-gray-500 bg-transparent text-white placeholder-gray-300 focus:ring-2 focus:ring-blue-500 transition-all duration-300"
                ></textarea>
              </motion.div>

              <motion.button
                type="submit"
                whileHover={{
                  scale: 1.05,
                  boxShadow: "0px 0px 10px rgba(0, 229, 255, 0.8)",
                }}
                whileTap={{ scale: 0.95 }}
                onMouseEnter={contactEnter}
                onMouseLeave={contactLeave}
                className="w-full bg-gradient-to-r from-blue-500 to-teal-400 hover:from-blue-600 hover:to-teal-500 text-white font-semibold py-3 rounded-lg transition-all duration-300 shadow-lg"
              >
                Send Message
              </motion.button>
            </form>
          </div>
        </motion.div>
      </motion.div>
      <motion.div
        ref={ref}
        initial={{ opacity: 0, y: 50 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.5 }}
        className="flex gap-8 w-full place-content-center text-slate-900 mt-12"
      >
        <div className="p-4">
          <div className="grid gap-4 grid-cols-2 lg:grid-cols-4">
            <HoverDevCards
              title="Email"
              subtitle="Get in touch"
              href="mailto:rushi.positive@gmail.com"
              Icon={FiMail}
              color="red"
            />
            <HoverDevCards
              title="LinkedIn"
              subtitle="Professional Profile"
              href="https://www.linkedin.com/in/rushi-chudasama-63473819a/"
              Icon={FiLinkedin}
              color="blue"
            />
            <HoverDevCards
              title="Instagram"
              subtitle="Follow me"
              href="https://www.instagram.com/rushiii.js"
              Icon={FiInstagram}
              color="pink"
            />
            <HoverDevCards
              title="GitHub"
              subtitle="Open Source Contributions"
              href="https://github.com/Rushi-45/"
              Icon={FiGithub}
              color="gray"
            />
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default Contact;
