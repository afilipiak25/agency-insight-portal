
import React from 'react';
import { Sheet, SheetContent, SheetHeader, SheetTitle } from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { MessageSquare, BarChart3, Users, Pencil } from 'lucide-react';
import { WorkflowStep } from '../../types/workflow';
import { ContentTab } from './preview-tabs/ContentTab';
import { MetricsTab } from './preview-tabs/MetricsTab';
import { LeadsTab } from './preview-tabs/LeadsTab';
import { getStepIcon } from './WorkflowNode';
import { Node } from '@xyflow/react';

interface StepPreviewSheetProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  selectedStep: WorkflowStep | null;
  stepLeads: any[];
  previewTab: string;
  setPreviewTab: (tab: string) => void;
}

export const StepPreviewSheet: React.FC<StepPreviewSheetProps> = ({
  isOpen,
  onOpenChange,
  selectedStep,
  stepLeads,
  previewTab,
  setPreviewTab
}) => {
  const closePreview = () => {
    onOpenChange(false);
  };

  if (!selectedStep) return null;

  return (
    <Sheet open={isOpen} onOpenChange={onOpenChange}>
      <SheetContent className="sm:max-w-[600px] p-0 overflow-y-auto">
        <SheetHeader className="p-6 pb-2 border-b">
          <div className="flex items-center gap-3">
            <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
              selectedStep.channel === 'email' ? 'bg-pink-100' : 
              selectedStep.channel === 'linkedin' ? 'bg-blue-100' : 
              selectedStep.channel === 'profile-visit' ? 'bg-gray-100' : 
              selectedStep.channel === 'instagram' ? 'bg-pink-200' : 'bg-purple-100'
            }`}>
              {getStepIcon(selectedStep)}
            </div>
            <div>
              <SheetTitle>{selectedStep.title}</SheetTitle>
              <div className="text-sm text-gray-500">
                {selectedStep.waitDays > 0 && `Sent ${selectedStep.waitDays} days after previous step`}
              </div>
            </div>
          </div>
        </SheetHeader>
        
        <Tabs defaultValue={previewTab} className="w-full" onValueChange={setPreviewTab}>
          <TabsList className="grid grid-cols-3 p-4">
            <TabsTrigger value="content" className="flex items-center gap-2">
              <MessageSquare className="w-4 h-4" />
              <span>Content</span>
            </TabsTrigger>
            <TabsTrigger value="metrics" className="flex items-center gap-2">
              <BarChart3 className="w-4 h-4" />
              <span>Metrics</span>
            </TabsTrigger>
            <TabsTrigger value="leads" className="flex items-center gap-2">
              <Users className="w-4 h-4" />
              <span>Leads</span>
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="content">
            <ContentTab selectedStep={selectedStep} />
          </TabsContent>
          
          <TabsContent value="metrics">
            <MetricsTab />
          </TabsContent>
          
          <TabsContent value="leads">
            <LeadsTab stepLeads={stepLeads} />
          </TabsContent>
        </Tabs>
        
        <div className="p-4 border-t mt-auto">
          <div className="flex justify-between">
            <Button variant="outline" onClick={closePreview}>
              Close
            </Button>
            <Button variant="purple" className="gap-1">
              <Pencil className="h-4 w-4" /> Edit Step
            </Button>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
};
