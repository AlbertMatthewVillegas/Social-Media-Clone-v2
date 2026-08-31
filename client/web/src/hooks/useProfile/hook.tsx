import { useContext } from "react"
import ProfileContext from "./context"

function useProfile() {
    const context = useContext(ProfileContext)
    if(!context)
        throw new Error("profile context must be used within a profile provider")

    return context
}

export default useProfile