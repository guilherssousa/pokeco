import React, { useState, useEffect, createContext } from "react";

import { Pokemon, Pokedex as IPokedex } from "@/types/Pokemon";

import dexList, { AvailablePokedex } from "@/utils/dex";

interface DexContextProps {
  dex: Pokemon[];
  captured: number[];
  currentDex: IPokedex;
  toggleCaptured: (id: string) => void;
  changeDex: (dexId: AvailablePokedex) => void;
  cleanCaptured: () => void;
  importCaptured: (captured: number[]) => void;
}

type DexContextProviderProps = {
  children: React.ReactNode;
};

const DexContext = createContext({
  dex: [],
  captured: [],
  currentDex: {} as IPokedex,
  changeDex: () => {},
  toggleCaptured: () => {},
  cleanCaptured: () => {},
  importCaptured: () => {},
} as DexContextProps);

const DexContextProvider = (props: DexContextProviderProps) => {
  const [pokedex, setPokedex] = useState<Pokemon[]>([]);
  const [capturedIds, setCapturedIds] = useState<number[]>([]);
  const [currentDex, setCurrentDex] = useState<AvailablePokedex>("national");

  useEffect(() => {
    // first load, load currentDex as default dex
    async function loadDefaultDex() {
      const dex = dexList.find((d) => d.id === currentDex) as IPokedex;

      const defaultDex = await import(`../data/${dex.id}.json`);

      setPokedex([...defaultDex.default] as Pokemon[]);
    }

    // first load, search for @pokeco:captured in localStorage and setCapturedIds
    function loadCapturedPokemons() {
      const localStorageCapturedIds = JSON.parse(
        localStorage.getItem("@pokeco:captured") || "[]"
      );

      setCapturedIds(localStorageCapturedIds);
    }

    loadCapturedPokemons();
    loadDefaultDex();
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

  async function changeDex(dexId: AvailablePokedex) {
    const newDex = dexList.find((d) => d.id === dexId);

    if (!newDex) return;

    const newDexData = await import(`../data/${newDex.id}.json`);

    setCurrentDex(dexId);
    setPokedex([...newDexData.default] as Pokemon[]);
  }

  return (
    <DexContext.Provider
      value={{
        dex: pokedex || [],
        captured: capturedIds || [],
        currentDex: dexList.find((d) => d.id === currentDex) as IPokedex,
        changeDex,
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
