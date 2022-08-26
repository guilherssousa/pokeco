import { Link, useLocation } from "react-router-dom";
import styles from "styles/sidebar.module.scss";

import listImage from "/list.svg";
import capturedImage from "/captured.svg";

interface LinkProps {
  label: string;
  to: string;
  illustration: string;
  active?: boolean;
}

const SidebarLink: React.FC<LinkProps> = ({ label, to, illustration }) => {
  const location = useLocation();

  const enabled = location.pathname === to;

  return (
    <div className={styles.linkContainer}>
      <img
        alt={label}
        src={illustration}
        className={styles.illustration}
        style={{
          filter: enabled ? "brightness(2)" : "brightness(1)",
        }}
      />
      <Link className={styles.link} to={to}>
        {label}
      </Link>
    </div>
  );
};

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
