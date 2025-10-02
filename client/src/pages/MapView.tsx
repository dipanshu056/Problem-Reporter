import { useState } from "react";
import { PublicMapView } from "@/components/PublicMapView";
import { FilterBar } from "@/components/FilterBar";
import type { ProblemStatus } from "@/components/StatusBadge";

interface Problem {
  id: string;
  title: string;
  description: string;
  location: string;
  status: ProblemStatus;
  timestamp: Date;
  lat: number;
  lng: number;
}

export default function MapView() {
  const mockProblems: Problem[] = [
    {
      id: "1",
      title: "Broken Street Light",
      description: "Street light has been out for 3 days",
      location: "123 Main St",
      status: "pending",
      timestamp: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
      lat: 40.7128,
      lng: -74.006,
    },
    {
      id: "2",
      title: "Pothole on Highway",
      description: "Large pothole causing damage to vehicles",
      location: "Highway 101, Mile 42",
      status: "in-progress",
      timestamp: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000),
      lat: 40.7158,
      lng: -74.008,
    },
    {
      id: "3",
      title: "Graffiti on Wall",
      description: "Vandalism on public property",
      location: "Park Avenue",
      status: "resolved",
      timestamp: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000),
      lat: 40.7098,
      lng: -74.004,
    },
    {
      id: "4",
      title: "Trash Overflow",
      description: "Public bin is overflowing",
      location: "Central Park",
      status: "pending",
      timestamp: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000),
      lat: 40.7178,
      lng: -74.010,
    },
    {
      id: "5",
      title: "Damaged Sidewalk",
      description: "Cracked sidewalk poses tripping hazard",
      location: "Oak Street",
      status: "in-progress",
      timestamp: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
      lat: 40.7068,
      lng: -74.002,
    },
  ];

  const [filteredProblems, setFilteredProblems] = useState(mockProblems);

  const handleFilter = (searchQuery: string, statusFilter: string) => {
    let filtered = mockProblems;
    
    if (searchQuery) {
      filtered = filtered.filter(
        (p) =>
          p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          p.location.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    
    if (statusFilter !== "all") {
      filtered = filtered.filter((p) => p.status === statusFilter);
    }
    
    setFilteredProblems(filtered);
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="mb-6">
          <h1 className="text-4xl font-bold mb-2">Community Map</h1>
          <p className="text-muted-foreground">
            View all reported problems on an interactive map
          </p>
        </div>

        <div className="mb-6">
          <FilterBar
            onSearchChange={(query) => handleFilter(query, "all")}
            onStatusChange={(status) => handleFilter("", status)}
            onClearFilters={() => setFilteredProblems(mockProblems)}
          />
        </div>

        <PublicMapView problems={filteredProblems} />

        <div className="mt-6 flex items-center gap-4 text-sm">
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded-full bg-status-pending"></div>
            <span>Pending</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded-full bg-status-in-progress"></div>
            <span>In Progress</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded-full bg-status-resolved"></div>
            <span>Resolved</span>
          </div>
        </div>
      </div>
    </div>
  );
}
