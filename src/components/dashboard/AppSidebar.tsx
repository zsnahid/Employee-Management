import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { auth } from "@clerk/nextjs/server";
import {
  BaggageClaimIcon,
  BanknoteArrowUpIcon,
  BuildingIcon,
  ChevronsUpIcon,
  FileUserIcon,
  LayoutDashboardIcon,
  NotebookTextIcon,
  ReceiptIcon,
  SheetIcon,
  UserCogIcon,
  UsersIcon,
} from "lucide-react";
import Link from "next/link";

export interface NavLink {
  url: string;
  title: string;
  icon: React.ElementType;
}

const adminNavLinks: NavLink[] = [
  { title: "All Employees", url: "/admin/all-employee-list", icon: UsersIcon },
  { title: "Payroll", url: "/admin/payroll", icon: BanknoteArrowUpIcon },
  { title: "Departments", url: "/admin/departments", icon: BuildingIcon },
  { title: "Reports", url: "/admin/reports", icon: NotebookTextIcon },
];
const employeeNavLinks: NavLink[] = [
  { title: "Work Sheet", url: "/employee/work-sheet", icon: SheetIcon },
  {
    title: "Payment History",
    url: "/employee/payment-history",
    icon: ReceiptIcon,
  },
  {
    title: "Leave Requests",
    url: "/employee/leave-requests",
    icon: BaggageClaimIcon,
  },
  { title: "Profile", url: "/employee/profile", icon: UserCogIcon },
];
const hrNavLinks: NavLink[] = [
  { title: "Employee List", url: "/hr/employee-list", icon: UsersIcon },
  { title: "Progress", url: "/hr/progress", icon: ChevronsUpIcon },
  { title: "Requests", url: "/hr/requests", icon: FileUserIcon },
];

export default async function AppSidebar() {
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
    <Sidebar>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <Link href={`/${userRole}`}>
                    <LayoutDashboardIcon />
                    <span>Dashboard</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              {navLinks.map((navLink) => (
                <SidebarMenuItem key={navLink.title}>
                  <SidebarMenuButton asChild>
                    <Link href={navLink.url}>
                      <navLink.icon />
                      <span>{navLink.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
