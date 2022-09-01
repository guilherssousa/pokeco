import React, { MouseEventHandler } from "react";
import { useNavigate } from "react-router-dom";
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

  const handleClick: MouseEventHandler<HTMLAnchorElement> = (e) => {
    if (e.shiftKey) {
      e.preventDefault();
      toggleCaptured(pokemon.id);
      return;
    }
  };

  return (
    <a
      className={styles.pokemonEntry}
      onClick={handleClick}
      href={`https://bulbapedia.bulbagarden.net/wiki/${pokemon.name}`}
      target="_blank"
      rel="noopener noreferrer"
    >
      <img
        className={styles.pokemonSprite}
        src={pokemon.sprites.front_default}
        alt={pokemon.name}
      />
      <div className={styles.pokemonEntryName}>{pokemon.name}</div>
      <div className={styles.pokemonId}>{pokemon.entry_number}</div>
      {isCaptured && (
        <img
          alt="Capturado"
          src={capturedImage}
          className={styles.capturedMark}
        />
      )}
    </a>
  );
};

export default React.memo(Pokemon);
