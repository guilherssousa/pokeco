import React from "react";
import styles from "styles/pokemon.module.scss";

import Pokemon from "./Pokemon";
import { Pokemon as IPokemon } from "@/types/Pokemon";

interface Props {
  pokemons: IPokemon[];
}

const PokemonGrid: React.FC<Props> = ({ pokemons }) => {
  return (
    <div className={styles.pokemonGrid}>
      {pokemons.map((pokemon) => (
        <Pokemon key={pokemon.id} pokemon={pokemon} />
      ))}
    </div>
  );
};

export default PokemonGrid;
