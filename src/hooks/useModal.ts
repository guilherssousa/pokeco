import { useContext } from "react";

import { ModalContext } from "@/contexts/ModalContext";

export default () => {
  var value = useContext(ModalContext);
  return value;
};
