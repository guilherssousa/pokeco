import styles from "styles/modal.module.scss";

import useModal from "@/hooks/useModal";

import DexSelection from "./DexSelection";

const Modal = () => {
  const { isOpen, modalName, closeModal } = useModal();

  const getComponent = () => {
    switch (modalName) {
      case "DexSelection":
        return <DexSelection />;
    }
  };

  const handleToggleModal = () => {
    closeModal();
  };

  return (
    <div
      className={styles.modalWrapper}
      style={{
        display: isOpen ? "flex" : "none",
      }}
      onClick={handleToggleModal}
    >
      {getComponent()}
    </div>
  );
};

export default Modal;
