import { zodResolver } from "@hookform/resolvers/zod";
import { AlertCircle, ArrowRight } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router";
import { useAuth } from "../hooks/use-auth";
import { type RegisterSchema, registerSchema } from "../lib/schema";

export function RegisterForm() {
  const [serverError, setServerError] = useState<string | null>(null);
  const { register: registerUser, isLoading } = useAuth();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<RegisterSchema>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const onSubmit = async (data: RegisterSchema) => {
    setServerError(null);
    try {
      await registerUser(data.email, data.password);
    } catch (error: unknown) {
      if (error instanceof Error) {
        setServerError(error.message);
      } else {
        setServerError("Something went wrong");
      }
    }
  };

  return (
    <div className="relative overflow-hidden rounded-2xl border border-gray-200 bg-white p-8 shadow-lg dark:border-gray-800 dark:bg-gray-900">
      <div className="mb-6 text-center">
        <h2 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
          Create an account
        </h2>
        <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
          Start managing your tasks efficiently
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
          <input
            id="email"
            type="email"
            {...register("email")}
            className={`w-full rounded-lg border ${
              errors.email
                ? "border-red-300 dark:border-red-700"
                : "border-gray-300 dark:border-gray-700"
            } bg-white px-4 py-2.5 text-gray-900 shadow-sm transition-colors focus:border-purple-900 focus:outline-none focus:ring-2 focus:ring-purple-500/20 dark:bg-gray-800 dark:text-white dark:focus:border-purple-400 dark:focus:ring-purple-400/20`}
            placeholder="your.email@example.com"
          />
          {errors.email && (
            <p className="mt-1.5 flex items-center gap-1.5 text-sm text-red-600 dark:text-red-400">
              <AlertCircle className="h-4 w-4" />
              {errors.email.message}
            </p>
          )}
        </div>

        <div>
          <label
            htmlFor="password"
            className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300"
          >
            Password
          </label>
          <input
            id="password"
            type="password"
            {...register("password")}
            className={`w-full rounded-lg border ${
              errors.password
                ? "border-red-300 dark:border-red-700"
                : "border-gray-300 dark:border-gray-700"
            } bg-white px-4 py-2.5 text-gray-900 shadow-sm transition-colors focus:border-purple-900 focus:outline-none focus:ring-2 focus:ring-purple-500/20 dark:bg-gray-800 dark:text-white dark:focus:border-purple-400 dark:focus:ring-purple-400/20`}
            placeholder="••••••••"
          />
          {errors.password && (
            <p className="mt-1.5 flex items-center gap-1.5 text-sm text-red-600 dark:text-red-400">
              <AlertCircle className="h-4 w-4" />
              {errors.password.message}
            </p>
          )}
        </div>

        <div>
          <label
            htmlFor="confirmPassword"
            className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300"
          >
            Confirm Password
          </label>
          <input
            id="confirmPassword"
            type="password"
            {...register("confirmPassword")}
            className={`w-full rounded-lg border ${
              errors.confirmPassword
                ? "border-red-300 dark:border-red-700"
                : "border-gray-300 dark:border-gray-700"
            } bg-white px-4 py-2.5 text-gray-900 shadow-sm transition-colors focus:border-purple-900 focus:outline-none focus:ring-2 focus:ring-purple-500/20 dark:bg-gray-800 dark:text-white dark:focus:border-purple-400 dark:focus:ring-purple-400/20`}
            placeholder="••••••••"
          />
          {errors.confirmPassword && (
            <p className="mt-1.5 flex items-center gap-1.5 text-sm text-red-600 dark:text-red-400">
              <AlertCircle className="h-4 w-4" />
              {errors.confirmPassword.message}
            </p>
          )}
        </div>

        <div className="pt-2">
          <button
            type="submit"
            disabled={isSubmitting || isLoading}
            className="inline-flex w-full items-center justify-center gap-2 rounded-lg bg-purple-900 px-5 py-2.5 text-center text-sm font-medium text-white shadow-lg transition-all hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-70"
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
                Registering...
              </>
            ) : (
              <>
                Register
                <ArrowRight className="h-4 w-4" />
              </>
            )}
          </button>
        </div>
      </form>

      <div className="mt-6 text-center">
        <p className="text-sm text-gray-600 dark:text-gray-400">
          Already have an account?{" "}
          <Link
            to="/auth/login"
            className="font-medium text-purple-900 underline"
          >
            Log in
          </Link>
        </p>
      </div>
    </div>
  );
}
