import { pipe } from "fp-ts/lib/function";
import * as RA from "fp-ts/lib/ReadonlyArray";

export default function Home() {
  const seconds = pipe(
    RA.range(0, 1800),
    RA.filter((n) => !(n % 5))
  );
  return (
    <div>
      {seconds.map((ss) => (
        <div
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
          <span style={{ fontSize: "8pt", margin: 0, padding: 0 }}>{ss}</span>
        </div>
      ))}
    </div>
  );
}
