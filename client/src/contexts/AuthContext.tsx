import type { User } from "@/types";
import React, {
  createContext,
  useEffect,
  useState,
  type Dispatch,
  type SetStateAction,
} from "react";

export type AuthContextType = {
  authUser: User | null;
  updateAuthUser: Dispatch<SetStateAction<User | null>>;
};

// eslint-disable-next-line react-refresh/only-export-components
export const AuthContext = createContext<AuthContextType | undefined>(
  undefined
);

const AUTH_STORAGE_KEY = "AUTH_USER";

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [authUser, setAuthUser] = useState<User | null>(null);

  useEffect(() => {
    const stored = localStorage.getItem(AUTH_STORAGE_KEY);
    if (stored) {
      try {
        setAuthUser(JSON.parse(stored));
      } catch {
        localStorage.removeItem(AUTH_STORAGE_KEY);
      }
    }
  }, []);

  const updateAuthUser: Dispatch<SetStateAction<User | null>> = (value) => {
    const newUserState = typeof value === "function" ? value(authUser) : value;

    if (newUserState) {
      localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(newUserState));
    } else {
      localStorage.removeItem(AUTH_STORAGE_KEY);
    }

    setAuthUser(newUserState);
  };

  return (
    <AuthContext.Provider
      value={{
        authUser,
        updateAuthUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
