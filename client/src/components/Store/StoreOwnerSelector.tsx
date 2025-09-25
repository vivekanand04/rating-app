import type { User as UserType } from "@/types";
import React from "react";
import { GenericSelect } from "../Generics/GenericSelect";
import { Skeleton } from "../ui/skeleton";
import ErrorDisplay from "../Generics/ErrorDisplay";
import { useQuery } from "@tanstack/react-query";
import { useAuth } from "@/hooks/use-auth";
import { User } from "@/services";

interface StoreOnwerselectorProps {
  value: string;
  onChange: (value: string) => void;
}

const StoreOwnerSelector: React.FC<StoreOnwerselectorProps> = ({
  onChange,
  value,
}) => {
  const { authUser } = useAuth();

  const getStoreOwners = async () => {
    try {
      const response = await User.get({ role: "STORE_OWNER" });
      return response.data as UserType[];
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "Something went wrong.";
      throw new Error(errorMessage);
    }
  };

  const {
    data: storeowners,
    isError,
    error,
    isLoading,
  } = useQuery({
    queryKey: ["STOREOWNERS", "UPDATE_ON_STORE", authUser?.id],
    queryFn: getStoreOwners,
  });

  const storeownersOptions = storeowners?.map((owner) => ({
    label: owner.name,
    value: owner.id,
  }));

  if (isLoading) {
    return <Skeleton className="h-full w-full" />;
  }

  if (isError) {
    return <ErrorDisplay errorMessage={error.message} />;
  }

  return (
    <GenericSelect
      onChange={(value) => onChange(value)}
      options={storeownersOptions ?? []}
      value={value}
      placeholder="Select Owner"
    />
  );
};

export default StoreOwnerSelector;
