import React from "react";
import { Form } from "react-bootstrap";
import Field from "./Field";

// const TextFieldWithIcon = React.forwardRef(
//   (
//     {
//       label,
//       name,
//       type = "text",
//       size = "sm",
//       placeholder = "",
//       inline = false,
//       required = false,
//       labelWidth,
//       register,
//       rules = {},
//       ...restProps
//     },
//     ref
//   ) => {
//     const fieldProps = {
//       label: label,
//       name: name,
//       inline: inline,
//       labelWidth: labelWidth,
//       required: required,
//     };
//     return (
//       <Field {...fieldProps}>
//         <div className="input-group">
//           <div className="input-group-prepend bg-transparent">
//             <span className="input-group-text bg-transparent border-right-0">
//               <i className="ti-mobile text-primary"></i>
//             </span>
//           </div>
//           <Form.Control
//             type={type}
//             id={name}
//             name={name}
//             placeholder={placeholder}
//             size={size}
//             // {...register(name, rules)}
//             {...restProps}
//           />
//         </div>
//       </Field>
//     );
//   }
// );

const TextFieldWithIcon = ({
  label,
  name,
  type = "text",
  size = "sm",
  placeholder = "",
  inline = false,
  required = false,
  labelWidth,
  register,
  rules = {},
  error = null,
  ...restProps
}) => {
  const errorClass = !!error ? "error" : "";
  const fieldProps = {
    label: label,
    name: name,
    inline: inline,
    labelWidth: labelWidth,
    required: required,
    classNames: errorClass,
  };
  return (
    <Field {...fieldProps}>
      <div className="input-group">
        <div className="input-group-prepend bg-transparent">
          <span className="input-group-text bg-transparent border-right-0">
            <i className="ti-mobile text-primary"></i>
          </span>
        </div>
        <Form.Control
          type={type}
          id={name}
          name={name}
          placeholder={placeholder}
          size={size}
          {...register(name, rules)}
          {...restProps}
        />
        {!!error && !!error.message && (
          <div className="invalid-feedback">{error.message}</div>
        )}
      </div>
    </Field>
  );
};

export default TextFieldWithIcon;
