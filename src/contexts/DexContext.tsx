import React, { useState, useEffect, createContext } from "react";

import { Pokemon } from "@/types/Pokemon";

import pokemons from "@/data/pokemons.json";

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
  const [pokedex, setPokedex] = useState<Pokemon[]>(pokemons as Pokemon[]);
  const [capturedIds, setCapturedIds] = useState<number[]>([]);

  // first load, search for @pokeco:captured in localStorage and setCapturedIds
  useEffect(() => {
    const localStorageCapturedIds = JSON.parse(
      localStorage.getItem("@pokeco:captured") || "[]"
    );

    console.log("Checking local storage:", localStorageCapturedIds);

    setCapturedIds(localStorageCapturedIds);
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
