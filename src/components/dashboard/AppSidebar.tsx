"use client";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { cn } from "@/lib/utils";
import { UserButton, useUser } from "@clerk/nextjs";
import {
  BanknoteArrowUpIcon,
  BuildingIcon,
  ChevronsUpIcon,
  FileUserIcon,
  LayoutDashboardIcon,
  MailIcon,
  NotebookTextIcon,
  ReceiptIcon,
  SheetIcon,
  UsersIcon,
  ZapIcon,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Badge } from "../ui/badge";

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
    title: "Contact",
    url: "/employee/contact-support",
    icon: MailIcon,
  },
  // {
  //   title: "Leave Requests",
  //   url: "/employee/leave-requests",
  //   icon: BaggageClaimIcon,
  // },
  // { title: "Profile", url: "/employee/profile", icon: UserCogIcon },
];
const hrNavLinks: NavLink[] = [
  { title: "Employee List", url: "/hr/employee-list", icon: UsersIcon },
  { title: "Progress", url: "/hr/progress", icon: ChevronsUpIcon },
  { title: "Requests", url: "/hr/requests", icon: FileUserIcon },
];

export default function AppSidebar() {
  const pathName = usePathname();
  const { user } = useUser();
  const userRole = user?.publicMetadata?.role as string;

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
      <SidebarHeader>
        <div className="flex justify-center gap-2 md:justify-start">
          <Link href="/" className="flex items-center gap-2 font-medium">
            <div className="bg-primary text-primary-foreground flex size-6 items-center justify-center rounded-md">
              <ZapIcon className="size-4" />
            </div>
            SyncoHR
          </Link>
        </div>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <Link
                    href={`/${userRole}`}
                    className={cn(
                      "transition-colors duration-200 ease-in-out",
                      pathName === `/${userRole}`
                        ? "bg-sidebar-accent text-sidebar-accent-foreground"
                        : "hover:bg-sidebar-accent/50",
                    )}
                  >
                    <LayoutDashboardIcon />
                    <span>Dashboard</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              {navLinks.map((navLink) => (
                <SidebarMenuItem key={navLink.title}>
                  <SidebarMenuButton asChild>
                    <Link
                      href={navLink.url}
                      className={cn(
                        "transition-colors duration-200 ease-in-out",
                        pathName === navLink.url
                          ? "bg-sidebar-accent text-sidebar-accent-foreground"
                          : "hover:bg-sidebar-accent/50",
                      )}
                    >
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
      <SidebarFooter>
        <div className="flex justify-between">
          <UserButton />
          <Badge className="capitalize">{userRole}</Badge>
        </div>
      </SidebarFooter>
    </Sidebar>
  );
}
