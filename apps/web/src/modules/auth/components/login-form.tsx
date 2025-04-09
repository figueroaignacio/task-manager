import { zodResolver } from "@hookform/resolvers/zod";
import { AlertCircle, ArrowRight, Lock, Mail } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router";
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
    <div className="relative overflow-hidden rounded-2xl border border-gray-200 bg-white p-8 shadow-lg dark:border-gray-800 dark:bg-gray-900">
      <div className="mb-6 text-center">
        <h1 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
          Welcome back
        </h1>
        <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
          Log in to your account to continue
        </p>
      </div>

      {serverError && (
        <div className="mb-6 flex items-start gap-2 rounded-lg border border-red-200 bg-red-50 p-4 text-red-700 dark:border-red-800 dark:bg-red-900/20 dark:text-red-400">
          <AlertCircle className="mt-0.5 h-5 w-5 flex-shrink-0" />
          <p className="text-sm">{serverError}</p>
        </div>
      )}

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
        <div>
          <label
            htmlFor="email"
            className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300"
          >
            Email
          </label>
          <div className="relative">
            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
              <Mail className="h-5 w-5 text-gray-400" />
            </div>
            <input
              id="email"
              type="email"
              {...register("email")}
              className={`w-full rounded-lg border ${
                errors.email
                  ? "border-red-300 dark:border-red-700"
                  : "border-gray-300 dark:border-gray-700"
              } bg-white pl-10 pr-4 py-2.5 text-gray-900 shadow-sm transition-colors focus:border-purple-900 focus:outline-none focus:ring-2 focus:ring-purple-500/20 dark:bg-gray-800 dark:text-white dark:focus:border-purple-400 dark:focus:ring-purple-400/20`}
              placeholder="your.email@example.com"
            />
          </div>
          {errors.email && (
            <p className="mt-1.5 flex items-center gap-1.5 text-sm text-red-600 dark:text-red-400">
              <AlertCircle className="h-4 w-4" />
              {errors.email.message}
            </p>
          )}
        </div>

        <div>
          <div className="mb-2 flex items-center justify-between">
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300"
            >
              Password
            </label>
            <Link
              to="/auth/forgot-password"
              className="text-xs font-medium text-purple-900 underline"
            >
              Forgot password?
            </Link>
          </div>
          <div className="relative">
            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
              <Lock className="h-5 w-5 text-gray-400" />
            </div>
            <input
              id="password"
              type="password"
              {...register("password")}
              className={`w-full rounded-lg border ${
                errors.password
                  ? "border-red-300 dark:border-red-700"
                  : "border-gray-300 dark:border-gray-700"
              } bg-white pl-10 pr-4 py-2.5 text-gray-900 shadow-sm transition-colors focus:border-purple-900 focus:outline-none focus:ring-2 focus:ring-purple-500/20 dark:bg-gray-800 dark:text-white dark:focus:border-purple-400 dark:focus:ring-purple-400/20`}
              placeholder="••••••••"
            />
          </div>
          {errors.password && (
            <p className="mt-1.5 flex items-center gap-1.5 text-sm text-red-600 dark:text-red-400">
              <AlertCircle className="h-4 w-4" />
              {errors.password.message}
            </p>
          )}
        </div>

        <div className="pt-2">
          <button
            type="submit"
            disabled={isSubmitting || isLoading}
            className="inline-flex w-full items-center justify-center gap-2 rounded-lg bg-purple-900 px-5 py-2.5 text-center text-sm font-medium text-white shadow-lg transition-all hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-70 dark:bg-purple-500 dark:hover:bg-purple-600"
          >
            {isSubmitting || isLoading ? (
              <>
                <svg className="h-4 w-4 animate-spin" viewBox="0 0 24 24">
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                    fill="none"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
                Logging in...
              </>
            ) : (
              <>
                Log In
                <ArrowRight className="h-4 w-4" />
              </>
            )}
          </button>
        </div>
      </form>

      <div className="mt-6 text-center">
        <p className="text-sm text-gray-600 dark:text-gray-400">
          Don't have an account?{" "}
          <Link
            to="/auth/register"
            className="font-medium text-purple-900 underline"
          >
            Register
          </Link>
        </p>
      </div>
    </div>
  );
}
