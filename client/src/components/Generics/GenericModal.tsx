import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { cn } from "@/lib/utils";

interface GenericModalProps {
  isModalOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
  modalTitle: string;
  modalDesc: string;
  modalContent: React.ReactNode;
  className?: string;
}

export const GenericModal: React.FC<GenericModalProps> = ({
  isModalOpen,
  onOpenChange,
  modalContent,
  modalDesc,
  modalTitle,
}) => {
  return (
    <Dialog open={isModalOpen} onOpenChange={(open) => onOpenChange(open)}>
      <DialogContent
        className={cn("min-w-[50vw] min-h-fit max-h-[50vh] overflow-auto")}
      >
        <DialogHeader>
          <DialogTitle>{modalTitle}</DialogTitle>
          <DialogDescription>{modalDesc}</DialogDescription>
        </DialogHeader>
        {modalContent}
      </DialogContent>
    </Dialog>
  );
};
