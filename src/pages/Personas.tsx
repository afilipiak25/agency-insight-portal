
import { Layout } from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { MessageSquare, Brain, Plus } from "lucide-react";

interface PersonaCard {
  title: string;
  description: string;
  communicationStyle: string;
  expertise: string[];
  icon: React.ReactNode;
}

const personaCards: PersonaCard[] = [
  {
    title: "Professional Berater",
    description: "Formeller, professioneller Kommunikationsstil",
    communicationStyle: "Geschäftlich und sachlich",
    expertise: ["Strategieberatung", "Prozessoptimierung", "Change Management"],
    icon: <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
      <MessageSquare className="w-6 h-6 text-purple-600" />
    </div>
  },
  {
    title: "Freundlicher Coach",
    description: "Persönlicher, unterstützender Ansatz",
    communicationStyle: "Warmherzig und ermutigend",
    expertise: ["Persönlichkeitsentwicklung", "Motivation", "Zielsetzung"],
    icon: <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
      <Brain className="w-6 h-6 text-purple-600" />
    </div>
  },
  {
    title: "Tech Experte",
    description: "Technisch versierter Kommunikationsstil",
    communicationStyle: "Präzise und fachkundig",
    expertise: ["Software-Entwicklung", "System-Architektur", "Cloud Computing"],
    icon: <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
      <Brain className="w-6 h-6 text-purple-600" />
    </div>
  }
];

const Personas = () => {
  return (
    <Layout>
      <div className="p-8 max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-2xl font-semibold mb-2">KI-Personas</h1>
            <p className="text-gray-600">
              Erstellen und verwalten Sie Ihre KI-Personas für verschiedene Kommunikationszwecke. Jede Persona verfügt über einen einzigartigen Kommunikationsstil und Expertise.
            </p>
          </div>
          <Button className="bg-[#7E69AB] hover:bg-[#6A5A91] gap-2">
            <Plus className="w-4 h-4" />
            Neue Persona
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {personaCards.map((persona, index) => (
            <div key={index} className="bg-white rounded-lg border border-gray-200 p-6 hover:shadow-md transition-shadow">
              <div className="flex items-start justify-between mb-4">
                {persona.icon}
                <Button variant="ghost" size="icon">
                  <MessageSquare className="w-4 h-4 text-gray-500" />
                </Button>
              </div>

              <h3 className="text-lg font-semibold mb-2">{persona.title}</h3>
              <p className="text-gray-600 text-sm mb-4">{persona.description}</p>

              <div className="space-y-4">
                <div>
                  <h4 className="text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
                    <MessageSquare className="w-4 h-4" />
                    Kommunikationston
                  </h4>
                  <p className="text-sm text-gray-600">{persona.communicationStyle}</p>
                </div>

                <div>
                  <h4 className="text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
                    <Brain className="w-4 h-4" />
                    Expertise
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {persona.expertise.map((skill, skillIndex) => (
                      <span
                        key={skillIndex}
                        className="px-2 py-1 bg-purple-50 text-purple-700 rounded-full text-xs"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default Personas;
