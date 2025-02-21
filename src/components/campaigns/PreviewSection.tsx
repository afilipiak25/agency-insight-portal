
import * as React from 'react';
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { Bot, RefreshCw, Send, Sparkles } from "lucide-react";

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
    <div className="bg-gradient-to-b from-white to-violet-50 rounded-xl border shadow-sm p-8 space-y-8">
      <div className="flex items-center gap-3">
        <div className="p-2 bg-violet-100 rounded-lg">
          <Sparkles className="w-5 h-5 text-violet-600" />
        </div>
        <h2 className="font-semibold text-xl bg-gradient-to-r from-violet-600 to-violet-400 bg-clip-text text-transparent">
          KI-Analyse & Email-Generator
        </h2>
      </div>
      
      <div className="space-y-6">
        <div className="space-y-3">
          <label className="text-sm font-medium text-violet-700">Website Domain</label>
          <Input
            placeholder="beispiel.de"
            value={website}
            onChange={(e) => setWebsite(e.target.value)}
            className="h-12 text-lg border-violet-100 focus:border-violet-200 focus:ring-violet-100 transition-colors"
          />
        </div>
        
        <div className="space-y-3">
          <label className="text-sm font-medium text-violet-700">LinkedIn Profil URL</label>
          <Input
            placeholder="linkedin.com/in/beispiel"
            value={linkedin}
            onChange={(e) => setLinkedin(e.target.value)}
            className="h-12 text-lg border-violet-100 focus:border-violet-200 focus:ring-violet-100 transition-colors"
          />
        </div>

        <div className="space-y-3">
          <label className="text-sm font-medium text-violet-700">Zusätzlicher Prompt (optional)</label>
          <Textarea
            placeholder="Enter your prompt..."
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            className="min-h-[120px] text-lg border-violet-100 focus:border-violet-200 focus:ring-violet-100 transition-colors"
          />
        </div>
        
        <Button 
          onClick={handleGenerate}
          className="w-full gap-2 h-14 text-lg bg-gradient-to-r from-violet-600 to-violet-500 hover:from-violet-500 hover:to-violet-400 transition-all duration-300 shadow-md hover:shadow-lg"
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

      <div className="space-y-6 pt-6 border-t border-violet-100">
        <div className="flex items-center justify-between">
          <h3 className="font-medium text-lg text-violet-700">Generierte Email</h3>
          <Button 
            variant="outline" 
            size="sm"
            className="gap-2 border-violet-200 hover:bg-violet-50 text-violet-600"
            onClick={() => handleGenerate()}
          >
            <RefreshCw className="w-4 h-4" />
            Neu generieren
          </Button>
        </div>
        
        <div className="relative">
          <Textarea
            value={generatedEmail}
            className="min-h-[400px] font-mono text-sm bg-white border-violet-100 focus:border-violet-200 focus:ring-violet-100"
            placeholder="Hier erscheint Ihre generierte Email..."
            readOnly
          />
          {isGenerating && (
            <div className="absolute inset-0 bg-white/80 flex items-center justify-center">
              <RefreshCw className="w-8 h-8 text-violet-600 animate-spin" />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
