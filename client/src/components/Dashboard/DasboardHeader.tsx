import { Separator } from "@/components/ui/separator";
import { SidebarTrigger } from "../ui/sidebar";
import { useLocation, useNavigate } from "react-router-dom";
import { Button } from "../ui/button";
import { LogOut } from "lucide-react";
import { useState } from "react";
import { Auth } from "@/services";
import { useAuth } from "@/hooks/use-auth";
import { toast } from "sonner";

export const DasboardHeader = () => {
  const currentPage = useLocation();

  const [isLoading, setLoading] = useState<boolean>(false);

  const navigate = useNavigate();

  const { updateAuthUser } = useAuth();

  const SignOut = async () => {
    if (isLoading) return;
    try {
      setLoading(true);
      const response = await Auth.signOut();
      if (response.success) {
        toast.success(response.message);
        updateAuthUser(null);
        navigate("/signin");
      }
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "Something went wrong.";
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <header className="flex h-16 shrink-0 items-center justify-between gap-2 border-b px-4 sticky top-0 z-10">
      <div className="flex items-center gap-2">
        <SidebarTrigger className="-ml-1" />
        <Separator
          orientation="vertical"
          className="mr-2 data-[orientation=vertical]:h-4"
        />
        <p className="capitalize">
          {currentPage.pathname === "/dashboard"
            ? "Home"
            : currentPage.pathname.replace("/dashboard/", "")}
        </p>
      </div>
      <Button
        className="flex items-center justify-center h-10 w-10 rounded-full"
        variant="outline"
        title="Logout"
        disabled={isLoading}
        onClick={SignOut}
      >
        <LogOut className="w-4 h-4" />
      </Button>
    </header>
  );
};
