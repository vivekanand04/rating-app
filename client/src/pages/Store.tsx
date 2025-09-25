import { DashBoardPageWrapper } from "@/components/Dashboard/DashBoardPageWrapper";
import { GenericCard } from "@/components/Generics/GenericCard";
import { GenericModal } from "@/components/Generics/GenericModal";
import { CreateNewStoreForm } from "@/components/Store/CreateNewStoreForm";
import { StoresTable } from "@/components/Store/StoresTable";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useAuth } from "@/hooks/use-auth";
import { useState } from "react";
import { Navigate } from "react-router-dom";
import { useEffect } from "react";

export const Store = () => {
  const { authUser } = useAuth();
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [isStoreModalOpen, setStoreModalOpen] = useState<boolean>(false);

  if (authUser && authUser?.role !== "SYSTEM_ADMIN") {
    return <Navigate to={"/dashboard/acessdenied"} />;
  }
const terms = [" Search by Name", " Search by Email", "Search by Role"];
const [termIndex, setTermIndex] = useState<number>(0);
const [isPaused, setIsPaused] = useState<boolean>(false);
const [displayPlaceholder, setDisplayPlaceholder] = useState<string>(
  `${terms[0]}`
);

// update placeholder whenever termIndex changes
useEffect(() => {
  setDisplayPlaceholder(` ${terms[termIndex]}`);
}, [termIndex]);

// cycle terms every 2000ms, pause when input is focused
useEffect(() => {
  if (isPaused) return;
  const id = setInterval(() => {
    setTermIndex((i) => (i + 1) % terms.length);
  }, 1000);
  return () => clearInterval(id);
}, [isPaused]);

  return (
    <DashBoardPageWrapper pageTitle="Store">
      <GenericCard
        cardContent={
          <div className="flex flex-col gap-2">
            <div className="flex  w-full gap-2">
              {/* <Input
                className="w-4/5 p-2"
                placeholder="search stores"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              /> */}
              <Input
  className="w-full p-2"
  placeholder={displayPlaceholder}
  value={searchQuery}
  onChange={(e) => setSearchQuery(e.target.value)}
  onFocus={() => setIsPaused(true)}
  onBlur={() => setIsPaused(false)}
  aria-label="Search stores"
/>

              <Button className="w-1/5" onClick={() => setStoreModalOpen(true)}>
                Add Store
              </Button>
            </div>
            <StoresTable searchQuery={searchQuery} />
          </div>
        }
        className="h-full"
      />
      {isStoreModalOpen && (
        <GenericModal
          isModalOpen={isStoreModalOpen}
          modalContent={
            <CreateNewStoreForm
              closeUserModal={() => setStoreModalOpen(false)}
            />
          }
          modalTitle="Add New Store"
          onOpenChange={(isOpen: boolean) => setStoreModalOpen(isOpen)}
          modalDesc="Fill the below details to add new store"
        />
      )}
    </DashBoardPageWrapper>
  );
};
