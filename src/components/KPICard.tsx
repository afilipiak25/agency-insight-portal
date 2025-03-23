
import { cn } from '@/lib/utils';

interface KPICardProps {
  title: string;
  value: string | number;
  change?: number;
  icon: React.ReactNode;
}

export const KPICard = ({ title, value, change, icon }: KPICardProps) => {
  return (
    <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 card-lift gradient-hover">
      <div className="flex items-start justify-between">
        <div className="space-y-2">
          <p className="text-sm font-medium text-gray-500">{title}</p>
          <p className="text-2xl font-semibold text-gray-900 animate-pop">{value}</p>
          {change !== undefined && (
            <div className={cn(
              "flex items-center text-sm animate-slide-in",
              change >= 0 ? "text-green-600" : "text-red-600"
            )} style={{ animationDelay: '100ms' }}>
              <span>{change >= 0 ? "+" : ""}{change}%</span>
            </div>
          )}
        </div>
        <div className="p-2 bg-amplifa-orange/10 rounded-lg text-amplifa-orange transition-all duration-300 hover:bg-amplifa-orange/20 hover-bounce">
          {icon}
        </div>
      </div>
    </div>
  );
};
