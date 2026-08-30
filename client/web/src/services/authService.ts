import type { LoginRequest } from "../dto/LoginRequest";
import type { RegisterRequest } from "../dto/RegisterRequest";
import { HttpError } from "../exceptions/HttpError";

export const authService = {
  login: async (payload: LoginRequest): Promise<string> => {
    const url = "http://localhost:8080/api/auth/login"
    const options: RequestInit = {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    }
    const response = await fetch(url,options);

    if (!response.ok) {
      throw new HttpError(response.statusText, response.status);
    }

    return await response.text();
  },

  register: async (payload: RegisterRequest): Promise<string> => {
    const url = "http://localhost:8080/api/auth/register"
    const options: RequestInit = {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    }
    const response = await fetch(url, options);

    if (!response.ok) {
      throw new HttpError(response.statusText, response.status);
    }
    return await response.text();
  },
};
