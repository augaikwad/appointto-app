import React from "react";
import { useForm, FormProvider } from "react-hook-form";

const Form = React.forwardRef(
  ({ children, defaultValues, onSubmit, watchFor = null }, ref) => {
    const form = useForm({
      mode: "onBlur",
      defaultValues: defaultValues,
    });
    const formRef = React.createRef();
    const { handleSubmit, reset, watch } = form;

    let formData = {};

    if (watchFor !== null) {
      formData = watch(watchFor);
    }
    const submitForm = () => {
      formRef.current.dispatchEvent(new Event("submit", { cancelable: true }));
    };
    const resetForm = (value) => {
      reset(value || defaultValues);
    };

    React.useImperativeHandle(ref, () => ({
      reset(value) {
        resetForm(value);
      },
      submit() {
        submitForm();
      },
    }));

    return (
      <FormProvider {...form}>
        <form ref={formRef} onSubmit={handleSubmit(onSubmit)}>
          {typeof children === "function"
            ? children({ submitForm, resetForm, formData })
            : children}
        </form>
      </FormProvider>
    );
  }
);

export default Form;
