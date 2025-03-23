
import React from 'react';
import { Button } from '@/components/ui/button';
import { Users, Play } from 'lucide-react';

interface FlowControlsProps {
  showAllLeads: boolean;
  toggleShowAllLeads: () => void;
  simulateFlow: () => void;
  isSimulating: boolean;
}

export const FlowControls: React.FC<FlowControlsProps> = ({
  showAllLeads,
  toggleShowAllLeads,
  simulateFlow,
  isSimulating
}) => {
  return (
    <div className="flex gap-2">
      <Button 
        size="sm" 
        variant="outline" 
        onClick={toggleShowAllLeads}
        className="flex items-center gap-1 bg-white"
      >
        <Users className="w-4 h-4" />
        {showAllLeads ? 'Hide' : 'Show All'} Leads
      </Button>
      <Button 
        size="sm" 
        variant={isSimulating ? "secondary" : "outline"}
        onClick={simulateFlow}
        disabled={isSimulating}
        className="flex items-center gap-1 bg-white"
      >
        <Play className="w-4 h-4" />
        Simulate Flow
      </Button>
    </div>
  );
};
