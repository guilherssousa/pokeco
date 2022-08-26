import styles from "styles/app.module.scss";

import { BrowserRouter, Route, Routes } from "react-router-dom";

import { ShiftContextProvider } from "./contexts/ShiftContext";
import { DexContextProvider } from "./contexts/DexContext";

import Sidebar from "@/components/Sidebar";

import Main from "@/pages/Main";

const App: React.FC = () => {
  return (
    <ShiftContextProvider>
      <DexContextProvider>
        <BrowserRouter>
          <div className={styles.app}>
            <Sidebar />
            <Routes>
              <Route path="/" element={<Main />} />
              <Route path="/captured" element={<Main />} />
            </Routes>
          </div>
        </BrowserRouter>
      </DexContextProvider>
    </ShiftContextProvider>
  );
};

export default App;
