import { useContext } from "react";

import { ShiftContext } from "@/contexts/ShiftContext";

export default () => {
  var value = useContext(ShiftContext);
  return value;
};
