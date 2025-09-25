interface StatCardProps {
  label: string;
  value: string | number | null;
}

const StatCard2: React.FC<StatCardProps> = ({ label, value }) => {
  return (
    <div className="flex flex-col w-full h-full gap-2 bg-muted rounded-md p-2 shadow-md">
      <p className=""> {label}</p>
    
      <p className=" "> {value ? value : "NA"}</p>
    </div>
  );
};

export default StatCard2;
