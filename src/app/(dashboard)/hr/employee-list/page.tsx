"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableHead,
  TableHeader,
  TableRow,
  TableBody,
  TableCell,
} from "@/components/ui/table";
import { Skeleton } from "@/components/ui/skeleton";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  AlertTriangleIcon,
  PlusIcon,
  RefreshCwIcon,
  ExternalLinkIcon,
  CheckCircleIcon,
  XCircleIcon,
} from "lucide-react";
import { useGetEmployeesQuery } from "@/store/employeeListApi";

export default function EmployeeList() {
  const {
    data: employees = [],
    error,
    isLoading,
    isError,
    refetch,
  } = useGetEmployeesQuery();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Employee List</h1>
        <p className="text-muted-foreground">
          Manage and view all employees in your organization
        </p>
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>All Employees</CardTitle>
              <CardDescription>
                A comprehensive list of all employees with their details
              </CardDescription>
            </div>
            <div className="flex space-x-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => refetch()}
                disabled={isLoading}
              >
                <RefreshCwIcon
                  className={`mr-2 h-4 w-4 ${isLoading ? "animate-spin" : ""}`}
                />
                Refresh
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          {isError && (
            <div className="flex items-center justify-center p-8">
              <div className="text-center">
                <AlertTriangleIcon className="mx-auto mb-4 h-12 w-12 text-red-500" />
                <h3 className="mb-2 text-lg font-semibold text-gray-900">
                  Error Loading Employees
                </h3>
                <p className="mb-4 text-gray-600">
                  {error && "data" in error
                    ? (error.data as any)?.error || "Failed to fetch employees"
                    : "An unexpected error occurred"}
                </p>
                <Button onClick={() => refetch()}>
                  <RefreshCwIcon className="mr-2 h-4 w-4" />
                  Try Again
                </Button>
              </div>
            </div>
          )}

          {isLoading && (
            <div className="space-y-4">
              {[...Array(5)].map((_, index) => (
                <div key={index} className="flex items-center space-x-4 p-4">
                  <Skeleton className="h-8 w-8 rounded-full" />
                  <div className="space-y-2">
                    <Skeleton className="h-4 w-32" />
                    <Skeleton className="h-3 w-24" />
                  </div>
                  <Skeleton className="ml-auto h-4 w-20" />
                </div>
              ))}
            </div>
          )}

          {!isLoading && !isError && employees.length === 0 && (
            <div className="flex items-center justify-center p-8">
              <div className="text-center">
                <h3 className="mb-2 text-lg font-semibold text-gray-900">
                  No Employees Found
                </h3>
                <p className="mb-4 text-gray-600">
                  Get started by adding your first employee to the system.
                </p>
                <Button>
                  <PlusIcon className="mr-2 h-4 w-4" />
                  Add First Employee
                </Button>
              </div>
            </div>
          )}

          {!isLoading && !isError && employees.length > 0 && (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Designation</TableHead>
                  <TableHead>Verified</TableHead>
                  <TableHead>Bank Account</TableHead>
                  <TableHead>Salary</TableHead>
                  <TableHead>Pay</TableHead>
                  <TableHead className="text-right">Details</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {employees.map((employee) => (
                  <TableRow key={employee.userId}>
                    <TableCell className="flex items-center space-x-3">
                      <Avatar>
                        <AvatarFallback>
                          {employee.userName
                            .split(" ")
                            .map((n) => n[0])
                            .join("")
                            .toUpperCase()}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <div className="font-medium">{employee.userName}</div>
                        <div className="text-muted-foreground text-sm">
                          {employee.email || "No email"}
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline">
                        {employee.designation || "Not Specified"}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Button
                        variant="ghost"
                        size="sm"
                        className={`p-2 ${
                          employee.isVerified
                            ? "text-green-600 hover:bg-green-50 hover:text-green-700"
                            : "text-orange-600 hover:bg-orange-50 hover:text-orange-700"
                        }`}
                      >
                        {employee.isVerified ? (
                          <CheckCircleIcon className="h-4 w-4" />
                        ) : (
                          <XCircleIcon className="h-4 w-4" />
                        )}
                      </Button>
                    </TableCell>
                    <TableCell className="font-mono text-sm">
                      {employee.bank_account_no || "Not Provided"}
                    </TableCell>
                    <TableCell>
                      <span className="font-medium">
                        {employee.salary
                          ? typeof employee.salary === "number"
                            ? `$${employee.salary}`
                            : employee.salary
                          : "Not Set"}
                      </span>
                    </TableCell>
                    <TableCell>
                      <Badge variant="secondary">Pending</Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <Button variant="ghost" size="sm">
                        <ExternalLinkIcon className="h-4 w-4" />
                        View
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
