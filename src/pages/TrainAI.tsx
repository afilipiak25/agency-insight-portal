
import { Layout } from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Globe, FileText, Building2, Plus, Info } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

const TrainAI = () => {
  return (
    <Layout>
      <div className="p-8 max-w-5xl mx-auto">
        <div className="mb-8">
          <h1 className="text-2xl font-semibold mb-2">KI Training</h1>
          <p className="text-gray-600">
            Trainieren Sie Ihre KI mit verschiedenen Informationsquellen, um bessere und personalisierte Ergebnisse zu erzielen.
          </p>
        </div>

        <Tabs defaultValue="company" className="space-y-6">
          <TabsList className="bg-gray-100/80 p-1">
            <TabsTrigger value="website" className="flex items-center gap-2">
              <Globe className="w-4 h-4" />
              Website Crawling
            </TabsTrigger>
            <TabsTrigger value="pdf" className="flex items-center gap-2">
              <FileText className="w-4 h-4" />
              PDF Dokumente
            </TabsTrigger>
            <TabsTrigger value="company" className="flex items-center gap-2">
              <Building2 className="w-4 h-4" />
              Brancheninformationen
            </TabsTrigger>
          </TabsList>

          <TabsContent value="website" className="space-y-6">
            <div className="bg-white p-6 rounded-lg border border-gray-200">
              <h2 className="text-lg font-medium mb-2">Website Crawling</h2>
              <p className="text-gray-600 mb-6">
                Fügen Sie Ihre Website-URL hinzu, um relevante Informationen automatisch zu extrahieren.
              </p>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Website URL
                  </label>
                  <Input 
                    type="url" 
                    placeholder="https://example.com"
                    className="w-full"
                  />
                </div>
                
                <Button className="w-full bg-[#7E69AB] hover:bg-[#6A5A91]">
                  Website crawlen
                </Button>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="pdf" className="space-y-6">
            <div className="bg-white p-6 rounded-lg border border-gray-200">
              <h2 className="text-lg font-medium mb-2">PDF Dokumente</h2>
              <p className="text-gray-600 mb-6">
                Laden Sie PDF-Dokumente hoch, um deren Inhalte in das KI-Training einzubeziehen.
              </p>
              
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
                <div className="space-y-2">
                  <div className="flex justify-center">
                    <FileText className="w-8 h-8 text-gray-400" />
                  </div>
                  <p className="text-sm text-gray-600">
                    Dateien hierher ziehen oder klicken zum Auswählen
                  </p>
                  <p className="text-xs text-gray-500">
                    PDF bis zu 10MB
                  </p>
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="company" className="space-y-6">
            <div className="bg-white p-6 rounded-lg border border-gray-200">
              <h2 className="text-lg font-medium mb-2">Brancheninformationen</h2>
              <p className="text-gray-600 mb-6">
                Fügen Sie wichtige Brancheninformationen hinzu, die Ihre KI kennen sollte, um relevantere Ergebnisse zu erzielen.
              </p>
              
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Hauptbranche
                  </label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Branche auswählen" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="tech">Technologie & Software</SelectItem>
                      <SelectItem value="finance">Finanzen & Versicherungen</SelectItem>
                      <SelectItem value="healthcare">Gesundheitswesen</SelectItem>
                      <SelectItem value="manufacturing">Produktion & Industrie</SelectItem>
                      <SelectItem value="retail">Einzelhandel & E-Commerce</SelectItem>
                      <SelectItem value="education">Bildung & Training</SelectItem>
                      <SelectItem value="consulting">Beratung & Dienstleistungen</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Unterbranche
                  </label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Unterbranche auswählen" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="saas">SaaS & Cloud Services</SelectItem>
                      <SelectItem value="ai">KI & Machine Learning</SelectItem>
                      <SelectItem value="cybersecurity">Cybersicherheit</SelectItem>
                      <SelectItem value="data">Data Analytics</SelectItem>
                      <SelectItem value="mobile">Mobile Entwicklung</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1 flex items-center gap-2">
                    Branchenspezifische Begriffe
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger>
                          <Info className="w-4 h-4 text-gray-400" />
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>Fügen Sie wichtige Fachbegriffe hinzu, die in Ihrer Branche häufig verwendet werden</p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  </label>
                  <div className="flex gap-2">
                    <Input 
                      type="text" 
                      placeholder="z.B. Cloud Computing, DevOps, Agile..."
                      className="flex-1"
                    />
                    <Button variant="outline" size="icon">
                      <Plus className="w-4 h-4" />
                    </Button>
                  </div>
                  <div className="mt-2 flex flex-wrap gap-2">
                    {["Cloud Computing", "DevOps", "Agile", "Scrum", "CI/CD"].map((term) => (
                      <div key={term} className="bg-gray-100 px-3 py-1 rounded-full text-sm text-gray-700">
                        {term}
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Branchenbeschreibung
                  </label>
                  <textarea 
                    rows={4}
                    placeholder="Beschreiben Sie die wichtigsten Aspekte und Besonderheiten Ihrer Branche..."
                    className="w-full p-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-amplifa-purple/30"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Hauptherausforderungen
                  </label>
                  <textarea 
                    rows={4}
                    placeholder="Was sind die größten Herausforderungen in Ihrer Branche?"
                    className="w-full p-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-amplifa-purple/30"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Wichtige Markttrends
                  </label>
                  <textarea 
                    rows={4}
                    placeholder="Welche aktuellen Trends beeinflussen Ihre Branche?"
                    className="w-full p-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-amplifa-purple/30"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Regulatorische Anforderungen
                  </label>
                  <textarea 
                    rows={4}
                    placeholder="Welche rechtlichen und regulatorischen Anforderungen müssen beachtet werden?"
                    className="w-full p-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-amplifa-purple/30"
                  />
                </div>
                
                <Button className="w-full bg-[#7E69AB] hover:bg-[#6A5A91]">
                  Brancheninformationen speichern
                </Button>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
};

export default TrainAI;
