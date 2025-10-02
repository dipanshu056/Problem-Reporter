import { Badge } from "@/components/ui/badge";
import { Clock, AlertCircle, CheckCircle } from "lucide-react";

export type ProblemStatus = "pending" | "in-progress" | "resolved";

interface StatusBadgeProps {
  status: ProblemStatus;
  className?: string;
}

export function StatusBadge({ status, className }: StatusBadgeProps) {
  const statusConfig = {
    pending: {
      label: "Pending",
      icon: Clock,
      className: "bg-status-pending text-status-pending-foreground",
    },
    "in-progress": {
      label: "In Progress",
      icon: AlertCircle,
      className: "bg-status-in-progress text-status-in-progress-foreground",
    },
    resolved: {
      label: "Resolved",
      icon: CheckCircle,
      className: "bg-status-resolved text-status-resolved-foreground",
    },
  };

  const config = statusConfig[status];
  const Icon = config.icon;

  return (
    <Badge
      className={`${config.className} ${className || ""} gap-1`}
      data-testid={`badge-status-${status}`}
    >
      <Icon className="h-3 w-3" />
      {config.label}
    </Badge>
  );
}
