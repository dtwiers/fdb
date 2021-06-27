import React from "react";
import InventoryBar from "./inventory-bar";
import TimeGrid from "./time-grid";
import { useSelector } from "react-redux";
import { selectors } from "../store/slices/ui";

const Layout: React.FC = () => {
  const modalCount = useSelector(selectors.selectModalOpen);
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "row",
        width: "100%",
        overflow: modalCount ? "hidden" : "auto",
        maxHeight: modalCount ? "100vh" : "unset",
      }}
    >
      <div style={{ flex: 1 }}>
        <TimeGrid length={900} division={10} divisionHeight={18}></TimeGrid>
      </div>
      <div style={{ flexShrink: 1, width: 300 }}>
        <InventoryBar></InventoryBar>
      </div>
    </div>
  );
};

export default Layout;
