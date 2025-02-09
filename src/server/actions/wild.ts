"use server";

import { eq, sql } from "drizzle-orm";
import { z } from "zod";
import { db } from "~/server/db";
import { habitat, habitatPokemon, pokemon } from "~/server/db/schema";

export async function getHabitats() {
  const habitats = await db.select().from(habitat);
  return habitats;
}

export async function wildEncounter(
  _previousState: unknown,
  formData: FormData,
) {
  const formSchema = z.object({
    habitatId: z.coerce.number(),
  });

  const input = formSchema.safeParse(Object.fromEntries(formData));
  if (input.error) {
    return { error: "You must select a habitat." };
  }

  if (input.data.habitatId === 0) {
    return { error: "You must select a habitat." };
  }

  const pokemonData = await db
    .select({
      id: pokemon.id,
      name: pokemon.name,
      img: pokemon.img,
    })
    .from(pokemon)
    .innerJoin(habitatPokemon, eq(habitatPokemon.pokemonId, pokemon.id))
    .where(eq(habitatPokemon.habitatId, input.data.habitatId))
    .orderBy(sql`RANDOM()`)
    .limit(1);

  return { pokemon: pokemonData[0] };
}
