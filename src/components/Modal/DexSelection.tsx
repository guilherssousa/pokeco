import { useState } from "react";
import styles from "styles/modal.module.scss";

import useDex from "@/hooks/useDex";
import useModal from "@/hooks/useModal";

import availablePokedexes, { AvailablePokedex } from "@/utils/dex";

import { Container } from "./Common";
import Button from "../Button";
import Select from "../Select";

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

      <Select
        value={selectedDex}
        onChange={(e) => {
          setSelectedDex(e.target.value);
        }}
        style={{
          margin: "1rem 0",
        }}
      >
        {availablePokedexes.map((dex) => (
          <option value={dex.id} key={dex.id}>
            {dex.name}
          </option>
        ))}
      </Select>

      <div className={styles.actionRow}>
        <Button theme="cancel" onClick={handleCloseModal}>
          Close
        </Button>
        <Button theme="confirm" onClick={handleChangeDexAndCloseModal}>
          Confirm
        </Button>
      </div>
    </Container>
  );
};

export default DexSelection;
