
import { Users, ArrowUpRight, TrendingUp, TrendingDown, Target } from 'lucide-react';
import { cn } from '@/lib/utils';
import { ClientOverview } from '@/types/client';

interface ClientCardProps {
  client: ClientOverview;
  isHovered: boolean;
  onHover: (id: number | null) => void;
  onClick: (id: number) => void;
}

export const ClientCard = ({ client, isHovered, onHover, onClick }: ClientCardProps) => {
  return (
    <div 
      className={cn(
        "bg-white/70 backdrop-blur-sm rounded-xl border border-gray-100 p-6 transition-all duration-300",
        isHovered ? "shadow-lg transform -translate-y-1" : "hover:shadow-md"
      )}
      onMouseEnter={() => onHover(client.id)}
      onMouseLeave={() => onHover(null)}
    >
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 bg-gradient-to-r from-amplifa-blue to-amplifa-purple rounded-lg">
              <Users className="w-5 h-5 text-white" />
            </div>
            <h2 className="text-lg font-semibold">{client.name}</h2>
            {client.requestType && (
              <span className={cn(
                "px-3 py-1 rounded-full text-sm",
                client.requestType === 'campaign' && "bg-amplifa-blue/10 text-amplifa-blue",
                client.requestType === 'connection' && "bg-red-100 text-red-600",
                client.requestType === 'other' && "bg-gray-100 text-gray-600"
              )}>
                {client.requestType === 'campaign' && 'Neue Kampagne'}
                {client.requestType === 'connection' && 'Connection Fehler'}
                {client.requestType === 'other' && 'Sonstige Anfrage'}
              </span>
            )}
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-gradient-to-br from-amplifa-blue/5 to-transparent p-4 rounded-lg">
              <div className="flex items-center gap-2 mb-1">
                <Target className="w-4 h-4 text-amplifa-blue" />
                <p className="text-sm text-gray-500">Aktive Leads</p>
              </div>
              <p className="text-xl font-semibold text-amplifa-blue">{client.activeLeads.toLocaleString()}</p>
            </div>
            <div className="bg-gradient-to-br from-amplifa-purple/5 to-transparent p-4 rounded-lg">
              <div className="flex items-center gap-2 mb-1">
                {client.conversionRate >= 25 ? (
                  <TrendingUp className="w-4 h-4 text-green-500" />
                ) : (
                  <TrendingDown className="w-4 h-4 text-red-500" />
                )}
                <p className="text-sm text-gray-500">Conversion Rate</p>
              </div>
              <p className="text-xl font-semibold text-amplifa-purple">{client.conversionRate}%</p>
            </div>
            <div className="bg-gradient-to-br from-amplifa-pink/5 to-transparent p-4 rounded-lg">
              <div className="flex items-center gap-2 mb-1">
                <Target className="w-4 h-4 text-amplifa-pink" />
                <p className="text-sm text-gray-500">Monatliche Termine</p>
              </div>
              <div className="flex items-baseline gap-2">
                <p className="text-xl font-semibold text-amplifa-pink">
                  {client.progress}%
                </p>
                <p className="text-sm text-gray-500">
                  von {client.monthlyTarget} Terminen
                </p>
              </div>
            </div>
          </div>
        </div>

        <button
          onClick={() => onClick(client.id)}
          className="p-2 hover:bg-gray-50 rounded-lg transition-all duration-300 hover:scale-110"
        >
          <ArrowUpRight className="w-5 h-5 text-gray-400" />
        </button>
      </div>

      <div className="mt-6 relative">
        <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
          <div 
            className="h-full bg-gradient-to-r from-amplifa-blue via-amplifa-purple to-amplifa-pink transition-all duration-700 ease-in-out"
            style={{ width: `${client.progress}%` }}
          />
        </div>
        <div className="absolute -top-6 right-0 text-sm font-medium text-gray-500">
          Fortschritt: {client.progress}%
        </div>
      </div>
    </div>
  );
};
