import styles from "styles/app.module.scss";

import PokemonGrid from "@/components/PokemonGrid";
import useDex from "@/hooks/useDex";

const Remaining: React.FC = () => {
  const { dex, captured } = useDex();

  const remainingPokemons = dex.filter(
    (pokemon) => !captured.includes(parseInt(pokemon.id))
  );

  return (
    <main className={styles.appHeader}>
      <h2>All Pokemons remaining ({remainingPokemons?.length})</h2>
      <PokemonGrid pokemons={remainingPokemons} />
    </main>
  );
};

export default Remaining;
