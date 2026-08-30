import { CircleAlert } from "lucide-react";
import type { ReactNode } from "react";

function NoteCard({children}:{children:ReactNode}){
    return(
        <div className="border-2 border-blue-700 flex flex-row w-fit">
            <div className="min-w-30 min-h-30 bg-blue-500/25 flex flex-col justify-between border-r-2 p-4 border-r-blue-700 text-blue-700">
                <CircleAlert/>
                <p> Note </p>
            </div>
            <div className="p-4 flex justify-start items-center flex-row">
                {children}
            </div>
        </div>
    )
}

export default NoteCard