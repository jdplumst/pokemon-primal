import WildForm from "~/components/wild-form";
import { getHabitats } from "~/server/actions/wild";

export default async function WildPage() {
  const habitats = await getHabitats();

  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-10 p-4">
      <h1 className="text-3xl font-bold">Encounter a Wild Pokémon</h1>
      <WildForm habitats={habitats} />
    </div>
  );
}
