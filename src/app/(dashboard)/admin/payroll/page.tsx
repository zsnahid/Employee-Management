"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DollarSign,
  Calendar,
  Download,
  Play,
  Clock,
  CheckCircle,
  TrendingUp,
  Users,
  Calculator,
} from "lucide-react";

export default function Payroll() {
  // const [selectedPeriod, setSelectedPeriod] = useState("December 2024");

  // Mock data - replace with actual data fetching
  const payrollStats = {
    totalPayroll: 543250,
    employees: 127,
    averageSalary: 4278,
    pendingApprovals: 3,
    processed: 124,
    totalTax: 108650,
    totalBenefits: 65190,
  };

  const payrollHistory = [
    {
      id: 1,
      period: "December 2024",
      amount: 543250,
      employees: 127,
      processedDate: "2024-12-01",
      status: "processing",
    },
    {
      id: 2,
      period: "November 2024",
      amount: 538900,
      employees: 125,
      processedDate: "2024-11-01",
      status: "completed",
    },
    {
      id: 3,
      period: "October 2024",
      amount: 535600,
      employees: 123,
      processedDate: "2024-10-01",
      status: "completed",
    },
    {
      id: 4,
      period: "September 2024",
      amount: 532100,
      employees: 121,
      processedDate: "2024-09-01",
      status: "completed",
    },
  ];

  const pendingEmployees = [
    {
      id: 1,
      name: "Alice Johnson",
      position: "Software Engineer",
      grossPay: 8500,
      deductions: 1700,
      netPay: 6800,
      avatar: "/avatars/alice.jpg",
      status: "pending",
    },
    {
      id: 2,
      name: "Bob Smith",
      position: "Product Manager",
      grossPay: 9200,
      deductions: 1840,
      netPay: 7360,
      avatar: "/avatars/bob.jpg",
      status: "pending",
    },
    {
      id: 3,
      name: "Carol Davis",
      position: "Designer",
      grossPay: 7500,
      deductions: 1500,
      netPay: 6000,
      avatar: "/avatars/carol.jpg",
      status: "review",
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
      case "processing":
        return (
          <Badge variant="secondary" className="bg-blue-100 text-blue-800">
            Processing
          </Badge>
        );
      case "pending":
        return (
          <Badge
            variant="destructive"
            className="bg-yellow-100 text-yellow-800"
          >
            Pending
          </Badge>
        );
      case "review":
        return (
          <Badge variant="outline" className="bg-orange-100 text-orange-800">
            Review
          </Badge>
        );
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-foreground text-3xl font-bold">
            Payroll Management
          </h1>
          <p className="text-muted-foreground">
            Process and manage employee payroll
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm">
            <Download className="mr-2 h-4 w-4" />
            Export Report
          </Button>
          <Button size="sm">
            <Play className="mr-2 h-4 w-4" />
            Run Payroll
          </Button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Payroll</CardTitle>
            <DollarSign className="text-muted-foreground h-4 w-4" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              ${payrollStats.totalPayroll.toLocaleString()}
            </div>
            <p className="text-muted-foreground text-xs">This month</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Employees</CardTitle>
            <Users className="text-muted-foreground h-4 w-4" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{payrollStats.employees}</div>
            <p className="text-muted-foreground text-xs">
              {payrollStats.processed} processed
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Average Salary
            </CardTitle>
            <Calculator className="text-muted-foreground h-4 w-4" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              ${payrollStats.averageSalary.toLocaleString()}
            </div>
            <p className="text-muted-foreground text-xs">Per employee</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pending</CardTitle>
            <Clock className="text-muted-foreground h-4 w-4" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {payrollStats.pendingApprovals}
            </div>
            <p className="text-muted-foreground text-xs">Require approval</p>
          </CardContent>
        </Card>
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        {/* Payroll Breakdown */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <DollarSign className="h-5 w-5" />
              Current Payroll Breakdown
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              <div className="grid grid-cols-3 gap-4">
                <div className="bg-muted/50 rounded-lg p-4 text-center">
                  <div className="text-2xl font-bold text-green-600">
                    ${payrollStats.totalPayroll.toLocaleString()}
                  </div>
                  <p className="text-muted-foreground text-sm">Gross Pay</p>
                </div>
                <div className="bg-muted/50 rounded-lg p-4 text-center">
                  <div className="text-2xl font-bold text-red-600">
                    ${payrollStats.totalTax.toLocaleString()}
                  </div>
                  <p className="text-muted-foreground text-sm">
                    Tax Deductions
                  </p>
                </div>
                <div className="bg-muted/50 rounded-lg p-4 text-center">
                  <div className="text-2xl font-bold text-blue-600">
                    ${payrollStats.totalBenefits.toLocaleString()}
                  </div>
                  <p className="text-muted-foreground text-sm">Benefits</p>
                </div>
              </div>

              <div className="border-t pt-4">
                <div className="mb-4 flex items-center justify-between">
                  <h4 className="font-semibold">Pending Approvals</h4>
                  <Button size="sm" variant="outline">
                    <CheckCircle className="mr-2 h-4 w-4" />
                    Approve All
                  </Button>
                </div>
                <div className="space-y-3">
                  {pendingEmployees.map((employee) => (
                    <div
                      key={employee.id}
                      className="flex items-center justify-between rounded-lg border p-3"
                    >
                      <div className="flex items-center gap-3">
                        <Avatar className="h-8 w-8">
                          <AvatarImage
                            src={employee.avatar}
                            alt={employee.name}
                          />
                          <AvatarFallback>
                            {employee.name
                              .split(" ")
                              .map((n) => n[0])
                              .join("")}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="text-sm font-medium">{employee.name}</p>
                          <p className="text-muted-foreground text-xs">
                            {employee.position}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="text-right text-sm">
                          <p className="font-medium">
                            ${employee.netPay.toLocaleString()}
                          </p>
                          <p className="text-muted-foreground text-xs">
                            Net Pay
                          </p>
                        </div>
                        {getStatusBadge(employee.status)}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Payroll History */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calendar className="h-5 w-5" />
              Payroll History
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {payrollHistory.map((payroll) => (
                <div key={payroll.id} className="rounded-lg border p-3">
                  <div className="mb-2 flex items-center justify-between">
                    <p className="text-sm font-medium">{payroll.period}</p>
                    {getStatusBadge(payroll.status)}
                  </div>
                  <div className="space-y-1">
                    <p className="text-lg font-bold">
                      ${payroll.amount.toLocaleString()}
                    </p>
                    <p className="text-muted-foreground text-xs">
                      {payroll.employees} employees
                    </p>
                    <p className="text-muted-foreground text-xs">
                      Processed:{" "}
                      {new Date(payroll.processedDate).toLocaleDateString()}
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
          <CardTitle>Quick Actions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
            <Button variant="outline" className="h-20 flex-col gap-2">
              <Play className="h-6 w-6" />
              Run Payroll
            </Button>
            <Button variant="outline" className="h-20 flex-col gap-2">
              <CheckCircle className="h-6 w-6" />
              Approve Pending
            </Button>
            <Button variant="outline" className="h-20 flex-col gap-2">
              <Download className="h-6 w-6" />
              Export Reports
            </Button>
            <Button variant="outline" className="h-20 flex-col gap-2">
              <TrendingUp className="h-6 w-6" />
              View Analytics
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
