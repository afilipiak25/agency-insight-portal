
import * as React from 'react';
import { Button } from "../ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { Bot, RefreshCw, Send } from "lucide-react";

export const PreviewSection = () => {
  const [website, setWebsite] = React.useState('');
  const [linkedin, setLinkedin] = React.useState('');
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
    <div className="bg-white rounded-lg border p-4 space-y-4">
      <h2 className="font-semibold text-lg">KI-Analyse & Email-Generator</h2>
      
      <Tabs defaultValue="input" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="input">Input</TabsTrigger>
          <TabsTrigger value="preview">Vorschau</TabsTrigger>
        </TabsList>
        
        <TabsContent value="input" className="space-y-4">
          <div className="space-y-2">
            <label className="text-sm font-medium">Website Domain</label>
            <Input
              placeholder="beispiel.de"
              value={website}
              onChange={(e) => setWebsite(e.target.value)}
            />
          </div>
          
          <div className="space-y-2">
            <label className="text-sm font-medium">LinkedIn Profil URL</label>
            <Input
              placeholder="linkedin.com/in/beispiel"
              value={linkedin}
              onChange={(e) => setLinkedin(e.target.value)}
            />
          </div>
          
          <Button 
            onClick={handleGenerate}
            className="w-full gap-2"
            disabled={isGenerating}
          >
            {isGenerating ? (
              <>
                <RefreshCw className="w-4 h-4 animate-spin" />
                Analysiere...
              </>
            ) : (
              <>
                <Bot className="w-4 h-4" />
                Analyse starten
              </>
            )}
          </Button>
        </TabsContent>
        
        <TabsContent value="preview" className="space-y-4">
          <Textarea
            value={generatedEmail}
            className="min-h-[300px] font-mono text-sm"
            placeholder="Hier erscheint Ihre generierte Email..."
            readOnly
          />
          
          <div className="flex gap-2">
            <Button 
              variant="outline" 
              className="flex-1 gap-2"
              onClick={() => handleGenerate()}
            >
              <RefreshCw className="w-4 h-4" />
              Neu generieren
            </Button>
            <Button className="flex-1 gap-2">
              <Send className="w-4 h-4" />
              Als Template speichern
            </Button>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};
