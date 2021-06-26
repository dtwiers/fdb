import { FireworkEvent } from "../src/components/firework-event";
import TimeGrid from "../src/components/time-grid";

export default function Home() {
  return (
    <TimeGrid length={1800}>
      <FireworkEvent />
    </TimeGrid>
  );
}
