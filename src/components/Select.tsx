import { SelectHTMLAttributes } from "react";

type SelectProps = SelectHTMLAttributes<HTMLSelectElement>;

const Select = ({ children, ...props }: SelectProps) => {
  return <select {...props}>{children}</select>;
};

export default Select;
