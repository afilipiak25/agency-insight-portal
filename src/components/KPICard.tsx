
import { cn } from '@/lib/utils';

interface KPICardProps {
  title: string;
  value: string | number;
  change?: number;
  icon: React.ReactNode;
}

export const KPICard = ({ title, value, change, icon }: KPICardProps) => {
  return (
    <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 transition-all duration-300 hover:shadow-md gradient-hover">
      <div className="flex items-start justify-between">
        <div className="space-y-2">
          <p className="text-sm font-medium text-gray-500">{title}</p>
          <p className="text-2xl font-semibold text-gray-900">{value}</p>
          {change !== undefined && (
            <div className={cn(
              "flex items-center text-sm",
              change >= 0 ? "text-green-600" : "text-red-600"
            )}>
              <span>{change >= 0 ? "+" : ""}{change}%</span>
            </div>
          )}
        </div>
        <div className="p-2 bg-amplifa-orange/10 rounded-lg text-amplifa-orange">
          {icon}
        </div>
      </div>
    </div>
  );
};
