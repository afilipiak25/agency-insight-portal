
import React from "react";
import { Button } from "@/components/ui/button";
import { Copy, Check, Loader2, User, FileText } from "lucide-react";

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
        <div className="flex flex-col items-center justify-center min-h-[400px] border rounded p-4 bg-orange-50">
          <User className="h-8 w-8 text-orange-500 mb-4" />
          <p className="text-orange-600 font-medium">Bitte wählen Sie einen Lead aus</p>
          <p className="text-orange-500 text-sm mt-2">Um eine Vorschau zu generieren, müssen Sie zuerst einen Lead auswählen.</p>
        </div>
      ) : isLoading ? (
        <div className="flex flex-col items-center justify-center min-h-[400px] border rounded p-4 bg-gray-50">
          <Loader2 className="h-8 w-8 text-pink-500 animate-spin mb-4" />
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
            <Button onClick={handleCopy} className="bg-gradient-to-r from-orange-400 to-pink-500 hover:opacity-90 text-white">
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
        <div className="flex flex-col items-center justify-center min-h-[400px] border rounded p-4 bg-gray-50">
          <FileText className="h-8 w-8 text-gray-400 mb-4" />
          <p className="text-gray-600 font-medium">Vorschau verfügbar nach Generierung</p>
          <p className="text-gray-500 text-sm mt-2">Generieren Sie eine Vorschau, um das Ergebnis zu sehen</p>
          <Button 
            variant="gradient" 
            className="mt-4"
            onClick={handleGenerate}
          >
            Jetzt generieren
          </Button>
        </div>
      )}
    </div>
  );
};
