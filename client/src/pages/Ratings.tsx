import { DashBoardPageWrapper } from "@/components/Dashboard/DashBoardPageWrapper";
import { GenericCard } from "@/components/Generics/GenericCard";
import { RatingList } from "@/components/Rating/RatingList";
import { Input } from "@/components/ui/input";
import { useAuth } from "@/hooks/use-auth";
import { useState } from "react";
import { Navigate } from "react-router-dom";

export const Ratings = () => {
  const { authUser } = useAuth();

  const [searchQuery, setSearchQuery] = useState<string>("");

  if (authUser && authUser?.role !== "STORE_OWNER") {
    return <Navigate to={"/dashboard/acessdenied"} />;
  }

  return (
    <DashBoardPageWrapper pageTitle="Ratings">
      <GenericCard
        cardContent={
          <div className="flex flex-col gap-2">
            <div className="flex w-full gap-2">
              <Input
                className="w-full p-2"
                placeholder="Serach ratings"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <RatingList searchQuery={searchQuery} />
          </div>
        }
      />
    </DashBoardPageWrapper>
  );
};
