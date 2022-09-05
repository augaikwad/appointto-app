import React from "react";
import ReactTags from "react-tag-autocomplete";
import Field from "./Field";

const TagsAutocomplete = ({
  label,
  name,
  tags = [],
  suggestions = [],
  allowNew = true,
  handleDelete = () => {},
  handleAddition = () => {},
  formGroupClasses = null,
  inline = false,
  labelWidth = "100px",
  required,
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
      <ReactTags
        name={name}
        id={name}
        tags={tags}
        suggestions={suggestions}
        allowNew={allowNew}
        handleDelete={handleDelete}
        handleAddition={handleAddition}
        classNames={{
          root: "react-tags custom-react-tags",
        }}
        placeholderText="Add Tag"
        {...restProps}
      />
    </Field>
  );
};

export default TagsAutocomplete;
