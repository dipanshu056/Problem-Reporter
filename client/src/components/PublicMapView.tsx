import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { Icon } from "leaflet";
import { StatusBadge, type ProblemStatus } from "./StatusBadge";
import { MapPin, Clock } from "lucide-react";
import { formatDistanceToNow } from "date-fns";
import "leaflet/dist/leaflet.css";

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

interface PublicMapViewProps {
  problems: Problem[];
}

const createCustomIcon = (status: ProblemStatus) => {
  const colors = {
    pending: "#f59e0b",
    "in-progress": "#3b82f6",
    resolved: "#10b981",
  };

  const svgIcon = `
    <svg width="25" height="41" viewBox="0 0 25 41" xmlns="http://www.w3.org/2000/svg">
      <path d="M12.5 0C5.596 0 0 5.596 0 12.5c0 9.375 12.5 28.125 12.5 28.125S25 21.875 25 12.5C25 5.596 19.404 0 12.5 0z" fill="${colors[status]}" stroke="#000" stroke-width="1"/>
      <circle cx="12.5" cy="12.5" r="5" fill="#fff"/>
    </svg>
  `;

  return new Icon({
    iconUrl: `data:image/svg+xml;base64,${btoa(svgIcon)}`,
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [0, -41],
  });
};

export function PublicMapView({ problems }: PublicMapViewProps) {
  const center: [number, number] = problems.length > 0
    ? [problems[0].lat, problems[0].lng]
    : [40.7128, -74.006];

  return (
    <div className="h-[600px] rounded-lg overflow-hidden">
      <MapContainer
        center={center}
        zoom={12}
        style={{ height: "100%", width: "100%" }}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {problems.map((problem) => (
          <Marker
            key={problem.id}
            position={[problem.lat, problem.lng]}
            icon={createCustomIcon(problem.status)}
          >
            <Popup>
              <div className="space-y-2 min-w-48">
                <div className="flex items-start justify-between gap-2">
                  <h3 className="font-semibold text-base">{problem.title}</h3>
                  <StatusBadge status={problem.status} />
                </div>
                <p className="text-sm text-muted-foreground">
                  {problem.description}
                </p>
                <div className="flex items-center gap-1 text-xs text-muted-foreground">
                  <MapPin className="h-3 w-3" />
                  {problem.location}
                </div>
                <div className="flex items-center gap-1 text-xs text-muted-foreground">
                  <Clock className="h-3 w-3" />
                  {formatDistanceToNow(problem.timestamp, { addSuffix: true })}
                </div>
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
}
