import { DasboardHeader } from "@/components/Dashboard/DasboardHeader";
import { DashboardSidebar } from "@/components/Dashboard/DashboardSidebar";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { useAuth } from "@/hooks/use-auth";
import { Navigate, Outlet } from "react-router-dom";

export const DashboardLayout = () => {
  const { authUser } = useAuth();

  if (!authUser) {
    return <Navigate to="/signin" />;
  }

  return (
    <SidebarProvider>
      <DashboardSidebar />
      <SidebarInset className="flex flex-col h-screen">
        <DasboardHeader />
        <div className="flex flex-1 flex-col gap-4 p-4 min-h-0">
          <Outlet />
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
};
