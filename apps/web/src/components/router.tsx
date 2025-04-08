import { Route, Routes } from "react-router";

// Layouts
import { AuthLayout } from "@/layouts/auth-layout";
import { LobbyLayout } from "@/layouts/lobby-layout";

// Pages
import { DashboardPage } from "@/pages/dashboard";
import { HomePage } from "@/pages/home";
import { LoginPage } from "@/pages/login";
import { RegisterPage } from "@/pages/register";

// Components
import { ProtectedRoute } from "@/modules/auth/components/protected-route";
import { RedirectIfAuthenticated } from "@/modules/auth/components/redirect-if-authenticated";

export function AppRouter() {
  return (
    <Routes>
      <Route element={<LobbyLayout />}>
        <Route index element={<HomePage />} />
      </Route>

      <Route element={<RedirectIfAuthenticated />}>
        <Route path="/auth" element={<AuthLayout />}>
          <Route path="login" element={<LoginPage />} />
          <Route path="register" element={<RegisterPage />} />
        </Route>
      </Route>

      <Route element={<ProtectedRoute />}>
        <Route path="/dashboard" element={<DashboardPage />} />
      </Route>
    </Routes>
  );
}
