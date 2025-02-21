
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Users, Target, Globe, Calendar } from "lucide-react";

export const CreateCampaignForm = () => {
  return (
    <div className="max-w-3xl mx-auto">
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

        {/* Kampagnendetails */}
        <div className="bg-white p-6 rounded-lg border border-gray-200">
          <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
            <Globe className="w-5 h-5 text-dashboard-primary" />
            Kampagnendetails
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

        {/* Zeitplan */}
        <div className="bg-white p-6 rounded-lg border border-gray-200">
          <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
            <Calendar className="w-5 h-5 text-dashboard-primary" />
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

        <div className="flex justify-end gap-4">
          <Button variant="outline">
            Abbrechen
          </Button>
          <Button className="bg-dashboard-primary hover:bg-dashboard-hover">
            Kampagne erstellen
          </Button>
        </div>
      </div>
    </div>
  );
};
