
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Users, Target, Globe, Calendar, Settings } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export const CreateCampaignForm = () => {
  return (
    <div className="max-w-3xl mx-auto">
      <Tabs defaultValue="targeting" className="w-full">
        <TabsList className="w-full border-b justify-start mb-8 bg-transparent p-0 h-auto">
          <TabsTrigger
            value="targeting"
            className="data-[state=active]:border-b-2 data-[state=active]:border-dashboard-primary rounded-none px-8 py-4"
          >
            1. Targeting
          </TabsTrigger>
          <TabsTrigger
            value="pitch"
            className="data-[state=active]:border-b-2 data-[state=active]:border-dashboard-primary rounded-none px-8 py-4"
          >
            2. Pitch
          </TabsTrigger>
          <TabsTrigger
            value="outreach"
            className="data-[state=active]:border-b-2 data-[state=active]:border-dashboard-primary rounded-none px-8 py-4"
          >
            3. Outreach
          </TabsTrigger>
          <TabsTrigger
            value="workflow"
            className="data-[state=active]:border-b-2 data-[state=active]:border-dashboard-primary rounded-none px-8 py-4"
          >
            4. Workflow
          </TabsTrigger>
          <TabsTrigger
            value="settings"
            className="data-[state=active]:border-b-2 data-[state=active]:border-dashboard-primary rounded-none px-8 py-4"
          >
            5. Settings
          </TabsTrigger>
        </TabsList>

        <TabsContent value="targeting" className="mt-0">
          <div className="space-y-8">
            {/* Grundinformationen */}
            <div className="bg-white p-6 rounded-lg border border-gray-200">
              <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
                <Target className="w-5 h-5 text-dashboard-primary" />
                Grundinformationen
              </h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Kampagnenname
                  </label>
                  <Input 
                    placeholder="z.B. BAFA Kampagne Q1 2024"
                    className="w-full"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Branche
                  </label>
                  <Input 
                    placeholder="z.B. Beratung, IT, Finanzen"
                    className="w-full"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Region
                  </label>
                  <Input 
                    placeholder="z.B. Deutschland, Österreich, Schweiz"
                    className="w-full"
                  />
                </div>
              </div>
            </div>

            {/* Zielgruppe */}
            <div className="bg-white p-6 rounded-lg border border-gray-200">
              <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
                <Users className="w-5 h-5 text-dashboard-primary" />
                Zielgruppe
              </h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Anzahl der Leads
                  </label>
                  <Input 
                    type="number"
                    placeholder="z.B. 100"
                    className="w-full"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Zielposition
                  </label>
                  <Input 
                    placeholder="z.B. Geschäftsführer, IT-Leiter"
                    className="w-full"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Unternehmensgröße
                  </label>
                  <Input 
                    placeholder="z.B. 50-250 Mitarbeiter"
                    className="w-full"
                  />
                </div>
              </div>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="pitch" className="mt-0">
          <div className="space-y-8">
            <div className="bg-white p-6 rounded-lg border border-gray-200">
              <h2 className="text-lg font-semibold mb-4">Pitch</h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Hauptbotschaft
                  </label>
                  <textarea 
                    rows={4}
                    placeholder="Was ist Ihre zentrale Botschaft?"
                    className="w-full p-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-dashboard-primary/30"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Unique Selling Proposition
                  </label>
                  <textarea 
                    rows={4}
                    placeholder="Was macht Ihr Angebot einzigartig?"
                    className="w-full p-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-dashboard-primary/30"
                  />
                </div>
              </div>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="outreach" className="mt-0">
          <div className="space-y-8">
            <div className="bg-white p-6 rounded-lg border border-gray-200">
              <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
                <Globe className="w-5 h-5 text-dashboard-primary" />
                Outreach-Strategie
              </h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    LinkedIn-Kampagnentext
                  </label>
                  <textarea 
                    rows={4}
                    placeholder="Ihr Kampagnentext für LinkedIn..."
                    className="w-full p-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-dashboard-primary/30"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    E-Mail-Betreff
                  </label>
                  <Input 
                    placeholder="Betreff für die erste E-Mail"
                    className="w-full"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    E-Mail-Text
                  </label>
                  <textarea 
                    rows={4}
                    placeholder="Text für die erste E-Mail..."
                    className="w-full p-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-dashboard-primary/30"
                  />
                </div>
              </div>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="workflow" className="mt-0">
          <div className="space-y-8">
            <div className="bg-white p-6 rounded-lg border border-gray-200">
              <h2 className="text-lg font-semibold mb-4">Workflow-Konfiguration</h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Follow-up-Intervall
                  </label>
                  <Input 
                    type="number"
                    placeholder="Tage zwischen Follow-ups"
                    className="w-full"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Maximale Follow-ups
                  </label>
                  <Input 
                    type="number"
                    placeholder="Maximale Anzahl der Follow-ups"
                    className="w-full"
                  />
                </div>
              </div>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="settings" className="mt-0">
          <div className="space-y-8">
            <div className="bg-white p-6 rounded-lg border border-gray-200">
              <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
                <Settings className="w-5 h-5 text-dashboard-primary" />
                Zeitplan
              </h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Startdatum
                  </label>
                  <Input 
                    type="date"
                    className="w-full"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Enddatum
                  </label>
                  <Input 
                    type="date"
                    className="w-full"
                  />
                </div>
              </div>
            </div>
          </div>
        </TabsContent>
      </Tabs>

      <div className="flex justify-end gap-4 mt-8">
        <Button variant="outline">
          Abbrechen
        </Button>
        <Button className="bg-dashboard-primary hover:bg-dashboard-hover">
          Kampagne erstellen
        </Button>
      </div>
    </div>
  );
};
