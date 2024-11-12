"use client";

import Header from "@/components/header";
import {
  ErrorUsernameMessage,
  LoginButton,
  LoginContainer,
  LoginContent,
  PasswordInput,
  UsernameInput,
} from "./styles";

import { useThemeStore } from "@/store/themeStore";

import { useEffect, useState } from "react";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { z } from "zod";
import { authenticateUserFetch } from "@/services/authenticateUserFetch";
import { useUserStore } from "@/store/userStore";

import { useRouter } from "next/navigation";

interface AuthData {
  username: string;
  password: string;
}

const authSchema = z.object({
  username: z.string().min(1),
  password: z.string().min(1),
});

type AuthSchema = z.infer<typeof authSchema>;

export default function Home() {
  const [error, setError] = useState<string>();
  const theme = useThemeStore((state) => state.theme);
  const setUser = useUserStore((state) => state.setUser);
  const [isLoading, setIsLoading] = useState(false);
  const user = useUserStore((state) => state.user);
  const router = useRouter();

  const { register, handleSubmit } = useForm<AuthSchema>({
    resolver: zodResolver(authSchema),
  });

  async function handleAuthenticateUser(data: AuthData) {
    setIsLoading(true);

    console.log("passou");

    try {
      const authenticateResponse = await authenticateUserFetch({
        username: data.username,
        password: data.password,
      });

      if ("username" in authenticateResponse) {
        setError("");
        setUser(authenticateResponse);
      } else {
        setError("Usuário ou senha inválidos.");
      }
    } catch (error) {
      console.error("Erro ao criar usuário:", error);
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    if (user.accessToken !== "") {
      router.push("/products");
    }
  }, [user]);

  return (
    <LoginContainer $variant={theme}>
      <Header page="login" />

      <h2>Seja Bem-vindo!</h2>
      <LoginContent
        $variant={theme}
        onSubmit={handleSubmit(handleAuthenticateUser)}
        data-testid="form-login"
      >
        <label htmlFor="">Username</label>
        <UsernameInput
          $variant={theme}
          type="text"
          {...register("username")}
          data-testid="username-input"
        />

        <label htmlFor="">Senha</label>
        <PasswordInput
          $variant={theme}
          type="password"
          {...register("password")}
          data-testid="password-input"
        />

        {error !== "" && <ErrorUsernameMessage>{error}</ErrorUsernameMessage>}

        <LoginButton
          type="submit"
          $variant={theme}
          disabled={isLoading}
          data-testid="login-button"
        >
          {isLoading ? "Entrando..." : "Entrar"}
        </LoginButton>
      </LoginContent>
    </LoginContainer>
  );
}
