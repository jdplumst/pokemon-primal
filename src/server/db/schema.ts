// Example model schema from the Drizzle docs
// https://orm.drizzle.team/docs/sql-schema-declaration

import { int, primaryKey, sqliteTable, text } from "drizzle-orm/sqlite-core";

export const eggGroup = sqliteTable("egg_group", {
  id: int("id").primaryKey(),
  name: text("name").notNull(),
});

export const eggGroupPokemon = sqliteTable(
  "egg_group_pokemon",
  {
    eggGroupId: int("egg_group_id")
      .notNull()
      .references(() => eggGroup.id, { onDelete: "cascade" }),
    pokemonId: int("pokemon_id")
      .notNull()
      .references(() => pokemon.id, {
        onDelete: "cascade",
      }),
  },
  (table) => [primaryKey({ columns: [table.eggGroupId, table.pokemonId] })],
);

export const habitat = sqliteTable("habitat", {
  id: int("id").primaryKey(),
  name: text("name").notNull(),
  description: text("description").notNull(),
});

export const habitatPokemon = sqliteTable(
  "habitat_pokemon",
  {
    habitatId: int("habitat_id")
      .notNull()
      .references(() => habitat.id, { onDelete: "cascade" }),
    pokemonId: int("pokemon_id")
      .notNull()
      .references(() => pokemon.id, {
        onDelete: "cascade",
      }),
  },
  (table) => [primaryKey({ columns: [table.habitatId, table.pokemonId] })],
);

export const pokemon = sqliteTable("pokemon", {
  id: int("id").primaryKey(),
  name: text("name").notNull(),
});
