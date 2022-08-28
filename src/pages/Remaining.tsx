import React, { useState, useMemo } from "react";
import styles from "styles/app.module.scss";

import PokemonGrid from "@/components/PokemonGrid";
import SearchBar from "@/components/SearchBar";

import { pokemonSearch } from "@/utils/search";
import { DexGen, DexGenNames, groupByGen } from "@/utils/dexOffsets";

import useDex from "@/hooks/useDex";

const Remaining: React.FC = () => {
  const { dex, captured } = useDex();
  const [search, setSearch] = useState("");

  const remainingPokemons = dex.filter(
    (pokemon) => !captured.includes(parseInt(pokemon.id))
  );

  const searchResults = useMemo(
    () => pokemonSearch(remainingPokemons, search),
    [remainingPokemons, search]
  );

  const pokemonsToExibit = search.length ? searchResults : remainingPokemons;

  const groupedPokemons = useMemo(
    () => groupByGen(pokemonsToExibit),
    [pokemonsToExibit]
  );

  return (
    <main className={styles.appHeader}>
      <h2 className={styles.pageTitle}>
        All Pokémons remaining ({remainingPokemons?.length})
      </h2>
      <div>
        <SearchBar state={search} setState={setSearch} />
      </div>
      {Object.entries(groupedPokemons).map(([gen, pkm]) => (
        <div key={gen}>
          <h3 className={styles.pageHeading3}>
            {DexGenNames[DexGen[gen as DexGen]]} ({pkm.length})
          </h3>
          <PokemonGrid pokemons={pkm} />
        </div>
      ))}
    </main>
  );
};

export default Remaining;
