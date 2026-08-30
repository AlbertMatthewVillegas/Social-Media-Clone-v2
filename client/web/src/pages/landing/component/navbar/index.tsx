import { useState } from "react";
import { motion, useScroll, useMotionValueEvent } from "motion/react";
import { useNavigate } from "react-router";
import Button from "../../../../components/Button";

function LandingNavigationBar() {
        const navigate = useNavigate()
      return (<LandingNavigationBarBody>
                <h1> zerofuku</h1>
                <div className="flex flex-row gap-4 justify-center items-center">
                    <Button onClick={() => navigate('/login')}>
                        login
                    </Button>
                    <Button onClick={() => navigate('/register')}>
                        register
                    </Button>
                </div>
            </LandingNavigationBarBody>);
    }

function LandingNavigationBarBody({ children }: { children: React.ReactNode }) {
  const [hidden, setHidden] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (latest) => {
    const previous = scrollY.getPrevious() ?? 0;
    
    if (latest > previous && latest > 150) {
      setHidden(true);
    } else {
      setHidden(false);
    }
  });

  return (
    <motion.div
      className="sticky top-0 z-50 w-full flex flex-row px-12 py-4 justify-between items-center"
      variants={{
        visible: { y: 0, opacity: 1 },
        hidden: { y: -100, opacity: 0 },
      }}
      animate={isHovered || !hidden ? "visible" : "hidden"}
      transition={{ duration: 0.3, ease: "easeInOut" }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
    >
      {children}
    </motion.div>
  );
}

export default LandingNavigationBar