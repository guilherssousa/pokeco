import styles from "styles/app.module.scss";

import PokemonGrid from "@/components/PokemonGrid";
import useDex from "@/hooks/useDex";

const Captured: React.FC = () => {
  const { dex, captured } = useDex();

  const capturedPokemons = dex.filter((pokemon) =>
    captured.includes(parseInt(pokemon.id))
  );

  return (
    <main className={styles.appHeader}>
      <h2>All Pokemons captured ({capturedPokemons?.length})</h2>
      <PokemonGrid pokemons={capturedPokemons} />
    </main>
  );
};

export default Captured;
