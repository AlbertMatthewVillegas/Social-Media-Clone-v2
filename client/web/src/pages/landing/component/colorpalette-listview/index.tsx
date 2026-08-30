import { motion } from "motion/react"

function ColorPaletteListView({items}:{items: {name:string, hex:string}[]}){
    return (
        <div className="flex flex-row flex-wrap gap-4">
            {items.map((color)=>(
                <motion.div
                className="flex flex-row p-3 rounded-md text-xs justify-start items-center gap-2 border"
                key={`${color.name}-${color.hex}`}
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
                    <div className="w-8 h-8 border" style={{ backgroundColor: color.hex }} />
                    <p className="text-white">{color.name}</p>
                    <p> {color.hex} </p>
                </motion.div>
            ))}
        </div>
    )
}

export default ColorPaletteListView