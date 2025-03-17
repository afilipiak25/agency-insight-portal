
import { Layout } from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Search, Phone, Calendar, MoreVertical } from "lucide-react";
import { Avatar } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface Message {
  id: number;
  sender: string;
  campaign: string;
  time: string;
  status: "Interessiert" | "Nicht interessiert";
  content: string;
  avatar?: string;
}

const messages: Message[] = [
  {
    id: 1,
    sender: "Marc Baecker",
    campaign: "BAFA Campaign",
    time: "10:06 AM",
    status: "Interessiert",
    content: "Ich wollte mich noch einmal melden – hast du 15 Minuten Zeit, um über automatisiertes Akquise und Vermittlung zu sprechen? Meine Kunden erzielen damit beeindruckende Ergebnisse."
  },
  {
    id: 2,
    sender: "Christina Hofer",
    campaign: "",
    time: "09:52 AM",
    status: "Nicht interessiert",
    content: "Leider kein Interesse."
  },
  {
    id: 3,
    sender: "Martin Ludwig Mayr",
    campaign: "Solar Campaign",
    time: "08:13 AM",
    status: "Interessiert",
    content: "Ich hätte Interesse an einem Gespräch."
  }
];

const Inbox = () => {
  const selectedMessage = messages[0]; // In real app, this would be state-managed

  return (
    <Layout>
      <div className="flex h-[calc(100vh-65px)]">
        {/* Left sidebar */}
        <div className="w-[400px] border-r border-gray-200 flex flex-col">
          <div className="p-4 border-b border-gray-200">
            <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
              Conversations
              <span className="bg-gray-100 text-gray-600 text-sm px-2 py-0.5 rounded-full">3</span>
            </h2>
            <div className="relative">
              <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search messages..."
                className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-amplifa-purple/30"
              />
            </div>
          </div>

          <div className="flex-1 overflow-auto">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`p-4 border-b border-gray-100 hover:bg-gray-50 cursor-pointer ${
                  message.id === selectedMessage.id ? "bg-gray-50" : ""
                }`}
              >
                <div className="flex items-center gap-3">
                  <Avatar>
                    <div className="bg-gray-100 w-10 h-10 rounded-full flex items-center justify-center text-gray-600">
                      {message.sender.charAt(0)}
                    </div>
                  </Avatar>
                  <div className="flex-1 min-w-0">
                    <div className="flex justify-between items-start">
                      <h3 className="font-medium truncate">{message.sender}</h3>
                      <span className="text-sm text-gray-500 flex-shrink-0">{message.time}</span>
                    </div>
                    {message.campaign && (
                      <div className="flex items-center gap-2 mt-1">
                        <span className="text-sm text-gray-600">{message.campaign}</span>
                        <span className={`text-xs px-2 py-0.5 rounded-full ${
                          message.status === "Interessiert" 
                            ? "bg-green-50 text-green-600" 
                            : "bg-red-50 text-red-600"
                        }`}>
                          {message.status}
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Main content */}
        <div className="flex-1 flex flex-col">
          <div className="border-b border-gray-200 p-4">
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-4">
                <Avatar>
                  <div className="bg-gray-100 w-10 h-10 rounded-full flex items-center justify-center text-gray-600">
                    {selectedMessage.sender.charAt(0)}
                  </div>
                </Avatar>
                <div>
                  <h2 className="font-semibold">{selectedMessage.sender}</h2>
                  <div className="text-sm text-gray-600">In 1 campaign</div>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Button variant="outline" size="sm" className="gap-2">
                  <Phone className="w-4 h-4" />
                  Call
                </Button>
                <Button variant="outline" size="sm" className="gap-2">
                  <Calendar className="w-4 h-4" />
                  Schedule
                </Button>
                <Button variant="secondary" size="sm">
                  Mark as Qualified
                </Button>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon">
                      <MoreVertical className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem>Edit Contact</DropdownMenuItem>
                    <DropdownMenuItem>Delete Messages</DropdownMenuItem>
                    <DropdownMenuItem>Block Contact</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>
          </div>

          <div className="flex-1 overflow-auto p-6">
            <div className="max-w-3xl mx-auto space-y-6">
              <div className="bg-white rounded-lg p-6">
                <p className="mb-6">{selectedMessage.content}</p>
                <p className="mb-4 text-gray-600">PS: Wusstest du, dass der Name in der alten griechischen Sprache "der Held" bedeutet?</p>
                <p className="mb-2">Bleib gesund,</p>
                <p className="font-medium">Anthony Filipiak</p>
                <p className="text-gray-600">Geschäftsführer</p>
                <p className="text-gray-600">Intellywave GmbH</p>
                <div className="mt-6">
                  <p className="text-gray-600">Kontakt:</p>
                  <a href="mailto:af@intellywave.de" className="text-blue-600">Jetzt buchen</a>
                </div>
                <div className="mt-4">
                  <p className="text-gray-600">Adresse:</p>
                  <p className="text-gray-600">Intellywave GmbH</p>
                  <p className="text-gray-600">Luisenstr. 9</p>
                  <p className="text-gray-600">40215 Düsseldorf</p>
                </div>
              </div>
            </div>
          </div>

          <div className="p-4 border-t border-gray-200">
            <div className="max-w-3xl mx-auto flex gap-4">
              <input
                type="text"
                placeholder="Write your email content..."
                className="flex-1 border border-gray-200 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-amplifa-purple/30"
              />
              <Button variant="outline">AI Compose</Button>
              <Button variant="secondary">
                Send message
              </Button>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Inbox;
