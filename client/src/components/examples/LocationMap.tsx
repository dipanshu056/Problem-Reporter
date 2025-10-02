import { LocationMap } from "../LocationMap";

export default function LocationMapExample() {
  return (
    <div className="max-w-4xl p-8 bg-background">
      <LocationMap
        onLocationChange={(lat, lng) => {
          console.log("Location changed:", { lat, lng });
        }}
      />
    </div>
  );
}
