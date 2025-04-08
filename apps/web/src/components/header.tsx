import { Link } from "react-router";

export function Header() {
  return (
    <header className="py-5 px-3 lg:px-0 border-b border-border">
      <div className="max-w-5xl mx-auto flex justify-between">
        <Link to="/" className="text-xl font-bold">
          Task Manager
        </Link>
        <div className="space-x-3">
          <Link
            to="/auth/login"
            className="bg-purple-500 px-6 py-2 rounded-md text-white font-semibold"
          >
            Login
          </Link>
          <Link
            to="/auth/register"
            className="hover:bg-[#dde3eb] transition-colors px-6 py-2 rounded-md duration-200 font-semibold"
          >
            Register
          </Link>
        </div>
      </div>
    </header>
  );
}
