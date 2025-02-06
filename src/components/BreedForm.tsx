"use client";

import { useActionState, useState } from "react";
import { Button } from "~/components/ui/button";
import { api } from "~/trpc/react";
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

export default function BreedForm() {
  const [searchPokemon, setSearchPokemon] = useState({
    pokemon1: "",
    pokemon2: "",
  });

  const [selectedPokemon, setSelectedPokemon] = useState({
    pokemon1: {
      id: 0,
      name: "",
      img: "",
    },
    pokemon2: {
      id: 0,
      name: "",
      img: "",
    },
  });

  const [open1, setOpen1] = useState(false);
  const [open2, setOpen2] = useState(false);

  const pokemon1 = api.pokemon.getPokemon.useQuery({
    name: searchPokemon.pokemon1,
  });

  const pokemon2 = api.pokemon.getPokemon.useQuery({
    name: searchPokemon.pokemon2,
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
                {selectedPokemon?.pokemon1.name ? (
                  <div className="capitalize">
                    {selectedPokemon.pokemon1.name}
                  </div>
                ) : (
                  "Select Pokemon 1"
                )}
                <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-[200px] p-0">
              <Command>
                <CommandInput
                  placeholder="Search Pokemon..."
                  onValueChange={(p) =>
                    setSearchPokemon({ ...searchPokemon, pokemon1: p })
                  }
                />
                <CommandList>
                  <CommandEmpty>No pokemon found.</CommandEmpty>
                  <CommandGroup>
                    {pokemon1.data?.map((p) => (
                      <CommandItem
                        key={p.id}
                        value={p.name}
                        onSelect={() => {
                          setSelectedPokemon({
                            ...selectedPokemon,
                            pokemon1: { id: p.id, name: p.name, img: p.img },
                          });
                          setOpen1(false);
                        }}
                        className="capitalize"
                      >
                        <Check
                          className={cn(
                            "mr-2 h-4 w-4",
                            selectedPokemon.pokemon1.name === p.name
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
                {selectedPokemon?.pokemon2.name ? (
                  <div className="capitalize">
                    {selectedPokemon.pokemon2.name}
                  </div>
                ) : (
                  "Select Pokemon 2"
                )}
                <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-[200px] p-0">
              <Command>
                <CommandInput
                  placeholder="Search Pokemon..."
                  onValueChange={(p) =>
                    setSearchPokemon({ ...searchPokemon, pokemon2: p })
                  }
                />
                <CommandList>
                  <CommandEmpty>No pokemon found.</CommandEmpty>
                  <CommandGroup>
                    {pokemon2.data?.map((p) => (
                      <CommandItem
                        key={p.id}
                        value={p.name}
                        onSelect={() => {
                          setSelectedPokemon({
                            ...selectedPokemon,
                            pokemon2: { id: p.id, name: p.name, img: p.img },
                          });
                          setOpen2(false);
                        }}
                        className="capitalize"
                      >
                        <Check
                          className={cn(
                            "mr-2 h-4 w-4",
                            selectedPokemon.pokemon2.name === p.name
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
        <input
          type="hidden"
          name="pokemon1Id"
          value={selectedPokemon.pokemon1.id}
        />
        <input
          type="hidden"
          name="pokemon2Id"
          value={selectedPokemon.pokemon2.id}
        />
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
