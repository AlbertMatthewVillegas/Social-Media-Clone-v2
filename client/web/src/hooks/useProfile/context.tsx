import { createContext } from "react"
import type { ProfileContextValue } from "./types"

const ProfileContext = createContext<ProfileContextValue | undefined>(undefined)

export default ProfileContext