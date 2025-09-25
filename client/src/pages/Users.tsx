import { DashBoardPageWrapper } from "@/components/Dashboard/DashBoardPageWrapper";
import { GenericCard } from "@/components/Generics/GenericCard";
import { GenericModal } from "@/components/Generics/GenericModal";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { CreateNewUserForm } from "@/components/User/CreateNewUserForm";
import { UserTable } from "@/components/User/UserTable";
import { useAuth } from "@/hooks/use-auth";
import { useState } from "react";
import { Navigate } from "react-router-dom";

export const Users = () => {
  const { authUser } = useAuth();
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [isUserModalOpen, setUserModalOpen] = useState<boolean>(false);

  if (authUser?.role !== "SYSTEM_ADMIN") {
    return <Navigate to={"/dashboard/acessdenied"} />;
  }

  return (
    <DashBoardPageWrapper pageTitle="Users">
      <GenericCard
        cardContent={
          <div className="flex flex-col gap-2">
            <div className="flex  w-full gap-2">
              <Input
                className="w-4/5 p-2"
                placeholder="search users"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <Button className="w-1/5" onClick={() => setUserModalOpen(true)}>
                Add User
              </Button>
            </div>
            <UserTable searchQuery={searchQuery} />
          </div>
        }
        className="h-full"
      />
      {isUserModalOpen && (
        <GenericModal
          isModalOpen={isUserModalOpen}
          modalContent={
            <CreateNewUserForm closeUserModal={() => setUserModalOpen(false)} />
          }
          modalTitle="Add New User"
          onOpenChange={(isOpen: boolean) => setUserModalOpen(isOpen)}
          modalDesc="Fill the below details to add new user"
        />
      )}
    </DashBoardPageWrapper>
  );
};
