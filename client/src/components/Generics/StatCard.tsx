interface StatCardProps {
  label: string;
  value: string | number | null;
}

const StatCard: React.FC<StatCardProps> = ({ label, value }) => {
  return (
    <div className="flex flex-col  w-full h-full  bg-muted rounded-md p-2 shadow-md ">
      <p className=""><h1 className="text-md font-semibold inline-block">Store Name:</h1> {label}</p>
    <p className=" "><h1 className="text-md font-semibold inline-block">Average Rating: </h1> {value ? value : "NA"}</p>
    </div>
  );
};

export default StatCard;
