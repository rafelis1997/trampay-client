import { AuthContext } from "@/contexts/auth-contex";
import { useContext } from "react";

export function useAuth() {
  const { signIn, user } = useContext(AuthContext);

  return { signIn, user };
}
