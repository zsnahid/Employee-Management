"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Users,
  Calendar,
  ClipboardList,
  TrendingUp,
  UserCheck,
  AlertTriangle,
  FileText,
  CheckCircle,
  XCircle,
  Plus,
} from "lucide-react";

export default function HRDashboard() {
  // Mock data - replace with actual data fetching
  const stats = {
    totalEmployees: 87,
    activeProjects: 12,
    pendingRequests: 7,
    completedOnboarding: 5,
  };

  const pendingRequests = [
    {
      id: 1,
      employee: "Alice Johnson",
      type: "Leave Request",
      date: "Dec 20-22",
      status: "pending",
      avatar: "/avatars/alice.jpg",
    },
    {
      id: 2,
      employee: "Bob Smith",
      type: "Overtime Request",
      date: "Dec 15",
      status: "pending",
      avatar: "/avatars/bob.jpg",
    },
    {
      id: 3,
      employee: "Carol Davis",
      type: "Transfer Request",
      date: "Jan 2025",
      status: "review",
      avatar: "/avatars/carol.jpg",
    },
  ];

  const recentOnboarding = [
    {
      id: 1,
      name: "David Wilson",
      position: "Software Engineer",
      progress: 85,
      avatar: "/avatars/david.jpg",
    },
    {
      id: 2,
      name: "Emma Brown",
      position: "Product Manager",
      progress: 92,
      avatar: "/avatars/emma.jpg",
    },
    {
      id: 3,
      name: "Frank Miller",
      position: "UI Designer",
      progress: 67,
      avatar: "/avatars/frank.jpg",
    },
  ];

  const upcomingEvents = [
    { id: 1, title: "Team Building Event", date: "Dec 18", type: "event" },
    { id: 2, title: "Performance Reviews", date: "Dec 20", type: "deadline" },
    { id: 3, title: "New Hire Orientation", date: "Dec 22", type: "meeting" },
    { id: 4, title: "Holiday Party", date: "Dec 24", type: "event" },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-foreground text-3xl font-bold">HR Dashboard</h1>
          <p className="text-muted-foreground">
            Manage your team and employee requests
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm">
            <FileText className="mr-2 h-4 w-4" />
            Generate Report
          </Button>
          <Button size="sm">
            <Plus className="mr-2 h-4 w-4" />
            New Request
          </Button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Total Employees
            </CardTitle>
            <Users className="text-muted-foreground h-4 w-4" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalEmployees}</div>
            <p className="text-muted-foreground text-xs">
              Under your management
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Pending Requests
            </CardTitle>
            <AlertTriangle className="text-muted-foreground h-4 w-4" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.pendingRequests}</div>
            <p className="text-muted-foreground text-xs">
              Require your approval
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Active Projects
            </CardTitle>
            <ClipboardList className="text-muted-foreground h-4 w-4" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.activeProjects}</div>
            <p className="text-muted-foreground text-xs">In progress</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Onboarding</CardTitle>
            <UserCheck className="text-muted-foreground h-4 w-4" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {stats.completedOnboarding}
            </div>
            <p className="text-muted-foreground text-xs">
              Completed this month
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        {/* Pending Requests */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <AlertTriangle className="h-5 w-5" />
              Pending Requests
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {pendingRequests.map((request) => (
                <div
                  key={request.id}
                  className="flex items-center justify-between rounded-lg border p-4"
                >
                  <div className="flex items-center gap-3">
                    <Avatar className="h-10 w-10">
                      <AvatarImage
                        src={request.avatar}
                        alt={request.employee}
                      />
                      <AvatarFallback>
                        {request.employee
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-medium">{request.employee}</p>
                      <p className="text-muted-foreground text-sm">
                        {request.type}
                      </p>
                      <p className="text-muted-foreground text-xs">
                        {request.date}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge
                      variant={
                        request.status === "pending"
                          ? "destructive"
                          : "secondary"
                      }
                    >
                      {request.status}
                    </Badge>
                    <Button size="sm" variant="outline">
                      <CheckCircle className="mr-1 h-4 w-4" />
                      Approve
                    </Button>
                    <Button size="sm" variant="outline">
                      <XCircle className="mr-1 h-4 w-4" />
                      Deny
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Upcoming Events */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calendar className="h-5 w-5" />
              Upcoming Events
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {upcomingEvents.map((event) => (
                <div key={event.id} className="flex gap-3">
                  <div
                    className={`mt-2 h-2 w-2 rounded-full ${
                      event.type === "event"
                        ? "bg-blue-500"
                        : event.type === "deadline"
                          ? "bg-red-500"
                          : "bg-green-500"
                    }`}
                  ></div>
                  <div className="flex-1 space-y-1">
                    <p className="text-sm font-medium">{event.title}</p>
                    <p className="text-muted-foreground text-xs">
                      {event.date}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Onboarding Progress */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="h-5 w-5" />
            Onboarding Progress
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            {recentOnboarding.map((person) => (
              <div key={person.id} className="rounded-lg border p-4">
                <div className="mb-3 flex items-center gap-3">
                  <Avatar className="h-10 w-10">
                    <AvatarImage src={person.avatar} alt={person.name} />
                    <AvatarFallback>
                      {person.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-medium">{person.name}</p>
                    <p className="text-muted-foreground text-sm">
                      {person.position}
                    </p>
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Progress</span>
                    <span>{person.progress}%</span>
                  </div>
                  <div className="bg-muted h-2 w-full rounded-full">
                    <div
                      className="bg-primary h-2 rounded-full transition-all duration-300"
                      style={{ width: `${person.progress}%` }}
                    ></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
