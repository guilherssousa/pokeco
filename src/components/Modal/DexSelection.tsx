import { useState } from "react";
import styles from "styles/modal.module.scss";

import useDex from "@/hooks/useDex";
import useModal from "@/hooks/useModal";

import availablePokedexes, { AvailablePokedex } from "@/utils/dex";

import { Container } from "./Common";
import Button from "../Button";

const DexSelection = () => {
  const { currentDex, changeDex } = useDex();
  const { closeModal } = useModal();
  const [selectedDex, setSelectedDex] = useState(currentDex.id);

  const handleCloseModal = () => {
    closeModal();
  };

  const handleChangeDexAndCloseModal = () => {
    changeDex(selectedDex as AvailablePokedex);
    closeModal();
  };

  return (
    <Container>
      <h2>Select your prefered Pokedex</h2>

      <select
        value={selectedDex}
        onChange={(e) => {
          setSelectedDex(e.target.value);
        }}
      >
        {availablePokedexes.map((dex) => (
          <option value={dex.id} key={dex.id}>
            {dex.name}
          </option>
        ))}
      </select>

      <div className={styles.actionRow}>
        <Button onClick={handleCloseModal}>Close</Button>
        <Button onClick={handleChangeDexAndCloseModal}>Confirm</Button>
      </div>
    </Container>
  );
};

export default DexSelection;
