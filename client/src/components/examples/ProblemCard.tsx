import { ProblemCard } from "../ProblemCard";

export default function ProblemCardExample() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 p-8 bg-background">
      <ProblemCard
        id="1"
        title="Broken Street Light"
        description="Street light on Main St has been out for 3 days, creating safety concerns for pedestrians."
        location="123 Main St"
        status="pending"
        timestamp={new Date(Date.now() - 2 * 24 * 60 * 60 * 1000)}
        onClick={() => console.log("Problem clicked")}
      />
      <ProblemCard
        id="2"
        title="Pothole on Highway"
        description="Large pothole causing damage to vehicles"
        location="Highway 101, Mile 42"
        status="in-progress"
        timestamp={new Date(Date.now() - 5 * 24 * 60 * 60 * 1000)}
        onClick={() => console.log("Problem clicked")}
      />
      <ProblemCard
        id="3"
        title="Graffiti on Wall"
        description="Vandalism on public property"
        location="Park Avenue"
        status="resolved"
        timestamp={new Date(Date.now() - 10 * 24 * 60 * 60 * 1000)}
        onClick={() => console.log("Problem clicked")}
      />
    </div>
  );
}
