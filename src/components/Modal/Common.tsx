import styles from "styles/modal.module.scss";

type ChildrenProp = {
  children: React.ReactNode;
};

const Container = ({ children }: ChildrenProp) => {
  return (
    <div className={styles.modalContainer} onClick={(e) => e.stopPropagation()}>
      {children}
    </div>
  );
};

export { Container };
