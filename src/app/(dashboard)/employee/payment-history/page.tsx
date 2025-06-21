"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  DollarSign,
  Calendar,
  Download,
  Search,
  TrendingUp,
  FileText,
  Eye,
  CheckCircle,
  Clock,
  Filter,
} from "lucide-react";

export default function PaymentHistory() {
  const [searchTerm, setSearchTerm] = useState("");
  // const [selectedYear, setSelectedYear] = useState("2024");

  // Mock data - replace with actual data fetching
  const yearlyStats = {
    totalEarnings: 90000,
    totalDeductions: 18000,
    netPay: 72000,
    avgMonthly: 7500,
    bonuses: 5000,
    taxes: 13500,
  };

  const paymentHistory = [
    {
      id: 1,
      month: "December 2024",
      period: "Dec 1 - Dec 31, 2024",
      grossPay: 7500,
      deductions: 1500,
      netPay: 6000,
      payDate: "2024-12-31",
      status: "processing",
      payslipUrl: "/payslips/dec-2024.pdf",
    },
    {
      id: 2,
      month: "November 2024",
      period: "Nov 1 - Nov 30, 2024",
      grossPay: 7500,
      deductions: 1500,
      netPay: 6000,
      payDate: "2024-11-30",
      status: "paid",
      payslipUrl: "/payslips/nov-2024.pdf",
    },
    {
      id: 3,
      month: "October 2024",
      period: "Oct 1 - Oct 31, 2024",
      grossPay: 7500,
      deductions: 1500,
      netPay: 6000,
      payDate: "2024-10-31",
      status: "paid",
      payslipUrl: "/payslips/oct-2024.pdf",
    },
    {
      id: 4,
      month: "September 2024",
      period: "Sep 1 - Sep 30, 2024",
      grossPay: 7500,
      deductions: 1500,
      netPay: 6000,
      payDate: "2024-09-30",
      status: "paid",
      payslipUrl: "/payslips/sep-2024.pdf",
    },
    {
      id: 5,
      month: "August 2024",
      period: "Aug 1 - Aug 31, 2024",
      grossPay: 8000,
      deductions: 1600,
      netPay: 6400,
      payDate: "2024-08-31",
      status: "paid",
      payslipUrl: "/payslips/aug-2024.pdf",
      bonus: 500,
    },
    {
      id: 6,
      month: "July 2024",
      period: "Jul 1 - Jul 31, 2024",
      grossPay: 7500,
      deductions: 1500,
      netPay: 6000,
      payDate: "2024-07-31",
      status: "paid",
      payslipUrl: "/payslips/jul-2024.pdf",
    },
  ];

  const deductionBreakdown = [
    { name: "Federal Tax", amount: 900, percentage: 12 },
    { name: "State Tax", amount: 300, percentage: 4 },
    { name: "Social Security", amount: 180, percentage: 2.4 },
    { name: "Medicare", amount: 60, percentage: 0.8 },
    { name: "Health Insurance", amount: 150, percentage: 2 },
    { name: "401(k)", amount: 225, percentage: 3 },
  ];

  const filteredPayments = paymentHistory.filter((payment) =>
    payment.month.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "paid":
        return (
          <Badge variant="default" className="bg-green-100 text-green-800">
            <CheckCircle className="mr-1 h-3 w-3" />
            Paid
          </Badge>
        );
      case "processing":
        return (
          <Badge variant="secondary" className="bg-blue-100 text-blue-800">
            <Clock className="mr-1 h-3 w-3" />
            Processing
          </Badge>
        );
      case "pending":
        return (
          <Badge variant="outline" className="bg-yellow-100 text-yellow-800">
            <Clock className="mr-1 h-3 w-3" />
            Pending
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
            Payment History
          </h1>
          <p className="text-muted-foreground">
            View your salary payments and deductions
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm">
            <Download className="mr-2 h-4 w-4" />
            Export All
          </Button>
          <Button variant="outline" size="sm">
            <FileText className="mr-2 h-4 w-4" />
            Tax Summary
          </Button>
        </div>
      </div>

      {/* Yearly Stats */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Total Earnings
            </CardTitle>
            <DollarSign className="text-muted-foreground h-4 w-4" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              ${yearlyStats.totalEarnings.toLocaleString()}
            </div>
            <p className="text-muted-foreground text-xs">This year (2024)</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Net Pay</CardTitle>
            <TrendingUp className="text-muted-foreground h-4 w-4" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              ${yearlyStats.netPay.toLocaleString()}
            </div>
            <p className="text-muted-foreground text-xs">After deductions</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Average Monthly
            </CardTitle>
            <Calendar className="text-muted-foreground h-4 w-4" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              ${yearlyStats.avgMonthly.toLocaleString()}
            </div>
            <p className="text-muted-foreground text-xs">Monthly average</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Total Deductions
            </CardTitle>
            <FileText className="text-muted-foreground h-4 w-4" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              ${yearlyStats.totalDeductions.toLocaleString()}
            </div>
            <p className="text-muted-foreground text-xs">Taxes & benefits</p>
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
                placeholder="Search by month..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Button variant="outline" size="sm">
              <Filter className="mr-2 h-4 w-4" />
              Filter by Year
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        {/* Payment History */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <DollarSign className="h-5 w-5" />
              Payment History
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {filteredPayments.map((payment) => (
                <div
                  key={payment.id}
                  className="hover:bg-muted/50 rounded-lg border p-4 transition-colors"
                >
                  <div className="mb-3 flex items-center justify-between">
                    <div>
                      <h3 className="font-semibold">{payment.month}</h3>
                      <p className="text-muted-foreground text-sm">
                        {payment.period}
                      </p>
                      {payment.bonus && (
                        <Badge
                          variant="default"
                          className="mt-1 bg-green-100 text-green-800"
                        >
                          +${payment.bonus} Bonus
                        </Badge>
                      )}
                    </div>
                    <div className="text-right">
                      <p className="text-lg font-bold">
                        ${payment.netPay.toLocaleString()}
                      </p>
                      <p className="text-muted-foreground text-sm">
                        Paid: {new Date(payment.payDate).toLocaleDateString()}
                      </p>
                      {getStatusBadge(payment.status)}
                    </div>
                  </div>

                  <div className="mb-3 grid grid-cols-3 gap-4 text-sm">
                    <div>
                      <p className="text-muted-foreground">Gross Pay</p>
                      <p className="font-medium">
                        ${payment.grossPay.toLocaleString()}
                      </p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">Deductions</p>
                      <p className="font-medium text-red-600">
                        -${payment.deductions.toLocaleString()}
                      </p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">Net Pay</p>
                      <p className="font-medium text-green-600">
                        ${payment.netPay.toLocaleString()}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <Button size="sm" variant="outline" className="flex-1">
                      <Eye className="mr-2 h-4 w-4" />
                      View Details
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      disabled={payment.status !== "paid"}
                    >
                      <Download className="mr-2 h-4 w-4" />
                      Download Payslip
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Deduction Breakdown */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FileText className="h-5 w-5" />
              Deduction Breakdown
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="bg-muted/50 rounded-lg p-4 text-center">
                <div className="text-2xl font-bold">$1,500</div>
                <p className="text-muted-foreground text-sm">
                  Monthly Deductions
                </p>
              </div>

              <div className="space-y-3">
                {deductionBreakdown.map((deduction, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between"
                  >
                    <div>
                      <p className="text-sm font-medium">{deduction.name}</p>
                      <p className="text-muted-foreground text-xs">
                        {deduction.percentage}%
                      </p>
                    </div>
                    <p className="font-medium">${deduction.amount}</p>
                  </div>
                ))}
              </div>

              <div className="border-t pt-3">
                <Button variant="outline" className="w-full" size="sm">
                  <FileText className="mr-2 h-4 w-4" />
                  View Tax Document
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
