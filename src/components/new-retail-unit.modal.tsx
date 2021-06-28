import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import { Button, Modal } from "react-bulma-components";
import { useForm } from "react-hook-form";
import { ModalStateManager } from "../lib/modal-state";
import { RetailUnit } from "../types";
import { RadioField } from "./form/radio-field";
import { SelectField } from "./form/select-field";
import { TextField } from "./form/text-field";

export type NewRetailUnitModalProps = {
  onSave: (unit: RetailUnit) => void;
  state: ModalStateManager;
};

const NewRetailUnitModal: React.FC<NewRetailUnitModalProps> = (props) => {
  const { register, handleSubmit, watch, reset } = useForm<RetailUnit>({
    resolver: async (values) => {
      const result = await RetailUnit.spa(values);
      if (result.success) {
        return { values: result.data, errors: {} };
      }
      console.warn(result.error);
      return { values: {}, errors: result.error };
    },
  });
  const cancel = () => {
    reset();
    props.state.hide();
  };
  const submit = (retailUnit: RetailUnit) => {
    props.onSave(retailUnit);
    props.state.hide();
    reset();
  };
  const currentValues = watch();
  return (
    <Modal show={props.state.isShowing} onClose={cancel} closeOnBlur closeOnEsc>
      <form onSubmit={handleSubmit(submit, console.error)}>
        <Modal.Card>
          <Modal.Card.Header>
            <Modal.Card.Title>New Firework Retail Unit</Modal.Card.Title>
          </Modal.Card.Header>
          <Modal.Card.Body style={{ overflowY: "auto" }}>
            <TextField
              fieldName="title"
              fieldLabel="Title"
              register={register}
            />
            <TextField
              fieldName="manufacturer"
              fieldLabel="Manufacturer"
              register={register}
            />
            <TextField
              fieldName="description"
              fieldLabel="Description"
              register={register}
            />
            <SelectField
              fieldName="_tag"
              fieldLabel="Type"
              register={register}
              values={{
                "": "-- Select One --",
                cake: "Cake",
                mortarRetailUnit: "Artillery Shell",
                rocket: "Rocket",
                fountain: "Fountain",
                romanCandle: "Roman Candle",
                preloadedMortar: "Preloaded Mortar",
              }}
            />
            {currentValues._tag === "mortar" && (
              <>
                <TextField
                  fieldName="tubeCount"
                  fieldLabel="Tube Count"
                  type="number"
                  register={register}
                />
                <TextField
                  fieldName="shellCount"
                  fieldLabel="Number of Shells"
                  type="number"
                  register={register}
                />
              </>
            )}
            {(currentValues._tag === "cake" ||
              currentValues._tag === "fountain") && (
              <RadioField
                fieldName="size"
                fieldLabel="Size"
                register={register}
                values={{ small: "Small", medium: "Medium", large: "Large" }}
              />
            )}
            {(currentValues._tag === "cake" ||
              currentValues._tag === "romanCandle") && (
              <TextField
                fieldName="shotCount"
                fieldLabel="Shot Count"
                type="number"
                register={register}
              />
            )}
            {(currentValues._tag === "cake" ||
              currentValues._tag === "fountain" ||
              currentValues._tag === "romanCandle") && (
              <TextField
                fieldName="duration"
                fieldLabel="Duration"
                type="number"
                register={register}
              />
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
