import { Navigate, Outlet } from "react-router";
import { useAuth } from "../hooks/use-auth";

export function ProtectedRoute() {
  const { isAuthenticated, isLoading } = useAuth();

  if (isLoading) return <div>Loading...</div>;
  if (!isAuthenticated) return <Navigate to="/auth/login" replace />;

  return <Outlet />;
}
