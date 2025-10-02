import { useState } from "react";
import { AdminDashboard } from "@/components/AdminDashboard";
import { useToast } from "@/hooks/use-toast";
import type { ProblemStatus } from "@/components/StatusBadge";

export default function Admin() {
  const { toast } = useToast();

  const [problems] = useState([
    {
      id: "1",
      title: "Broken Street Light",
      description: "Light not working for 3 days",
      location: "123 Main St",
      status: "pending" as ProblemStatus,
      timestamp: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
    },
    {
      id: "2",
      title: "Pothole on Highway",
      description: "Large pothole causing damage",
      location: "Highway 101, Mile 42",
      status: "in-progress" as ProblemStatus,
      timestamp: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000),
    },
    {
      id: "3",
      title: "Graffiti on Wall",
      description: "Vandalism on public property",
      location: "Park Avenue",
      status: "resolved" as ProblemStatus,
      timestamp: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000),
    },
    {
      id: "4",
      title: "Trash Overflow",
      description: "Public bin overflowing",
      location: "Central Park",
      status: "pending" as ProblemStatus,
      timestamp: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000),
    },
    {
      id: "5",
      title: "Damaged Sidewalk",
      description: "Cracked sidewalk is a tripping hazard",
      location: "Oak Street",
      status: "in-progress" as ProblemStatus,
      timestamp: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
    },
  ]);

  const handleStatusChange = (id: string, status: ProblemStatus) => {
    console.log("Status changed:", { id, status });
    toast({
      title: "Status Updated",
      description: `Problem status changed to ${status}`,
    });
  };

  const handleExport = () => {
    console.log("Exporting problems...");
    toast({
      title: "Export Started",
      description: "Preparing your report for download...",
    });
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2">Admin Dashboard</h1>
          <p className="text-muted-foreground">
            Manage and track all reported community problems
          </p>
        </div>

        <AdminDashboard
          problems={problems}
          onStatusChange={handleStatusChange}
          onExport={handleExport}
        />
      </div>
    </div>
  );
}
