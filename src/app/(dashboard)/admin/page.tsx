"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Users,
  DollarSign,
  TrendingUp,
  Clock,
  UserPlus,
  Calendar,
  AlertCircle,
  CheckCircle,
  BarChart3,
  PieChart,
} from "lucide-react";

export default function AdminDashboard() {
  // Mock data - replace with actual data fetching
  const stats = {
    totalEmployees: 127,
    activeEmployees: 119,
    onLeave: 8,
    newHires: 5,
    totalPayroll: 543250,
    monthlyGrowth: 12.5,
    pendingApprovals: 3,
  };

  const recentActivities = [
    {
      id: 1,
      action: "New employee onboarded",
      name: "John Smith",
      time: "2 hours ago",
      type: "success",
    },
    {
      id: 2,
      action: "Payroll processed",
      name: "Monthly Payroll",
      time: "1 day ago",
      type: "info",
    },
    {
      id: 3,
      action: "Leave request pending",
      name: "Sarah Johnson",
      time: "3 hours ago",
      type: "warning",
    },
    {
      id: 4,
      action: "Performance review completed",
      name: "Mike Davis",
      time: "1 day ago",
      type: "success",
    },
  ];

  const departmentStats = [
    { name: "Engineering", count: 45, growth: "+8%" },
    { name: "Sales", count: 32, growth: "+12%" },
    { name: "Marketing", count: 18, growth: "+5%" },
    { name: "HR", count: 12, growth: "+2%" },
    { name: "Finance", count: 20, growth: "+3%" },
  ];

  return (
    <div className="space-y-4 sm:space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1>
            Admin Dashboard
          </h1>
          <p className="text-muted-foreground text-sm sm:text-base">
            Overview of your organization&apos;s performance
          </p>
        </div>
        <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
          <Button variant="outline" size="sm" className="w-full sm:w-auto">
            <Calendar className="mr-2 h-4 w-4" />
            Last 30 days
          </Button>
          <Button size="sm" className="w-full sm:w-auto">
            <UserPlus className="mr-2 h-4 w-4" />
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
              <span className="text-green-600">+{stats.newHires} new</span> this
              month
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Active Employees
            </CardTitle>
            <CheckCircle className="text-muted-foreground h-4 w-4" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.activeEmployees}</div>
            <p className="text-muted-foreground text-xs">
              {stats.onLeave} on leave
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Monthly Payroll
            </CardTitle>
            <DollarSign className="text-muted-foreground h-4 w-4" />
          </CardHeader>
          <CardContent>
            <div className="text-lg sm:text-2xl font-bold">
              ${stats.totalPayroll.toLocaleString()}
            </div>
            <p className="text-muted-foreground text-xs">
              <span className="text-green-600">+{stats.monthlyGrowth}%</span>{" "}
              from last month
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Pending Approvals
            </CardTitle>
            <AlertCircle className="text-muted-foreground h-4 w-4" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.pendingApprovals}</div>
            <p className="text-muted-foreground text-xs">Requires attention</p>
          </CardContent>
        </Card>
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 gap-4 sm:gap-6 xl:grid-cols-3">
        {/* Department Overview */}
        <Card className="xl:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-base sm:text-lg">
              <BarChart3 className="h-4 w-4 sm:h-5 sm:w-5" />
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
                    <div className="bg-primary h-2 w-2 rounded-full flex-shrink-0"></div>
                    <span className="font-medium text-sm sm:text-base">{dept.name}</span>
                  </div>
                  <div className="flex items-center gap-3 sm:ml-auto">
                    <Badge variant="secondary" className="text-xs">
                      {dept.count} employees
                    </Badge>
                    <span className="text-sm font-medium text-green-600">
                      {dept.growth}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Recent Activities */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-base sm:text-lg">
              <Clock className="h-4 w-4 sm:h-5 sm:w-5" />
              Recent Activities
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3 sm:space-y-4">
              {recentActivities.map((activity) => (
                <div key={activity.id} className="flex gap-3">
                  <div
                    className={`mt-2 h-2 w-2 rounded-full flex-shrink-0 ${
                      activity.type === "success"
                        ? "bg-green-500"
                        : activity.type === "warning"
                          ? "bg-yellow-500"
                          : "bg-blue-500"
                    }`}
                  ></div>
                  <div className="flex-1 space-y-1 min-w-0">
                    <p className="text-sm font-medium truncate">{activity.action}</p>
                    <p className="text-muted-foreground text-sm truncate">
                      {activity.name}
                    </p>
                    <p className="text-muted-foreground text-xs">
                      {activity.time}
                    </p>
                  </div>
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
              <UserPlus className="h-4 w-4 sm:h-6 sm:w-6" />
              <span className="text-xs sm:text-sm">Add Employee</span>
            </Button>
            <Button variant="outline" className="h-16 sm:h-20 flex-col gap-1 sm:gap-2">
              <DollarSign className="h-4 w-4 sm:h-6 sm:w-6" />
              <span className="text-xs sm:text-sm">Process Payroll</span>
            </Button>
            <Button variant="outline" className="h-16 sm:h-20 flex-col gap-1 sm:gap-2">
              <PieChart className="h-4 w-4 sm:h-6 sm:w-6" />
              <span className="text-xs sm:text-sm">View Reports</span>
            </Button>
            <Button variant="outline" className="h-16 sm:h-20 flex-col gap-1 sm:gap-2">
              <TrendingUp className="h-4 w-4 sm:h-6 sm:w-6" />
              <span className="text-xs sm:text-sm">Analytics</span>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
