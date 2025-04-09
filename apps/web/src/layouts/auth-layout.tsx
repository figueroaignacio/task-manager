import { ArrowLeft } from "lucide-react";
import { Link, Outlet } from "react-router";

export function AuthLayout() {
  return (
    <>
      <Link
        to="/"
        className="flex bg-purple-900 text-white py-2 px-12 rounded-md mt-5 ml-5 w-fit space-x-3"
      >
        <ArrowLeft />
        <span>Go Back</span>
      </Link>
      <div className="min-h-[100dvh] max-w-md mx-auto flex flex-col justify-center">
        <Outlet />
      </div>
    </>
  );
}
