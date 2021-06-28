import { UseFormRegisterReturn } from "react-hook-form";

export const withDomRef = (reg: UseFormRegisterReturn) => {
  const { ref, ...rest } = reg;
  return {
    domRef: ref,
    ...rest,
  };
};