import styles from "styles/app.module.scss";

import { MemoryRouter, Route, Routes } from "react-router-dom";

import { DexContextProvider } from "./contexts/DexContext";
import { ModalContextProvider } from "./contexts/ModalContext";

import Sidebar from "@/components/Sidebar";
import Modal from "@/components/Modal";

import Main from "@/pages/Main";
import Remaining from "@/pages/Remaining";
import Captured from "@/pages/Captured";
import Settings from "@/pages/Settings";
import Pokemon from "@/pages/Pokemon";

const App: React.FC = () => {
  return (
    <DexContextProvider>
      <ModalContextProvider>
        <Modal />
        <MemoryRouter>
          <div className={styles.app}>
            <Sidebar />
            <Routes>
              <Route path="/" element={<Main />} />
              <Route path="/remaining" element={<Remaining />} />
              <Route path="/captured" element={<Captured />} />
              <Route path="/settings" element={<Settings />} />
              <Route path="/pokemon/:pokemonId" element={<Pokemon />} />
            </Routes>
          </div>
        </MemoryRouter>
      </ModalContextProvider>
    </DexContextProvider>
  );
};

export default App;
