"use server";

import { and, eq, ne } from "drizzle-orm";
import { z } from "zod";
import { db } from "~/server/db";
import { eggGroup, eggGroupPokemon } from "~/server/db/schema";

export async function breedPokemon(
  _previousState: unknown,
  formData: FormData,
) {
  const formSchema = z.object({
    pokemon1Id: z.coerce.number(),
    pokemon2Id: z.coerce.number(),
  });

  const input = formSchema.safeParse(Object.fromEntries(formData));
  if (input.error) {
    return { error: "You must select two pokemon." };
  }

  if (input.data.pokemon1Id === 0 || input.data.pokemon2Id === 0) {
    return { error: "You must select two pokemon." };
  }

  const eggGroups1 = await db
    .select({ id: eggGroup.id, name: eggGroup.name })
    .from(eggGroup)
    .leftJoin(eggGroupPokemon, eq(eggGroup.id, eggGroupPokemon.eggGroupId))
    .where(
      and(
        eq(eggGroupPokemon.pokemonId, input.data.pokemon1Id),
        ne(eggGroupPokemon.eggGroupId, 15), // no-egg group
      ),
    );

  const eggGroups2 = await db
    .select({ id: eggGroup.id, name: eggGroup.name })
    .from(eggGroup)
    .leftJoin(eggGroupPokemon, eq(eggGroup.id, eggGroupPokemon.eggGroupId))
    .where(
      and(
        eq(eggGroupPokemon.pokemonId, input.data.pokemon2Id),
        ne(eggGroupPokemon.eggGroupId, 15), // no-egg group
      ),
    );

  let sharedEggGroups = eggGroups1;

  // Egg Group 13 is for ditto
  if (eggGroups1.find((eggGroup) => eggGroup.id === 13)) {
    sharedEggGroups = eggGroups2;
  } else if (eggGroups2.find((eggGroup) => eggGroup.id === 13)) {
    sharedEggGroups = eggGroups1;
  } else {
    sharedEggGroups = eggGroups1.filter((eggGroup) =>
      eggGroups2.some((eggGroup2) => eggGroup.id === eggGroup2.id),
    );
  }

  if (sharedEggGroups.length === 0) {
    return {
      error:
        "These pokemon cannot breed together. Pass a charisma check or lose half of your money.",
    };
  }

  const randomEggGroup =
    sharedEggGroups[Math.floor(Math.random() * sharedEggGroups.length)];

  return { randomEggGroup };
}
