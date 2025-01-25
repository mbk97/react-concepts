import { motion } from "framer-motion";
import React from "react";

const FramerPracticeOne = () => {
  const words = "Framer Motion is awesome!";
  const result = words.split(" ");
  return (
    <div className="overflow-hidden">
      <motion.h1
        initial={{
          opacity: 0,
          x: 20,
        }}
        animate={{
          opacity: 1,
          x: 0,
        }}
        transition={{
          delay: 0.5,
          duration: 1,
        }}
        whileHover={{
          scale: 1.2,
        }}
      >
        Animate Text
      </motion.h1>

      <div style={{ display: "flex", gap: "0.5rem" }}>
        {result.map((word, index) => (
          <motion.span
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.5,
              delay: index * 0.2,
            }}
          >
            {word}
          </motion.span>
        ))}

        {/* ! AnimatePresence */}

        {/* Next, let’s look at AnimatePresence. This component works with motion and is necessary to allow elements you remove from the DOM to show exit animations before they’re removed from the page. AnimatePresence only works on its direct children that fulfill one of two conditions: The child is wrapped with a motion components. The child has an element wrapped with a motion component as one of its children */}
      </div>
    </div>
  );
};

export default FramerPracticeOne;
