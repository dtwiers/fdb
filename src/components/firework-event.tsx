import React from "react";
import "bulma/css/bulma.min.css";

import { Block } from "react-bulma-components";
import { Rnd } from "react-rnd";

export const FireworkEvent: React.FC = () => {
  return (
    <Rnd
      default={{ width: 80, height: 80, x: 0, y: 0 }}
      resizeGrid={[10, 1]}
      maxWidth={300}
      minWidth={300}
      className="box is-primary"
    >
      <div onDoubleClick={() => alert('foo')}>
        Foo
      </div>
    </Rnd>
  );
};
