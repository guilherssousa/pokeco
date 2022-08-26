import React, { MouseEventHandler } from "react";
import styles from "styles/pokemon.module.scss";

import { Pokemon as IPokemon } from "@/types/Pokemon";

import useDex from "@/hooks/useDex";

import capturedImage from "/captured.svg";

interface Props {
  pokemon: IPokemon;
}

const Pokemon: React.FC<Props> = ({ pokemon }) => {
  const { captured, toggleCaptured } = useDex();

  const isCaptured = captured.includes(parseInt(pokemon.id));

  const handleClick: MouseEventHandler<HTMLDivElement> = (e) => {
    if (e.shiftKey) {
      toggleCaptured(pokemon.id);
    }
  };

  return (
    <div className={styles.pokemonEntry} onClick={handleClick}>
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
