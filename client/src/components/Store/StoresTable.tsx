import GenericTable from "../Generics/GenericTable";
import { TableCell, TableRow } from "../ui/table";
import ErrorDisplay from "../Generics/ErrorDisplay";
import { Skeleton } from "../ui/skeleton";
import { Store } from "@/services";
import { useQuery } from "@tanstack/react-query";
import { useAuth } from "@/hooks/use-auth";
import type { Store as StoreType } from "@/types";
import type React from "react";
import { useMemo, useState } from "react";

interface StoresTableProps {
  searchQuery: string;
}

export const StoresTable: React.FC<StoresTableProps> = ({ searchQuery }) => {
  const { authUser } = useAuth();
  const [sortKey, setSortKey] = useState<string>("Name");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");

  const handleSortChange = (key: string) => {
    if (key === sortKey) {
      setSortOrder((prev) => (prev === "asc" ? "desc" : "asc"));
    } else {
      setSortKey(key);
      setSortOrder("asc");
    }
  };

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

  const sortedStores = useMemo(() => {
    if (!filteredStores) return [];

    return [...filteredStores].sort((a, b) => {
      const key = sortKey.toLowerCase() as keyof StoreType;
      const aVal = a[key];
      const bVal = b[key];

      if (typeof aVal === "string" && typeof bVal === "string") {
        return sortOrder === "asc"
          ? aVal.localeCompare(bVal)
          : bVal.localeCompare(aVal);
      }

      if (typeof aVal === "number" && typeof bVal === "number") {
        return sortOrder === "asc" ? aVal - bVal : bVal - aVal;
      }

      return 0;
    });
  }, [filteredStores, sortKey, sortOrder]);

  if (isLoading) {
    return <Skeleton className="h-full w-full" />;
  }

  if (isError) {
    return <ErrorDisplay errorMessage={error.message} />;
  }

  return (
    <GenericTable
      tableHeaders={["Name", "Email", "Address", "Rating"]}
      sortableHeaders={["Name", "Email", "Rating"]}
      sortKey={sortKey}
      sortOrder={sortOrder}
      onSortChange={handleSortChange}
      data={sortedStores}
      renderRow={(store: StoreType, i) => (
        <TableRow key={i}>
          <TableCell>{store.name}</TableCell>
          <TableCell>{store.email}</TableCell>
          <TableCell>{store.address}</TableCell>
          <TableCell>{store.averageRating}</TableCell>
        </TableRow>
      )}
    />
  );
};
