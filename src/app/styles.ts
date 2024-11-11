"use client";

import styled from "styled-components";

interface ThemeSelected {
  $variant: string;
}

export const LoginContainer = styled.div<ThemeSelected>`
  display: flex;
  flex-direction: column;

  height: 100vh;
  width: 100vw;
  background: ${({ $variant }) =>
    $variant === "light" ? "#FFFEFE" : "#3F3D45"};

  transition: background 0.3s ease-in-out;

  h2 {
    color: ${({ $variant }) => ($variant === "light" ? "2C2C2D" : "white")};
    margin: 2rem auto;
  }
`;
export const LoginContent = styled.form<ThemeSelected>`
  display: flex;
  margin: 4rem auto;
  flex-direction: column;
  border-radius: 18px;
  padding: 1rem;
  background: ${({ $variant }) =>
    $variant === "light" ? "#E9EEF6" : "3F3D45"};
  width: 30rem;
  padding: 2rem 1rem;

  box-shadow: ${({ $variant }) =>
    $variant === "light"
      ? "3px 2px 10px 5px rgba(0, 0, 0, 0.1)"
      : "3px 2px 10px 5px rgba(0, 0, 0, 0.1)"};

  label {
    margin-bottom: 0.625rem;
    color: ${({ $variant }) => ($variant === "light" ? "2C2C2D" : "white")};
    font-weight: 700;
  }

  a {
    text-align: end;
    margin-bottom: 2rem;
    font-size: 0.75rem;
  }
`;

export const UsernameInput = styled.input<ThemeSelected>`
  padding: 1rem;
  border-radius: 8px;
  position: relative;
  border: none;
  background: white;
  color: ${({ $variant }) => ($variant === "light" ? "#2C2C2D" : "black")};
  margin-bottom: 1.5rem;
  font-size: 0.75rem;
  transition: all 0.3s;

  &:focus {
    outline: none;
    background: "white";
    box-shadow: 0 0 5px rgba(63, 61, 69, 0.5);
  }

  &:-webkit-autofill {
    -webkit-box-shadow: 0 0 0 1000px white inset;
    box-shadow: 0 0 0 1000px white inset;
    -webkit-text-fill-color: ${({ $variant }) =>
      $variant === "light" ? "#2C2C2D" : "black"};
  }
`;
export const PasswordInput = styled(UsernameInput)``;

export const LoginButton = styled.button<ThemeSelected>`
  padding: 1rem;
  border-radius: 8px;
  border: none;
  background: ${({ $variant }) =>
    $variant === "light"
      ? "linear-gradient(90deg, rgba(7,150,211,1) 0%, rgba(83,192,240,1) 100%)"
      : "linear-gradient(90deg, rgba(7,150,211,1) 0%, rgba(20,136,187,1) 100%)"};

  color: white;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: background 0.3s;

  &:hover {
    background: linear-gradient(
      90deg,
      rgba(21, 157, 215, 1) 0%,
      rgba(65, 161, 204, 1) 100%
    );
  }
`;

export const ErrorUsernameMessage = styled.p`
  color: red;
  font-size: 0.875rem;
  position: absolute;
  top: 47%;
`;
