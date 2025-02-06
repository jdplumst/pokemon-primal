"use server";

import { eq, ne, sql } from "drizzle-orm";
import { z } from "zod";
import { db } from "~/server/db";
import { eggGroup, eggGroupPokemon, pokemon } from "~/server/db/schema";

export async function getEggs() {
  const eggs = await db
    .select()
    .from(eggGroup)
    .where(ne(eggGroup.id, 15)) // no-egg group
    .orderBy(eggGroup.id);
  return eggs;
}

export async function hatchEgg(_previousState: unknown, formData: FormData) {
  const formSchema = z.object({
    eggId: z.coerce.number(),
  });

  const input = formSchema.safeParse(Object.fromEntries(formData));
  if (input.error) {
    return { error: "You must select an egg." };
  }

  if (input.data.eggId === 0) {
    return { error: "You must select an egg." };
  }

  const pokemonData = await db
    .select({
      id: pokemon.id,
      name: pokemon.name,
      img: pokemon.img,
    })
    .from(pokemon)
    .innerJoin(eggGroupPokemon, eq(eggGroupPokemon.pokemonId, pokemon.id))
    .where(eq(eggGroupPokemon.eggGroupId, input.data.eggId))
    .orderBy(sql`RANDOM()`)
    .limit(1);

  return { pokemon: pokemonData[0] };
}
