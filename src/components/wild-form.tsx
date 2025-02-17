"use client";

import { useActionState, useState } from "react";
import { Button } from "~/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "~/components/ui/dropdown-menu";
import { wildEncounter } from "~/server/actions/wild";

export default function WildForm(props: {
  habitats: { id: number; name: string; description: string }[];
}) {
  const [habitat, setHabitat] = useState<{
    id: number;
    name: string | null;
    description: string | null;
  }>({
    id: 0,
    name: null,
    description: null,
  });

  const [data, action, isPending] = useActionState(wildEncounter, undefined);

  return (
    <>
      <form
        action={action}
        className="flex w-1/2 flex-col items-center gap-5 rounded-lg bg-secondary p-4"
      >
        <input type="hidden" name="habitatId" defaultValue={habitat.id} />
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="capitalize">
              {habitat.name ?? "Select Habitat"}
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="h-80 overflow-y-auto">
            {props.habitats.map((h) => (
              <DropdownMenuItem
                key={h.id}
                onClick={() => setHabitat(h)}
                className="capitalize"
              >
                {h.name}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
        <Button type="submit" disabled={isPending}>
          Encounter
        </Button>
        {data?.error && <p className="text-red-500">{data.error}</p>}
      </form>

      {data?.pokemon && (
        <div className="flex flex-col items-center justify-center">
          <div>
            You have encounter a wild{" "}
            <span className="capitalize">{data.pokemon.name}</span>!
          </div>
          <img src={data.pokemon.img} alt={data.pokemon.name} />
        </div>
      )}
    </>
  );
}
