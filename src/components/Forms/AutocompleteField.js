import React from "react";
import Field from "./Field";
import { Typeahead } from "react-bootstrap-typeahead";
import { Controller } from "react-hook-form";

const AutocompleteField = ({
  label,
  name,
  inline = false,
  required = false,
  labelWidth,
  control,
  id = "Typeahead",
  data = [],
  labelKey = "name",
  positionFixed = true,
  flip = true,
  rules = {},
  ...restProps
}) => {
  const fieldProps = {
    label: label,
    name: name,
    inline: inline,
    labelWidth: labelWidth,
    required: rules.hasOwnProperty("required"),
  };

  return (
    <Field {...fieldProps}>
      <Controller
        name={name}
        control={control}
        rules={rules}
        render={({ field }) => {
          return (
            <Typeahead
              {...field}
              defaultInputValue={field.value}
              id={id}
              labelKey={labelKey}
              flip={flip}
              positionFixed={positionFixed}
              options={data}
              {...restProps}
            />
          );
        }}
      />
    </Field>
  );
};

export default AutocompleteField;
