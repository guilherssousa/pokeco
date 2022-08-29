import styles from "styles/sidebar.module.scss";

interface Props {
  children: React.ReactNode;
}

const SidebarLabel: React.FC<Props> = ({ children }) => {
  return <label className={styles.sideBarLabel}>{children}</label>;
};

export default SidebarLabel;
