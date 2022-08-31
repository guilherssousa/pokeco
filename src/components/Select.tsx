import { SelectHTMLAttributes } from "react";
import styles from "styles/components.module.scss";

type SelectProps = SelectHTMLAttributes<HTMLSelectElement>;

const Select = ({ children, ...props }: SelectProps) => {
  return (
    <select className={styles.selectComponent} {...props}>
      {children}
    </select>
  );
};

export default Select;
