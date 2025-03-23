
import React from 'react';
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from '@/components/ui/card';

interface Event {
  id: number;
  title: string;
  time: string;
  date: string;
}

interface UpcomingEventsProps {
  events: Event[];
}

export const UpcomingEvents = ({ events }: UpcomingEventsProps) => {
  return (
    <Card className="card-lift animate-fade-in" style={{ animationDelay: '300ms' }}>
      <CardHeader>
        <CardTitle className="text-lg gradient-text">Upcoming Events</CardTitle>
        <CardDescription>Your schedule for the coming days</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {events.map((event, index) => (
            <div 
              key={event.id} 
              className="flex items-start gap-3 p-3 bg-amplifa-blue/10 rounded-lg transition-all duration-300 hover:shadow-md hover:bg-amplifa-blue/15 cursor-pointer animate-slide-in-up" 
              style={{ animationDelay: `${100 * index}ms` }}
            >
              <div className="rounded-lg bg-white p-2 flex flex-col items-center min-w-[40px] shadow-sm">
                <span className="text-xs font-bold text-amplifa-blue">{event.date.split('-')[2]}</span>
                <span className="text-xs text-gray-600">{new Date(event.date).toLocaleString('default', { month: 'short' })}</span>
              </div>
              <div>
                <p className="text-sm font-medium">{event.title}</p>
                <p className="text-xs text-gray-600">{event.time}</p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};
