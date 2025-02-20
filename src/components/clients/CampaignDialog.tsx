
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Bot } from 'lucide-react';
import { ClientOverview } from '@/types/client';

interface CampaignDialogProps {
  client: ClientOverview | null;
  onClose: () => void;
}

export const CampaignDialog = ({ client, onClose }: CampaignDialogProps) => {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('de-DE', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <Dialog open={!!client} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Bot className="w-5 h-5 text-amplifa-purple" />
            KI-Kampagnen Analyse
          </DialogTitle>
        </DialogHeader>
        
        {client?.campaignSummary && (
          <div className="space-y-6">
            <div className="space-y-2">
              <h3 className="text-xl font-semibold text-gray-900">
                {client.campaignSummary.title}
              </h3>
              <div className="flex gap-3">
                <span className="px-3 py-1 rounded-full text-sm bg-amplifa-blue/10 text-amplifa-blue">
                  {client.campaignSummary.industry}
                </span>
                <span className="px-3 py-1 rounded-full text-sm bg-amplifa-purple/10 text-amplifa-purple">
                  {client.campaignSummary.region}
                </span>
              </div>
            </div>

            <div className="bg-gray-50 p-4 rounded-lg">
              <div className="flex items-start gap-3">
                <div className="p-2 bg-white rounded-lg">
                  <Bot className="w-5 h-5 text-amplifa-purple" />
                </div>
                <div className="space-y-2">
                  <p className="text-gray-600 leading-relaxed">
                    {client.campaignSummary.aiSummary}
                  </p>
                  <p className="text-sm text-gray-400">
                    Zuletzt aktualisiert: {formatDate(client.campaignSummary.lastUpdated)}
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};
