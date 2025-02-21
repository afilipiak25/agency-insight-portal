
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export const SectorFields = () => {
  return (
    <>
      <div className="space-y-2">
        <label className="text-sm font-medium text-gray-700">
          Sector
        </label>
        <Select>
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Select sector" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="technology">Technology</SelectItem>
            <SelectItem value="healthcare">Healthcare</SelectItem>
            <SelectItem value="finance">Finance</SelectItem>
            <SelectItem value="retail">Retail</SelectItem>
            <SelectItem value="manufacturing">Manufacturing</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium text-gray-700">
          Sectors to Exclude
        </label>
        <Input 
          placeholder="Enter sectors to exclude..."
          className="w-full"
        />
      </div>
    </>
  );
};
