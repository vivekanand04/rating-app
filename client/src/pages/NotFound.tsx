import { DashBoardPageWrapper } from "@/components/Dashboard/DashBoardPageWrapper";
import { Alert, AlertTitle } from "@/components/ui/alert";
import { Terminal } from "lucide-react";
import type React from "react";

interface NotFoundPageProps {
  isDashboard?: boolean;
}

export const NotFound: React.FC<NotFoundPageProps> = ({
  isDashboard = false,
}: NotFoundPageProps) => {
  if (isDashboard) {
    return (
      <DashBoardPageWrapper className="flex w-full h-full justify-center items-center">
        <Alert className="max-w-md w-full shadow-lg" variant="destructive">
          <Terminal className="h-5 w-5" />
          <AlertTitle className="text-lg">Page Not Found</AlertTitle>
        </Alert>
      </DashBoardPageWrapper>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-muted p-4">
      <Alert className="max-w-md w-full shadow-lg" variant="destructive">
        <Terminal className="h-5 w-5" />
        <AlertTitle className="text-lg">Page Not Found</AlertTitle>
      </Alert>
    </div>
  );
};
