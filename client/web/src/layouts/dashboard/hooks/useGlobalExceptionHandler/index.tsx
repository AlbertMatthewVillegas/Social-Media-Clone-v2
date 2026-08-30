import { useEffect } from "react";
import { useNavigate } from "react-router";
import useCurrentUser from "../useCurrentUser/hook";

function useGlobalExceptionHandler() {
  const navigate = useNavigate();

  const currentUser = useCurrentUser();

  try {

    // TODO: CHANGE THIS LATER
    if(currentUser == null){
        throw new Error("you are not logged in, sign in again")
    }

  } catch (error) {
    if (!(error instanceof Error) || !error.message.includes("CurrentUserProvider")) {
      console.error("Unexpected global exception:", error);
    }
  }

  useEffect(() => {
    if (!currentUser) {
      navigate("/login", { replace: true });
    }
  }, [currentUser, navigate]);

  return currentUser;
}

export default useGlobalExceptionHandler;
