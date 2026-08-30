import { AnimatePresence } from "motion/react";
import { Plus, X } from "lucide-react";
import { AnimatedBackdrop , AnimatedDialog } from "./Animations";
import { useUploadPost } from "../../hooks/useUploadPost";
import FilesDisplay from "./FilesDisplay";
import { usePopUp } from "../../../../hooks/usePopUp/hook";
import type { ReactNode } from "react";
import { PopUpProvider } from "../../../../hooks/usePopUp/provider";

function CreatePopup() {
  const { formData, handleChange, resetForm, handleFilesChange, handlePost } = useUploadPost();
  const { files, title, description } = formData;

  const { isPopupOpen, closePopup } = usePopUp()

  const handleSave = async () => {
    await handlePost()
    resetForm();
    closePopup();
  };

  return (
    <AnimatePresence>
      {isPopupOpen && (
        <AnimatedBackdrop>
          <AnimatedDialog>
            <div className="mb-4 flex items-center justify-between">
              <div>
                <h3 className="text-lg font-semibold text-white">Create post</h3>
                <p className="text-sm text-[#948D83]">Add a title and short description</p>
              </div>
              
              <CloseButton/>
            </div>

            <div className="space-y-4">
              <div className="flex flex-col gap-2">
                <label className=" block text-sm font-medium text-[#F5F5F5]">
                  Files to Upload
                </label>
                <FilesDisplay files={files} />  
              </div>
              
              <div className="flex flex-col gap-2">
                <label className="flex w-full cursor-pointer items-center justify-center rounded-xl border border-[#948D83]/30 bg-[#151918] px-3 text-sm text-white outline-none ring-0 transition-colors hover:bg-[#1f2423] py-8">
                  <input type="file" multiple className="sr-only" onChange={handleFilesChange} />
                  <Plus size={16} className="mr-2 inline-block" />
                  Upload Files
                </label>
              </div>

              <div className="flex flex-col gap-2">
                <label className=" block text-sm font-medium text-[#F5F5F5]" htmlFor="title">
                  Title
                </label>
                <input
                  id="title"
                  value={title}
                  onChange={(event) => handleChange("title", event.target.value)}
                  placeholder="Enter a title"
                  className="w-full rounded-xl border border-[#948D83]/30 bg-[#151918] px-3 py-2 text-sm text-white outline-none ring-0 placeholder:text-[#948D83]"
                />
              </div>

              <div className="flex flex-col gap-2">
                <label className="block text-sm font-medium text-[#F5F5F5]" htmlFor="description">
                  Description
                </label>
                <textarea
                  id="description"
                  value={description}
                  onChange={(event) => handleChange("description", event.target.value)}
                  placeholder="Write a short description"
                  rows={5}
                  className="w-full rounded-xl border border-[#948D83]/30 bg-[#151918] px-3 py-2 text-sm text-white outline-none placeholder:text-[#948D83]"
                />
              </div>

              <div className="flex justify-end">
                <button
                  type="button"
                  onClick={handleSave}
                  className="rounded-md bg-[#F9DD55] px-8 py-2 text-sm font-semibold text-[#151918] transition hover:brightness-110 cursor-pointer"
                >
                  Save
                </button>
              </div>
            </div>
          </AnimatedDialog>
        </AnimatedBackdrop>
      )}
    </AnimatePresence>
  );
}

function CloseButton(){
  const { closePopup } = usePopUp()
  return (
    <button
      type="button"
      onClick={closePopup}
      className="rounded-full p-2 text-[#948D83] transition hover:bg-white/10 hover:text-white"
      aria-label="Close popup"
    >
      <X size={18} />
    </button>
  )
}

function ConsumerButton({ children }:{ children:ReactNode }){
    const { openPopup } = usePopUp()
    return (
        <button className="flex flex-row gap-2 px-4 py-2 text-xs items-center" onClick={openPopup}>
            {children}
        </button>
    )
}

function CreateButton({ children }:{ children:ReactNode }){
  return (
    <PopUpProvider>
      <ConsumerButton>
        {children}
      </ConsumerButton>
      <CreatePopup/>
    </PopUpProvider>
  )
}

export default CreateButton

  