"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { NavLink } from "./layout";
import { cn } from "@/lib/utils";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
  LayoutDashboard,
  Users,
  DollarSign,
  FileText,
  TrendingUp,
  Settings,
  LogOut,
  Building2,
  Calendar,
  ClipboardList,
  UserCog,
  Home,
} from "lucide-react";
import { SignOutButton, useUser } from "@clerk/nextjs";

const iconMap: Record<string, React.ElementType> = {
  "All Employees": Users,
  Payroll: DollarSign,
  Departments: Building2,
  Reports: FileText,
  "Work Sheet": ClipboardList,
  "Payment History": FileText,
  "Leave Requests": Calendar,
  Profile: UserCog,
  "Employee List": Users,
  Progress: TrendingUp,
  Requests: ClipboardList,
  Onboarding: UserCog,
  Dashboard: LayoutDashboard,
  Home: Home,
};

export function Sidebar({ links }: { links: NavLink[] }) {
  const pathname = usePathname();
  const { user } = useUser();

  const userRole = (user?.publicMetadata?.role as string) || "employee";
  const userName = user?.fullName || user?.firstName || "User";
  const userEmail = user?.primaryEmailAddress?.emailAddress || "";
  const userInitials = userName
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase();

  return (
    <div className="bg-sidebar border-sidebar-border flex h-screen w-64 flex-col border-r">
      {/* Header */}
      <div className="border-sidebar-border flex items-center gap-3 border-b px-6 py-4">
        <div className="flex items-center gap-2">
          <Building2 className="text-primary h-8 w-8" />
          <div>
            <h1 className="text-sidebar-foreground text-lg font-bold">
              SyncoHR
            </h1>
            <p className="text-sidebar-foreground/60 text-xs">
              Employee Management
            </p>
          </div>
        </div>
      </div>

      {/* User Profile */}
      <div className="border-sidebar-border border-b px-6 py-4">
        <div className="flex items-center gap-3">
          <Avatar className="h-10 w-10">
            <AvatarImage src={user?.imageUrl} alt={userName} />
            <AvatarFallback className="bg-primary text-primary-foreground text-sm font-semibold">
              {userInitials}
            </AvatarFallback>
          </Avatar>
          <div className="min-w-0 flex-1">
            <p className="text-sidebar-foreground truncate text-sm font-medium">
              {userName}
            </p>
            <p className="text-sidebar-foreground/60 truncate text-xs">
              {userEmail}
            </p>
          </div>
          <Badge variant="secondary" className="text-xs">
            {userRole}
          </Badge>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 space-y-1 overflow-y-auto px-3 py-4">
        {/* Dashboard Home Link */}
        <Link
          href={`/${userRole}`}
          className={cn(
            "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-all duration-200",
            pathname === `/${userRole}`
              ? "bg-sidebar-accent text-sidebar-accent-foreground shadow-sm"
              : "text-sidebar-foreground hover:bg-sidebar-accent/50 hover:text-sidebar-accent-foreground",
          )}
        >
          <Home className="h-4 w-4" />
          Dashboard
        </Link>

        <Separator className="my-3" />

        {/* Dynamic Links */}
        {links.map((link) => {
          const Icon = iconMap[link.label] || LayoutDashboard;
          const isActive = pathname === link.href;

          return (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-all duration-200",
                isActive
                  ? "bg-sidebar-accent text-sidebar-accent-foreground shadow-sm"
                  : "text-sidebar-foreground hover:bg-sidebar-accent/50 hover:text-sidebar-accent-foreground",
              )}
            >
              <Icon className="h-4 w-4" />
              {link.label}
            </Link>
          );
        })}
      </nav>

      {/* Footer */}
      <div className="border-sidebar-border space-y-2 border-t px-3 py-4">
        <Button
          variant="ghost"
          size="sm"
          className="text-sidebar-foreground hover:bg-sidebar-accent/50 w-full justify-start gap-3"
        >
          <Settings className="h-4 w-4" />
          Settings
        </Button>

        <SignOutButton>
          <Button
            variant="ghost"
            size="sm"
            className="text-sidebar-foreground hover:bg-destructive/10 hover:text-destructive w-full justify-start gap-3"
          >
            <LogOut className="h-4 w-4" />
            Sign Out
          </Button>
        </SignOutButton>
      </div>
    </div>
  );
}
