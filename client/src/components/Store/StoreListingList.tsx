import { useAuth } from "@/hooks/use-auth";
import { Store } from "@/services";
import type { Store as StoreType } from "@/types";
import { useQuery } from "@tanstack/react-query";
import { useMemo } from "react";
import { Skeleton } from "../ui/skeleton";
import ErrorDisplay from "../Generics/ErrorDisplay";
import { StoreCard } from "./StoreCard";

interface StoreListingListProps {
  searchQuery: string;
  opneRatingModal: (store: StoreType) => void;
}

export const StoreListingList: React.FC<StoreListingListProps> = ({
  searchQuery,
  opneRatingModal,
}) => {
  const { authUser } = useAuth();

  const getStores = async () => {
    try {
      const response = await Store.get();
      return response.data as StoreType[];
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "Something went wrong.";
      throw new Error(errorMessage);
    }
  };

  const {
    data: stores,
    isError,
    error,
    isLoading,
  } = useQuery({
    queryKey: ["STORE", "UPDATE_ON_STORE", authUser?.id],
    queryFn: getStores,
  });

  const filteredStores = useMemo(() => {
    if (!searchQuery) return stores;

    const query = searchQuery.toLowerCase();

    return stores?.filter((store) =>
      [store.name, store.email, store.address].some((field) =>
        field.toLowerCase().includes(query)
      )
    );
  }, [stores, searchQuery]);

  if (isLoading) {
    return <Skeleton className="h-full w-full" />;
  }

  if (isError) {
    return <ErrorDisplay errorMessage={error.message} />;
  }

  return (
    <div className="flex flex-col gap-2 p-2 w-full h-full">
      {filteredStores?.map((store, i) => (
        <StoreCard
          key={i}
          store={store}
          opneRatingModal={(store: StoreType) => opneRatingModal(store)}
        />
      ))}
    </div>
  );
};
