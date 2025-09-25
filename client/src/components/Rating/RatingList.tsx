import { useAuth } from "@/hooks/use-auth";
import { Rating } from "@/services";
import type { Rating as RatingType } from "@/types";
import { useQuery } from "@tanstack/react-query";
import { useMemo } from "react";
import { Skeleton } from "../ui/skeleton";
import ErrorDisplay from "../Generics/ErrorDisplay";
import RatingCard from "./RatingCard";

interface RatingListProps {
  searchQuery: string;
}

export const RatingList: React.FC<RatingListProps> = ({ searchQuery }) => {
  const { authUser } = useAuth();

  const getRatings = async () => {
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
    queryKey: ["RATINGS", authUser?.id],
    queryFn: getRatings,
  });

  const filteredRatings = useMemo(() => {
    if (!searchQuery) return ratings;

    const query = searchQuery.toLowerCase();

    return ratings?.filter((rating) =>
      [rating.user.name, rating.store.name].some((field) =>
        field.toLowerCase().includes(query)
      )
    );
  }, [ratings, searchQuery]);

  if (isLoading) {
    return <Skeleton className="h-full w-full" />;
  }

  if (isError) {
    return <ErrorDisplay errorMessage={error.message} />;
  }

  return (
    <div className="flex flex-col gap-2 p-2 w-full h-full">
      {filteredRatings?.map((rating, i) => (
        <RatingCard key={i} rating={rating} />
      ))}
    </div>
  );
};
