import { PokemonClient } from "pokenode-ts";
import { db } from "~/server/db";
import { eggGroup, eggGroupPokemon, pokemon } from "~/server/db/schema";

async function seed() {
  const api = new PokemonClient();

  // Seed Egg Groups
  for (let i = 1; i <= 15; i++) {
    const eggGroupData = await api.getEggGroupById(i);
    console.log(eggGroupData);

    await db.insert(eggGroup).values({
      id: eggGroupData.id,
      name: eggGroupData.name,
    });
  }

  // Seed Pokemon and EggGroupPokemon
  for (let i = 1; i <= 1025; i++) {
    const pokemonSpecies = await api.getPokemonSpeciesById(i);

    for (let j = 0; j < pokemonSpecies.varieties.length; j++) {
      const formName = pokemonSpecies.varieties[j]?.pokemon.name!;
      const pokemonVariety = await api.getPokemonByName(formName);

      await db.insert(pokemon).values({
        id: pokemonVariety.id,
        name: pokemonSpecies.name,
        img: pokemonVariety.sprites.front_default ?? "no_image",
      });

      for (let j = 0; j < pokemonSpecies.egg_groups.length; j++) {
        const eggGroupName = pokemonSpecies.egg_groups[j]?.name!;
        const eggGroup = await api.getEggGroupByName(eggGroupName);

        await db.insert(eggGroupPokemon).values({
          eggGroupId: eggGroup.id,
          pokemonId: pokemonVariety.id,
        });
      }
    }
  }
}

seed();
