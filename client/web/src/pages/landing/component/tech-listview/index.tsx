import { motion } from "motion/react";

function TechListView({items}: {items: {name:string,icon:string}[]}) {
  return (
    <div className="flex flex-row flex-wrap gap-4">
      {items.map((tech, index) => (
        <motion.div
          className="flex flex-row border px-4 py-2 w-40 text-xs justify-start items-center gap-2 rounded-md bg-[#212624]"
          key={`${tech.name}-${tech.icon}`}
          initial={{
            opacity: 0,
            x: -20,
          }}
          whileInView={{
            opacity: 1,
            x: 0,
          }}
          transition={{
            duration: 0.5,
            ease: "easeOut",
          }}
          viewport={{
            once: true,
          }}
        >
            <img
            width={24}
            height={24}
            src={tech.icon}
            alt={'tech-icon ' + index}
            >
            
            </img>
            <p>{tech.name}</p>
        </motion.div>
      ))}
    </div>
  );
}

export default TechListView