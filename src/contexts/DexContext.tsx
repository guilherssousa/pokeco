import React, { useState, useEffect, createContext } from "react";

import { Pokemon, PokemonEntry } from "@/types/Pokemon";

import api from "@/services/api";

interface DexContextProps {
  dex: Pokemon[];
  captured: number[];
  toggleCaptured: (id: string) => void;
}

type DexContextProviderProps = {
  children: React.ReactNode;
};

const DexContext = createContext({} as DexContextProps);

const DexContextProvider = (props: DexContextProviderProps) => {
  const [pokedex, setPokedex] = useState<Pokemon[]>([]);
  const [capturedIds, setCapturedIds] = useState<number[]>([]);

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

  function toggleCaptured(id: string) {
    const idNumber = parseInt(id);

    if (capturedIds.includes(idNumber)) {
      setCapturedIds((prev) =>
        prev.filter((capturedId) => capturedId !== idNumber)
      );
    } else {
      setCapturedIds((prev) => [...prev, idNumber]);
    }
  }

  return (
    <DexContext.Provider
      value={{
        captured: capturedIds,
        dex: pokedex,
        toggleCaptured,
      }}
    >
      {props.children}
    </DexContext.Provider>
  );
};

export { DexContext, DexContextProvider };
