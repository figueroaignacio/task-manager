import { ArrowRight } from "lucide-react";
import { Link } from "react-router";

const highlights = [
  {
    title: "Easy to Use",
    description: "Intuitive interface designed for efficiency",
  },
  {
    title: "Stay Organized",
    description: "Keep all your tasks in one place",
  },
  {
    title: "Boost Productivity",
    description: "Focus on what matters most",
  },
];

export function HomePage() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-white to-gray-50 dark:from-gray-950 dark:to-gray-900">
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute -top-40 -right-40 h-80 w-80 rounded-full bg-purple-100 opacity-20 blur-3xl dark:bg-purple-900"></div>
        <div className="absolute -bottom-40 -left-40 h-80 w-80 rounded-full bg-blue-100 opacity-20 blur-3xl dark:bg-blue-900"></div>
      </div>
      <div className="container mx-auto px-4 py-24 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center justify-center gap-y-8 text-center">
          <div className="space-y-4">
            <h1 className="text-4xl font-extrabold tracking-tight text-gray-900 dark:text-white sm:text-5xl md:text-6xl">
              Start your task management
              <span className="block text-purple-600 dark:text-purple-400">
                right now.
              </span>
            </h1>
            <p className="mx-auto max-w-2xl text-xl text-gray-600 dark:text-gray-300">
              Simple task manager to keep your tasks tidy and boost your
              productivity
            </p>
          </div>
          <div className="flex flex-col gap-4 sm:flex-row">
            <Link
              to="/auth/register"
              className="inline-flex items-center justify-center gap-2 rounded-lg bg-purple-600 px-6 py-3 text-base font-medium text-white shadow-lg transition-all hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 dark:bg-purple-500 dark:hover:bg-purple-600"
            >
              Get Started
              <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              to="/learn-more"
              className="inline-flex items-center justify-center gap-2 rounded-lg border border-gray-300 bg-white px-6 py-3 text-base font-medium text-gray-700 shadow-sm transition-all hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-200 dark:hover:bg-gray-700"
            >
              Learn More
            </Link>
          </div>
          <div className="mt-12 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {highlights.map((feature, index) => (
              <div
                key={index}
                className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm transition-all hover:shadow-md dark:border-gray-800 dark:bg-gray-800"
              >
                <h3 className="mb-2 text-lg font-semibold text-gray-900 dark:text-white">
                  {feature.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-300">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
