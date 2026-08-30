import { useContext } from "react";
import { PopUpContext } from "./context";

export function usePopUp() {
    const context = useContext(PopUpContext);

    if (context === undefined) {
        throw new Error("usePopUp must be used within a PopUpProvider");
    }

    return context;
}