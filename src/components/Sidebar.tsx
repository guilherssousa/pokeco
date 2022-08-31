import styles from "styles/sidebar.module.scss";

import SidebarLabel from "./SidebarLabel";
import SidebarLink from "./SidebarLink";

import useDex from "@/hooks/useDex";

import listImage from "/list.svg";
import remainingImage from "/remaining.svg";
import capturedImage from "/captured.svg";
import settingsImage from "/settings.svg";
import leftListImage from "/left-list.svg";

const Sidebar = () => {
  const { currentDex } = useDex();

  return (
    <aside className={styles.sidebar}>
      <div>
        <div className={styles.top}>
          <div>
            <SidebarLabel>Pokédex</SidebarLabel>
            <SidebarLink label="All" illustration={listImage} to="/" />
            <SidebarLink
              label="Remaining"
              illustration={remainingImage}
              to="/remaining"
            />
            <SidebarLink
              label="Captured"
              illustration={capturedImage}
              to="/captured"
            />
          </div>
        </div>
        <div>
          <SidebarLabel>Settings</SidebarLabel>
          <SidebarLink
            label="Settings"
            illustration={settingsImage}
            to="/settings"
          />
        </div>
      </div>
      <div className={styles.bottom}>
        <div>{currentDex.name} Dex</div>
        <button className={styles.bottomButton}>
          <img src={leftListImage} alt="Change Dex" />
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
