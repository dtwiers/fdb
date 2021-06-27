import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { useModalState } from "../lib/modal-state";
import { default as Inventory, InventoryItem, selectors } from "../store/slices/inventory";
import { Firework, RetailUnit } from "../types";
import NewRetailUnitModal from "./new-retail-unit.modal";

export type InventoryBarProps = {};

const InventoryBar: React.FC<InventoryBarProps> = () => {
  const inventory = useSelector(selectors.selectAll);
  const dispatch = useDispatch();
  const addItem = (unit: RetailUnit) => dispatch(Inventory.actions.addRetailUnit(unit));
  const modalManager = useModalState();

  return (
    <div>
      <NewRetailUnitModal state={modalManager} onSave={addItem} />
      <button type="button" onClick={modalManager.show}>
        Add Retail Unit
      </button>
      {inventory.map((item) => (
        <div key={item.id}>{item}</div>
      ))}
    </div>
  );
};

export default InventoryBar;
