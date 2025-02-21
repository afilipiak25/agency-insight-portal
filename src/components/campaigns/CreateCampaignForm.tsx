
import { useState } from "react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { WorkflowSection } from "./WorkflowSection";

export const CreateCampaignForm = () => {
  return (
    <div className="p-6">
      <div className="space-y-8">
        <Tabs defaultValue="workflow" className="w-full">
          <div className="flex items-center justify-between mb-8">
            <TabsList>
              <TabsTrigger value="targeting">1. Targeting</TabsTrigger>
              <TabsTrigger value="workflow">2. Workflow</TabsTrigger>
              <TabsTrigger value="pitch">3. Pitch</TabsTrigger>
              <TabsTrigger value="outreach">4. Outreach</TabsTrigger>
              <TabsTrigger value="settings">5. Settings</TabsTrigger>
            </TabsList>
          </div>

          <TabsContent value="targeting" className="m-0">
            <div className="text-center p-8 text-gray-500">
              Targeting content will go here
            </div>
          </TabsContent>
          
          <TabsContent value="workflow" className="m-0 h-[800px]">
            <WorkflowSection />
          </TabsContent>

          <TabsContent value="pitch" className="m-0">
            <div className="text-center p-8 text-gray-500">
              Pitch content will go here
            </div>
          </TabsContent>

          <TabsContent value="outreach" className="m-0">
            <div className="text-center p-8 text-gray-500">
              Outreach content will go here
            </div>
          </TabsContent>

          <TabsContent value="settings" className="m-0">
            <div className="text-center p-8 text-gray-500">
              Settings content will go here
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};
