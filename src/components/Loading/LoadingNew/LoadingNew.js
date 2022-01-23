import React from "react";
import "./LoadingNew.scss";
const LoadingNew = (props) => {
  return (
    <h5
      style={
        props.isFindata
          ? { opacity: 1, visibility: "visible" }
          : { opacity: 0, visibility: "hidden" }
      }
      data-text="Loading..."
    >
      Loading...
    </h5>
  );
};

export default LoadingNew;
