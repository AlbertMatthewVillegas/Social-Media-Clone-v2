import { createContext } from "react";
import type { PopupContextType } from "./types";

export const PopUpContext = createContext<PopupContextType | undefined>(undefined)