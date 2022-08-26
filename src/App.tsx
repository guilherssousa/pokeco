import { useState, useEffect } from "react";
import styles from "styles/app.module.scss";

import Sidebar from "@/components/Sidebar";
import PokemonGrid from "@/components/PokemonGrid";

import { Pokemon, PokemonEntry } from "@/types/Pokemon";
import api from "@/services/api";

const App: React.FC = () => {
  const [pokedex, setPokedex] = useState<Pokemon[]>([]);

  useEffect(() => {
    const loadPokedex = async () => {
      const data = await api.get("pokedex/15", {
        params: {
          limit: 20,
        },
      });
      const { pokemon_entries } = data;

      const promiseMap = (pokemon_entries as PokemonEntry[]).map((pokemon) =>
        api.get(
          pokemon.pokemon_species.url
            .replace(api.baseURL, "")
            .replace("-species", "")
        )
      );

      const pokemonSpecies = (await Promise.allSettled(promiseMap)).reduce(
        (acc: Pokemon[], curr) => {
          if (curr.status === "fulfilled") {
            acc.push(curr.value);
          }
          return acc;
        },
        []
      );

      setPokedex(pokemonSpecies);
    };

    loadPokedex();
  }, []);

  return (
    <div className={styles.app}>
      <Sidebar />
      <main className={styles.appHeader}>
        <PokemonGrid pokemons={pokedex} />
      </main>
    </div>
  );
};

export default App;
