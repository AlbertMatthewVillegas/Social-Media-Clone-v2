import { useEffect, useMemo, useState, type ReactNode } from "react";
import { CurrentUserContext } from "./context";
import type { CurrentUserContextType } from "./types";
import type { UserEntity } from "../../../../entities/UserEntity";
import type { Response } from "../../../../dto/Response";
import { userService } from "../../../../services/userService";
import { HttpError } from "../../../../exceptions/HttpError";

function CurrentUserProvider({ children }: { children?: ReactNode }) {
  const [currentUser, setCurrentUser] = useState<Response<UserEntity> | null>(null);

  const refreshCurrentUser = async () => {
    try {
      // TODO: fetch current user
      const response = await userService.getCurrentUser();
      setCurrentUser(response)
    } catch (error) {
      if(error instanceof HttpError){
        console.error(error.message, error.cause)
      } else {
        console.error("Error fetching current user:", error);
      }
    }
  };

  useEffect(() => {
    const loadCurrentUser = async () => {
      await refreshCurrentUser();
    };

    loadCurrentUser();
    const interval = window.setInterval(refreshCurrentUser, 3 * 60 * 60 * 1000);
    return () => window.clearInterval(interval);
  }, []);

  const value = useMemo<CurrentUserContextType>(() => ({
    currentUser
  }), [currentUser]);

  return (
    <CurrentUserContext.Provider value={value}>
      {children}
    </CurrentUserContext.Provider>
  );
}

export default CurrentUserProvider;
