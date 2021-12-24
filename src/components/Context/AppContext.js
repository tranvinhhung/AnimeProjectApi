import React, { createContext } from "react";
export const conText = createContext();
function AppContext(props) {
  const value = {
    a: function () {
      return 123;
    },
    b: "hung",
  };
  return <conText.Provider value={value}>{props.children}</conText.Provider>;
}

export default AppContext;
