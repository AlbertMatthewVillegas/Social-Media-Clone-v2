import { motion } from "framer-motion";

function LoadingSpinner() {
    return (
        <svg viewBox="0 0 50 50" width="50" height="50">
            <motion.circle
                cx="25"
                cy="25"
                r="20"
                fill="none"
                stroke="#3b82f6"
                strokeWidth="4"
                strokeLinecap="round"
                style={{}}
                animate={{ rotate: 360 }}
                transition={{
                    duration: 1,
                    repeat: Infinity,
                    ease: "linear"
                }}
            />
        </svg>
    );
}

export default LoadingSpinner