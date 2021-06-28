import { Form } from "react-bulma-components";
import { AnyRegistration } from "./types";
import { withDomRef } from "./util";

export const RadioField: React.FC<AnyRegistration & { values: Record<string, string> }> = (props) => (
  <Form.Field>
    <Form.Label>{props.fieldLabel}</Form.Label>
    <Form.Control>
      {Object.entries(props.values).map(([key, value]) => (
        <Form.Radio key={key} {...(withDomRef(props.register(props.fieldName)) as any)} value={key}>
          {value}
        </Form.Radio>
      ))}
    </Form.Control>
  </Form.Field>
);
