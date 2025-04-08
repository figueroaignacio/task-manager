import { useAuth } from "@/modules/auth/hooks/use-auth";
import { Navigate, Outlet } from "react-router";

export function RedirectIfAuthenticated() {
  const { isAuthenticated, isLoading } = useAuth();

  if (isLoading) return <div>Loading...</div>;
  if (isAuthenticated) return <Navigate to="/dashboard" replace />;

  return <Outlet />;
}
