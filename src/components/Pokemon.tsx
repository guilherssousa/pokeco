import React from "react";
import styles from "styles/pokemon.module.scss";

import { Pokemon as IPokemon } from "@/types/Pokemon";

import capturedImage from "/captured.svg";
import useDex from "@/hooks/useDex";

interface Props {
  pokemon: IPokemon;
}

const Pokemon: React.FC<Props> = ({ pokemon }) => {
  const { captured } = useDex();

  const isCaptured = captured.includes(parseInt(pokemon.id));

  return (
    <div className={styles.pokemonEntry}>
      <img
        className={styles.pokemonSprite}
        src={pokemon.sprites.front_default}
        alt={pokemon.name}
      />
      <div className={styles.pokemonEntryName}>{pokemon.name}</div>
      <div className={styles.pokemonId}>{pokemon.id}</div>
      {isCaptured && (
        <img
          alt="Capturado"
          src={capturedImage}
          className={styles.capturedMark}
        />
      )}
    </div>
  );
};

export default React.memo(Pokemon);
