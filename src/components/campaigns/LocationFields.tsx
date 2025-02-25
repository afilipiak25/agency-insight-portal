
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Info, X } from "lucide-react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Button } from "@/components/ui/button";

export const LocationFields = () => {
  const [selectedLocations, setSelectedLocations] = useState<string[]>([
    "United Kingdom",
    "United States"
  ]);
  const [locationInput, setLocationInput] = useState("");
  const [excludedLocations, setExcludedLocations] = useState<string[]>([]);

  const handleLocationAdd = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && locationInput.trim()) {
      setSelectedLocations([...selectedLocations, locationInput.trim()]);
      setLocationInput("");
    }
  };

  const handleLocationRemove = (location: string) => {
    setSelectedLocations(selectedLocations.filter(l => l !== location));
  };

  return (
    <>
      <div className="space-y-2">
        <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
          Standorte
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger>
                <Info className="w-4 h-4 text-gray-400" />
              </TooltipTrigger>
              <TooltipContent>
                <p>Wählen Sie die geografischen Standorte aus</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </label>
        <div className="space-y-3">
          <Input 
            value={locationInput}
            onChange={(e) => setLocationInput(e.target.value)}
            onKeyDown={handleLocationAdd}
            placeholder="Standorte suchen..."
            className="w-full"
          />
          <div className="flex flex-wrap gap-2">
            {selectedLocations.map((location) => (
              <div
                key={location}
                className="inline-flex items-center gap-2 bg-white px-3 py-1.5 rounded-full border border-gray-200"
              >
                <span className="inline-flex items-center gap-2">
                  {location === "United Kingdom" && (
                    <img src="/lovable-uploads/65ea4964-7a50-460e-9b50-6e1a2cb2ee44.png" alt="UK flag" className="w-5 h-5" />
                  )}
                  {location === "United States" && (
                    <img src="/lovable-uploads/83a6380b-4ece-451f-a112-25cb4f412c37.png" alt="US flag" className="w-5 h-5" />
                  )}
                  {location}
                </span>
                <button 
                  onClick={() => handleLocationRemove(location)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
          Standorte ausschließen
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger>
                <Info className="w-4 h-4 text-gray-400" />
              </TooltipTrigger>
              <TooltipContent>
                <p>Standorte, die ausgeschlossen werden sollen</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </label>
        <Input 
          placeholder="Auszuschließende Standorte..."
          className="w-full"
        />
      </div>
    </>
  );
};
