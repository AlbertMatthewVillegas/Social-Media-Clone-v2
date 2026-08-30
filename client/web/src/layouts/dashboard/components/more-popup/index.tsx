import { motion, AnimatePresence } from "motion/react";
import { Activity, Bookmark, LogOut, MoonStar, Repeat2, Settings } from "lucide-react";
import type { PopupOptionProps, AnimatedProps } from "./types";
import { usePopUp } from "../../../../hooks/usePopUp/hook";
import type { ReactNode } from "react";
import { PopUpProvider } from "../../../../hooks/usePopUp/provider";

function AnimatedOverlay({ children }: AnimatedProps) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-10"
    >
      {children}
    </motion.div>
  );
}

function AnimatedMenu({ children }: AnimatedProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 8, scale: 0.96 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: 8, scale: 0.96 }}
      transition={{ duration: 0.2, ease: "easeOut" }}
      className="absolute bottom-16 left-0 z-20 w-56 rounded-2xl border border-[#948D83]/30 bg-[#212624] p-2 shadow-2xl shadow-black/30"
    >
      {children}
    </motion.div>
  );
}

function PopupOption({ icon, label, onClick }: PopupOptionProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="flex w-full items-center gap-3 rounded-lg px-3 py-2 text-left text-sm text-[#F5F5F5] transition hover:bg-white/10 cursor-pointer" 
    >
      <span className="text-[#F9DD55]">{icon}</span>
      <span>{label}</span>
    </button>
  );
}

function MorePopup() {
  const { isPopupOpen, closePopup } = usePopUp()
  return (
    <AnimatePresence>
      {isPopupOpen ? (
        <>
          <AnimatedOverlay>
            <div className="h-full w-full" onClick={closePopup} />
          </AnimatedOverlay>
          <AnimatedMenu>
            <div className="space-y-1">
              <PopupOption icon={<Activity size={16} />} label="Activity" onClick={closePopup} />
              <PopupOption icon={<LogOut size={16} />} label="Logout" onClick={closePopup} />
              <PopupOption icon={<Repeat2 size={16} />} label="Switch account" onClick={closePopup} />
              <PopupOption icon={<MoonStar size={16} />} label="Switch appearance" onClick={closePopup} />
              <PopupOption icon={<Bookmark size={16} />} label="Saved" onClick={closePopup} />
              <PopupOption icon={<Settings size={16} />} label="Settings" onClick={closePopup} />
            </div>
          </AnimatedMenu>
        </>
      ) : null}
    </AnimatePresence>
  );
}

function ConsumerButton({ children }:{ children:ReactNode }){
    const { openPopup } = usePopUp()
    return (
        <button className="flex flex-row gap-2 px-4 py-2 text-xs items-center" onClick={openPopup}>
            {children}
        </button>
    )
}

function MoreButton({ children }:{ children:ReactNode }){
  return (
    <PopUpProvider>
      <ConsumerButton>
        {children}
      </ConsumerButton>
      <MorePopup/>
    </PopUpProvider>
  )
}

export default MoreButton;
