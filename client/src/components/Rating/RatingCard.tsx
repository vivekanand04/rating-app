import type { Rating } from "@/types";

interface RatingCardProps {
  rating: Rating;
}

const RatingCard: React.FC<RatingCardProps> = ({ rating }) => {
  return (
    <div className="flex flex-col gap-2 w-full h-full p-2 rounded-md bg-muted shadow-md border">
      <p className="font-bold">
        User Name:<span className="font-thin ml-2">{rating.user.name}</span>
      </p>
      <p className="font-bold">
        Rating:<span className="font-thin ml-2">{rating.value}</span>
      </p>
      <p className="font-bold">
        Store Name:<span className="font-thin ml-2">{rating.store.name}</span>
      </p>
    </div>
  );
};

export default RatingCard;
