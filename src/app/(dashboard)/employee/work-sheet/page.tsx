"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Clock, Calendar, Plus, Edit, Target } from "lucide-react";
import TimeTracker from "@/components/work-sheet/TimeTracker";

export default function WorkSheet() {
  // Mock data - replace with actual data fetching
  const weeklyStats = {
    totalHours: 38.5,
    targetHours: 40,
    overtime: 0,
    breaks: 5.5,
    productivity: 92,
  };

  const dailyEntries = [
    {
      date: "2024-12-16",
      clockIn: "09:00",
      clockOut: "17:30",
      breakTime: "1h",
      totalHours: 7.5,
      tasks: ["Code Review", "Sprint Planning", "Bug Fixes"],
      status: "completed",
    },
    {
      date: "2024-12-15",
      clockIn: "09:15",
      clockOut: "17:45",
      breakTime: "1h",
      totalHours: 7.5,
      tasks: ["Feature Development", "Team Meeting", "Documentation"],
      status: "completed",
    },
    {
      date: "2024-12-14",
      clockIn: "09:00",
      clockOut: "18:00",
      breakTime: "1h",
      totalHours: 8,
      tasks: ["Client Call", "Project Planning", "Code Implementation"],
      status: "completed",
    },
    {
      date: "2024-12-13",
      clockIn: "08:45",
      clockOut: "17:30",
      breakTime: "45min",
      totalHours: 8,
      tasks: ["Database Migration", "Testing", "Deployment"],
      status: "completed",
    },
    {
      date: "2024-12-12",
      clockIn: "09:00",
      clockOut: "17:15",
      breakTime: "1h",
      totalHours: 7.25,
      tasks: ["Research", "Prototyping", "Team Standup"],
      status: "completed",
    },
  ];

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
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-foreground text-3xl font-bold">Work Sheet</h1>
          <p className="text-muted-foreground">
            Track your time and manage daily tasks
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm">
            <Calendar className="mr-2 h-4 w-4" />
            This Week
          </Button>
          <Button size="sm">
            <Plus className="mr-2 h-4 w-4" />
            Add Entry
          </Button>
        </div>
      </div>

      {/* Time Tracker */}
      <TimeTracker />

      {/* Weekly Stats */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-5">
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold">{weeklyStats.targetHours}h</div>
            <p className="text-muted-foreground text-sm">Target Hours</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold">{weeklyStats.overtime}h</div>
            <p className="text-muted-foreground text-sm">Overtime</p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold">
              {weeklyStats.productivity}%
            </div>
            <p className="text-muted-foreground text-sm">Productivity</p>
          </CardContent>
        </Card>
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        {/* Daily Entries */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Clock className="h-5 w-5" />
              Daily Time Entries
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {dailyEntries.map((entry) => (
                <div key={entry.date} className="rounded-lg border p-4">
                  <div className="mb-3 flex items-center justify-between">
                    <div>
                      <p className="font-medium">
                        {new Date(entry.date).toLocaleDateString("en-US", {
                          weekday: "long",
                          month: "short",
                          day: "numeric",
                        })}
                      </p>
                      <p className="text-muted-foreground text-sm">
                        {entry.clockIn} - {entry.clockOut}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="font-bold">{entry.totalHours}h</p>
                      <p className="text-muted-foreground text-sm">
                        Break: {entry.breakTime}
                      </p>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <p className="text-sm font-medium">Tasks:</p>
                    <div className="flex flex-wrap gap-2">
                      {entry.tasks.map((task, index) => (
                        <Badge
                          key={index}
                          variant="secondary"
                          className="text-xs"
                        >
                          {task}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Today's Tasks */}
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
      </div>
    </div>
  );
}
