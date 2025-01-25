import React from "react";
import { motion } from "framer-motion";

const routeVariants = {
  initial: {
    y: "100vh",
  },
  final: {
    y: "0vh",
  },
};
const Home = () => {
  return (
    <motion.div
      className="bg-[red] h-[500px] w-[100vw]"
      variants={routeVariants}
      initial="initial"
      animate="final"
      // transition={{
      //   duration: 0.4,
      // }}
    >
      <h1 className="text-white text-[4rem]">Home</h1>
    </motion.div>
  );
};

export default Home;
