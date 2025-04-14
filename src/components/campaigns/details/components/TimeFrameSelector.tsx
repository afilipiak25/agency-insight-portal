
import { Button } from '@/components/ui/button';

interface TimeFrameSelectorProps {
  timeFrame: string;
  setTimeFrame: (timeFrame: string) => void;
}

export const TimeFrameSelector = ({ timeFrame, setTimeFrame }: TimeFrameSelectorProps) => {
  return (
    <div className="bg-white border border-gray-200 rounded-full shadow-sm flex overflow-hidden">
      <Button 
        variant="ghost"
        size="sm"
        className={`rounded-full px-3 ${timeFrame === '7d' ? 'bg-indigo-100 text-indigo-700' : 'text-gray-600'}`}
        onClick={() => setTimeFrame('7d')}
      >
        7d
      </Button>
      <Button 
        variant="ghost"
        size="sm"
        className={`rounded-full px-3 ${timeFrame === '30d' ? 'bg-indigo-100 text-indigo-700' : 'text-gray-600'}`}
        onClick={() => setTimeFrame('30d')}
      >
        30d
      </Button>
      <Button 
        variant="ghost"
        size="sm"
        className={`rounded-full px-3 ${timeFrame === '90d' ? 'bg-indigo-100 text-indigo-700' : 'text-gray-600'}`}
        onClick={() => setTimeFrame('90d')}
      >
        90d
      </Button>
    </div>
  );
};
