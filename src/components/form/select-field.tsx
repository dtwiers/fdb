import React, { useMemo } from "react";
import { Content, Form } from "react-bulma-components";
import { useFormState } from "react-hook-form";
import { AnyRegistration } from "./types";
import { withDomRef } from "./util";

export const SelectField: React.FC<
  AnyRegistration & { values: Record<string, string> }
> = (props) => {
  const { errors } = useFormState({
    control: props.control as any,
    name: props.fieldName,
  });
  const pertinentErrors = useMemo(
    () =>
      Array.isArray(errors?.issues)
        ? (errors.issues as any[]).filter((e) =>
            e.path?.includes(props.fieldName)
          )
        : [],
    [errors, props.fieldName]
  );
  return (
    <Form.Field>
      <Form.Label>
        {props.fieldLabel}
        {props.required && <Content renderAs="span" textColor="primary" pl={1}>*</Content>}
      </Form.Label>
      <Form.Control>
        <Form.Select
          color={pertinentErrors.length ? "danger" : ""}
          {...(withDomRef(props.register(props.fieldName)) as any)}
        >
          {Object.entries(props.values).map(([key, value]) => (
            <option key={key} value={key}>
              {value}
            </option>
          ))}
        </Form.Select>
        {pertinentErrors.map((e) => (
          <Form.Help key={JSON.stringify(e)} color="danger">
            {e.message}
          </Form.Help>
        ))}
      </Form.Control>
    </Form.Field>
  );
};
