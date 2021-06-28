import { Form } from "react-bulma-components";
import { AnyRegistration } from "./types";
import { withDomRef } from "./util";

export const TextField: React.FC<AnyRegistration> = (props) => (
  <Form.Field>
    <Form.Label>{props.fieldLabel}</Form.Label>
    <Form.Control>
      <Form.Input
        {...(withDomRef(
          props.register(props.fieldName, {
            setValueAs: (input) =>
              props.type === "number"
                ? Number.isNaN(Number(input))
                  ? undefined
                  : Number(input)
                : input,
            valueAsNumber: props.type === "number",
          })
        ) as any)}
        {...(props.type ? { type: props.type } : {})}
      />
    </Form.Control>
  </Form.Field>
);
