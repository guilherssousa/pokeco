/**
 * This file contains offsets for each Generation Dex.
 */

import { Pokemon } from "@/types/Pokemon";

export const DexGenOffsets = {
  Gen1: [1, 151],
  Gen2: [152, 251],
  Gen3: [252, 386],
  Gen4: [387, 493],
  Gen5: [494, 649],
  Gen6: [650, 721],
  Gen7: [722, 809],
  Gen8: [810, 905],
};

export enum DexGen {
  Gen1 = "Gen1",
  Gen2 = "Gen2",
  Gen3 = "Gen3",
  Gen4 = "Gen4",
  Gen5 = "Gen5",
  Gen6 = "Gen6",
  Gen7 = "Gen7",
  Gen8 = "Gen8",
}

export const DexGenNames = {
  [DexGen.Gen1]: "Generation I",
  [DexGen.Gen2]: "Generation II",
  [DexGen.Gen3]: "Generation III",
  [DexGen.Gen4]: "Generation IV",
  [DexGen.Gen5]: "Generation V",
  [DexGen.Gen6]: "Generation VI",
  [DexGen.Gen7]: "Generation VII",
  [DexGen.Gen8]: "Generation VIII",
} as const;

export const getGenByEntry = (entry: string): DexGen => {
  const entryNum = parseInt(entry, 10);
  return (
    (Object.entries(DexGenOffsets).find(([_, value]) => {
      return entryNum >= value[0] && entryNum <= value[1];
    })?.[0] as DexGen) || DexGen.Gen8
  );
};

export const groupByGen = (pokemons: Pokemon[]) => {
  return pokemons.reduce((acc, pokemon) => {
    const gen = getGenByEntry(pokemon.id);
    acc[gen] = acc[gen] || [];
    acc[gen].push(pokemon);
    return acc;
  }, {} as Record<DexGen, Pokemon[]>);
};
