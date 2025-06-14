
import React from 'react';
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Activity } from 'lucide-react';

interface Task {
  id: number;
  title: string;
  status: string;
  dueDate: string;
}

interface TasksListProps {
  tasks: Task[];
  getStatusColor: (status: string) => string;
}

export const TasksList = ({ tasks, getStatusColor }: TasksListProps) => {
  return (
    <Card className="lg:col-span-2 card-lift animate-fade-in" style={{ animationDelay: '250ms' }}>
      <CardHeader>
        <CardTitle className="text-lg flex items-center gap-2">
          <Activity className="h-5 w-5 text-amplifa-blue hover-bounce" />
          Tasks
        </CardTitle>
        <CardDescription>Your upcoming tasks and activities</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {tasks.map((task, index) => (
            <div 
              key={task.id} 
              className="bg-white rounded-lg border border-gray-100 p-3 flex items-center justify-between hover:shadow-md transition-all duration-300 hover:border-amplifa-blue/30 animate-slide-in-up cursor-pointer" 
              style={{ animationDelay: `${100 * index}ms` }}
            >
              <div className="flex items-center gap-3">
                <div className="bg-amplifa-blue-light/10 rounded-full p-2 transition-all duration-300 group-hover:bg-amplifa-blue-light/20">
                  <Activity className="h-4 w-4 text-amplifa-blue" />
                </div>
                <div>
                  <p className="text-sm font-medium">{task.title}</p>
                  <p className="text-xs text-gray-500">Due: {task.dueDate}</p>
                </div>
              </div>
              <Badge className={`${getStatusColor(task.status)} transition-all duration-300 hover:scale-105`}>
                {task.status}
              </Badge>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};
