import { auth } from "@clerk/nextjs/server";
import { Sidebar } from "./Sidebar";

export interface NavLink {
  href: string;
  label: string;
}

const adminNavLinks: NavLink[] = [
  { href: "/admin/all-employee-list", label: "All Employees" },
  { href: "/admin/payroll", label: "Payroll" },
];
const employeeNavLinks: NavLink[] = [
  { href: "/employee/work-sheet", label: "Work Sheet" },
  { href: "/employee/payment-history", label: "Payment History" },
];
const hrNavLinks: NavLink[] = [
  { href: "/hr/employee-list", label: "Employee List" },
  { href: "/hr/progress", label: "Progress" },
];

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { sessionClaims } = await auth();
  const userRole = sessionClaims?.metadata?.role;
  console.log(userRole);

  let navLinks: NavLink[] = [];

  if (userRole === "admin") {
    navLinks = adminNavLinks;
  } else if (userRole === "employee") {
    navLinks = employeeNavLinks;
  } else {
    navLinks = hrNavLinks;
  }

  return (
    <section>
      <Sidebar links={navLinks} />
      <main>{children}</main>
    </section>
  );
}
