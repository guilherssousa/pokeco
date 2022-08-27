import styles from "styles/app.module.scss";

import { BrowserRouter, Route, Routes } from "react-router-dom";

import { DexContextProvider } from "./contexts/DexContext";

import Sidebar from "@/components/Sidebar";

import Main from "@/pages/Main";
import Remaining from "@/pages/Remaining";
import Captured from "@/pages/Captured";

const App: React.FC = () => {
  return (
    <DexContextProvider>
      <BrowserRouter>
        <div className={styles.app}>
          <Sidebar />
          <Routes>
            <Route path="/" element={<Main />} />
            <Route path="/remaining" element={<Remaining />} />
            <Route path="/captured" element={<Captured />} />
          </Routes>
        </div>
      </BrowserRouter>
    </DexContextProvider>
  );
};

export default App;
