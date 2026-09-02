import { useRef } from "react";
import { CircleUser } from "lucide-react";
import useCurrentUser from "../../layouts/dashboard/hooks/useCurrentUser/hook";
import Button from "../../components/Button";
import useEditProfile from "../../layouts/accounts/hooks/useEditProfile";

function EditProfilePage() {
    return (
        <div className="flex flex-col min-h-screen p-8 w-full">
            <h1 className="text-4xl font-bold mb-8">Edit Profile</h1>
            <div className="flex flex-col gap-4 w-full">
                <EditProfileBody/>
                
            </div>
        </div>
    );
}

export default EditProfilePage;

function EditProfileBody() {
    const {currentUser} = useCurrentUser();
    const fileInputRef = useRef<HTMLInputElement | null>(null);
    const { handleInputChange, handleSubmit, handleProfilePictureChange } = useEditProfile()
    
    if (!currentUser) {
        return (
            <div className="flex w-full min-h-screen justify-center items-center">
                <span>Loading...</span>
            </div>
        )
    }

    if (currentUser === undefined) {
        return (
            <div className="flex w-full min-h-screen justify-center items-center">
                <span>Error: User not found</span>
            </div>
        )
    }

    const { profilePicture, username, fullname, bio } = currentUser;

    const imgSharedSize = 120; // Set the desired size for the shared image
    
    return (
        <div className="flex flex-col gap-4 p-4">

            <div className="flex flex-row items-center gap-4 justify-between w-full rounded-lg p-4">
            <div className="flex flex-row items-center gap-4">
                {profilePicture ? <img src={profilePicture} width={imgSharedSize} height={imgSharedSize} className="rounded-full" /> : <CircleUser size={imgSharedSize} />}
                <div className="flex flex-col gap-2">
                    <span className="text-lg font-semibold">{fullname}</span>
                    <span className="text-sm text-gray-500">@{username}</span>
                    <span className="text-sm">{bio || 'No bio available'}</span>
                </div>
            </div>

            <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleProfilePictureChange}
            />
            <Button type="button" className="mt-2" onClick={() => fileInputRef.current?.click()}>
                Change Profile Picture
            </Button>
            
        </div>

            <span className="text-sm text-gray-500">change fullname</span>
            <input type="text" placeholder="Enter new fullname" className="border rounded px-2 py-1 text-sm" onChange={handleInputChange} name="fullname" />
            <span className="text-sm text-gray-500">change username</span>
            <input type="text" placeholder="Enter new username" className="border rounded px-2 py-1 text-sm" onChange={handleInputChange} name="username" />
            <span className="text-sm text-gray-500">change bio</span>
            <textarea placeholder="Enter new bio" className="border rounded px-2 py-1 text-sm" onChange={handleInputChange} name="bio" />

            <Button className="mt-4" onClick={handleSubmit}>
                Save Changes
            </Button>
        </div>
    );
}