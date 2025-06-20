import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Plus, Edit, Target } from "lucide-react";

export default function Tickets() {
  const todayTasks = [
    {
      id: 1,
      title: "Complete quarterly report",
      priority: "high",
      estimated: "2h",
      status: "in-progress",
    },
    {
      id: 2,
      title: "Code review for PR #234",
      priority: "medium",
      estimated: "1h",
      status: "pending",
    },
    {
      id: 3,
      title: "Team meeting preparation",
      priority: "low",
      estimated: "30min",
      status: "completed",
    },
    {
      id: 4,
      title: "Update project documentation",
      priority: "medium",
      estimated: "1.5h",
      status: "pending",
    },
  ];

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "completed":
        return (
          <Badge variant="default" className="bg-green-100 text-green-800">
            Completed
          </Badge>
        );
      case "in-progress":
        return (
          <Badge variant="secondary" className="bg-blue-100 text-blue-800">
            In Progress
          </Badge>
        );
      case "pending":
        return (
          <Badge variant="outline" className="bg-yellow-100 text-yellow-800">
            Pending
          </Badge>
        );
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  const getPriorityBadge = (priority: string) => {
    switch (priority) {
      case "high":
        return <Badge variant="destructive">High</Badge>;
      case "medium":
        return <Badge variant="default">Medium</Badge>;
      case "low":
        return <Badge variant="secondary">Low</Badge>;
      default:
        return <Badge variant="outline">{priority}</Badge>;
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Target className="h-5 w-5" />
          Today's Tasks
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {todayTasks.map((task) => (
            <div key={task.id} className="rounded-lg border p-3">
              <div className="space-y-2">
                <div className="flex items-start justify-between">
                  <p className="text-sm font-medium">{task.title}</p>
                  <Button variant="ghost" size="sm">
                    <Edit className="h-3 w-3" />
                  </Button>
                </div>
                <div className="flex items-center gap-2">
                  {getPriorityBadge(task.priority)}
                  {getStatusBadge(task.status)}
                </div>
                <p className="text-muted-foreground text-xs">
                  Estimated: {task.estimated}
                </p>
              </div>
            </div>
          ))}
          <Button variant="outline" className="w-full" size="sm">
            <Plus className="mr-2 h-4 w-4" />
            Add Task
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
