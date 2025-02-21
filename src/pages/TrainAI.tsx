
import { Layout } from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Globe, FileText, Building2 } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

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

        <Tabs defaultValue="website" className="space-y-6">
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
              Unternehmensinformationen
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
              <h2 className="text-lg font-medium mb-2">Unternehmensinformationen</h2>
              <p className="text-gray-600 mb-6">
                Fügen Sie wichtige Unternehmensinformationen hinzu, die Ihre KI kennen sollte.
              </p>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Unternehmensname
                  </label>
                  <Input 
                    type="text" 
                    placeholder="Ihr Unternehmen GmbH"
                    className="w-full"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Beschreibung
                  </label>
                  <textarea 
                    rows={4}
                    placeholder="Beschreiben Sie Ihr Unternehmen..."
                    className="w-full p-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-amplifa-purple/30"
                  />
                </div>
                
                <Button className="w-full bg-[#7E69AB] hover:bg-[#6A5A91]">
                  Informationen speichern
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
