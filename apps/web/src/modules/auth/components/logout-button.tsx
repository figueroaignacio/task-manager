import { useAuth } from "../hooks/use-auth";

export function LogoutButton() {
  const { logout } = useAuth();

  function handleLogout() {
    logout();
  }

  return (
    <button
      className="px-6 py-3 text-white bg-destructive"
      onClick={handleLogout}
    >
      Logout
    </button>
  );
}
