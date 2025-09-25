import { useAuth } from "@/hooks/use-auth";
import { SystemAdmin } from "@/services";
import { useQuery } from "@tanstack/react-query";
import { Skeleton } from "../ui/skeleton";
import ErrorDisplay from "../Generics/ErrorDisplay";

import StatCard2 from "../Generics/StatCard2";
import type { Stat } from "@/types";

export const Stats = () => {
  const { authUser } = useAuth();

  const getOverview = async () => {
    try {
      const response = await SystemAdmin.getOverview();
      return response.data as Stat[];
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "Something went wrong.";
      throw new Error(errorMessage);
    }
  };

  const { data, isError, error, isLoading } = useQuery({
    queryKey: ["OVERVIEW", authUser?.id],
    queryFn: getOverview,
  });

  if (isLoading) {
    return <Skeleton className="h-full w-full" />;
  }

  if (isError) {
    return <ErrorDisplay errorMessage={error.message} />;
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-2 p-4">
      {data?.map((stat: Stat, i: number) => (
        <StatCard2 key={i} label={stat.label} value={stat.value} />
      ))}
    </div>
  );
};
