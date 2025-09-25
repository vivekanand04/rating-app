import { cn } from "@/lib/utils";

interface DashBoardPageWrapperProps {
  pageTitle?: string;
  children: React.ReactNode;
  className?: string;
}

export const DashBoardPageWrapper: React.FC<DashBoardPageWrapperProps> = ({
  pageTitle,
  children,
  className,
}) => {
  return (
    <div className="flex h-full flex-col gap-4">
      {pageTitle && (
        <div className="flex items-center">
          <h1 className="text-lg font-semibold md:text-2xl">{pageTitle}</h1>
        </div>
      )}

      <div
        className={cn(
          "flex-1 min-h-0 rounded-lg border border-dashed shadow-sm",
          className
        )}
      >
        {children}
      </div>
    </div>
  );
};
