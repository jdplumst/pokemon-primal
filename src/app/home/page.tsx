import Link from "next/link";
import { Button } from "~/components/ui/button";

export default function HomePage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center p-4 text-white">
      <h1 className="mb-8 text-center text-4xl font-bold md:text-5xl">
        Pokémon Primal
      </h1>
      <div className="bg-secondary w-1/2 rounded-lg p-4">
        <div className="flex w-full max-w-4xl flex-col gap-6">
          <Link
            href="/wild"
            className="bg-primary hover:bg-primary/80 rounded-lg px-6 py-4 text-center text-lg font-bold text-white transition-colors duration-300"
          >
            Generate Wild Encounter
          </Link>
          <Link
            href="/breed"
            className="bg-primary hover:bg-primary/80 rounded-lg px-6 py-4 text-center text-lg font-bold text-white transition-colors duration-300"
          >
            Breed Pokemon
          </Link>
          <Link
            href="/hatch"
            className="bg-primary hover:bg-primary/80 rounded-lg px-6 py-4 text-center text-lg font-bold text-white transition-colors duration-300"
          >
            Hatch Egg
          </Link>
        </div>
      </div>
    </div>
  );
}
