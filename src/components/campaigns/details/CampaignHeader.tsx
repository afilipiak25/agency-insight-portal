
import { useMemo } from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';
import { Play, Pause, Copy, ArrowLeft, Download, MoreHorizontal } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { CampaignRow } from '@/pages/Campaigns';

interface CampaignHeaderProps {
  campaign: CampaignRow;
}

export const CampaignHeader = ({ campaign }: CampaignHeaderProps) => {
  const navigate = useNavigate();
  
  const isActive = useMemo(() => {
    return campaign.status === 'active';
  }, [campaign.status]);

  return (
    <div className="flex justify-between items-start mb-6">
      <div className="flex items-center gap-4">
        <Button 
          variant="ghost" 
          size="sm" 
          onClick={() => navigate('/campaigns')}
          className="hover:-translate-y-0.5 transition-transform"
        >
          <ArrowLeft className="w-4 h-4 mr-1" />
          Back
        </Button>

        <div>
          <h1 className="text-3xl font-bold text-dashboard-primary flex items-center gap-3">
            {campaign.name}
            <Badge className={`${isActive ? 'bg-amplifa-orange' : 'bg-gray-400'} text-white`}>
              {isActive ? 'Active' : 'Inactive'}
            </Badge>
          </h1>
          <p className="text-gray-600 mt-1">Created by Anthony Filipiak • Last updated 2 days ago</p>
        </div>
      </div>

      <div className="flex gap-2">
        <Button 
          variant="outline"
          size="sm"
          className="hover:-translate-y-0.5 transition-transform"
        >
          <Download className="w-4 h-4 mr-1.5" />
          Export
        </Button>

        <Button 
          variant="outline"
          size="sm"
          className="hover:-translate-y-0.5 transition-transform"
        >
          <Copy className="w-4 h-4 mr-1.5" />
          Duplicate
        </Button>

        <Button 
          variant={isActive ? "outline" : "gradient"}
          size="sm" 
          className="hover:-translate-y-0.5 transition-transform"
        >
          {isActive ? (
            <>
              <Pause className="w-4 h-4 mr-1.5" />
              Pause
            </>
          ) : (
            <>
              <Play className="w-4 h-4 mr-1.5" />
              Activate
            </>
          )}
        </Button>

        <Button 
          variant="ghost" 
          size="icon" 
          className="hover:-translate-y-0.5 transition-transform"
        >
          <MoreHorizontal className="w-4 h-4" />
        </Button>
      </div>
    </div>
  );
};
