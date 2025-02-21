
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export const CompanyFields = () => {
  return (
    <>
      <div className="flex items-center gap-2">
        <label className="text-sm font-medium text-gray-700">
          Select Data Type:
        </label>
        <div className="w-48">
          <Select>
            <SelectTrigger>
              <SelectValue placeholder="B2B" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="b2b">B2B</SelectItem>
              <SelectItem value="b2c">B2C</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium text-gray-700">
          Company Search
        </label>
        <Select>
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Search for specific companies..." />
          </SelectTrigger>
          <SelectContent>
            {[...Array(50)].map((_, i) => (
              <SelectItem key={i} value={`company-${i + 1}`}>
                Company {i + 1}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </>
  );
};
