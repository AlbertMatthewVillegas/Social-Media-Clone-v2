import { useState } from "react";

export function useHover() {
    const [isHovering, setIsHovering] = useState(false);

    const handleMouseEnter = () => setIsHovering(true);
    const handleMouseLeave = () => setIsHovering(false);

    return {
        isHovering,
        handleMouseEnter,
        handleMouseLeave,
    };
}
