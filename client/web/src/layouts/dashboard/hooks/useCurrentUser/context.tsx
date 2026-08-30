import { createContext } from "react";
import type { CurrentUserContextType } from "./types";

export const CurrentUserContext = createContext<CurrentUserContextType | undefined>(undefined);
