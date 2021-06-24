import React from "react";
import "bulma/css/bulma.min.css";

import { Block } from "react-bulma-components";
import { Rnd } from "react-rnd";

export const EventTiming: React.FC = () => {
  return (
    <Rnd
      default={{ width: 100, height: 100, x: 0, y: 0 }}
      resizeGrid={[10, 1]}
      maxWidth={300}
      minWidth={300}
      className="box is-primary"
    />
  );
};
