import { useState, createContext } from "react";

type AvailableModalComponents = null | "DexSelection";

interface ModalContextProps {
  isOpen: boolean;
  openModal: (incomingModalName: AvailableModalComponents) => void;
  closeModal: () => void;
  modalName: AvailableModalComponents;
}

const ModalContext = createContext({
  isOpen: false,
  openModal: () => {},
  closeModal: () => {},
  modalName: null,
} as ModalContextProps);

type DexContextProviderProps = {
  children: React.ReactNode;
};

const ModalContextProvider = (props: DexContextProviderProps) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [modalName, setModalName] = useState<AvailableModalComponents>(null);

  function openModal(incomingModalName: AvailableModalComponents) {
    setIsOpen(true);
    setModalName(incomingModalName);
  }

  function closeModal() {
    setIsOpen(false);
    setModalName(null);
  }

  return (
    <ModalContext.Provider
      value={{
        isOpen,
        openModal,
        closeModal,
        modalName,
      }}
    >
      {props.children}
    </ModalContext.Provider>
  );
};

export { ModalContext, ModalContextProvider };
