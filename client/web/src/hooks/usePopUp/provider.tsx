import { useState, type ReactNode } from "react";
import { PopUpContext } from "./context";

interface PopUpProviderProps {
    children: ReactNode;
}

export function PopUpProvider({ children }: PopUpProviderProps) {
    const [isPopupOpen, setIsPopupOpen] = useState<boolean>(false);

    const openPopup = () => setIsPopupOpen(true);
    const closePopup = () => setIsPopupOpen(false);
    const togglePopup = () => setIsPopupOpen((prev) => !prev);
    
    const value = {
        isPopupOpen,
        openPopup,
        closePopup,
        togglePopup,
    };

    return (
        <PopUpContext.Provider value={value}>
            {children}
        </PopUpContext.Provider>
    );
}