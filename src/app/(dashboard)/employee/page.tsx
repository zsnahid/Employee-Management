"use client";

import { useUser } from "@clerk/nextjs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Clock,
  Calendar,
  DollarSign,
  FileText,
  CheckCircle,
  TrendingUp,
  MessageSquare,
  Target,
  MousePointerClickIcon,
  CircleDollarSignIcon,
} from "lucide-react";

export default function EmployeeDashboard() {
  const { user } = useUser();

  // Mock data - replace with actual data fetching
  const employeeStats = {
    hoursWorked: 168,
    daysPresent: 21,
    currentSalary: 75000,
    leaveBalance: 12,
    tasksCompleted: 24,
    performance: 87,
  };

  const recentTasks = [
    {
      id: 1,
      title: "Complete quarterly report",
      status: "completed",
      priority: "high",
      dueDate: "Dec 15",
    },
    {
      id: 2,
      title: "Team meeting preparation",
      status: "in-progress",
      priority: "medium",
      dueDate: "Dec 18",
    },
    {
      id: 3,
      title: "Code review for Project X",
      status: "pending",
      priority: "high",
      dueDate: "Dec 20",
    },
    {
      id: 4,
      title: "Update documentation",
      status: "completed",
      priority: "low",
      dueDate: "Dec 12",
    },
  ];

  const upcomingEvents = [
    { id: 1, title: "Sprint Planning", date: "Dec 18", time: "10:00 AM" },
    { id: 2, title: "1:1 with Manager", date: "Dec 19", time: "2:00 PM" },
    { id: 3, title: "Team Lunch", date: "Dec 20", time: "12:30 PM" },
    { id: 4, title: "Project Demo", date: "Dec 22", time: "3:00 PM" },
  ];

  const recentPayments = [
    {
      id: 1,
      month: "November 2024",
      amount: 6250,
      date: "Nov 30",
      status: "paid",
    },
    {
      id: 2,
      month: "October 2024",
      amount: 6250,
      date: "Oct 31",
      status: "paid",
    },
    {
      id: 3,
      month: "September 2024",
      amount: 6250,
      date: "Sep 30",
      status: "paid",
    },
  ];

  return (
    <div className="space-y-4 sm:space-y-6">
      {/* Header */}

      <div>
        <h1>
          Welcome back, {user?.firstName}!
        </h1>
        <p className="text-muted-foreground text-sm sm:text-base">
          Here&apos;s what&apos;s happening with your work today
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Hours This Month
            </CardTitle>
            <Clock className="text-muted-foreground h-4 w-4" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {employeeStats.hoursWorked}h
            </div>
            <p className="text-muted-foreground text-xs">
              {employeeStats.daysPresent} days present
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Monthly Salary
            </CardTitle>
            <DollarSign className="text-muted-foreground h-4 w-4" />
          </CardHeader>
          <CardContent>
            <div className="text-lg font-bold sm:text-2xl">
              ${(employeeStats.currentSalary / 12).toLocaleString()}
            </div>
            <p className="text-muted-foreground text-xs">
              Annual: ${employeeStats.currentSalary.toLocaleString()}
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Leave Balance</CardTitle>
            <Calendar className="text-muted-foreground h-4 w-4" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {employeeStats.leaveBalance}
            </div>
            <p className="text-muted-foreground text-xs">Days available</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Performance</CardTitle>
            <TrendingUp className="text-muted-foreground h-4 w-4" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {employeeStats.performance}%
            </div>
            <p className="text-muted-foreground text-xs">
              <span className="text-green-600">+5%</span> from last month
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 gap-4 sm:gap-6 xl:grid-cols-3">
        {/* Recent Tasks */}
        <Card className="xl:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-base sm:text-lg">
              <Target className="h-4 w-4 sm:h-5 sm:w-5" />
              Recent Tasks
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3 sm:space-y-4">
              {recentTasks.map((task) => (
                <div
                  key={task.id}
                  className="flex flex-col gap-3 rounded-lg border p-3 sm:flex-row sm:items-center sm:justify-between"
                >
                  <div className="flex items-center gap-3">
                    <div
                      className={`h-2 w-2 flex-shrink-0 rounded-full ${
                        task.status === "completed"
                          ? "bg-green-500"
                          : task.status === "in-progress"
                            ? "bg-blue-500"
                            : "bg-yellow-500"
                      }`}
                    ></div>
                    <div className="min-w-0 flex-1">
                      <p className="truncate text-sm font-medium sm:text-base">
                        {task.title}
                      </p>
                      <p className="text-muted-foreground text-xs sm:text-sm">
                        Due: {task.dueDate}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 sm:flex-shrink-0">
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
                    <Badge
                      variant={
                        task.status === "completed"
                          ? "default"
                          : task.status === "in-progress"
                            ? "secondary"
                            : "outline"
                      }
                      className="text-xs"
                    >
                      {task.status}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Upcoming Events */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-base sm:text-lg">
              <Calendar className="h-4 w-4 sm:h-5 sm:w-5" />
              Upcoming Events
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3 sm:space-y-4">
              {upcomingEvents.map((event) => (
                <div key={event.id} className="flex gap-3">
                  <div className="bg-primary mt-2 h-2 w-2 flex-shrink-0 rounded-full"></div>
                  <div className="min-w-0 flex-1 space-y-1">
                    <p className="truncate text-sm font-medium">
                      {event.title}
                    </p>
                    <p className="text-muted-foreground text-xs">
                      {event.date}
                    </p>
                    <p className="text-muted-foreground text-xs">
                      {event.time}
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
        {/* Recent Payments */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-base sm:text-lg">
              <CircleDollarSignIcon className="h-4 w-4 sm:h-5 sm:w-5" />
              Recent Payments
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3 sm:space-y-4">
              {recentPayments.map((payment) => (
                <div
                  key={payment.id}
                  className="bg-muted/50 flex flex-col gap-2 rounded-lg p-3 sm:flex-row sm:items-center sm:justify-between"
                >
                  <div>
                    <p className="text-sm font-medium sm:text-base">
                      {payment.month}
                    </p>
                    <p className="text-muted-foreground text-xs sm:text-sm">
                      {payment.date}
                    </p>
                  </div>
                  <div className="flex items-center justify-between sm:block sm:text-right">
                    <p className="text-sm font-bold sm:text-base">
                      ${payment.amount}
                    </p>
                    <Badge variant="default" className="text-xs">
                      <CheckCircle className="mr-1 h-3 w-3" />
                      {payment.status}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-base sm:text-lg">
              <MousePointerClickIcon className="h-4 w-4 sm:h-5 sm:w-5" />
              Quick Actions
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-3 sm:gap-4">
              <Button
                variant="outline"
                className="h-16 flex-col gap-1 sm:h-20 sm:gap-2"
              >
                <Calendar className="h-4 w-4 sm:h-6 sm:w-6" />
                <span className="text-xs sm:text-sm">Request Leave</span>
              </Button>
              <Button
                variant="outline"
                className="h-16 flex-col gap-1 sm:h-20 sm:gap-2"
              >
                <Clock className="h-4 w-4 sm:h-6 sm:w-6" />
                <span className="text-xs sm:text-sm">Log Hours</span>
              </Button>
              <Button
                variant="outline"
                className="h-16 flex-col gap-1 sm:h-20 sm:gap-2"
              >
                <FileText className="h-4 w-4 sm:h-6 sm:w-6" />
                <span className="text-xs sm:text-sm">View Payslips</span>
              </Button>
              <Button
                variant="outline"
                className="h-16 flex-col gap-1 sm:h-20 sm:gap-2"
              >
                <MessageSquare className="h-4 w-4 sm:h-6 sm:w-6" />
                <span className="text-xs sm:text-sm">Contact HR</span>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
