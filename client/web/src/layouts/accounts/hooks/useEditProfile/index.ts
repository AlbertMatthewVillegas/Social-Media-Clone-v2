import { useState, type ChangeEvent } from "react";
import type { UserRequest } from "../../../../dto/UserRequest";
import { userService } from "../../../../services/userService";
import useCurrentUser from "../../../dashboard/hooks/useCurrentUser/hook";

function useEditProfile(initialValues?: Partial<UserRequest>) {
  const [user, setUser] = useState<UserRequest>({
    username: "",
    fullname: "",
    profilePicture: "",
    bio: "",
    ...initialValues,
  });

  const { currentUser, updateCurrentUser }= useCurrentUser();

  const handleInputChange = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = event.target;
    setUser((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async () => {
    try {
      if(user.username === currentUser?.username && user.fullname === currentUser?.fullname && user.bio === currentUser?.bio && user.profilePicture === currentUser?.profilePicture) {
        throw new Error("No changes made to the profile.");
      }

      if(user.username && user.username.length < 3) {
        throw new Error("Username must be at least 3 characters long.");
      }

      if(user.fullname && user.fullname.length < 3) {
        throw new Error("Fullname must be at least 3 characters long.");
      }

      if(user.bio && user.bio.length > 160) {
        throw new Error("Bio must be less than 160 characters long.");
      }

      if(user.profilePicture && user.profilePicture.length === 0) {
        throw new Error("Profile picture cannot be empty.");
      }

      const userToUpdate: UserRequest = {
        // important because we want to send only the fields that have changed,
        // and not overwrite existing fields with empty values
        username: user.username || currentUser?.username,
        fullname: user.fullname || currentUser?.fullname,
        profilePicture: user.profilePicture || currentUser?.profilePicture,
        bio: user.bio || currentUser?.bio,
      }

      await userService.updateCurrentUser(userToUpdate);
      updateCurrentUser({ ...currentUser, ...user });

    } catch (error) {
        // TODO: CHANGE LATER
      console.error(error);
    }
  };

  const handleProfilePictureChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setUser((prev) => ({ ...prev, profilePicture: reader.result as string }));
      };
      reader.readAsDataURL(file);
    }
  };

  return {
    user,
    setUser,
    handleInputChange,
    handleSubmit,
    handleProfilePictureChange,
  };
}

export default useEditProfile;
