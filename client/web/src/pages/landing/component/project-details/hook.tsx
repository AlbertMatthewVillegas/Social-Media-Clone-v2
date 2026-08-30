import java from '../../../../assets/java.svg'
import spring from '../../../../assets/spring.svg'
import react from '../../../../assets/react.svg'
import typescript from '../../../../assets/typescript.svg'
import vite from '../../../../assets/vite.svg'
import postgresql from '../../../../assets/postgreSQL.svg'
import nginx from '../../../../assets/nginx.svg'
import redis from '../../../../assets/redis.svg'
import docker from '../../../../assets/docker.svg'
import motion from '../../../../assets/motion.svg'
import vitest from '../../../../assets/vitest.svg'
import reactrouter from '../../../../assets/react-router.svg'
import lucide from '../../../../assets/lucide.svg'

function useProjectDetails(){
    const colorPalette = [
    { name: "Primary Background", hex: "#151918" },
    { name: "Secondary Background", hex: "#212624" },
    { name: "Heading", hex: "#FFFFFF" },
    { name: "Paragraph & Border", hex: "#948D83" },
    { name: "Highlight", hex: "#F9DD55" },
    { name: "Tip", hex: "#A5EECE" },
    { name: "Note", hex: "#A8B4F7" },
    { name: "Error", hex: "#E14F62" }
    ];
    const builtWith = [
    { name: "Vite", icon: vite },
    { name: "React", icon: react },
    { name: "TypeScript", icon: typescript },
    { name: "Spring", icon: spring },
    { name: "Java", icon: java },
    { name: "PostgreSQL", icon: postgresql }
    ];

    const reactSpecificPackages = [
    { name: "Framer Motion", icon: motion },
    { name: "Vitest", icon: vitest },
    { name: "React Router", icon: reactrouter },
    { name: "Lucide", icon: lucide }
    ];

    const otherTechnologiesUsed = [
    { name: "Redis", icon: redis },
    { name: "Nginx", icon: nginx },
    { name: "Docker", icon: docker }
    ];
    return {
        builtWith,
        reactSpecificPackages,
        otherTechnologiesUsed,
        colorPalette
    }
}

export default useProjectDetails