
import { useState } from 'react';
import { Plus, PlayCircle, StopCircle, Users, Pencil } from 'lucide-react';
import { Button } from '../ui/button';
import { ProgressBar } from '../stats/ProgressBar';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '../ui/dialog';
import { mockClientsData } from '@/data/mockClients';
import type { Campaign } from '@/types/client';

export const CampaignsOverview = ({ clientId }: { clientId: number }) => {
  const [isNewCampaignDialogOpen, setIsNewCampaignDialogOpen] = useState(false);
  const client = mockClientsData.find(c => c.id === clientId);
  const campaigns = client?.campaigns || [];

  const toggleCampaignStatus = (campaignId: number) => {
    // Hier würde normalerweise ein API-Call erfolgen
    console.log('Toggle campaign status:', campaignId);
  };

  return (
    <div className="p-8">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold gradient-text mb-2">
              Kampagnen
            </h1>
            <p className="text-gray-600">
              Verwalten Sie alle aktiven und inaktiven Kampagnen
            </p>
          </div>
          <Button
            onClick={() => setIsNewCampaignDialogOpen(true)}
          >
            <Plus className="w-4 h-4 mr-2" />
            Neue Kampagne
          </Button>
        </div>

        <div className="space-y-4">
          {campaigns.map((campaign) => (
            <div
              key={campaign.id}
              className="bg-white rounded-xl border border-gray-100 shadow-sm p-6 gradient-hover hover:shadow-md transition-all duration-300"
            >
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-1">
                    {campaign.title}
                  </h3>
                  <div className="flex gap-2">
                    <span className="px-2 py-1 rounded-full text-xs bg-amplifa-orange/10 text-amplifa-orange">
                      {campaign.industry}
                    </span>
                    <span className="px-2 py-1 rounded-full text-xs bg-amplifa-pink/10 text-amplifa-pink">
                      {campaign.region}
                    </span>
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => toggleCampaignStatus(campaign.id)}
                  >
                    {campaign.isActive ? (
                      <>
                        <StopCircle className="w-4 h-4 mr-1" />
                        Deaktivieren
                      </>
                    ) : (
                      <>
                        <PlayCircle className="w-4 h-4 mr-1" />
                        Aktivieren
                      </>
                    )}
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                  >
                    <Pencil className="w-4 h-4" />
                  </Button>
                </div>
              </div>

              <div className="flex items-center gap-8 mb-4">
                <div className="flex items-center gap-2">
                  <Users className="w-4 h-4 text-amplifa-orange" />
                  <span className="text-sm text-gray-600">
                    {campaign.leadCount} / {campaign.targetLeadCount} Leads
                  </span>
                </div>
                <div className="text-sm text-gray-500">
                  Letzte Aktualisierung: {new Date(campaign.lastUpdate).toLocaleDateString('de-DE')}
                </div>
              </div>

              <ProgressBar 
                value={campaign.leadCount} 
                total={campaign.targetLeadCount} 
              />
            </div>
          ))}
        </div>

        <Dialog open={isNewCampaignDialogOpen} onOpenChange={setIsNewCampaignDialogOpen}>
          <DialogContent className="sm:max-w-[600px]">
            <DialogHeader>
              <DialogTitle className="gradient-text">Neue Kampagne erstellen</DialogTitle>
              <DialogDescription>
                Erstellen Sie eine neue Kampagne für die Leadgenerierung
              </DialogDescription>
            </DialogHeader>
            {/* Hier würde das Formular für neue Kampagnen kommen */}
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
};
