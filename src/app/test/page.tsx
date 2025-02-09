"use client";

import { useActionState, useState } from "react";
import { Button } from "~/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "~/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "~/components/ui/popover";
import { Check, ChevronsUpDown } from "lucide-react";
import { cn } from "~/lib/utils";
import { breedPokemon } from "~/server/actions/breed";
import { useQuery } from "@tanstack/react-query";
import { z } from "zod";

export default function TestPage() {
  const [searchPokemon1, setSearchPokemon1] = useState("");
  const [searchPokemon2, setSearchPokemon2] = useState("");

  const [selectedPokemon1, setSelectedPokemon1] = useState<{
    id: number;
    name: string;
    img: string;
  }>({
    id: 0,
    name: "",
    img: "",
  });
  const [selectedPokemon2, setSelectedPokemon2] = useState<{
    id: number;
    name: string;
    img: string;
  }>({
    id: 0,
    name: "",
    img: "",
  });

  const [open1, setOpen1] = useState(false);
  const [open2, setOpen2] = useState(false);

  const pokemon1 = useQuery({
    queryKey: ["pokemon1", searchPokemon1],
    queryFn: async () => {
      const res = await fetch("/api/pokemon?name=" + searchPokemon1);
      const resSchema = z.object({
        pokemon: z.array(
          z.object({
            id: z.number(),
            name: z.string(),
            img: z.string(),
          }),
        ),
      });
      const validation = resSchema.safeParse(await res.json());
      if (!validation.success) {
        console.error(validation.error);
        // return { error: "Something went wrong. Please try again." };
      }
      return validation.data;
    },
  });

  const pokemon2 = useQuery({
    queryKey: ["pokemon2", searchPokemon2],
    queryFn: async () => {
      const res = await fetch("/api/pokemon?name=" + searchPokemon2);
      const resSchema = z.object({
        pokemon: z.array(
          z.object({
            id: z.number(),
            name: z.string(),
            img: z.string(),
          }),
        ),
      });
      const validation = resSchema.safeParse(await res.json());
      if (!validation.success) {
        console.error(validation.error);
        // return { error: "Something went wrong. Please try again." };
      }
      return validation.data;
    },
  });

  const [data, action, isPending] = useActionState(breedPokemon, undefined);

  return (
    <>
      <form
        action={action}
        className="flex w-1/2 flex-col items-center gap-5 rounded-lg bg-secondary p-4"
      >
        <div className="flex gap-4">
          <Popover open={open1} onOpenChange={setOpen1}>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                role="combobox"
                aria-expanded={open1}
                className="w-[200px] justify-between"
              >
                {selectedPokemon1.name ? (
                  <div className="capitalize">{selectedPokemon1.name}</div>
                ) : (
                  "Select Pokémon 1"
                )}
                <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-[200px] p-0">
              <Command>
                <CommandInput
                  placeholder="Search Pokémon..."
                  onValueChange={(p) => setSearchPokemon1(p)}
                />
                <CommandList>
                  <CommandEmpty>No pokemon found.</CommandEmpty>
                  <CommandGroup>
                    {pokemon1.data?.pokemon.map((p) => (
                      <CommandItem
                        key={p.id}
                        value={p.name}
                        onSelect={() => {
                          setSelectedPokemon1(p);
                          setOpen1(false);
                        }}
                        className="capitalize"
                      >
                        <Check
                          className={cn(
                            "mr-2 h-4 w-4",
                            selectedPokemon1.name === p.name
                              ? "opacity-100"
                              : "opacity-0",
                          )}
                        />
                        <img src={p.img} alt={p.name} className="h-10 w-10" />{" "}
                        {p.name}
                      </CommandItem>
                    ))}
                  </CommandGroup>
                </CommandList>
              </Command>
            </PopoverContent>
          </Popover>
          <Popover open={open2} onOpenChange={setOpen2}>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                role="combobox"
                aria-expanded={open2}
                className="w-[200px] justify-between"
              >
                {selectedPokemon2.name ? (
                  <div className="capitalize">{selectedPokemon2.name}</div>
                ) : (
                  "Select Pokémon 2"
                )}
                <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-[200px] p-0">
              <Command>
                <CommandInput
                  placeholder="Search Pokémon..."
                  onValueChange={(p) => setSearchPokemon2(p)}
                />
                <CommandList>
                  <CommandEmpty>No pokemon found.</CommandEmpty>
                  <CommandGroup>
                    {pokemon2.data?.pokemon.map((p) => (
                      <CommandItem
                        key={p.id}
                        value={p.name}
                        onSelect={() => {
                          setSelectedPokemon2(p);
                          setOpen2(false);
                        }}
                        className="capitalize"
                      >
                        <Check
                          className={cn(
                            "mr-2 h-4 w-4",
                            selectedPokemon2.name === p.name
                              ? "opacity-100"
                              : "opacity-0",
                          )}
                        />
                        <img src={p.img} alt={p.name} className="h-10 w-10" />{" "}
                        {p.name}
                      </CommandItem>
                    ))}
                  </CommandGroup>
                </CommandList>
              </Command>
            </PopoverContent>
          </Popover>
        </div>
        <input type="hidden" name="pokemon1Id" value={selectedPokemon1?.id} />
        <input type="hidden" name="pokemon2Id" value={selectedPokemon2?.id} />
        <Button type="submit" disabled={isPending}>
          Breed
        </Button>
        {data?.error && <p className="text-red-500">{data.error}</p>}
      </form>

      {data?.randomEggGroup && (
        <div className="flex items-center justify-center">
          You have obtained a {data.randomEggGroup.name} egg!
        </div>
      )}
    </>
  );
}
