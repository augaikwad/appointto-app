import { Controller, useFormContext } from "react-hook-form";
import CreatableSelect from "react-select/creatable";
import Field from "./Field";

const CreatableReactSelectField = ({
  name,
  label = "Label",
  options = [],
  inline = false,
  labelWidth,
  optionLabel = "label",
  optionValue = "value",
  rules = {},
  ...restProps
}) => {
  const { control } = useFormContext();

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
        render={({ field }) => (
          <CreatableSelect
            {...field} // Spreads: onChange, onBlur, value, ref
            isClearable
            options={options}
            getOptionLabel={(option) => option[optionLabel]}
            getOptionValue={(option) => option[optionValue]}
            placeholder=""
            getNewOptionData={(value, label) => {
              return {
                [optionLabel]: label,
                [optionValue]: value,
                __isNew__: true,
              };
            }}
            formatCreateLabel={(inputValue) => `Create "${inputValue}"`}
            components={{
              DropdownIndicator: () => null,
              IndicatorSeparator: () => null,
            }}
            menuPortalTarget={document.body}
            {...restProps}
          />
        )}
      />
    </Field>
  );
};

export default CreatableReactSelectField;
