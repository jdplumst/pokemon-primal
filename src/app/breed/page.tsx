import BreedForm from "~/components/BreedForm";
import { getPokemonForBreed } from "~/server/actions/breed";

export default async function BreedPage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-10 p-4">
      <h1 className="text-3xl font-bold">Breed Pokémon</h1>
      <BreedForm />
    </div>
  );
}
