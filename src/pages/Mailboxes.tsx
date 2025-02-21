
import { Layout } from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Mail, Search, Settings } from "lucide-react";

interface MailProvider {
  id: string;
  name: string;
  icon: string;
  category: 'popular' | 'additional';
}

const mailProviders: MailProvider[] = [
  { id: 'google', name: 'Google Workspace', icon: '/lovable-uploads/e9ae7944-a5b5-4e65-95ff-f2e4e75302a1.png', category: 'popular' },
  { id: 'gmail', name: 'Gmail', icon: '/lovable-uploads/e9ae7944-a5b5-4e65-95ff-f2e4e75302a1.png', category: 'popular' },
  { id: 'microsoft365', name: 'Microsoft 365', icon: '/lovable-uploads/e9ae7944-a5b5-4e65-95ff-f2e4e75302a1.png', category: 'popular' },
  { id: 'outlook', name: 'Outlook', icon: '/lovable-uploads/e9ae7944-a5b5-4e65-95ff-f2e4e75302a1.png', category: 'popular' },
  { id: 'sendgrid', name: 'SendGrid', icon: '/lovable-uploads/e9ae7944-a5b5-4e65-95ff-f2e4e75302a1.png', category: 'popular' },
  { id: 'mailgun', name: 'Mailgun', icon: '/lovable-uploads/e9ae7944-a5b5-4e65-95ff-f2e4e75302a1.png', category: 'popular' },
  { id: 'smtp', name: 'Custom SMTP', icon: '/lovable-uploads/e9ae7944-a5b5-4e65-95ff-f2e4e75302a1.png', category: 'popular' },
  { id: 'yahoo', name: 'Yahoo', icon: '/lovable-uploads/e9ae7944-a5b5-4e65-95ff-f2e4e75302a1.png', category: 'additional' },
  { id: 'zoho', name: 'Zoho', icon: '/lovable-uploads/e9ae7944-a5b5-4e65-95ff-f2e4e75302a1.png', category: 'additional' },
  { id: 'zohopro', name: 'Zoho-PRO', icon: '/lovable-uploads/e9ae7944-a5b5-4e65-95ff-f2e4e75302a1.png', category: 'additional' },
];

const Mailboxes = () => {
  return (
    <Layout>
      <div className="p-4 sm:p-6 md:p-8 max-w-7xl mx-auto w-full">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6 sm:mb-8">
          <div className="w-full sm:w-auto">
            <h1 className="text-xl sm:text-2xl font-semibold mb-2">Mailboxes</h1>
            <p className="text-sm sm:text-base text-gray-600">
              Verbinden Sie Ihre E-Mail-Konten und verwalten Sie alle Ihre Mailboxen an einem Ort.
            </p>
          </div>
          <Button 
            variant="outline" 
            size="sm" 
            className="gap-2 w-full sm:w-auto whitespace-nowrap"
          >
            <Settings className="w-4 h-4" />
            Einstellungen
          </Button>
        </div>

        <div className="bg-white rounded-lg border p-4 sm:p-6 mb-6 sm:mb-8 overflow-hidden">
          <div className="relative mb-6">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <Input
              placeholder="Nach Anbietern suchen..."
              className="pl-10 w-full"
            />
          </div>

          <div className="space-y-6">
            <div>
              <h2 className="text-sm font-medium text-gray-500 mb-4">Beliebt</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
                {mailProviders
                  .filter(provider => provider.category === 'popular')
                  .map(provider => (
                    <button
                      key={provider.id}
                      className="flex items-center gap-3 p-3 sm:p-4 rounded-lg border hover:border-violet-400 hover:bg-violet-50 transition-all w-full text-left"
                    >
                      <Mail className="w-5 h-5 sm:w-6 sm:h-6 text-violet-600 flex-shrink-0" />
                      <span className="font-medium text-sm sm:text-base truncate">
                        {provider.name}
                      </span>
                    </button>
                  ))}
              </div>
            </div>

            <div>
              <h2 className="text-sm font-medium text-gray-500 mb-4">Weitere Anbieter</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
                {mailProviders
                  .filter(provider => provider.category === 'additional')
                  .map(provider => (
                    <button
                      key={provider.id}
                      className="flex items-center gap-3 p-3 sm:p-4 rounded-lg border hover:border-violet-400 hover:bg-violet-50 transition-all w-full text-left"
                    >
                      <Mail className="w-5 h-5 sm:w-6 sm:h-6 text-violet-600 flex-shrink-0" />
                      <span className="font-medium text-sm sm:text-base truncate">
                        {provider.name}
                      </span>
                    </button>
                  ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Mailboxes;
