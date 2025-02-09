import { like } from "drizzle-orm";
import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import { pokemon } from "~/server/db/schema";

export const pokemonRouter = createTRPCRouter({
  getPokemon: publicProcedure
    .input(z.object({ name: z.string() }))
    .query(async ({ input, ctx }) => {
      const pokemonData = await ctx.db
        .select()
        .from(pokemon)
        .where(like(pokemon.name, "%" + input.name + "%"))
        .limit(20);

      return pokemonData;
    }),
});
