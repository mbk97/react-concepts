import React from "react";
import { motion } from "framer-motion";

const routeVariants = {
  initial: {
    y: "100vh",
  },
  final: {
    y: "0vh",
    transition: {
      type: "spring",
      mass: 0.4,
    },
  },
};

const Contact = () => {
  return (
    <motion.div
      className="bg-[green] h-[500px] w-[100vw]"
      variants={routeVariants}
      initial="initial"
      animate="final"
    >
      <h1 className="text-white text-[4rem]">Contact</h1>
    </motion.div>
  );
};

export default Contact;
