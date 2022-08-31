import React, { useState, useEffect, createContext } from "react";

import { Pokemon, Pokedex as IPokedex } from "@/types/Pokemon";

import nationalDex from "@/data/national.json";

import dexList from "@/utils/dex";

interface DexContextProps {
  dex: Pokemon[];
  captured: number[];
  toggleCaptured: (id: string) => void;
  cleanCaptured: () => void;
  importCaptured: (captured: number[]) => void;
}

type DexContextProviderProps = {
  children: React.ReactNode;
};

const DexContext = createContext({
  dex: [],
  captured: [],
  toggleCaptured: () => {},
  cleanCaptured: () => {},
  importCaptured: () => {},
} as DexContextProps);

const DexContextProvider = (props: DexContextProviderProps) => {
  const [pokedex, setPokedex] = useState<Pokemon[]>([]);
  const [capturedIds, setCapturedIds] = useState<number[]>([]);

  const defaultDexId = "national";

  useEffect(() => {
    async function loadDefaultDex() {
      const dex = dexList.find((d) => d.id === defaultDexId) as IPokedex;

      const nationalDex = await import(`../data/${dex.id}.json`);

      setPokedex(nationalDex.default);
    }

    // first load, search for @pokeco:captured in localStorage and setCapturedIds
    function loadCapturedPokemons() {
      const localStorageCapturedIds = JSON.parse(
        localStorage.getItem("@pokeco:captured") || "[]"
      );

      console.log("Checking local storage:", localStorageCapturedIds);

      setCapturedIds(localStorageCapturedIds);
    }

    loadDefaultDex();
    loadCapturedPokemons();
  }, [defaultDexId]);

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

  function cleanCaptured() {
    localStorage.removeItem("@pokeco:captured");
    setCapturedIds([]);
  }

  function importCaptured(capturedList: number[]) {
    setCapturedToLocalStorage(capturedList);
    setCapturedIds(capturedList);
  }

  return (
    <DexContext.Provider
      value={{
        captured: capturedIds || [],
        dex: pokedex || [],
        toggleCaptured,
        cleanCaptured,
        importCaptured,
      }}
    >
      {props.children}
    </DexContext.Provider>
  );
};

export { DexContext, DexContextProvider };
