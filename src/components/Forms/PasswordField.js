import React from "react";
import FormControl from "./FormControl";

const PasswordField = React.forwardRef(({ ...restProps }, ref) => {
  console.log("PasswordField === ", restProps);
  return <FormControl ref={ref} {...restProps}></FormControl>;
});

export default PasswordField;
