import { Button, Form, Media, Modal } from "react-bulma-components";
import React from "react";
import { ModalStateManager } from "../lib/modal-state";
import { Firework, RetailUnit } from "../types";
import { useFieldArray, useForm } from "react-hook-form";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

export type NewRetailUnitModalProps = {
  onSave: (unit: RetailUnit) => void;
  state: ModalStateManager;
};

const size = z.union([z.literal("small"), z.literal("medium"), z.literal("large")]);
const schema = z
  .object({
    title: z.string(),
    manufacturer: z.string(),
    description: z.string(),
  })
  .and(
    z.union([
      z.object({
        _tag: z.literal("Rocket"),
      }),
      z.object({
        _tag: z.literal("Preloaded Mortar"),
      }),
      z.object({
        _tag: z.literal("Fountain"),
        duration: z.number(),
        size,
      }),
      z.object({
        _tag: z.literal("Cake"),
        duration: z.number().optional(),
        size,
        shotCount: z.number().optional(),
      }),
      z.object({
        _tag: z.literal("Roman Candle"),
        duration: z.number().optional(),
        size,
        shotCount: z.number().optional(),
      }),
      z.object({
        _tag: z.literal("MortarRetailUnit"),
        tubeCount: z.number(),
        nominalSize: z.number(),
        shells: z.array(
          z.object({
            _tag: z.literal("Artillery Shell"),
            effects: z.array(
              z.union([
                z.literal("Brocade"),
                z.literal("Chrysanthemum"),
                z.literal("Willow"),
                z.literal("Strobe"),
                z.literal("Salute"),
                z.literal("Peony"),
                z.literal("Nishiki"),
                z.literal("Tourbillion"),
                z.literal("Flying Fish"),
              ])
            ),
            color: z.string(),
            breakCount: z.number(),
          })
        ),
      }),
    ])
  );

const NewRetailUnitModal: React.FC<NewRetailUnitModalProps> = (props) => {
  const { register, handleSubmit, watch, reset } = useForm<RetailUnit>({ resolver: zodResolver(schema) });
  const cancel = () => {
    reset();
    props.state.hide();
  };
  const submit = async (e?: React.BaseSyntheticEvent<object, any, any>) => {
    const result = await handleSubmit(props.onSave)(e);
    props.state.hide();
    reset();
  };
  const currentValues = watch();
  return (
    <Modal show={props.state.isShowing} onClose={cancel} closeOnBlur closeOnEsc>
      <form onSubmit={submit}>
        <Modal.Card>
          <Modal.Card.Header>
            <Modal.Card.Title>New Retail Unit</Modal.Card.Title>
          </Modal.Card.Header>
          <Modal.Card.Body style={{ overflowY: "auto" }}>
            <Form.Field>
              <Form.Label>Type</Form.Label>
              <Form.Control>
                <Form.Select {...register("_tag", { required: true })}>
                  <option value="">-- Select One --</option>
                  <option value="Cake">Cake</option>
                  <option value="MortarRetailUnit">Artillery Shell</option>
                  <option value="Rocket">Rocket</option>
                  <option value="Fountain">Fountain</option>
                  <option value="Roman Candle">Roman Candle</option>
                  <option value="Preloaded Mortar">Preloaded Mortar</option>
                </Form.Select>
              </Form.Control>
            </Form.Field>
            <Form.Field>
              <Form.Label>Title</Form.Label>
              <Form.Control>
                <Form.Input {...register("title")} />
              </Form.Control>
            </Form.Field>
            <Form.Field>
              <Form.Label>Manufacturer</Form.Label>
              <Form.Control>
                <Form.Input {...register("manufacturer")} />
              </Form.Control>
            </Form.Field>
            {currentValues._tag === "MortarRetailUnit" && (
              <Form.Field>
                <Form.Label>Mortar Tube Count</Form.Label>
                <Form.Control>
                  <Form.Input type="number" defaultValue={0} {...register("tubeCount")} />
                </Form.Control>
              </Form.Field>
            )}
            {(currentValues._tag === "Cake" || currentValues._tag === "Fountain") && (
              <Form.Field>
                <Form.Label>Size</Form.Label>
                <Form.Control>
                  <Form.Radio {...register("size")} value="small">
                    Small
                  </Form.Radio>
                  <Form.Radio {...register("size")} value="medium">
                    Medium
                  </Form.Radio>
                  <Form.Radio {...register("size")} value="large">
                    Large
                  </Form.Radio>
                </Form.Control>
              </Form.Field>
            )}
            {(currentValues._tag === "Cake" || currentValues._tag === "Roman Candle") && (
              <Form.Field>
                <Form.Label>Shot Count</Form.Label>
                <Form.Control>
                  <Form.Input type="number" {...register("shotCount")} />
                </Form.Control>
              </Form.Field>
            )}
            {(currentValues._tag === "Cake" ||
              currentValues._tag === "Fountain" ||
              currentValues._tag === "Roman Candle") && (
              <Form.Field>
                <Form.Label>Duration</Form.Label>
                <Form.Control>
                  <Form.Input type="number" {...register("duration")} />
                </Form.Control>
              </Form.Field>
            )}
          </Modal.Card.Body>
          <Modal.Card.Footer justifyContent="flex-end">
            <Button type="button" onClick={cancel}>
              Cancel
            </Button>
            <Button color="primary" type="submit">
              Save
            </Button>
          </Modal.Card.Footer>
        </Modal.Card>
      </form>
    </Modal>
  );
};

export default NewRetailUnitModal;
