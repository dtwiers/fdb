import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import { Button, Modal } from "react-bulma-components";
import { useForm } from "react-hook-form";
import { ModalStateManager } from "../lib/modal-state";
import { Cake, Fountain, Mortar, PreloadedMortar, RetailUnit, Rocket, RomanCandle } from "../types";
import { RadioField } from "./form/radio-field";
import { SelectField } from "./form/select-field";
import { TextField } from "./form/text-field";

export type NewRetailUnitModalProps = {
  onSave: (unit: RetailUnit) => void;
  state: ModalStateManager;
};

const NewRetailUnitModal: React.FC<NewRetailUnitModalProps> = (props) => {
  const { register, handleSubmit, watch, reset, control } = useForm<RetailUnit>({
    resolver: async (values) => {
      console.log(values);
      const parser = {
        rocket: () => Rocket,
        cake: () => Cake,
        fountain: () => Fountain,
        preloadedMortar: () => PreloadedMortar,
        mortar: () => Mortar,
        romanCandle: () => RomanCandle,
      }[values._tag];
      if (!parser) {
        return { values: {}, errors: {_tag: `invalid type: ${values._tag}`}};
      }
      const result = await parser().spa(values);
      // redundant because typescript
      if (result.success === true) {
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
              control={control}
            />
            <TextField
              fieldName="manufacturer"
              fieldLabel="Manufacturer"
              register={register}
              control={control}
            />
            <TextField
              fieldName="description"
              fieldLabel="Description"
              register={register}
              control={control}
            />
            <SelectField
              fieldName="_tag"
              fieldLabel="Type"
              register={register}
              control={control}
              values={{
                "": "-- Select One --",
                cake: "Cake",
                mortar: "Box of Mortars",
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
                  control={control}
                />
                <TextField
                  fieldName="shellCount"
                  fieldLabel="Number of Shells"
                  type="number"
                  register={register}
                  control={control}
                />
              </>
            )}
            {(currentValues._tag === "cake" ||
              currentValues._tag === "fountain") && (
              <RadioField
                fieldName="size"
                fieldLabel="Size"
                register={register}
                control={control}
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
                control={control}
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
                control={control}
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
