import { like } from "drizzle-orm";
import { NextRequest } from "next/server";
import { db } from "~/server/db";
import { pokemon } from "~/server/db/schema";

export async function GET(req: NextRequest) {
  const name = req.nextUrl.searchParams.get("name");
  const pokemonData = await db
    .select()
    .from(pokemon)
    .where(like(pokemon.name, "%" + name + "%"))
    .limit(20);

  return Response.json({ pokemon: pokemonData });
}
