import type { ReactNode } from "react"
import { PopUpProvider } from "../../hooks/usePopUp/provider"
import { usePopUp } from "../../hooks/usePopUp/hook"
import { X } from "lucide-react"
import useNotifications from "../../hooks/useNotifications"

function NotificationPopup(){
    const { isPopupOpen, closePopup } = usePopUp()
    const { sortTypes, handleSortBy } = useNotifications()
    if (isPopupOpen){
        return (
            <div className="flex flex-col w-100 border-r h-screen fixed left-0 top-0 bottom-0 z-10 bg-black p-8 gap-4">
                <div className="flex flex-row justify-between items-center">
                    <h2>Notifications</h2>
                    <button className="cursor-pointer" onClick={closePopup}>
                        <X/>
                    </button>
                </div>
                <div className="flex flex-row justify-evenly items-center gap-2">
                    {sortTypes.map(sort => (
                        <button name={sort} key={sort} onClick={handleSortBy} className="border p-3 text-xs rounded-3xl truncate">{sort}</button>
                    ))}
                </div>
            </div>
        )
    }

    return null;
}

export function NotificationSidebar({ children }:{ children: ReactNode }){
    return (
        <PopUpProvider>
            <ConsumerButton>
                {children}
            </ConsumerButton>
            <NotificationPopup/>
        </PopUpProvider>
    )
}

function ConsumerButton({ children }:{ children: ReactNode }){
    const { openPopup } = usePopUp()
    return (
        <button className="flex flex-row gap-2 px-4 py-2 text-xs items-center" onClick={openPopup}>
            {children}
        </button>
    )
}

