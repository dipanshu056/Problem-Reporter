import { useState } from "react";
import { MapPin, Clock, Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { StatusBadge, type ProblemStatus } from "./StatusBadge";
import { formatDistanceToNow } from "date-fns";

interface Problem {
  id: string;
  title: string;
  description: string;
  location: string;
  status: ProblemStatus;
  timestamp: Date;
}

interface AdminDashboardProps {
  problems: Problem[];
  onStatusChange: (id: string, status: ProblemStatus) => void;
  onExport: () => void;
}

export function AdminDashboard({
  problems,
  onStatusChange,
  onExport,
}: AdminDashboardProps) {
  const [localProblems, setLocalProblems] = useState(problems);

  const handleStatusChange = (id: string, status: string) => {
    const newProblems = localProblems.map((p) =>
      p.id === id ? { ...p, status: status as ProblemStatus } : p
    );
    setLocalProblems(newProblems);
    onStatusChange(id, status as ProblemStatus);
  };

  const stats = {
    total: localProblems.length,
    pending: localProblems.filter((p) => p.status === "pending").length,
    inProgress: localProblems.filter((p) => p.status === "in-progress").length,
    resolved: localProblems.filter((p) => p.status === "resolved").length,
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Problems</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{stats.total}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pending</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-status-pending">
              {stats.pending}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">In Progress</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-status-in-progress">
              {stats.inProgress}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Resolved</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-status-resolved">
              {stats.resolved}
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between gap-2 space-y-0">
          <CardTitle>Reported Problems</CardTitle>
          <Button
            variant="outline"
            size="sm"
            onClick={onExport}
            className="gap-2"
            data-testid="button-export"
          >
            <Download className="h-4 w-4" />
            Export
          </Button>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Title</TableHead>
                  <TableHead>Location</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Reported</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {localProblems.map((problem) => (
                  <TableRow key={problem.id}>
                    <TableCell className="font-medium">
                      {problem.title}
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1 text-sm text-muted-foreground">
                        <MapPin className="h-3 w-3" />
                        {problem.location}
                      </div>
                    </TableCell>
                    <TableCell>
                      <StatusBadge status={problem.status} />
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1 text-sm text-muted-foreground">
                        <Clock className="h-3 w-3" />
                        {formatDistanceToNow(problem.timestamp, {
                          addSuffix: true,
                        })}
                      </div>
                    </TableCell>
                    <TableCell>
                      <Select
                        value={problem.status}
                        onValueChange={(value) =>
                          handleStatusChange(problem.id, value)
                        }
                      >
                        <SelectTrigger
                          className="w-36"
                          data-testid={`select-status-${problem.id}`}
                        >
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="pending">Pending</SelectItem>
                          <SelectItem value="in-progress">
                            In Progress
                          </SelectItem>
                          <SelectItem value="resolved">Resolved</SelectItem>
                        </SelectContent>
                      </Select>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
