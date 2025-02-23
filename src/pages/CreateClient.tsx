
import { Layout } from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { UserPlus, Mail, Building, MapPin, Phone, Globe, Users } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const CreateClient = () => {
  const navigate = useNavigate();
  const [teamEmails, setTeamEmails] = useState<string>("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Hier würde die Logik zum Speichern des Kunden implementiert werden
    navigate('/clients');
  };

  return (
    <Layout>
      <div className="p-8 max-w-4xl mx-auto">
        <div className="mb-8">
          <h1 className="text-2xl font-semibold mb-2">Neuen Kunden anlegen</h1>
          <p className="text-gray-600">Erfassen Sie die Kundendaten und laden Sie Teammitglieder ein</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Unternehmensdetails */}
          <div className="bg-white p-6 rounded-lg border border-gray-200 space-y-6">
            <h2 className="text-lg font-semibold flex items-center gap-2">
              <Building className="w-5 h-5 text-amplifa-purple" />
              Unternehmensdetails
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-sm font-medium">Unternehmensname</label>
                <Input placeholder="z.B. Tech Solutions GmbH" />
              </div>
              
              <div className="space-y-2">
                <label className="text-sm font-medium">Branche</label>
                <Input placeholder="z.B. IT & Software" />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Website</label>
                <Input placeholder="www.beispiel.de" type="url" />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Telefon</label>
                <Input placeholder="+49 123 456789" type="tel" />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Adresse</label>
              <Input placeholder="Straße und Hausnummer" />
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2">
                <Input placeholder="PLZ" />
                <Input placeholder="Stadt" />
              </div>
            </div>
          </div>

          {/* Ansprechpartner */}
          <div className="bg-white p-6 rounded-lg border border-gray-200 space-y-6">
            <h2 className="text-lg font-semibold flex items-center gap-2">
              <UserPlus className="w-5 h-5 text-amplifa-purple" />
              Hauptansprechpartner
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-sm font-medium">Vorname</label>
                <Input placeholder="Vorname" />
              </div>
              
              <div className="space-y-2">
                <label className="text-sm font-medium">Nachname</label>
                <Input placeholder="Nachname" />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">E-Mail</label>
                <Input placeholder="email@beispiel.de" type="email" />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Position</label>
                <Input placeholder="z.B. Head of HR" />
              </div>
            </div>
          </div>

          {/* Teammitglieder einladen */}
          <div className="bg-white p-6 rounded-lg border border-gray-200 space-y-6">
            <h2 className="text-lg font-semibold flex items-center gap-2">
              <Users className="w-5 h-5 text-amplifa-purple" />
              Teammitglieder einladen
            </h2>
            
            <div className="space-y-2">
              <label className="text-sm font-medium">E-Mail Adressen</label>
              <Textarea 
                placeholder="E-Mail Adressen (eine pro Zeile)" 
                value={teamEmails}
                onChange={(e) => setTeamEmails(e.target.value)}
                className="min-h-[100px]"
              />
              <p className="text-sm text-gray-500">
                Geben Sie die E-Mail-Adressen der Teammitglieder ein (eine pro Zeile)
              </p>
            </div>
          </div>

          <div className="flex justify-end gap-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => navigate('/clients')}
            >
              Abbrechen
            </Button>
            <Button 
              type="submit"
              className="gap-2 bg-gradient-to-r from-amplifa-blue to-amplifa-purple hover:opacity-90"
            >
              <UserPlus className="w-4 h-4" />
              Kunde anlegen
            </Button>
          </div>
        </form>
      </div>
    </Layout>
  );
};

export default CreateClient;
