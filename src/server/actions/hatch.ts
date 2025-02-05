"use server";

import { eq, sql } from "drizzle-orm";
import { db } from "~/server/db";
import { eggGroup, eggGroupPokemon, pokemon } from "~/server/db/schema";

export async function getEggs() {
  const eggs = await db.select().from(eggGroup).orderBy(eggGroup.id);
  return eggs;
}

export async function hatchEgg(_previousState: unknown, formData: FormData) {
  const eggId = formData.get("eggId");
  if (!eggId) {
    return { error: "You must select an egg." };
  }
  const parsedEggId = parseInt(String(eggId));
  if (isNaN(parsedEggId) || parsedEggId <= 0) {
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
    .where(eq(eggGroupPokemon.eggGroupId, parsedEggId))
    .orderBy(sql`RANDOM()`)
    .limit(1);

  return { pokemon: pokemonData[0] };
}
