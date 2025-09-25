import type { Store } from "@/types";
import type React from "react";
import { Button } from "../ui/button";

interface StoreCardProps {
  store: Store;
  opneRatingModal: (store: Store) => void;
}

export const StoreCard: React.FC<StoreCardProps> = ({
  store,
  opneRatingModal,
}) => {
  return (
    <div className="flex flex-col gap-2 w-full h-full p-2 rounded-md bg-muted shadow-md border">
      <div className="flex flex-row w-full my-2">
        <p className="font-bold w-full gap-2">
          Name:<span className="font-thin ml-2">{store.name}</span>
        </p>
        <p className="font-bold w-full">
          Email:<span className="font-thin ml-2">{store.email}</span>
        </p>
      </div>

      <p className="font-bold w-full my-2">
        Address:<span className="font-thin ml-2">{store.address}</span>
      </p>

      <div className="flex flex-row w-full gap-2 my-2">
        <p className="font-bold w-full">
          Average Rating:
          <span className="font-thin ml-2">{store.averageRating}</span>
        </p>
        <p className="font-bold w-full">
          Rating:
          <span className="font-thin ml-2">
            {store.userRating?.value || "NA"}
          </span>
        </p>
      </div>

      <div className="flex w-full justify-end">
        <Button variant="default" onClick={() => opneRatingModal(store)}>
          {store.userRating?.value ? "Update Rating" : "Give Rating"}
        </Button>
      </div>
    </div>
  );
};
