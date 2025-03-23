
import React from 'react';
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from '@/components/ui/card';
import { BellRing } from 'lucide-react';

interface Notification {
  id: number;
  message: string;
  time: string;
}

interface NotificationsCardProps {
  notifications: Notification[];
}

export const NotificationsCard = ({ notifications }: NotificationsCardProps) => {
  return (
    <Card className="card-lift animate-fade-in" style={{ animationDelay: '200ms' }}>
      <CardHeader>
        <CardTitle className="text-lg flex items-center gap-2">
          <BellRing className="h-5 w-5 text-amplifa-pink hover-bounce" />
          Notifications
        </CardTitle>
        <CardDescription>Your recent notifications</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {notifications.map((notification, index) => (
            <div 
              key={notification.id} 
              className="bg-amplifa-purple/10 rounded-lg p-3 transition-all duration-300 hover:shadow-md hover:bg-amplifa-purple/15 cursor-pointer animate-slide-in-up" 
              style={{ animationDelay: `${100 * index}ms` }}
            >
              <div className="flex items-start gap-3">
                <div className="bg-white rounded-full p-1 mt-0.5 shadow-sm">
                  <BellRing className="h-4 w-4 text-amplifa-purple" />
                </div>
                <div>
                  <p className="text-sm font-medium">{notification.message}</p>
                  <p className="text-xs text-gray-500">{notification.time}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};
