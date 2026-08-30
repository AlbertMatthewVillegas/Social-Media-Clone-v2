import { useContext } from "react";
import { CurrentUserContext } from "./context";

function useCurrentUser() {
  const context = useContext(CurrentUserContext);
  if (!context) {
    throw new Error("useCurrentUser must be used within CurrentUserProvider");
  }
  const user = context.currentUser?.entity
  return user
}

export default useCurrentUser;
