import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import AppSidebar from "@/components/dashboard/AppSidebar";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SidebarProvider>
      <AppSidebar/>
      <main>
        <SidebarTrigger />
        {children}
      </main>
    </SidebarProvider>
  );
}
