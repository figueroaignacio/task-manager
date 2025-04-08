import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useAuth } from "../hooks/use-auth";
import { loginSchema, type LoginSchema } from "../lib/schema";

export function LoginForm() {
  const [serverError, setServerError] = useState<string | null>(null);
  const { login, isLoading } = useAuth();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginSchema>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data: LoginSchema) => {
    setServerError(null);
    try {
      await login(data.email, data.password);
    } catch (error) {
      setServerError(
        error instanceof Error ? error.message : "Error de autenticación"
      );
    }
  };

  return (
    <div>
      <h1>Log In</h1>

      {serverError && (
        <div className="p-3 bg-red-100 border border-red-400 text-red-700 rounded">
          {serverError}
        </div>
      )}

      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label htmlFor="email">Email</label>
          <input id="email" type="email" {...register("email")} />
          {errors.email && (
            <p className="text-sm text-red-600">{errors.email.message}</p>
          )}
        </div>

        <div className="space-y-2">
          <label htmlFor="password">Password</label>
          <input id="password" type="password" {...register("password")} />
          {errors.password && (
            <p className="text-sm text-red-600">{errors.password.message}</p>
          )}
        </div>

        <button type="submit" disabled={isSubmitting || isLoading}>
          {isSubmitting || isLoading ? "Logging in..." : "Log In"}
        </button>
      </form>

      <div>
        <a href="/auth/register">Don't have an account? Register</a>
      </div>
    </div>
  );
}
