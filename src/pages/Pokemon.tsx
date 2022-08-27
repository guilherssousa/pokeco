import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styles from "styles/app.module.scss";

import { Pokemon as IPokemon, ILAE } from "@/types/Pokemon";

import api from "@/services/api";

const Pokemon = ({}) => {
  const { pokemonId } = useParams();
  const [pokemon, setPokemon] = useState<IPokemon | null>(null);
  const [locationAreaEncounters, setLocationAreaEncounters] = useState<
    ILAE[] | null
  >(null);

  useEffect(() => {
    const loadPokemon = async () => {
      const pk = await api.get(`pokemon/${pokemonId}`);
      const lae = await api.get(`pokemon/${pokemonId}/encounters`);

      setPokemon(pk);
      setLocationAreaEncounters(lae);
    };
    loadPokemon();
  }, [pokemonId]);

  return (
    <main className={styles.appHeader}>
      <h2 className={styles.pageTitle}>{pokemon?.name}</h2>
      <div>
        <img
          className={styles.pokemonImage}
          src={pokemon?.sprites.front_default}
          alt={pokemon?.name}
        />
      </div>
    </main>
  );
};

export default Pokemon;
