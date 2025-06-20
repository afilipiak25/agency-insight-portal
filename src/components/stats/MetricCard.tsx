
import { ProgressBar } from './ProgressBar';

interface MetricCardProps {
  title: string;
  value: number;
  total: number;
  color?: string;
}

export const MetricCard = ({ 
  title, 
  value, 
  total, 
  color = "bg-gradient-amplifa" // Updated to use the Amplifa gradient
}: MetricCardProps) => (
  <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 card-lift gradient-hover">
    <h3 className="text-sm text-gray-500 mb-2">{title}</h3>
    <div className="flex items-end gap-2 mb-3 animate-fade-in">
      <span className="text-2xl font-semibold text-amplifa-orange animate-pop">{value.toLocaleString()}</span>
      <span className="text-gray-400 text-sm mb-1">/ {total.toLocaleString()}</span>
    </div>
    <ProgressBar value={value} total={total} color={color} />
  </div>
);
