import { AdminDashboard } from "../AdminDashboard";

const mockProblems = [
  {
    id: "1",
    title: "Broken Street Light",
    description: "Light not working",
    location: "123 Main St",
    status: "pending" as const,
    timestamp: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
  },
  {
    id: "2",
    title: "Pothole on Highway",
    description: "Large pothole",
    location: "Highway 101",
    status: "in-progress" as const,
    timestamp: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000),
  },
  {
    id: "3",
    title: "Graffiti on Wall",
    description: "Vandalism",
    location: "Park Avenue",
    status: "resolved" as const,
    timestamp: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000),
  },
];

export default function AdminDashboardExample() {
  return (
    <div className="p-8 bg-background">
      <AdminDashboard
        problems={mockProblems}
        onStatusChange={(id, status) => {
          console.log("Status changed:", { id, status });
        }}
        onExport={() => {
          console.log("Export triggered");
          alert("Exporting problems...");
        }}
      />
    </div>
  );
}
