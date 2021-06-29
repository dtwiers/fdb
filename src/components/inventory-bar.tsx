import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useModalState } from "../lib/modal-state";
import * as Inventory from "../store/slices/inventory";
import { RetailUnit } from "../types";
import NewRetailUnitModal from "./new-retail-unit.modal";
import { Button } from "react-bulma-components";

export type InventoryBarProps = {};

const InventoryBar: React.FC<InventoryBarProps> = () => {
  const inventory = useSelector(Inventory.selectors.selectAll);
  const dispatch = useDispatch();
  const addItem = (unit: RetailUnit) =>
    dispatch(Inventory.actions.addRetailUnit(unit));
  const modalManager = useModalState();

  return (
    <div>
      <NewRetailUnitModal state={modalManager} onSave={addItem} />
      <Button type="button" color="dark" onClick={modalManager.show}>
        Add Retail Unit
      </Button>
      {inventory.map((item) => (
        <div key={item.id}>{JSON.stringify(item)}</div>
      ))}
    </div>
  );
};

export default InventoryBar;
