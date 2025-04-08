// src/modules/auth/context/auth-provider.tsx
import { ReactNode, useEffect, useState } from "react";
import { useNavigate } from "react-router";
import {
  getCurrentUser,
  login as loginService,
  logout as logoutService,
  register as registerService, // 👈 import register
} from "../api";
import { AuthContext, AuthContextType } from "../contexts/auth-context";
import { User } from "../lib/definitions";

interface AuthProviderProps {
  children: ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const userData = await getCurrentUser();
        setUser(userData);
      } catch (error) {
        console.error("Error al verificar autenticación:", error);
        setUser(null);
      } finally {
        setIsLoading(false);
      }
    };

    checkAuth();
  }, []);

  const login = async (email: string, password: string) => {
    setIsLoading(true);
    try {
      await loginService(email, password);
      const userData = await getCurrentUser();
      setUser(userData);
      navigate("/dashboard");
    } finally {
      setIsLoading(false);
    }
  };

  const register = async (email: string, password: string) => {
    setIsLoading(true);
    try {
      await registerService(email, password);
      const userData = await getCurrentUser();
      setUser(userData);
      navigate("/auth/login");
    } finally {
      setIsLoading(false);
    }
  };

  const logout = async () => {
    try {
      await logoutService();
    } catch (error) {
      console.error("Error al cerrar sesión:", error);
    } finally {
      setUser(null);
      navigate("/auth/login");
    }
  };

  const authContextValue: AuthContextType = {
    user,
    isAuthenticated: !!user,
    isLoading,
    login,
    register,
    logout,
  };

  return <AuthContext value={authContextValue}>{children}</AuthContext>;
}
