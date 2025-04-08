import { Header } from "@/components/header";
import { Outlet } from "react-router";

export function LobbyLayout() {
  return (
    <>
      <Header />
      <main className="max-w-5xl mx-auto min-h-dvh px-3 lg:px-0">
        <Outlet />
      </main>
    </>
  );
}
