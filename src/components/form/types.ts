import { FieldName, UseFormRegister } from "react-hook-form";

export type AnyRegistration = {
  fieldName: FieldName<Record<string, string>>;
  fieldLabel: string;
  register: UseFormRegister<any>;
  control: object;
  type?: string;
};
