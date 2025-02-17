import HatchForm from "~/components/hatch-form";
import { getEggs } from "~/server/actions/hatch";

export default async function HatchPage() {
  const eggs = await getEggs();

  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-10 p-4">
      <h1 className="text-3xl font-bold">Hatch an Egg</h1>
      <HatchForm eggs={eggs} />
    </div>
  );
}
