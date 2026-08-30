import type { LoginRequest } from "../../dto/auth/LoginRequest";
import { useState } from "react";
import { authService } from "../../services/auth/authService";
import { useNavigate } from "react-router";
import { StateError } from "../../exceptions/StateError";
import { HttpError } from "../../exceptions/HttpError";

function useLogin() {
    const [user, setUser] = useState<LoginRequest>({ email: "", password: "" });
    const [status, setStatus] = useState<"idle" | "loading" | "success" | StateError>("idle");
    const navigate = useNavigate();

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setUser({ ...user, [name]: value });
    };

    const handleSubmit = async () => {
        setStatus("loading");

        try {
            await authService.login(user as LoginRequest);
            setStatus("success");
            navigate("/home");
        } catch (error) {
            const errorMessage = error instanceof Error ? error.message : error instanceof HttpError ? error.statusCode + ' ' + error.message: "Failed to register";
            setStatus(new StateError(errorMessage));
        }
    };

    return {
        user,
        status,
        handleInputChange,
        handleSubmit
    }
}

export default useLogin;