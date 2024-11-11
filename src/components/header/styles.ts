"use client";

import styled from "styled-components";

interface ThemeSelected {
  $variant: string;
}

export const HeaderContainer = styled.header<ThemeSelected>`
  display: flex;
  height: 4rem;
  background: ${({ $variant }) =>
    $variant === "light" ? "#FFFEFE" : "#3F3D45"};

  transition: background 0.3s ease-in-out;

  padding: 1rem 0.6rem 1rem 0.6rem;
`;

export const HeaderInProductInfoPageContainer = styled.div<ThemeSelected>`
  display: flex;
  justify-content: space-between;
  width: 100%;

  a {
    font-weight: 600;
    position: relative;

    &::after {
      content: "";
      position: absolute;
      left: 0;
      right: 0;
      bottom: 0.6rem;
      height: 1px;
      background-color: ${({ $variant }) =>
        $variant === "dark" ? "#FFF" : "#333"};
      transform: scaleX(0);
      transform-origin: left;
      transition: transform 0.3s ease;
    }

    &:hover::after {
      transform: scaleX(1);
    }
  }
`;
export const ToggleThemeButtonAndSignOutButtonContainer = styled.div`
  display: flex;
  gap: 1rem;
`;
export const ToggleThemeButtonCreateProductAndSignOutContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
`;
export const ToggleThemeButton = styled.button`
  display: flex;
  background: none;
  border: none;

  &:hover {
    cursor: pointer;
  }
`;
