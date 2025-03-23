
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
  color = "text-amplifa-orange", // Updated to new orange
  prefix,
  suffix 
}: StatsCardProps) => (
  <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 card-lift gradient-hover">
    <h3 className="text-sm text-gray-500 mb-2">{title}</h3>
    <div className="flex items-baseline gap-2 animate-fade-in">
      <span className={`text-2xl font-semibold ${color} animate-pop`}>
        {prefix}{value.toLocaleString()}{suffix}
      </span>
    </div>
    <div className={`text-sm ${change >= 0 ? 'text-amplifa-orange' : 'text-red-500'} flex items-center gap-1 mt-1 animate-slide-in`} style={{ animationDelay: '100ms' }}>
      {change >= 0 ? '↑' : '↓'} {Math.abs(change)}% vom letzten Monat
    </div>
  </div>
);
