import React, { ButtonHTMLAttributes } from "react";
import styles from "styles/components.module.scss";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  theme?: "default" | "cancel" | "confirm";
};

const Button = ({ theme = "default", style, ...props }: ButtonProps) => {
  const themeStyles = {
    default: {},
    cancel: {
      backgroundColor: "#A00000",
    },
    confirm: {
      backgroundColor: "#080",
    },
  };

  const buttonStyle = { ...themeStyles[theme], ...style };

  return (
    <button style={buttonStyle} {...props} className={styles.buttonComponent} />
  );
};

export default Button;
