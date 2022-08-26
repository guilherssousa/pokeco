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

const DexContext = createContext({
  dex: [],
  captured: [],
  toggleCaptured: () => {},
} as DexContextProps);

const DexContextProvider = (props: DexContextProviderProps) => {
  const [pokedex, setPokedex] = useState<Pokemon[]>([]);
  const [capturedIds, setCapturedIds] = useState<number[]>([]);

  // first load, search for @pokeco:captured in localStorage and setCapturedIds
  useEffect(() => {
    const localStorageCapturedIds = JSON.parse(
      localStorage.getItem("@pokeco:captured") || "[]"
    );

    console.log("Checking local storage:", localStorageCapturedIds);

    setCapturedIds(localStorageCapturedIds);
  }, []);

  useEffect(() => {
    const loadPokedex = async () => {
      const data = await api.get("pokedex/1", {
        params: {
          limit: 20,
        },
      });
      const { pokemon_entries } = data;

      const urls = (pokemon_entries as PokemonEntry[]).map((pokemon) =>
        pokemon.pokemon_species.url
          .replace(api.baseURL, "")
          .replace("-species", "")
      );

      const promises = await Promise.allSettled(
        urls.map((url) => api.get(url))
      );

      const pokemonSpecies = promises.reduce((acc: Pokemon[], curr) => {
        if (curr.status === "fulfilled") {
          acc.push(curr.value);
        }
        return acc;
      }, []);

      setPokedex(pokemonSpecies);
    };

    loadPokedex();
  }, []);

  function toggleCaptured(id: string) {
    const idNumber = parseInt(id);

    var newCapturedIds = [...capturedIds];

    if (capturedIds.includes(idNumber)) {
      newCapturedIds = newCapturedIds.filter(
        (capturedId) => capturedId !== idNumber
      );
    } else {
      newCapturedIds.push(idNumber);
    }

    setCapturedToLocalStorage(newCapturedIds);
    setCapturedIds(newCapturedIds);
  }

  function setCapturedToLocalStorage(capturedList: number[]) {
    localStorage.setItem("@pokeco:captured", JSON.stringify(capturedList));
  }

  return (
    <DexContext.Provider
      value={{
        captured: capturedIds || [],
        dex: pokedex || [],
        toggleCaptured,
      }}
    >
      {props.children}
    </DexContext.Provider>
  );
};

export { DexContext, DexContextProvider };
