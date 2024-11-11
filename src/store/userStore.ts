import { create } from "zustand";
import { persist } from "zustand/middleware";

const USER_STORAGE = "@user:user-1.0.0";

export interface User {
  id: string;
  username: string;
  email: string;
  firstName: string;
  lastName: string;
  gender: string;
  image: string;
  accessToken: string;
  refreshToken: string;
}

interface UserStore {
  user: User;
  setUser: (user: User) => void;
  removeUser: () => void;
}

export const useUserStore = create<UserStore>()(
  persist(
    (set) => ({
      user: {
        accessToken: "",
        email: "",
        firstName: "",
        gender: "",
        id: "",
        image: "",
        lastName: "",
        refreshToken: "",
        username: "",
      },
      setUser: (user: User) => set({ user }),
      removeUser: () =>
        set({
          user: {
            accessToken: "",
            email: "",
            firstName: "",
            gender: "",
            id: "",
            image: "",
            lastName: "",
            refreshToken: "",
            username: "",
          },
        }),
    }),
    {
      name: USER_STORAGE,
    }
  )
);
