import React from "react";
import Field from "./Field";
import { Typeahead} from "react-bootstrap-typeahead";
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
  ...restProps
}) => {
  const fieldProps = {
    label: label,
    name: name,
    inline: inline,
    labelWidth: labelWidth,
    required: required,
  };

  return (
    <Field {...fieldProps}>
      <Controller
        name={name}
        control={control}
        render={({ field }) => {
          return (
            <Typeahead
              {...field}
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
