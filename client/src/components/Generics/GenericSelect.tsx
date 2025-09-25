import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import type { GenericSelectOption } from "@/types";

interface GenericSelectProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  options: GenericSelectOption[];
}

export const GenericSelect: React.FC<GenericSelectProps> = ({
  onChange,
  value,
  options,
  placeholder = "Select from below",
}) => {
  return (
    <Select value={value} onValueChange={(value) => onChange(value)}>
      <SelectTrigger className="w-full">
        <SelectValue placeholder={placeholder} />
      </SelectTrigger>
      <SelectContent className="w-full">
        {options.map((option: GenericSelectOption, i: number) => (
          <SelectItem key={i} value={option.value}>
            {option.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};
