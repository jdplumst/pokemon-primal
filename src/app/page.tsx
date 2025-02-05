import Link from "next/link";

export default async function LandingPage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 p-4 text-white">
      <h1 className="mb-4 text-center text-4xl font-bold md:text-6xl">
        Welcome to Pokémon Primal
      </h1>
      <p className="mb-8 max-w-2xl text-center text-xl md:text-2xl">
        Discover and generate Pokemon based on their habitat or egg group
      </p>
      <Link
        href="/home"
        className="rounded-full bg-white px-8 py-3 text-lg font-bold text-purple-600 transition-colors duration-300 hover:bg-opacity-90"
      >
        Get Started
      </Link>
    </div>
  );
}
