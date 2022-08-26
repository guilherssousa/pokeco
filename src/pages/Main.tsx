import styles from "styles/app.module.scss";

import PokemonGrid from "@/components/PokemonGrid";
import useDex from "@/hooks/useDex";

const Main: React.FC = () => {
  const { dex } = useDex();

  return (
    <main className={styles.appHeader}>
      <PokemonGrid pokemons={dex} />
    </main>
  );
};

export default Main;
