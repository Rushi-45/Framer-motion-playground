import { motion } from "framer-motion";

const CardWithHeader = () => {
  return (
    <motion.div
      className="flex justify-center flex-col mb-6 max-w-sm "
      animate={{
        y: ["0px", "15px", "0px"],
      }}
      transition={{
        duration: 8,
        repeat: Infinity,
        repeatType: "loop",
      }}
    >
      <motion.div className="flex justify-between items-center bg-gray-800 p-4 rounded-t-lg">
        <div className="flex space-x-2">
          <div className="w-4 h-4 rounded-full bg-red-500" />
          <div className="w-4 h-4 rounded-full bg-orange-500" />
          <div className="w-4 h-4 rounded-full bg-yellow-500" />
          <div className="w-4 h-4 rounded-full bg-green-500" />
        </div>
      </motion.div>

      <div className="bg-white rounded-b-lg shadow-lg p-6 max-w-sm flex flex-col items-center">
        <img
          src="https://via.placeholder.com/150"
          alt="Profile"
          className="w-32 h-32 rounded-full mb-4"
        />
        <h2 className="text-2xl font-semibold mb-2">Your Name</h2>
        <p className="text-lg mb-4">Your Job Title</p>
        <p className="text-base text-gray-700">Based in Your Location</p>
      </div>
    </motion.div>
  );
};

export default CardWithHeader;
