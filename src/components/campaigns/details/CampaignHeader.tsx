
import { useMemo } from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  Play, Pause, Copy, ArrowLeft, Download, 
  MoreHorizontal, Clock, Calendar
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { CampaignRow } from '@/pages/Campaigns';
import { motion } from 'framer-motion';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

interface CampaignHeaderProps {
  campaign: CampaignRow;
}

export const CampaignHeader = ({ campaign }: CampaignHeaderProps) => {
  const navigate = useNavigate();
  
  const isActive = useMemo(() => {
    return campaign.status === 'active';
  }, [campaign.status]);

  return (
    <motion.div 
      className="flex flex-col sm:flex-row justify-between items-start mb-6 gap-4"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="flex items-start gap-4">
        <Button 
          variant="ghost" 
          size="sm" 
          onClick={() => navigate('/campaigns')}
          className="hover:-translate-y-0.5 transition-transform rounded-full h-8 w-8 p-0 mr-2"
        >
          <ArrowLeft className="w-4 h-4" />
        </Button>

        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-3xl font-bold text-gray-900">
              {campaign.name}
            </h1>
            <Badge className={`${isActive ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-700'}`}>
              {isActive ? 'Active' : 'Inactive'}
            </Badge>
          </div>
          
          <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-4 mt-2">
            <div className="flex items-center gap-2">
              <Avatar className="h-6 w-6">
                <AvatarImage src="https://github.com/shadcn.png" />
                <AvatarFallback>AF</AvatarFallback>
              </Avatar>
              <span className="text-gray-600 text-sm">Anthony Filipiak</span>
            </div>
            
            <div className="flex items-center gap-4 text-sm text-gray-500">
              <div className="flex items-center gap-1">
                <Clock className="w-4 h-4 text-gray-400" />
                <span>Updated 2 days ago</span>
              </div>
              <div className="flex items-center gap-1">
                <Calendar className="w-4 h-4 text-gray-400" />
                <span>Created Mar 24, 2025</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="flex gap-2 self-end sm:self-auto">
        <Button 
          variant="outline"
          size="sm"
          className="hover:-translate-y-0.5 transition-transform rounded-lg"
        >
          <Download className="w-4 h-4 mr-1.5" />
          Export
        </Button>

        <Button 
          variant="outline"
          size="sm"
          className="hover:-translate-y-0.5 transition-transform rounded-lg"
        >
          <Copy className="w-4 h-4 mr-1.5" />
          Duplicate
        </Button>

        <Button 
          variant={isActive ? "outline" : "default"}
          size="sm" 
          className={`hover:-translate-y-0.5 transition-transform rounded-lg ${
            !isActive ? 'bg-gradient-to-r from-indigo-500 to-purple-600 text-white' : ''
          }`}
        >
          {isActive ? (
            <>
              <Pause className="w-4 h-4 mr-1.5" />
              Pause
            </>
          ) : (
            <>
              <Play className="w-4 h-4 mr-1.5" />
              Activate
            </>
          )}
        </Button>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button 
              variant="ghost" 
              size="icon" 
              className="hover:-translate-y-0.5 transition-transform rounded-full h-9 w-9"
            >
              <MoreHorizontal className="w-4 h-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-48">
            <DropdownMenuItem>Edit Campaign</DropdownMenuItem>
            <DropdownMenuItem>Campaign Settings</DropdownMenuItem>
            <DropdownMenuItem>View Analytics</DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="text-red-600">Delete Campaign</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </motion.div>
  );
};
