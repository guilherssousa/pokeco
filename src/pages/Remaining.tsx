import React, { useState, useMemo } from "react";
import styles from "styles/app.module.scss";

import PokemonGrid from "@/components/PokemonGrid";
import SearchBar from "@/components/SearchBar";

import useDex from "@/hooks/useDex";

import { pokemonSearch } from "@/utils/search";

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

  return (
    <main className={styles.appHeader}>
      <h2 className={styles.pageTitle}>
        All Pokémons remaining ({remainingPokemons?.length})
      </h2>
      <div>
        <SearchBar state={search} setState={setSearch} />
      </div>
      <PokemonGrid pokemons={pokemonsToExibit} />
    </main>
  );
};

export default Remaining;
