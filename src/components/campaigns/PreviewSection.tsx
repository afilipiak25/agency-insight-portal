
import { Users } from "lucide-react";

export const PreviewSection = () => {
  return (
    <div className="w-96 bg-white rounded-lg border border-gray-200 shadow-sm">
      <div className="p-4 border-b border-gray-100">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Users className="w-5 h-5 text-violet-500" />
            <h3 className="text-sm font-medium text-gray-900">Preview Leads</h3>
          </div>
          <div className="flex flex-col items-end">
            <span className="text-violet-600 font-semibold text-lg">548,845</span>
            <span className="text-xs text-gray-500">Total Leads</span>
          </div>
        </div>
      </div>
      
      <div className="p-4 space-y-3">
        {[1, 2, 3, 4, 5].map((index) => (
          <div 
            key={index} 
            className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-50 transition-colors"
          >
            <div className="w-10 h-10 bg-violet-50 rounded-full flex items-center justify-center text-violet-600 font-medium">
              {index}
            </div>
            <div className="flex-1 min-w-0">
              <div className="font-medium text-gray-900 truncate">Sample Name</div>
              <div className="text-sm text-gray-500">Operations Manager</div>
            </div>
            <div className="text-sm text-gray-400 whitespace-nowrap">Company {index}</div>
          </div>
        ))}
      </div>
    </div>
  );
};
