import { FilterBar } from "../FilterBar";

export default function FilterBarExample() {
  return (
    <div className="max-w-4xl p-8 bg-background">
      <FilterBar
        onSearchChange={(query) => console.log("Search:", query)}
        onStatusChange={(status) => console.log("Status:", status)}
        onClearFilters={() => console.log("Filters cleared")}
      />
    </div>
  );
}
