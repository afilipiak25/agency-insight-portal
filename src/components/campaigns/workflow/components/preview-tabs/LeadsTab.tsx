
import React from 'react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Users, BarChart3, User } from 'lucide-react';

interface LeadsTabProps {
  stepLeads: any[];
}

export const LeadsTab: React.FC<LeadsTabProps> = ({ stepLeads }) => {
  return (
    <div className="space-y-4">
      <div className="bg-white rounded-lg border">
        <div className="p-3 border-b">
          <h3 className="text-sm font-semibold text-gray-700">Leads in this step</h3>
        </div>
        <div className="divide-y">
          {stepLeads.length > 0 ? (
            stepLeads.map((lead, index) => (
              <div key={index} className="p-3 hover:bg-gray-50">
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center mr-3">
                      <User className="h-4 w-4 text-gray-500" />
                    </div>
                    <div>
                      <div className="font-medium text-sm">{lead.firstName} {lead.lastName}</div>
                      <div className="text-xs text-gray-500">{lead.jobTitle} at {lead.companyName}</div>
                    </div>
                  </div>
                  <Badge variant={lead.status === 'active' ? 'green' : 'blue'} className="text-xs">
                    {lead.status === 'active' ? 'Active' : 'Pending'}
                  </Badge>
                </div>
              </div>
            ))
          ) : (
            <div className="p-6 text-center">
              <p className="text-sm text-gray-500">No leads have reached this step yet.</p>
            </div>
          )}
        </div>
      </div>
      
      <div className="flex justify-between">
        <Button size="sm" variant="outline" className="text-xs">
          <Users className="h-3.5 w-3.5 mr-1.5" /> View All Leads
        </Button>
        <Button size="sm" variant="outline" className="text-xs text-purple-600 border-purple-200 hover:bg-purple-50">
          <BarChart3 className="h-3.5 w-3.5 mr-1.5" /> Lead Analysis
        </Button>
      </div>
    </div>
  );
};
