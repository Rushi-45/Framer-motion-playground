import { motion, useInView } from "framer-motion";
import { FiMail, FiLinkedin, FiInstagram, FiGithub } from "react-icons/fi";
import toast from "react-hot-toast";
import { useRef, useState } from "react";
import HoverDevCards from "@/components/common/HoverFillCards";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [loading, setLoading] = useState(false);

  const ref1 = useRef(null);
  const ref2 = useRef(null);
  const isInView1 = useInView(ref1, { once: true, amount: 0.2 });
  const isInView2 = useInView(ref2, { once: true, amount: 0.2 });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch(
        "https://formsubmit.co/rushi.positive@gmail.com",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        }
      );

      if (response.ok) {
        toast.success("Message sent successfully!");
        setFormData({ name: "", email: "", message: "" });
      } else {
        toast.error("Failed to send message.");
      }
    } catch (error) {
      toast.error("Something went wrong!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div
      ref={ref1}
      className="w-full min-h-screen text-white py-16 px-6"
      initial={{ opacity: 0, y: 50 }}
      animate={isInView1 ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5 }}
    >
      <motion.div
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center mb-12"
      >
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold">
          Let's Connect 🚀
        </h2>
        <p className="text-gray-400 mt-3 text-base sm:text-lg">
          Got a project? Want to collaborate? Drop a message!
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="max-w-4xl mx-auto gap-12 p-2 sm:p-8 bg-opacity-30 bg-white/10 backdrop-blur-lg rounded-xl shadow-xl"
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="flex justify-center items-center p-2"
        >
          <div className="w-full max-w-4xl p-8 sm:p-10 bg-opacity-30 bg-white/10 backdrop-blur-lg rounded-xl shadow-xl">
            <h3 className="text-xl sm:text-2xl font-semibold mb-6 text-center">
              Send Me a Message 📩
            </h3>
            <form onSubmit={handleSubmit} className="space-y-5">
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
                />
              </motion.div>

              <motion.button
                type="submit"
                whileHover={
                  !loading
                    ? {
                        scale: 1.05,
                        boxShadow: "0px 0px 10px rgba(0, 229, 255, 0.8)",
                      }
                    : {}
                }
                whileTap={!loading ? { scale: 0.95 } : {}}
                disabled={loading}
                className={`w-full bg-linear-to-r from-blue-500 to-teal-400 hover:from-blue-600 hover:to-teal-500 text-white font-semibold py-3 rounded-lg transition-all duration-300 shadow-lg ${
                  loading ? "opacity-50 cursor-not-allowed" : ""
                }`}
              >
                {loading ? (
                  <div className="flex items-center justify-center">
                    <svg
                      className="animate-spin h-5 w-5 mr-3 text-white"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8v8H4z"
                      ></path>
                    </svg>
                    Sending...
                  </div>
                ) : (
                  "Send Message"
                )}
              </motion.button>
            </form>
          </div>
        </motion.div>
      </motion.div>
      <motion.div
        ref={ref2}
        initial={{ opacity: 0, y: 50 }}
        animate={isInView2 ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.7 }}
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
              target="_blank"
              rel="noopener noreferrer"
            />
            <HoverDevCards
              title="LinkedIn"
              subtitle="Professional Profile"
              href="https://www.linkedin.com/in/rushi-chudasama-63473819a/"
              Icon={FiLinkedin}
              color="blue"
              target="_blank"
              rel="noopener noreferrer"
            />
            <HoverDevCards
              title="Instagram"
              subtitle="Follow me"
              href="https://www.instagram.com/rushiii.js"
              Icon={FiInstagram}
              color="pink"
              target="_blank"
              rel="noopener noreferrer"
            />
            <HoverDevCards
              title="GitHub"
              subtitle="Open Source Contributions"
              href="https://github.com/Rushi-45/"
              Icon={FiGithub}
              color="gray"
              target="_blank"
              rel="noopener noreferrer"
            />
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default Contact;
