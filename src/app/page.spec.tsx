import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import "@testing-library/jest-dom";
import Home from "./page";
import fetchMock from "jest-fetch-mock";
import { act } from "react";
import { useUserStore } from "@/store/userStore";

const pushMock = jest.fn();

fetchMock.enableMocks();

jest.mock("next/navigation", () => ({
  useRouter() {
    return {
      pathname: "/",
      push: pushMock,
    };
  },
}));

describe("Login Page", () => {
  beforeEach(() => {
    fetchMock.resetMocks();
    pushMock.mockClear();
  });

  it("calls authenticate function with correct data", async () => {
    fetchMock.mockResponseOnce(
      JSON.stringify({
        id: "1",
        username: "emilys",
        email: "emily.johnson@x.dummyjson.com",
        firstName: "Emily",
        lastName: "Johnson",
        gender: "female",
        image: "https://dummyjson.com/icon/emilys/128",
        accessToken: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
        refreshToken: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
      })
    );

    render(<Home />);

    const usernameInput = screen.getByTestId("username-input");
    const passwordInput = screen.getByTestId("password-input");
    const loginButton = screen.getByTestId("login-button");

    userEvent.type(usernameInput, "emilys");
    userEvent.type(passwordInput, "emilyspass");

    await act(async () => {
      userEvent.click(loginButton);
    });

    await act(async () => {
      useUserStore.setState({
        user: {
          id: "1",
          username: "emilys",
          email: "emily.johnson@x.dummyjson.com",
          firstName: "Emily",
          lastName: "Johnson",
          gender: "female",
          image: "https://dummyjson.com/icon/emilys/128",
          accessToken: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
          refreshToken: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
        },
      });
    });

    await waitFor(() => {
      expect(pushMock).toHaveBeenCalledWith("/products");
    });
  });
});
