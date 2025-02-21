
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export const JobFunctionFields = () => {
  return (
    <>
      <div className="space-y-2">
        <label className="text-sm font-medium text-gray-700">
          Job Function
        </label>
        <Select>
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Select job function" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="sales">Sales</SelectItem>
            <SelectItem value="marketing">Marketing</SelectItem>
            <SelectItem value="operations">Operations</SelectItem>
            <SelectItem value="it">IT</SelectItem>
            <SelectItem value="finance">Finance</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium text-gray-700">
          Management Level
        </label>
        <Select>
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Select management level" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="c-level">C-Level</SelectItem>
            <SelectItem value="vp">VP Level</SelectItem>
            <SelectItem value="director">Director Level</SelectItem>
            <SelectItem value="manager">Manager Level</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </>
  );
};
