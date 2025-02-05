"use client";

import { useActionState, useState } from "react";
import { hatchEgg } from "~/server/actions/hatch";
import { Button } from "~/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "~/components/ui/dropdown-menu";

export default function HatchForm(props: {
  eggs: { id: number; name: string }[];
}) {
  const [egg, setEgg] = useState<{ id: number; name: string | null }>({
    id: 0,
    name: null,
  });

  const [data, action, isPending] = useActionState(hatchEgg, undefined);

  return (
    <>
      <form
        action={action}
        className="bg-secondary flex w-1/2 flex-col items-center gap-5 rounded-lg p-4"
      >
        <input type="hidden" name="eggId" defaultValue={egg.id} />
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="capitalize">
              {egg.name ?? "Select Egg"}
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="h-80 overflow-y-auto">
            {props.eggs.map((egg) => (
              <DropdownMenuItem
                key={egg.id}
                onClick={() => setEgg(egg)}
                className="capitalize"
              >
                {egg.name}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
        <Button type="submit" disabled={isPending}>
          Hatch
        </Button>
        {data?.error && <p className="text-red-500">{data.error}</p>}
      </form>

      {data?.pokemon && (
        <div className="flex flex-col items-center justify-center">
          <div>
            A <span className="capitalize">{data.pokemon.name}</span> has
            hatched!
          </div>
          <img src={data.pokemon.img} alt={data.pokemon.name} />
        </div>
      )}
    </>
  );
}
