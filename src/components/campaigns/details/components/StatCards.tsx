
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';

export const ResponseStatistics = () => {
  return (
    <Card className="shadow-sm border-gray-100 rounded-xl overflow-hidden hover:shadow-md transition-all duration-300">
      <CardHeader className="pb-0 pt-5">
        <CardTitle className="text-lg font-semibold text-gray-800">Response Statistics</CardTitle>
      </CardHeader>
      <CardContent className="pt-4">
        <div className="space-y-4">
          <div>
            <div className="flex justify-between items-center mb-1">
              <span className="text-sm font-medium">Average Response Time</span>
              <span className="text-sm font-medium text-indigo-600">4.2 hours</span>
            </div>
            <Progress value={70} className="h-2" />
          </div>
          <div>
            <div className="flex justify-between items-center mb-1">
              <span className="text-sm font-medium">Positive Responses</span>
              <span className="text-sm font-medium text-green-600">28%</span>
            </div>
            <Progress value={28} className="h-2" />
          </div>
          <div>
            <div className="flex justify-between items-center mb-1">
              <span className="text-sm font-medium">Negative Responses</span>
              <span className="text-sm font-medium text-red-500">12%</span>
            </div>
            <Progress value={12} className="h-2" />
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export const BestPerformingSegment = () => {
  return (
    <Card className="shadow-sm border-gray-100 rounded-xl overflow-hidden hover:shadow-md transition-all duration-300">
      <CardHeader className="pb-0 pt-5">
        <CardTitle className="text-lg font-semibold text-gray-800">Best Performing Segment</CardTitle>
      </CardHeader>
      <CardContent className="pt-4">
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <span className="font-medium">Tech Industry</span>
            <Badge className="bg-gradient-to-r from-indigo-500 to-purple-600 border-0">Top Performer</Badge>
          </div>
          <div className="space-y-2">
            <div>
              <div className="flex justify-between items-center mb-1">
                <span className="text-xs text-gray-500">Open Rate</span>
                <span className="text-xs font-medium">68%</span>
              </div>
              <div className="w-full h-1.5 bg-gray-100 rounded-full overflow-hidden">
                <div className="h-full bg-indigo-500 rounded-full" style={{ width: '68%' }}></div>
              </div>
            </div>
            <div>
              <div className="flex justify-between items-center mb-1">
                <span className="text-xs text-gray-500">Reply Rate</span>
                <span className="text-xs font-medium">42%</span>
              </div>
              <div className="w-full h-1.5 bg-gray-100 rounded-full overflow-hidden">
                <div className="h-full bg-purple-500 rounded-full" style={{ width: '42%' }}></div>
              </div>
            </div>
            <div>
              <div className="flex justify-between items-center mb-1">
                <span className="text-xs text-gray-500">Meeting Booked</span>
                <span className="text-xs font-medium">18%</span>
              </div>
              <div className="w-full h-1.5 bg-gray-100 rounded-full overflow-hidden">
                <div className="h-full bg-blue-500 rounded-full" style={{ width: '18%' }}></div>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export const GoalProgress = () => {
  return (
    <Card className="shadow-sm border-gray-100 rounded-xl overflow-hidden hover:shadow-md transition-all duration-300">
      <CardHeader className="pb-0 pt-5">
        <CardTitle className="text-lg font-semibold text-gray-800">Goal Progress</CardTitle>
      </CardHeader>
      <CardContent className="pt-4">
        <div className="space-y-4">
          <div>
            <div className="flex justify-between items-center mb-1">
              <span className="text-sm font-medium">Meetings Booked</span>
              <span className="text-sm font-medium">12 / 20</span>
            </div>
            <Progress value={60} className="h-2" />
            <p className="text-xs text-gray-500 mt-1">60% of target</p>
          </div>
          <div>
            <div className="flex justify-between items-center mb-1">
              <span className="text-sm font-medium">Pipeline Generated</span>
              <span className="text-sm font-medium">$42K / $100K</span>
            </div>
            <Progress value={42} className="h-2" />
            <p className="text-xs text-gray-500 mt-1">42% of target</p>
          </div>
          <div>
            <div className="flex justify-between items-center mb-1">
              <span className="text-sm font-medium">Campaign Timeline</span>
              <span className="text-sm font-medium">Day 18 / 30</span>
            </div>
            <Progress value={60} className="h-2" />
            <p className="text-xs text-gray-500 mt-1">60% complete</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
