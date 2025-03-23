
import React from 'react';
import { Calendar, MessageSquare } from 'lucide-react';

export const MetricsTab: React.FC = () => {
  return (
    <div className="space-y-4">
      <div className="bg-white rounded-lg border p-4">
        <h3 className="text-sm font-semibold mb-3 text-gray-500">Performance Metrics</h3>
        
        <div className="space-y-3">
          <div>
            <div className="flex justify-between items-center mb-1">
              <span className="text-sm">Delivered</span>
              <span className="text-sm font-medium text-green-600">92%</span>
            </div>
            <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
              <div className="h-full bg-green-500 rounded-full" style={{ width: '92%' }}></div>
            </div>
          </div>
          
          <div>
            <div className="flex justify-between items-center mb-1">
              <span className="text-sm">Opened</span>
              <span className="text-sm font-medium text-blue-600">53%</span>
            </div>
            <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
              <div className="h-full bg-blue-500 rounded-full" style={{ width: '53%' }}></div>
            </div>
          </div>
          
          <div>
            <div className="flex justify-between items-center mb-1">
              <span className="text-sm">Clicked</span>
              <span className="text-sm font-medium text-purple-600">27%</span>
            </div>
            <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
              <div className="h-full bg-purple-500 rounded-full" style={{ width: '27%' }}></div>
            </div>
          </div>
          
          <div>
            <div className="flex justify-between items-center mb-1">
              <span className="text-sm">Replied</span>
              <span className="text-sm font-medium text-orange-600">12%</span>
            </div>
            <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
              <div className="h-full bg-orange-500 rounded-full" style={{ width: '12%' }}></div>
            </div>
          </div>
        </div>
      </div>
      
      <div className="grid grid-cols-2 gap-3">
        <div className="bg-white rounded-lg border p-4">
          <h3 className="text-xs font-semibold mb-2 text-gray-500">Best Performing Time</h3>
          <div className="flex items-center">
            <Calendar className="h-5 w-5 text-blue-500 mr-2" />
            <div>
              <div className="font-medium">Tuesday</div>
              <div className="text-xs text-gray-500">10:00 - 11:00 AM</div>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-lg border p-4">
          <h3 className="text-xs font-semibold mb-2 text-gray-500">Avg. Response Time</h3>
          <div className="flex items-center">
            <MessageSquare className="h-5 w-5 text-green-500 mr-2" />
            <div>
              <div className="font-medium">4.5 hours</div>
              <div className="text-xs text-gray-500">From opening</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
