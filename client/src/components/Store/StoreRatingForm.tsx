import { useAuth } from "@/hooks/use-auth";
import type { Store } from "@/types";
import { useState } from "react";
import { StarRating } from "../ui/star-rating";
import { Button } from "../ui/button";
import { Query, useMutation, useQueryClient } from "@tanstack/react-query";
import { Rating } from "@/services";
import { toast } from "sonner";

interface StoreRatingFormProps {
  closeRatingModal: () => void;
  selectedStore: Store | null;
}

export const StoreRatingForm: React.FC<StoreRatingFormProps> = ({
  closeRatingModal,
  selectedStore,
}) => {
  const [rating, setRating] = useState(
    selectedStore?.userRating?.value ? selectedStore.userRating?.value : 0
  );

  const { authUser } = useAuth();

  const queryClient = useQueryClient();

  const createNewstoreRating = async (data: {
    value: number;
    userId: string | undefined;
    storeId: string | undefined;
  }) => {
    try {
      const response = await Rating.post(data);
      return response;
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "Something went wrong.";
      throw new Error(errorMessage);
    }
  };

  const updateNewstoreRating = async (data: { value: number }) => {
    try {
      if (!selectedStore?.userRating) return;
      const response = await Rating.patch(selectedStore.userRating?.id, data);
      return response;
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "Something went wrong.";
      throw new Error(errorMessage);
    }
  };

  const { mutate: createMutate, isPending: iscreatePending } = useMutation({
    mutationFn: createNewstoreRating,
    onSuccess: (data) => {
      queryClient.invalidateQueries({
        predicate: (query: Query) => query.queryKey.includes("UPDATE_ON_STORE"),
      });
      toast.success(data?.message);
      closeRatingModal();
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  const { mutate: updateMutate, isPending: isupdatePending } = useMutation({
    mutationFn: updateNewstoreRating,
    onSuccess: (data) => {
      queryClient.invalidateQueries({
        predicate: (query: Query) => query.queryKey.includes("UPDATE_ON_STORE"),
      });
      toast.success(data?.message);
      closeRatingModal();
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  const submitRating = () => {
    if (selectedStore?.userRating) {
      updateMutate({ value: rating });
    } else {
      const ratingData = {
        value: rating,
        userId: authUser?.id,
        storeId: selectedStore?.id,
      };
      createMutate(ratingData);
    }
  };

  return (
    <div className="flex flex-col h-full gap-2">
      <p className="font-bold text-base">
        Give rating to {selectedStore?.name}
      </p>
      <StarRating numStars={5} value={rating} setValue={setRating} />
      <Button
        onClick={submitRating}
        disabled={iscreatePending || isupdatePending}
      >
        {selectedStore?.userRating ? "Update Rating" : "Submit Rating"}
      </Button>
    </div>
  );
};
