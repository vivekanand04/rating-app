import { useAuth } from "@/hooks/use-auth";
import { Rating } from "@/services";
import { useQuery } from "@tanstack/react-query";
import { Skeleton } from "../ui/skeleton";
import ErrorDisplay from "../Generics/ErrorDisplay";
import type { Rating as RatingType } from "@/types";
import StatCard from "../Generics/StatCard";

export const StoresAverageRatings = () => {
  const { authUser } = useAuth();

  const getOverview = async () => {
    try {
      const response = await Rating.get();
      return response.data as RatingType[];
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "Something went wrong.";
      throw new Error(errorMessage);
    }
  };

  const {
    data: ratings,
    isError,
    error,
    isLoading,
  } = useQuery({
    queryKey: ["STORE_AVERAGE_RATING", "UPDATE_ON_STORE", authUser?.id],
    queryFn: getOverview,
  });

  if (isLoading) {
    return <Skeleton className="h-full w-full" />;
  }

  if (isError) {
    return <ErrorDisplay errorMessage={error.message} />;
  }

  return (
    <div className="grid w-full mx-auto grid-cols-1 gap-2 md:grid-cols-3 p-4">
      {ratings?.map((rating: RatingType, i: number) => (
        <StatCard
          key={i}
          label={rating.store.name}
          value={rating.store.averageRating}
        />
      ))}
    </div>
  );
};
