
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Info } from "lucide-react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

interface CompanyFieldsProps {
  onDataSourceChange?: (source: string) => void;
}

export const CompanyFields = ({ onDataSourceChange }: CompanyFieldsProps) => {
  const [companyNames, setCompanyNames] = useState<string[]>([]);
  const [companyInput, setCompanyInput] = useState("");

  const handleCompanyAdd = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && companyInput.trim()) {
      setCompanyNames([...companyNames, companyInput.trim()]);
      setCompanyInput("");
    }
  };

  return (
    <>
      <div className="space-y-2">
        <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
          Unternehmen suchen
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger>
                <Info className="w-4 h-4 text-gray-400" />
              </TooltipTrigger>
              <TooltipContent>
                <p>Suchen Sie nach spezifischen Unternehmen</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </label>
        <Input
          value={companyInput}
          onChange={(e) => setCompanyInput(e.target.value)}
          onKeyDown={handleCompanyAdd}
          placeholder="Unternehmensnamen eingeben..."
          className="w-full"
        />
        {companyNames.length > 0 && (
          <div className="flex flex-wrap gap-2 mt-2">
            {companyNames.map((name, index) => (
              <div
                key={index}
                className="inline-flex items-center gap-2 bg-violet-50 px-3 py-1 rounded-full text-sm text-violet-700"
              >
                {name}
                <button
                  onClick={() => setCompanyNames(companyNames.filter((_, i) => i !== index))}
                  className="text-violet-500 hover:text-violet-700"
                >
                  ×
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
          Unternehmen ausschließen
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger>
                <Info className="w-4 h-4 text-gray-400" />
              </TooltipTrigger>
              <TooltipContent>
                <p>Unternehmen, die von der Suche ausgeschlossen werden sollen</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </label>
        <Input 
          placeholder="Auszuschließende Unternehmen..."
          className="w-full"
        />
      </div>
    </>
  );
};
