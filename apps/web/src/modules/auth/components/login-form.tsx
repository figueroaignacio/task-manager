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
      // No necesitamos hacer navigate aquí porque login ya lo maneja en el AuthProvider
    } catch (error) {
      setServerError(
        error instanceof Error ? error.message : "Error de autenticación"
      );
    }
  };

  return (
    <div className="mx-auto max-w-md space-y-6 p-8 rounded-lg shadow-md">
      <h1 className="text-2xl font-bold text-center">Log In</h1>

      {serverError && (
        <div className="p-3 bg-red-100 border border-red-400 text-red-700 rounded">
          {serverError}
        </div>
      )}

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div className="space-y-2">
          <label htmlFor="email" className="block text-sm font-medium">
            Email
          </label>
          <input
            id="email"
            type="email"
            className="w-full p-2 border rounded"
            {...register("email")}
          />
          {errors.email && (
            <p className="text-sm text-red-600">{errors.email.message}</p>
          )}
        </div>

        <div className="space-y-2">
          <label htmlFor="password" className="block text-sm font-medium">
            Password
          </label>
          <input
            id="password"
            type="password"
            className="w-full p-2 border rounded"
            {...register("password")}
          />
          {errors.password && (
            <p className="text-sm text-red-600">{errors.password.message}</p>
          )}
        </div>

        <button
          type="submit"
          disabled={isSubmitting || isLoading}
          className="w-full p-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50"
        >
          {isSubmitting || isLoading ? "Logging in..." : "Log In"}
        </button>
      </form>

      <div className="text-center text-sm">
        <a href="/auth/register" className="text-blue-600 hover:underline">
          Don't have an account? Register
        </a>
      </div>
    </div>
  );
}
