import { Link } from "react-router";

export function HomePage() {
  return (
    <section>
      <h1>Home Page</h1>
      <Link to="/auth/register">Register</Link>
      <Link to="/auth/login">Login</Link>
    </section>
  );
}
