import { pipe } from "fp-ts/lib/function";
import * as RA from "fp-ts/lib/ReadonlyArray";
import { formatDuration } from "../lib/duration";

export type TimeGridProps = {
  length: number;
  division: number;
  divisionHeight: number;
};

const TimeGrid: React.FC<TimeGridProps> = (props) => {
  const seconds = pipe(
    RA.range(0, props.length),
    RA.filter((n) => !(n % props.division))
  );
  return (
    <div style={{ height: "100%" }}>
      <div style={{ position: "relative", overflowY: "scroll" }}>
        {props.children}
        {seconds.map((ss) => (
          <div
            key={ss}
            style={{
              padding: 0,
              margin: 0,
              borderBottomColor: "#BBCCFF",
              borderBottomWidth: 2,
              borderBottomStyle: "dotted",
              boxSizing: "border-box",
              height: props.divisionHeight,
            }}
          >
            <div style={{ fontSize: "8pt", margin: 0, padding: 0, marginTop: -8, top: 0 }}>{formatDuration(ss)}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TimeGrid;
