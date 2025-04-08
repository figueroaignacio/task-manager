import { LogoutButton } from "@/modules/auth/components/logout-button";
import { useAuth } from "@/modules/auth/hooks/use-auth";

export function DashboardPage() {
  const { user } = useAuth();

  console.log("user from useAuth hook", user);

  return (
    <div>
      <h1>
        Welcome, pussy with the email: {user?.email}, and your ID it's this one:{" "}
        {user?.id}
      </h1>
      <LogoutButton />
    </div>
  );
}
