import React, { ButtonHTMLAttributes } from "react";
import styles from "styles/components.module.scss";

const Button = (props: ButtonHTMLAttributes<HTMLButtonElement>) => {
  return <button {...props} className={styles.buttonComponent} />;
};

export default Button;
