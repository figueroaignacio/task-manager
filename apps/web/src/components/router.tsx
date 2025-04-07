import { Home } from "lucide-react";
import { Route, Routes } from "react-router";

import { AuthLayout } from "@/layouts/auth-layout";
import { LoginPage } from "@/pages/login";
import { RegisterPage } from "@/pages/register";

export function AppRouter() {
  return (
    <Routes>
      <Route index element={<Home />} />
      <Route path="auth">
        <Route element={<AuthLayout />}>
          <Route path="login" element={<LoginPage />} />
          <Route path="register" element={<RegisterPage />} />
        </Route>
      </Route>
    </Routes>
  );
}
