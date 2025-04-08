import { use } from "react";
import { AuthContext, AuthContextType } from "../contexts/auth-context";

export function useAuth(): AuthContextType {
  const context = use(AuthContext);

  if (!context) {
    throw new Error("useAuth debe ser usado dentro de un AuthProvider");
  }

  return context;
}
