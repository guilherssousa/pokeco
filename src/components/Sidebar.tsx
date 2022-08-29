import styles from "styles/sidebar.module.scss";

import SidebarLabel from "./SidebarLabel";
import SidebarLink from "./SidebarLink";

import useDex from "@/hooks/useDex";

import listImage from "/list.svg";
import remainingImage from "/remaining.svg";
import capturedImage from "/captured.svg";
import settingsImage from "/settings.svg";

const Sidebar = () => {
  const { captured, dex } = useDex();

  const percentage = Math.round((captured?.length / dex?.length) * 100);

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
        Dex {percentage}% complete! ({captured?.length}/{dex?.length})
      </div>
    </aside>
  );
};

export default Sidebar;
