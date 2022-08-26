import styles from "styles/sidebar.module.scss";

import SidebarLink from "./SidebarLink";

import listImage from "/list.svg";
import capturedImage from "/captured.svg";

const Sidebar = () => {
  return (
    <aside className={styles.sidebar}>
      <SidebarLink label="All" illustration={listImage} to="/" />
      <SidebarLink
        label="Captured"
        illustration={capturedImage}
        to="/captured"
      />
    </aside>
  );
};

export default Sidebar;
