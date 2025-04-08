import { Route, Routes } from "react-router";

// Layouts
import { AuthLayout } from "@/layouts/auth-layout";

// Pages
import { DashboardPage } from "@/pages/dashboard";
import { HomePage } from "@/pages/home";
import { LoginPage } from "@/pages/login";
import { RegisterPage } from "@/pages/register";

export function AppRouter() {
  return (
    <Routes>
      <Route index element={<HomePage />} />
      <Route path="/auth" element={<AuthLayout />}>
        <Route path="login" element={<LoginPage />} />
        <Route path="register" element={<RegisterPage />} />
      </Route>

      <Route path="dashboard" element={<DashboardPage />} />
    </Routes>
  );
}
