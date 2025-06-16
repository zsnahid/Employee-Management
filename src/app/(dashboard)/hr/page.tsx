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
    {
      id: 4,
      employee: "David Wilson",
      type: "Training Request",
      date: "Dec 18",
      status: "pending",
      avatar: "/avatars/david.jpg",
    },
  ];

  const recentHires = [
    {
      id: 1,
      name: "Emma Thompson",
      position: "Software Engineer",
      department: "Engineering",
      startDate: "Dec 10",
      avatar: "/avatars/emma.jpg",
    },
    {
      id: 2,
      name: "James Rodriguez",
      position: "Product Manager",
      department: "Product",
      startDate: "Dec 8",
      avatar: "/avatars/james.jpg",
    },
    {
      id: 3,
      name: "Sarah Kim",
      position: "UX Designer",
      department: "Design",
      startDate: "Dec 5",
      avatar: "/avatars/sarah.jpg",
    },
  ];

  const upcomingTasks = [
    { id: 1, task: "Performance Reviews Due", date: "Dec 20", priority: "high" },
    { id: 2, task: "New Hire Orientation", date: "Dec 18", priority: "medium" },
    { id: 3, task: "Benefits Enrollment", date: "Dec 25", priority: "low" },
    { id: 4, task: "Team Building Event", date: "Dec 22", priority: "medium" },
  ];

  const departmentStats = [
    { name: "Engineering", count: 25, growth: "+3" },
    { name: "Sales", count: 18, growth: "+2" },
    { name: "Marketing", count: 12, growth: "+1" },
    { name: "Design", count: 8, growth: "+1" },
    { name: "HR", count: 6, growth: "0" },
    { name: "Finance", count: 10, growth: "+1" },
  ];

  return (
    <div className="space-y-4 sm:space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-foreground text-2xl sm:text-3xl font-bold">
            HR Dashboard
          </h1>
          <p className="text-muted-foreground text-sm sm:text-base">
            Manage your workforce and streamline HR processes
          </p>
        </div>
        <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
          <Button variant="outline" size="sm" className="w-full sm:w-auto">
            <FileText className="mr-2 h-4 w-4" />
            Generate Report
          </Button>
          <Button size="sm" className="w-full sm:w-auto">
            <Plus className="mr-2 h-4 w-4" />
            Add Employee
          </Button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
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
              <span className="text-green-600">+{stats.completedOnboarding}</span> this month
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
            <p className="text-muted-foreground text-xs">Across all departments</p>
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
            <p className="text-muted-foreground text-xs">Require attention</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Onboarding Progress
            </CardTitle>
            <UserCheck className="text-muted-foreground h-4 w-4" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.completedOnboarding}/6</div>
            <p className="text-muted-foreground text-xs">
              <span className="text-green-600">83%</span> completion rate
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 gap-4 sm:gap-6 xl:grid-cols-3">
        {/* Pending Requests */}
        <Card className="xl:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-base sm:text-lg">
              <ClipboardList className="h-4 w-4 sm:h-5 sm:w-5" />
              Pending Requests
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3 sm:space-y-4">
              {pendingRequests.map((request) => (
                <div
                  key={request.id}
                  className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between rounded-lg border p-3"
                >
                  <div className="flex items-center gap-3">
                    <Avatar className="h-8 w-8 sm:h-10 sm:w-10">
                      <AvatarImage src={request.avatar} alt={request.employee} />
                      <AvatarFallback className="text-xs">
                        {request.employee.split(" ").map(n => n[0]).join("")}
                      </AvatarFallback>
                    </Avatar>
                    <div className="min-w-0 flex-1">
                      <p className="font-medium text-sm sm:text-base truncate">
                        {request.employee}
                      </p>
                      <p className="text-muted-foreground text-xs sm:text-sm">
                        {request.type}
                      </p>
                      <p className="text-muted-foreground text-xs">
                        {request.date}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge
                      variant={request.status === "pending" ? "secondary" : "default"}
                      className="text-xs"
                    >
                      {request.status}
                    </Badge>
                    <div className="flex gap-1">
                      <Button size="sm" variant="ghost" className="h-8 w-8 p-0">
                        <CheckCircle className="h-4 w-4 text-green-600" />
                      </Button>
                      <Button size="sm" variant="ghost" className="h-8 w-8 p-0">
                        <XCircle className="h-4 w-4 text-red-600" />
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Recent Hires */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-base sm:text-lg">
              <UserCheck className="h-4 w-4 sm:h-5 sm:w-5" />
              Recent Hires
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3 sm:space-y-4">
              {recentHires.map((hire) => (
                <div key={hire.id} className="flex items-center gap-3">
                  <Avatar className="h-8 w-8 sm:h-10 sm:w-10">
                    <AvatarImage src={hire.avatar} alt={hire.name} />
                    <AvatarFallback className="text-xs">
                      {hire.name.split(" ").map(n => n[0]).join("")}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1 space-y-1 min-w-0">
                    <p className="text-sm font-medium truncate">{hire.name}</p>
                    <p className="text-muted-foreground text-xs truncate">
                      {hire.position}
                    </p>
                    <p className="text-muted-foreground text-xs">
                      Started: {hire.startDate}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Bottom Section */}
      <div className="grid grid-cols-1 gap-4 sm:gap-6 lg:grid-cols-2">
        {/* Department Overview */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-base sm:text-lg">
              <TrendingUp className="h-4 w-4 sm:h-5 sm:w-5" />
              Department Overview
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3 sm:space-y-4">
              {departmentStats.map((dept) => (
                <div
                  key={dept.name}
                  className="bg-muted/50 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between rounded-lg p-3"
                >
                  <div className="flex items-center gap-3">
                    <div className="bg-primary h-2 w-2 rounded-full"></div>
                    <span className="font-medium text-sm sm:text-base">{dept.name}</span>
                  </div>
                  <div className="flex items-center gap-3 sm:ml-auto">
                    <Badge variant="secondary" className="text-xs">
                      {dept.count} employees
                    </Badge>
                    <span className="text-sm font-medium text-green-600">
                      {dept.growth !== "0" ? dept.growth : "No change"}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Upcoming Tasks */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-base sm:text-lg">
              <Calendar className="h-4 w-4 sm:h-5 sm:w-5" />
              Upcoming Tasks
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3 sm:space-y-4">
              {upcomingTasks.map((task) => (
                <div key={task.id} className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div
                      className={`h-2 w-2 rounded-full ${
                        task.priority === "high"
                          ? "bg-red-500"
                          : task.priority === "medium"
                            ? "bg-yellow-500"
                            : "bg-green-500"
                      }`}
                    ></div>
                    <div className="min-w-0 flex-1">
                      <p className="font-medium text-sm sm:text-base truncate">{task.task}</p>
                      <p className="text-muted-foreground text-xs sm:text-sm">
                        {task.date}
                      </p>
                    </div>
                  </div>
                  <Badge
                    variant={
                      task.priority === "high"
                        ? "destructive"
                        : task.priority === "medium"
                          ? "default"
                          : "secondary"
                    }
                    className="text-xs"
                  >
                    {task.priority}
                  </Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base sm:text-lg">Quick Actions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-4 sm:gap-4">
            <Button variant="outline" className="h-16 sm:h-20 flex-col gap-1 sm:gap-2">
              <Plus className="h-4 w-4 sm:h-6 sm:w-6" />
              <span className="text-xs sm:text-sm">Add Employee</span>
            </Button>
            <Button variant="outline" className="h-16 sm:h-20 flex-col gap-1 sm:gap-2">
              <Calendar className="h-4 w-4 sm:h-6 sm:w-6" />
              <span className="text-xs sm:text-sm">Schedule Interview</span>
            </Button>
            <Button variant="outline" className="h-16 sm:h-20 flex-col gap-1 sm:gap-2">
              <FileText className="h-4 w-4 sm:h-6 sm:w-6" />
              <span className="text-xs sm:text-sm">Generate Report</span>
            </Button>
            <Button variant="outline" className="h-16 sm:h-20 flex-col gap-1 sm:gap-2">
              <Users className="h-4 w-4 sm:h-6 sm:w-6" />
              <span className="text-xs sm:text-sm">Manage Teams</span>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
