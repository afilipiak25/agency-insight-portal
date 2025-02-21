
import * as React from 'react';
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { Bot, RefreshCw, Send } from "lucide-react";

export const PreviewSection = () => {
  const [website, setWebsite] = React.useState('');
  const [linkedin, setLinkedin] = React.useState('');
  const [prompt, setPrompt] = React.useState('');
  const [generatedEmail, setGeneratedEmail] = React.useState('');
  const [isGenerating, setIsGenerating] = React.useState(false);

  const handleGenerate = async () => {
    setIsGenerating(true);
    // Simuliere API-Aufruf
    setTimeout(() => {
      setGeneratedEmail(`Sehr geehrter Herr/Frau [Name],

basierend auf meiner Analyse Ihres Unternehmens [Company] habe ich festgestellt, dass Sie möglicherweise vor ähnlichen Herausforderungen stehen wie andere Unternehmen in Ihrer Branche:

1. [Identifizierter Schmerzpunkt 1]
2. [Identifizierter Schmerzpunkt 2]
3. [Identifizierter Schmerzpunkt 3]

Ich würde gerne in einem kurzen Gespräch aufzeigen, wie wir diese Herausforderungen gemeinsam angehen können.

Wären Sie an einem 15-minütigen Austausch interessiert?

Mit besten Grüßen`);
      setIsGenerating(false);
    }, 2000);
  };

  return (
    <div className="bg-white rounded-lg border p-6 space-y-6">
      <h2 className="font-semibold text-lg">KI-Analyse & Email-Generator</h2>
      
      <div className="space-y-6">
        <div className="space-y-3">
          <label className="text-sm font-medium">Website Domain</label>
          <Input
            placeholder="beispiel.de"
            value={website}
            onChange={(e) => setWebsite(e.target.value)}
            className="h-12 text-lg"
          />
        </div>
        
        <div className="space-y-3">
          <label className="text-sm font-medium">LinkedIn Profil URL</label>
          <Input
            placeholder="linkedin.com/in/beispiel"
            value={linkedin}
            onChange={(e) => setLinkedin(e.target.value)}
            className="h-12 text-lg"
          />
        </div>

        <div className="space-y-3">
          <label className="text-sm font-medium">Zusätzlicher Prompt (optional)</label>
          <Textarea
            placeholder="Geben Sie zusätzliche Anweisungen für die KI..."
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            className="min-h-[100px] text-lg"
          />
        </div>
        
        <Button 
          onClick={handleGenerate}
          className="w-full gap-2 h-12 text-lg"
          disabled={isGenerating}
        >
          {isGenerating ? (
            <>
              <RefreshCw className="w-5 h-5 animate-spin" />
              Analysiere...
            </>
          ) : (
            <>
              <Bot className="w-5 h-5" />
              Analyse starten
            </>
          )}
        </Button>
      </div>

      <div className="space-y-4 pt-4 border-t">
        <div className="flex items-center justify-between">
          <h3 className="font-medium">Generierte Email</h3>
          <div className="flex gap-2">
            <Button 
              variant="outline" 
              size="sm"
              className="gap-2"
              onClick={() => handleGenerate()}
            >
              <RefreshCw className="w-4 h-4" />
              Neu generieren
            </Button>
            <Button size="sm" className="gap-2">
              <Send className="w-4 h-4" />
              Als Template speichern
            </Button>
          </div>
        </div>
        
        <Textarea
          value={generatedEmail}
          className="min-h-[400px] font-mono text-sm"
          placeholder="Hier erscheint Ihre generierte Email..."
          readOnly
        />
      </div>
    </div>
  );
};
