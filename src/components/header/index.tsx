"use client";

import { useThemeStore } from "@/store/themeStore";
import {
  HeaderContainer,
  HeaderInProductInfoPageContainer,
  ToggleThemeButton,
  ToggleThemeButtonAndSignOutButtonContainer,
  ToggleThemeButtonCreateProductAndSignOutContainer,
} from "./styles";

import { PiSignOut } from "react-icons/pi";

import { FaRegMoon } from "react-icons/fa";
import { MdWbSunny } from "react-icons/md";
import EditOrCreateProductDialog from "../createOrEditItemDialog";
import { useUserStore } from "@/store/userStore";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

interface HeaderProps {
  page: string;
}

export default function Header({ page }: HeaderProps) {
  const handleToggleTheme = useThemeStore((state) => state.handleToggleTheme);
  const theme = useThemeStore((state) => state.theme);
  const router = useRouter();
  const user = useUserStore((state) => state.user);
  const removeUser = useUserStore((state) => state.removeUser);

  useEffect(() => {
    const userStorage = localStorage.getItem("@user:user-1.0.0");

    if (!userStorage && user.accessToken === "") {
      router.push("/");
    }
  }, [user]);

  function handleSignOut() {
    if (typeof window !== "undefined") {
      localStorage.removeItem("@user:user-1.0.0");
    }

    removeUser();
    router.push("/");
  }

  return (
    <HeaderContainer $variant={theme}>
      {page === "products" && (
        <ToggleThemeButtonCreateProductAndSignOutContainer>
          <EditOrCreateProductDialog dialogType="create" />
          <ToggleThemeButton onClick={() => handleToggleTheme()}>
            {theme === "dark" ? (
              <FaRegMoon size={22} color="white" />
            ) : (
              <MdWbSunny size={24} />
            )}
          </ToggleThemeButton>
          {"accessToken" in user && (
            <PiSignOut
              size={24}
              onClick={() => handleSignOut()}
              color={theme === "dark" ? "white" : "#171717"}
              style={{ cursor: "pointer" }}
            />
          )}
        </ToggleThemeButtonCreateProductAndSignOutContainer>
      )}
      {page === "login" && (
        <ToggleThemeButton onClick={() => handleToggleTheme()}>
          {theme === "dark" ? (
            <FaRegMoon size={22} color="white" />
          ) : (
            <MdWbSunny size={24} />
          )}
        </ToggleThemeButton>
      )}
      {page === "productInfo" && (
        <HeaderInProductInfoPageContainer $variant={theme}>
          <a href="/products">Produtos</a>
          <ToggleThemeButtonAndSignOutButtonContainer>
            <ToggleThemeButton onClick={() => handleToggleTheme()}>
              {theme === "dark" ? (
                <FaRegMoon size={22} color="white" />
              ) : (
                <MdWbSunny size={24} />
              )}
            </ToggleThemeButton>
            {"accessToken" in user && (
              <PiSignOut
                size={24}
                onClick={() => handleSignOut()}
                color={theme === "dark" ? "white" : "#171717"}
                style={{ cursor: "pointer" }}
              />
            )}
          </ToggleThemeButtonAndSignOutButtonContainer>
        </HeaderInProductInfoPageContainer>
      )}
    </HeaderContainer>
  );
}
