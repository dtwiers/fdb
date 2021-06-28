import { Form } from "react-bulma-components";
import { AnyRegistration } from "./types";
import { withDomRef } from "./util";
import { useFormState } from "react-hook-form";

export const TextField: React.FC<AnyRegistration> = (props) => {
  const { errors, isValid } = useFormState({
    control: props.control as any,
    name: props.fieldName,
  });
  return (
    <Form.Field>
      <Form.Label>{props.fieldLabel}</Form.Label>
      <Form.Control>
        <Form.Input
          color={isValid ? "black" : "danger"}
          {...(withDomRef(props.register(props.fieldName, {})) as any)}
          {...(props.type ? { type: props.type } : {})}
        />
        {!isValid && <Form.Help color="danger">{errors[props.fieldName]}</Form.Help>}
      </Form.Control>
    </Form.Field>
  );
};
