import type { RegisterRequest } from "../../dto/RegisterRequest";
import { useState } from "react";
import { authService } from "../../services/authService";
import { useNavigate } from "react-router";
import { StateError } from "../../exceptions/StateError";
import { HttpError } from "../../exceptions/HttpError";

function useRegister() {
  const [user, setUser] = useState<RegisterRequest & { confirmPassword: string }>({
    fullname: "",
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const navigate = useNavigate();

  const [status, setStatus] = useState<"idle" | "loading" | "success" | StateError>("idle");

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setUser({ ...user, [name]: value });
  };

  const handleSubmit = async () => {
    setStatus("loading");

    if (user.password !== user.confirmPassword) {
      setStatus(new StateError("Passwords don't match"));
      return;
    }

    try {
      await authService.register({
        fullname: user.fullname,
        username: user.username,
        email: user.email,
        password: user.password,
      });

      setStatus("success");
      navigate("/profile");
    } catch (error) {
  
      const errorMessage = error instanceof Error ? error.message : error instanceof HttpError ? error.statusCode + ' ' + error.message: "Failed to register";
      setStatus(new StateError(errorMessage));
    }
  };

  return {
    user,
    status,
    handleInputChange,
    handleSubmit,
  };
}

export default useRegister;
