import { useState, useRef } from "react";
import { HeroSection } from "@/components/HeroSection";
import { ReportForm } from "@/components/ReportForm";
import { ProblemCard } from "@/components/ProblemCard";
import { FilterBar } from "@/components/FilterBar";
import { useToast } from "@/hooks/use-toast";

export default function Home() {
  const [showForm, setShowForm] = useState(false);
  const formRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();

  const handleReportClick = () => {
    setShowForm(true);
    setTimeout(() => {
      formRef.current?.scrollIntoView({ behavior: "smooth" });
    }, 100);
  };

  const handleSubmit = (data: any) => {
    console.log("Form submitted:", data);
    toast({
      title: "Problem Reported!",
      description: "Your report has been submitted successfully.",
    });
    setShowForm(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const mockProblems = [
    {
      id: "1",
      title: "Broken Street Light",
      description: "Street light has been out for 3 days, creating safety concerns",
      location: "123 Main St",
      status: "pending" as const,
      timestamp: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
    },
    {
      id: "2",
      title: "Pothole on Highway",
      description: "Large pothole causing damage to vehicles",
      location: "Highway 101, Mile 42",
      status: "in-progress" as const,
      timestamp: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000),
    },
    {
      id: "3",
      title: "Graffiti on Wall",
      description: "Vandalism on public property needs cleanup",
      location: "Park Avenue",
      status: "resolved" as const,
      timestamp: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000),
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
    <div className="min-h-screen">
      <HeroSection onReportClick={handleReportClick} />

      <div className="max-w-7xl mx-auto px-4 py-12">
        {showForm ? (
          <div ref={formRef} className="mb-12">
            <h2 className="text-3xl font-bold mb-6">Report a Problem</h2>
            <ReportForm onSubmit={handleSubmit} />
          </div>
        ) : (
          <>
            <div className="mb-8">
              <h2 className="text-3xl font-bold mb-2">Recent Problems</h2>
              <p className="text-muted-foreground">
                View and track community problems reported by residents
              </p>
            </div>

            <div className="mb-6">
              <FilterBar
                onSearchChange={(query) => handleFilter(query, "all")}
                onStatusChange={(status) => handleFilter("", status)}
                onClearFilters={() => setFilteredProblems(mockProblems)}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredProblems.map((problem) => (
                <ProblemCard
                  key={problem.id}
                  {...problem}
                  onClick={() => console.log("View problem:", problem.id)}
                />
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
