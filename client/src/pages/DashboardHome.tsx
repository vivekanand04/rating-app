import { DashBoardPageWrapper } from "@/components/Dashboard/DashBoardPageWrapper";
import { Stats } from "@/components/Dashboard/Stats";
import { StoresAverageRatings } from "@/components/Rating/StoresAverageRatings";
import { useAuth } from "@/hooks/use-auth";

export const DashboardHome = () => {
  const { authUser } = useAuth();
  return (
    <DashBoardPageWrapper pageTitle="Home">
      {authUser?.role === "SYSTEM_ADMIN" ? (
        <Stats />
      ) : authUser?.role === "STORE_OWNER" ? (
        <StoresAverageRatings />
      ) : (
        <div className="flex justify-center items-center w-full h-full">
          <p className="font-medium text-2xl">
            Welocome to store rating platform
          </p>
        </div>
      )}
    </DashBoardPageWrapper>
  );
};
