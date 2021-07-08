import React from "react";
import { useForm, FormProvider } from "react-hook-form";

export const RetailUnitForm: React.FC = (props) => {
  const methods = useForm();

  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(null)}>{props.children}</form>
    </FormProvider>
  );
};
