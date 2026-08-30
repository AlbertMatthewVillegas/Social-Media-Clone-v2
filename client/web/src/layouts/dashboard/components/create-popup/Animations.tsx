import { motion } from "framer-motion";
import type { ReactNode } from "react";

type AnimatedProps = {
  children: ReactNode;
};

function AnimatedBackdrop({ children }: AnimatedProps) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm"
    >
      {children}
    </motion.div>
  );
}

function AnimatedDialog({ children }: AnimatedProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12, scale: 0.96 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: 12, scale: 0.96 }}
      transition={{ duration: 0.2, ease: "easeOut" }}
      className="w-[min(92vw,480px)] rounded-2xl border border-[#948D83]/30 bg-[#212624] p-5 shadow-2xl shadow-black/30"
    >
      {children}
    </motion.div>
  );
}

export type { AnimatedProps };
export { AnimatedBackdrop, AnimatedDialog };