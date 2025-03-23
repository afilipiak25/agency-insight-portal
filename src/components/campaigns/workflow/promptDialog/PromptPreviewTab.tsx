
import React from "react";
import { Button } from "@/components/ui/button";
import { Copy, Check, Loader2, User } from "lucide-react";

interface PromptPreviewTabProps {
  generated: string;
  copied: boolean;
  handleCopy: () => void;
  setActiveTab: (tab: string) => void;
  handleGenerate: () => void;
  isLoading?: boolean;
  isGenerateDisabled?: boolean;
}

export const PromptPreviewTab = ({
  generated,
  copied,
  handleCopy,
  setActiveTab,
  handleGenerate,
  isLoading = false,
  isGenerateDisabled = false
}: PromptPreviewTabProps) => {
  return (
    <div className="space-y-4">
      {isGenerateDisabled ? (
        <div className="flex flex-col items-center justify-center min-h-[400px] border rounded p-4 bg-blue-50">
          <User className="h-8 w-8 text-blue-500 mb-4" />
          <p className="text-blue-600 font-medium">Bitte wählen Sie einen Lead aus</p>
          <p className="text-blue-500 text-sm mt-2">Um eine Vorschau zu generieren, müssen Sie zuerst einen Lead auswählen.</p>
        </div>
      ) : isLoading ? (
        <div className="flex flex-col items-center justify-center min-h-[400px] border rounded p-4 bg-gray-50">
          <Loader2 className="h-8 w-8 text-purple-500 animate-spin mb-4" />
          <p className="text-gray-600">Generiere Vorschau...</p>
        </div>
      ) : generated ? (
        <>
          <div className="border rounded p-4 min-h-[400px] bg-white whitespace-pre-wrap">
            {generated}
          </div>
          
          <div className="flex justify-between">
            <Button variant="outline" onClick={() => setActiveTab("edit")}>
              Zurück zum Bearbeiten
            </Button>
            <Button onClick={handleCopy}>
              {copied ? (
                <>
                  <Check className="mr-1 h-4 w-4" /> Kopiert
                </>
              ) : (
                <>
                  <Copy className="mr-1 h-4 w-4" /> Text kopieren
                </>
              )}
            </Button>
          </div>
        </>
      ) : (
        <div className="flex flex-col items-center justify-center min-h-[400px] border rounded text-gray-500">
          <p>Generieren Sie eine Vorschau, um das Ergebnis zu sehen</p>
          <Button 
            variant="outline" 
            className="mt-2"
            onClick={handleGenerate}
          >
            Jetzt generieren
          </Button>
        </div>
      )}
    </div>
  );
};
