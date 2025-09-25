import { DashBoardPageWrapper } from "@/components/Dashboard/DashBoardPageWrapper";
import { GenericCard } from "@/components/Generics/GenericCard";
import { GenericModal } from "@/components/Generics/GenericModal";
import { StoreListingList } from "@/components/Store/StoreListingList";
import { StoreRatingForm } from "@/components/Store/StoreRatingForm";
import { Input } from "@/components/ui/input";
import { useAuth } from "@/hooks/use-auth";
import type { Store } from "@/types";
import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";

export const StoreListing = () => {
  const { authUser } = useAuth();
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [isRatingModalOpen, setRatingModalOpen] = useState<boolean>(false);
  const [selectedStore, setSelectedStore] = useState<Store | null>(null);




  useEffect(() => {
    if (!isRatingModalOpen) {
      setSelectedStore(null);
    }
  }, [isRatingModalOpen]);

  const opneRatingModal = (store: Store) => {
    setSelectedStore(store);
    setRatingModalOpen(true);
  };

  if (authUser && authUser?.role !== "USER") {
    return <Navigate to={"/dashboard/acessdenied"} />;
  }




  return (
    <DashBoardPageWrapper pageTitle="Stores">
      <GenericCard
        cardContent={
          <div className="flex flex-col gap-2">
            <div className="flex w-full gap-2">
              <Input
                className="w-full p-2"
                placeholder="Serach stores"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
       

            </div>
            <StoreListingList
              searchQuery={searchQuery}
              opneRatingModal={(store: Store) => opneRatingModal(store)}
            />
          </div>
        }
        className="h-full"
      />
      {isRatingModalOpen && (
        <GenericModal
          isModalOpen={isRatingModalOpen}
          modalContent={
            <StoreRatingForm
              closeRatingModal={() => setRatingModalOpen(false)}
              selectedStore={selectedStore}
            />
          }
          modalTitle="Rating"
          onOpenChange={(isOpen: boolean) => setRatingModalOpen(isOpen)}
          modalDesc="Rate the store"
        />
      )}
    </DashBoardPageWrapper>
  );
};



