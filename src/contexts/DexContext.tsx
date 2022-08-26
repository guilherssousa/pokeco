import React, { useState, useEffect, createContext } from "react";

import { Pokemon, PokemonEntry } from "@/types/Pokemon";

import api from "@/services/api";

interface DexContextProps {
  dex: Pokemon[];
  captured: number[];
}

type DexContextProviderProps = {
  children: React.ReactNode;
};

const DexContext = createContext({} as DexContextProps);

const DexContextProvider = (props: DexContextProviderProps) => {
  const [pokedex, setPokedex] = useState<Pokemon[]>([]);
  const [capturedIds, setCapturedIds] = useState<number[]>([6, 12]);

  useEffect(() => {
    const loadPokedex = async () => {
      const data = await api.get("pokedex/1", {
        params: {
          limit: 20,
        },
      });
      const { pokemon_entries } = data;

      const promiseMap = (pokemon_entries as PokemonEntry[]).map((pokemon) =>
        api.get(
          pokemon.pokemon_species.url
            .replace(api.baseURL, "")
            .replace("-species", "")
        )
      );

      const pokemonSpecies = (await Promise.allSettled(promiseMap)).reduce(
        (acc: Pokemon[], curr) => {
          if (curr.status === "fulfilled") {
            acc.push(curr.value);
          }
          return acc;
        },
        []
      );

      setPokedex(pokemonSpecies);
    };

    loadPokedex();
  }, []);

  return (
    <DexContext.Provider
      value={{
        captured: capturedIds,
        dex: pokedex,
      }}
    >
      {props.children}
    </DexContext.Provider>
  );
};

export { DexContext, DexContextProvider };
