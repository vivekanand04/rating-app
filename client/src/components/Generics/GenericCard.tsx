import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface GenericCardProps {
  cardTitle?: string;
  cardDescription?: string;
  cardAction?: React.ReactNode;
  cardContent: React.ReactNode;
  cardFooter?: React.ReactNode;
  className?: string;
}

export const GenericCard: React.FC<GenericCardProps> = ({
  cardTitle,
  cardDescription,
  cardAction,
  cardContent,
  cardFooter,
  className,
}) => {
  return (
    <Card className={cn("min-w-xs sm:min-w-sm md:min-w-md h-full", className)}>
      <CardHeader>
        {cardTitle && <CardTitle>{cardTitle}</CardTitle>}
        {cardDescription && (
          <CardDescription>{cardDescription}</CardDescription>
        )}
        {cardAction && <CardAction>{cardAction}</CardAction>}
      </CardHeader>
      <CardContent>{cardContent}</CardContent>
      {cardFooter && (
        <CardFooter>
          <p>{cardFooter}</p>
        </CardFooter>
      )}
    </Card>
  );
};
