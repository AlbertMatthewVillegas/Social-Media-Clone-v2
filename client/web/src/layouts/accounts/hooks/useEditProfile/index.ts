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
      await userService.updateCurrentUser(user);
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
