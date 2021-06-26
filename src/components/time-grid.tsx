import { pipe } from "fp-ts/lib/function";
import * as RA from "fp-ts/lib/ReadonlyArray";
import { formatDuration } from "../lib/duration";

export type TimeGridProps = {
  length: number;
};

const TimeGrid: React.FC<TimeGridProps> = (props) => {
  const seconds = pipe(
    RA.range(0, props.length),
    RA.filter((n) => !(n % 5))
  );
  return (
    <div style={{ position: "relative" }}>
      {props.children}
      {seconds.map((ss) => (
        <div
          key={ss}
          style={{
            padding: 0,
            margin: 0,
            borderBottomColor: "#AABBFF",
            borderBottomWidth: 2,
            borderBottomStyle: "dotted",
            boxSizing: "border-box",
            height: 12,
          }}
        >
          <span style={{ fontSize: "8pt", margin: 0, padding: 0 }}>{formatDuration(ss)}</span>
        </div>
      ))}
    </div>
  );
};

export default TimeGrid;
