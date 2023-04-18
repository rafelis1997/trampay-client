import { AuthContext } from "@/contexts/auth-contex";
import { useContext } from "react";

export function useAuth() {
  const auth = useContext(AuthContext);

  return { ...auth };
}
