import { auth } from "@clerk/nextjs/server";
import { Sidebar } from "./Sidebar";

export interface NavLink {
  href: string;
  label: string;
}

const adminNavLinks: NavLink[] = [
  { href: "/admin/all-employee-list", label: "All Employees" },
  { href: "/admin/payroll", label: "Payroll" },
  { href: "/admin/departments", label: "Departments" },
  { href: "/admin/reports", label: "Reports" },
];
const employeeNavLinks: NavLink[] = [
  { href: "/employee/work-sheet", label: "Work Sheet" },
  { href: "/employee/payment-history", label: "Payment History" },
  { href: "/employee/leave-requests", label: "Leave Requests" },
  { href: "/employee/profile", label: "Profile" },
];
const hrNavLinks: NavLink[] = [
  { href: "/hr/employee-list", label: "Employee List" },
  { href: "/hr/progress", label: "Progress" },
  { href: "/hr/requests", label: "Requests" },
  { href: "/hr/onboarding", label: "Onboarding" },
];

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { sessionClaims } = await auth();
  const userRole = sessionClaims?.metadata?.role;

  let navLinks: NavLink[] = [];

  if (userRole === "admin") {
    navLinks = adminNavLinks;
  } else if (userRole === "employee") {
    navLinks = employeeNavLinks;
  } else {
    navLinks = hrNavLinks;
  }

  return (
    <div className="bg-background flex h-screen">
      <Sidebar links={navLinks} />
      <main className="flex-1 overflow-y-auto">
        <div className="container mx-auto p-6">{children}</div>
      </main>
    </div>
  );
}
