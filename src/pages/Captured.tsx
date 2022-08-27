import React, { useState, useMemo } from "react";
import styles from "styles/app.module.scss";

import PokemonGrid from "@/components/PokemonGrid";
import SearchBar from "@/components/SearchBar";

import { pokemonSearch } from "@/utils/search";

import useDex from "@/hooks/useDex";

const Captured: React.FC = () => {
  const { dex, captured } = useDex();
  const [search, setSearch] = useState("");

  const capturedPokemons = dex.filter((pokemon) =>
    captured.includes(parseInt(pokemon.id))
  );

  const searchResults = useMemo(
    () => pokemonSearch(capturedPokemons, search),
    [capturedPokemons, search]
  );

  const pokemonsToExibit = search.length ? searchResults : capturedPokemons;

  return (
    <main className={styles.appHeader}>
      <h2 className={styles.pageTitle}>
        All Pokemons captured ({capturedPokemons?.length})
      </h2>
      <div>
        <SearchBar state={search} setState={setSearch} />
      </div>
      <PokemonGrid pokemons={pokemonsToExibit} />
    </main>
  );
};

export default Captured;
