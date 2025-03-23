
import React from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { AlertCircle, RotateCcw, ArrowRight, Loader2, User } from "lucide-react";

interface PromptEditTabProps {
  promptTemplate: string;
  setPromptTemplate: (template: string) => void;
  handleReset: () => void;
  handleGenerate: () => void;
  isLoading?: boolean;
  isGenerateDisabled?: boolean;
}

export const PromptEditTab = ({
  promptTemplate,
  setPromptTemplate,
  handleReset,
  handleGenerate,
  isLoading = false,
  isGenerateDisabled = false
}: PromptEditTabProps) => {
  return (
    <div className="space-y-4">
      <div className="flex items-center text-amber-600 text-sm bg-amber-50 p-2 rounded">
        <AlertCircle className="h-4 w-4 mr-2" />
        <p>Bearbeiten Sie diese Vorlage, um die Nachricht zu personalisieren.</p>
      </div>
      
      {isGenerateDisabled && (
        <div className="flex items-center text-blue-600 text-sm bg-blue-50 p-2 rounded">
          <User className="h-4 w-4 mr-2" />
          <p>Bitte wählen Sie einen Lead aus, um eine Vorschau zu generieren.</p>
        </div>
      )}
      
      <Textarea 
        className="min-h-[400px] font-mono text-sm"
        value={promptTemplate}
        onChange={(e) => setPromptTemplate(e.target.value)}
      />
      
      <div className="flex justify-between">
        <Button variant="outline" onClick={handleReset} disabled={isLoading}>
          <RotateCcw className="mr-1 h-4 w-4" /> Zurücksetzen
        </Button>
        <Button 
          onClick={handleGenerate} 
          disabled={isLoading || isGenerateDisabled}
        >
          {isLoading ? (
            <>
              <Loader2 className="mr-1 h-4 w-4 animate-spin" /> Generiere...
            </>
          ) : (
            <>
              <ArrowRight className="mr-1 h-4 w-4" /> Vorschau generieren
            </>
          )}
        </Button>
      </div>
    </div>
  );
};
