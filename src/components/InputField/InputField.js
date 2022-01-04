import React from "react";
import { TextField } from "@material-ui/core";
const InputField = ({
  inputRef,
  name,
  variant = "outlined",
  label,
  type = "text",
  error,
  isFocus,
  fullWidth,
}) => {
  return (
    <TextField
      name={name}
      type={type}
      variant={variant}
      label={label}
      inputRef={inputRef}
      error={!!error?.message}
      autoFocus={isFocus}
      fullWidth={fullWidth}
      style={{ fontSize: 20 }}
    />
  );
};

export default InputField;
