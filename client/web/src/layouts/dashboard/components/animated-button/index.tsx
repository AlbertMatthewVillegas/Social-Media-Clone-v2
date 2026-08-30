import { motion } from "motion/react";

function AnimatedNavButton({ ...props }) {
  return (
    <motion.button
      {...props}
      className="flex flex-row gap-2 justify-start items-center px-4 py-2 rounded-md cursor-pointer text-xs w-full"
      whileHover={{
        scale: 1.05,
        backgroundColor: "rgba(255, 255, 255, 0.5)",
      }}
      transition={{
        duration: 0.2,
        ease: "easeInOut",
      }}
    >
      {props.children}
    </motion.button>
  );
}

export default AnimatedNavButton;