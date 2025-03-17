
interface StatsCardProps {
  title: string;
  value: number;
  change: number;
  color?: string;
  prefix?: string;
  suffix?: string;
}

export const StatsCard = ({ 
  title, 
  value, 
  change, 
  color = "text-amplifa-orange", // Default to Amplifa orange
  prefix,
  suffix 
}: StatsCardProps) => (
  <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
    <h3 className="text-sm text-gray-500 mb-2">{title}</h3>
    <div className="flex items-baseline gap-2">
      <span className={`text-2xl font-semibold ${color}`}>
        {prefix}{value.toLocaleString()}{suffix}
      </span>
    </div>
    <div className={`text-sm ${change >= 0 ? 'text-amplifa-orange' : 'text-red-500'} flex items-center gap-1`}>
      {change >= 0 ? '↑' : '↓'} {Math.abs(change)}% vom letzten Monat
    </div>
  </div>
);
