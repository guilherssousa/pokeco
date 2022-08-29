import React, { useState, useMemo } from "react";
import styles from "styles/app.module.scss";

import PokemonGrid from "@/components/PokemonGrid";
import SearchBar from "@/components/SearchBar";

import { pokemonSearch } from "@/utils/search";
import { DexGen, DexGenNames, groupByGen } from "@/utils/dexOffsets";

import useDex from "@/hooks/useDex";

const Main: React.FC = () => {
  const { dex } = useDex();
  const [search, setSearch] = useState("");

  const searchResults = useMemo(
    () => pokemonSearch(dex, search),
    [dex, search]
  );

  const pokemonsToExibit = search.length ? searchResults : dex;

  return (
    <main className={styles.appHeader}>
      <h2 className={styles.pageTitle}>All Pokémons ({dex?.length})</h2>
      <div>
        <SearchBar state={search} setState={setSearch} />
      </div>
      <PokemonGrid pokemons={pokemonsToExibit} />
    </main>
  );
};

export default Main;
