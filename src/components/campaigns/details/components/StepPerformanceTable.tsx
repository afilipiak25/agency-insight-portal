
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Info, Filter } from 'lucide-react';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';

export const StepPerformanceTable = () => {
  return (
    <Card className="shadow-sm border-gray-100 rounded-xl overflow-hidden hover:shadow-md transition-all duration-300">
      <CardHeader className="pb-0 pt-5 border-b border-gray-50">
        <div className="flex justify-between items-center">
          <CardTitle className="text-lg font-semibold text-gray-800 flex items-center gap-2">
            Step-by-Step Performance
            <Popover>
              <PopoverTrigger asChild>
                <Info className="h-4 w-4 text-gray-400 cursor-pointer hover:text-gray-600 transition-colors" />
              </PopoverTrigger>
              <PopoverContent className="w-80">
                <div className="space-y-2">
                  <h4 className="font-medium">Understanding Step Performance</h4>
                  <p className="text-sm text-gray-500">
                    This table shows detailed metrics for each step in your campaign workflow. Track deliverability, engagement, and conversion rates across all emails.
                  </p>
                </div>
              </PopoverContent>
            </Popover>
          </CardTitle>
          <Button variant="outline" size="sm" className="rounded-full flex items-center gap-1.5 hover:bg-gray-100 border-gray-200 text-gray-600">
            <Filter className="w-4 h-4" />
            Filter
          </Button>
        </div>
      </CardHeader>
      <CardContent className="pt-4">
        <div className="overflow-hidden rounded-lg border border-gray-100">
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-gray-50">
                <th className="py-3 px-4 text-left text-sm font-medium text-gray-500">Step</th>
                <th className="py-3 px-4 text-left text-sm font-medium text-gray-500">Delivered</th>
                <th className="py-3 px-4 text-left text-sm font-medium text-gray-500">Opened</th>
                <th className="py-3 px-4 text-left text-sm font-medium text-gray-500">Clicked</th>
                <th className="py-3 px-4 text-left text-sm font-medium text-gray-500">Replied</th>
                <th className="py-3 px-4 text-left text-sm font-medium text-gray-500">Conversion</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {[1, 2, 3].map((i) => (
                <tr key={i} className="hover:bg-gray-50 transition-colors">
                  <td className="py-3 px-4 font-medium">
                    <div className="flex items-center gap-2">
                      <div className="flex items-center justify-center w-8 h-8 rounded-full bg-indigo-100 text-indigo-700 font-medium text-sm">E{i}</div>
                      <span>Email {i}</span>
                    </div>
                  </td>
                  <td className="py-3 px-4">
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-medium">{95 - i * 5}%</span>
                      <div className="w-24 h-2 bg-gray-100 rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-indigo-500 rounded-full"
                          style={{ width: `${95 - i * 5}%` }}
                        />
                      </div>
                    </div>
                  </td>
                  <td className="py-3 px-4">
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-medium">{55 - i * 5}%</span>
                      <div className="w-24 h-2 bg-gray-100 rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-blue-500 rounded-full"
                          style={{ width: `${55 - i * 5}%` }}
                        />
                      </div>
                    </div>
                  </td>
                  <td className="py-3 px-4">
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-medium">{45 - i * 5}%</span>
                      <div className="w-24 h-2 bg-gray-100 rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-violet-500 rounded-full"
                          style={{ width: `${45 - i * 5}%` }}
                        />
                      </div>
                    </div>
                  </td>
                  <td className="py-3 px-4">
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-medium">{35 - i * 5}%</span>
                      <div className="w-24 h-2 bg-gray-100 rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-purple-500 rounded-full"
                          style={{ width: `${35 - i * 5}%` }}
                        />
                      </div>
                    </div>
                  </td>
                  <td className="py-3 px-4">
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-medium">{25 - i * 5}%</span>
                      <div className="w-24 h-2 bg-gray-100 rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-gradient-to-r from-indigo-500 to-purple-600 rounded-full"
                          style={{ width: `${25 - i * 5}%` }}
                        />
                      </div>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </CardContent>
    </Card>
  );
};
