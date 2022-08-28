import { Link, useLocation } from "react-router-dom";
import styles from "styles/sidebar.module.scss";

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
    <Link className={styles.linkContainer} to={to}>
      <img
        alt={label}
        src={illustration}
        className={styles.illustration}
        style={{
          filter: enabled ? "brightness(2)" : "brightness(1)",
        }}
      />
      <label
        className={styles.link}
        style={{
          color: enabled ? "white" : "#808080",
        }}
      >
        {label}
      </label>
    </Link>
  );
};

export default SidebarLink;
