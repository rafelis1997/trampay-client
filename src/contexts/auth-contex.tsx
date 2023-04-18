import { ReactNode, createContext, useEffect, useState } from "react";
import axios from "axios";

type UserResponse = {
  id: string;
  document: string;
  balance: number;
  email: string;
};

interface AuthContextType {
  user: UserResponse | undefined;
  token: string | undefined;
  isLoggedIn: boolean;
  signIn: (email: string, password: string) => Promise<void>;
}

export const AuthContext = createContext({} as AuthContextType);

export function AuthContextProvider({ children }: { children: ReactNode }) {
  const [session, setSession] = useState<{
    user: UserResponse | undefined;
    token: string | undefined;
  }>({ user: undefined, token: undefined });

  async function checkIfThereIsSession() {
    const token = localStorage.getItem("session_token");

    if (token) {
      const user: UserResponse | undefined = await axios.get(
        `http://localhost:3000/auth/tokenValidate/${token}`
      );

      if (user) {
        setSession({ user, token });
      }
    }
  }

  async function signIn(email: string, password: string) {
    console.log("Signing in...");
    try {
      const session = await axios.post("http://localhost:3000/auth/login", {
        email,
        password,
      });

      const { user, token }: { user: UserResponse; token: string } =
        session.data;

      await localStorage.setItem("session_token", token);
      setSession({ user, token });
    } catch (error) {
      setSession({ user: undefined, token: undefined });
      throw new Error("Not Authorized");
    }
  }

  useEffect(() => {
    // checkIfThereIsSession();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user: session.user,
        token: session.token,
        isLoggedIn: session.user !== undefined,
        signIn,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
