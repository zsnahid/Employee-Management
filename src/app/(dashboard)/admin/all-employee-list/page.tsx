"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Search,
  Filter,
  Download,
  Plus,
  MoreVertical,
  Mail,
  Phone,
  MapPin,
  Calendar,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export default function AllEmployeeList() {
  const [searchTerm, setSearchTerm] = useState("");

  // Mock data - replace with actual data fetching
  const employees = [
    {
      id: 1,
      name: "John Smith",
      email: "john.smith@company.com",
      phone: "+1 (555) 123-4567",
      position: "Software Engineer",
      department: "Engineering",
      salary: 95000,
      joinDate: "2023-03-15",
      status: "active",
      location: "New York, NY",
      avatar: "/avatars/john.jpg",
    },
    {
      id: 2,
      name: "Sarah Johnson",
      email: "sarah.johnson@company.com",
      phone: "+1 (555) 234-5678",
      position: "Product Manager",
      department: "Product",
      salary: 105000,
      joinDate: "2022-08-22",
      status: "active",
      location: "San Francisco, CA",
      avatar: "/avatars/sarah.jpg",
    },
    {
      id: 3,
      name: "Mike Davis",
      email: "mike.davis@company.com",
      phone: "+1 (555) 345-6789",
      position: "Designer",
      department: "Design",
      salary: 85000,
      joinDate: "2023-01-10",
      status: "active",
      location: "Los Angeles, CA",
      avatar: "/avatars/mike.jpg",
    },
    {
      id: 4,
      name: "Emily Chen",
      email: "emily.chen@company.com",
      phone: "+1 (555) 456-7890",
      position: "Marketing Manager",
      department: "Marketing",
      salary: 90000,
      joinDate: "2023-05-03",
      status: "on-leave",
      location: "Chicago, IL",
      avatar: "/avatars/emily.jpg",
    },
    {
      id: 5,
      name: "David Wilson",
      email: "david.wilson@company.com",
      phone: "+1 (555) 567-8901",
      position: "Sales Representative",
      department: "Sales",
      salary: 75000,
      joinDate: "2023-07-18",
      status: "active",
      location: "Miami, FL",
      avatar: "/avatars/david.jpg",
    },
  ];

  const filteredEmployees = employees.filter(
    (employee) =>
      employee.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      employee.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      employee.department.toLowerCase().includes(searchTerm.toLowerCase()) ||
      employee.position.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "active":
        return (
          <Badge variant="default" className="bg-green-100 text-green-800">
            Active
          </Badge>
        );
      case "on-leave":
        return (
          <Badge variant="secondary" className="bg-yellow-100 text-yellow-800">
            On Leave
          </Badge>
        );
      case "inactive":
        return <Badge variant="destructive">Inactive</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-foreground text-3xl font-bold">All Employees</h1>
          <p className="text-muted-foreground">
            Manage and view all company employees
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm">
            <Download className="mr-2 h-4 w-4" />
            Export
          </Button>
          <Button size="sm">
            <Plus className="mr-2 h-4 w-4" />
            Add Employee
          </Button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-4">
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold">{employees.length}</div>
            <p className="text-muted-foreground text-sm">Total Employees</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold">
              {employees.filter((e) => e.status === "active").length}
            </div>
            <p className="text-muted-foreground text-sm">Active</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold">
              {employees.filter((e) => e.status === "on-leave").length}
            </div>
            <p className="text-muted-foreground text-sm">On Leave</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold">
              {new Set(employees.map((e) => e.department)).size}
            </div>
            <p className="text-muted-foreground text-sm">Departments</p>
          </CardContent>
        </Card>
      </div>

      {/* Search and Filters */}
      <Card>
        <CardContent className="p-6">
          <div className="flex items-center gap-4">
            <div className="relative flex-1">
              <Search className="text-muted-foreground absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 transform" />
              <Input
                placeholder="Search employees..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Button variant="outline" size="sm">
              <Filter className="mr-2 h-4 w-4" />
              Filter
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Employee List */}
      <Card>
        <CardHeader>
          <CardTitle>Employee Directory</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {filteredEmployees.map((employee) => (
              <div
                key={employee.id}
                className="hover:bg-muted/50 flex items-center justify-between rounded-lg border p-4 transition-colors"
              >
                <div className="flex items-center gap-4">
                  <Avatar className="h-12 w-12">
                    <AvatarImage src={employee.avatar} alt={employee.name} />
                    <AvatarFallback>
                      {employee.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <h3 className="font-semibold">{employee.name}</h3>
                      {getStatusBadge(employee.status)}
                    </div>
                    <p className="text-muted-foreground text-sm">
                      {employee.position} • {employee.department}
                    </p>
                    <div className="text-muted-foreground flex items-center gap-4 text-xs">
                      <div className="flex items-center gap-1">
                        <Mail className="h-3 w-3" />
                        {employee.email}
                      </div>
                      <div className="flex items-center gap-1">
                        <Phone className="h-3 w-3" />
                        {employee.phone}
                      </div>
                      <div className="flex items-center gap-1">
                        <MapPin className="h-3 w-3" />
                        {employee.location}
                      </div>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="text-right">
                    <p className="font-semibold">
                      ${employee.salary.toLocaleString()}
                    </p>
                    <p className="text-muted-foreground flex items-center gap-1 text-sm">
                      <Calendar className="h-3 w-3" />
                      Joined {new Date(employee.joinDate).toLocaleDateString()}
                    </p>
                  </div>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="sm">
                        <MoreVertical className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuLabel>Actions</DropdownMenuLabel>
                      <DropdownMenuItem>View Profile</DropdownMenuItem>
                      <DropdownMenuItem>Edit Details</DropdownMenuItem>
                      <DropdownMenuItem>View Performance</DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem className="text-destructive">
                        Deactivate Employee
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
