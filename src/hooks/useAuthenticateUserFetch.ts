import { User } from "@/store/userStore";

export interface authenticateUserPostRequest {
  username: string;
  password: string;
}

interface ApiError {
  message: string;
  status: number;
}

export const useAuthenticateUserFetch = async ({
  username,
  password,
}: authenticateUserPostRequest): Promise<User | ApiError> => {
  try {
    const response = await fetch("https://dummyjson.com/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, password, expiresInMins: 60 }),
    });

    if (!response.ok) {
      return {
        message: `Erro ao autenticar o usuário: ${response.statusText}`,
        status: response.status,
      };
    }

    const data = (await response.json()) as User;
    return data;
  } catch (error) {
    return {
      message: error instanceof Error ? error.message : "Erro desconhecido",
      status: 500,
    };
  }
};
