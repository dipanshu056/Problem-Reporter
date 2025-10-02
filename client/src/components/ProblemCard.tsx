import { MapPin, Clock } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { StatusBadge, type ProblemStatus } from "./StatusBadge";
import { formatDistanceToNow } from "date-fns";

interface ProblemCardProps {
  id: string;
  title: string;
  description: string;
  location: string;
  status: ProblemStatus;
  imageUrl?: string;
  timestamp: Date;
  onClick?: () => void;
}

export function ProblemCard({
  id,
  title,
  description,
  location,
  status,
  imageUrl,
  timestamp,
  onClick,
}: ProblemCardProps) {
  return (
    <Card
      className="overflow-hidden hover-elevate cursor-pointer"
      onClick={onClick}
      data-testid={`card-problem-${id}`}
    >
      <div className="relative aspect-square">
        {imageUrl ? (
          <img
            src={imageUrl}
            alt={title}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full bg-muted flex items-center justify-center">
            <MapPin className="h-12 w-12 text-muted-foreground" />
          </div>
        )}
        <div className="absolute top-2 right-2">
          <StatusBadge status={status} />
        </div>
      </div>
      <CardHeader className="space-y-0 pb-2">
        <CardTitle className="text-lg truncate">{title}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-2">
        <p className="text-sm text-muted-foreground line-clamp-2">
          {description}
        </p>
        <div className="flex items-center gap-4 text-sm text-muted-foreground">
          <div className="flex items-center gap-1">
            <MapPin className="h-3 w-3" />
            <span className="truncate">{location}</span>
          </div>
          <div className="flex items-center gap-1">
            <Clock className="h-3 w-3" />
            <span>{formatDistanceToNow(timestamp, { addSuffix: true })}</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
