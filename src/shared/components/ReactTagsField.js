import React, { useState } from "react";
import FormGroup from "./FormGroup";
import { Controller } from "react-hook-form";
import ReactTags from "react-tag-autocomplete";

const ReactTagsField = React.forwardRef(
  ({ formGroup, label, name, control, allowNew = true, ...restProps }, ref) => {
    const [tags, setTags] = useState([]);
    return (
      <FormGroup label={label} {...formGroup}>
        <Controller
          name={name}
          control={control}
          render={({ field }) => {
            return (
              <ReactTags
                {...field}
                id={name}
                ref={ref}
                tags={tags}
                allowNew={allowNew}
                suggestions={[]}
                handleDelete={() => {}}
                handleAddition={(tag) => setTags([...tags, ...[tag]])}
                {...restProps}
              />
            );
          }}
        />
      </FormGroup>
    );
  }
);

export default ReactTagsField;
