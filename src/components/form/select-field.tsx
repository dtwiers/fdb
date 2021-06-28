import { Form } from "react-bulma-components";
import { AnyRegistration } from "./types";
import { withDomRef } from "./util";

export const SelectField: React.FC<AnyRegistration & { values: Record<string, string> }> = (props) => (
  <Form.Field>
    <Form.Label>{props.fieldLabel}</Form.Label>
    <Form.Control>
      <Form.Select {...withDomRef(props.register(props.fieldName)) as any}>
        {Object.entries(props.values).map(([key, value]) => (
          <option key={key} value={key}>
            {value}
          </option>
        ))}
      </Form.Select>
    </Form.Control>
  </Form.Field>
);