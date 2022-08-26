import { useContext } from "react";

import { DexContext } from "@/contexts/DexContext";

export default () => {
  var value = useContext(DexContext);
  return value;
};
