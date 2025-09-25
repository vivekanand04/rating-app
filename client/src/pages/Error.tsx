import { DashBoardPageWrapper } from "@/components/Dashboard/DashBoardPageWrapper";
import { Alert, AlertTitle } from "@/components/ui/alert";
import { Terminal } from "lucide-react";

interface ErrorPageProps {
  isDashboard?: boolean;
}

export const Error: React.FC<ErrorPageProps> = ({
  isDashboard = false,
}: ErrorPageProps) => {
  if (isDashboard) {
    return (
      <DashBoardPageWrapper className="flex w-full h-full justify-center items-center">
        <Alert className="max-w-md w-full shadow-lg" variant="destructive">
          <Terminal className="h-5 w-5" />
          <AlertTitle className="text-lg">Something went wrong</AlertTitle>
        </Alert>
      </DashBoardPageWrapper>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-muted p-4">
      <Alert className="max-w-md w-full shadow-lg">
        <Terminal className="h-5 w-5" />
        <AlertTitle className="text-lg">Something went wrong</AlertTitle>
      </Alert>
    </div>
  );
};
