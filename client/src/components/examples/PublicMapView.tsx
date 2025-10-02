import { PublicMapView } from "../PublicMapView";

const mockProblems = [
  {
    id: "1",
    title: "Broken Street Light",
    description: "Light not working for 3 days",
    location: "123 Main St",
    status: "pending" as const,
    timestamp: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
    lat: 40.7128,
    lng: -74.006,
  },
  {
    id: "2",
    title: "Pothole on Highway",
    description: "Large pothole causing damage",
    location: "Highway 101",
    status: "in-progress" as const,
    timestamp: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000),
    lat: 40.7158,
    lng: -74.008,
  },
  {
    id: "3",
    title: "Graffiti on Wall",
    description: "Vandalism on public property",
    location: "Park Avenue",
    status: "resolved" as const,
    timestamp: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000),
    lat: 40.7098,
    lng: -74.004,
  },
];

export default function PublicMapViewExample() {
  return (
    <div className="p-8 bg-background">
      <PublicMapView problems={mockProblems} />
    </div>
  );
}
