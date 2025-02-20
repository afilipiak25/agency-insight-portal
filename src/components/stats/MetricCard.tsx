
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
  color = "bg-[#6366F1]"
}: MetricCardProps) => (
  <div className="bg-white p-6 rounded-xl">
    <h3 className="text-sm text-gray-500 mb-2">{title}</h3>
    <div className="flex items-end gap-2 mb-3">
      <span className="text-2xl font-semibold">{value.toLocaleString()}</span>
      <span className="text-gray-400 text-sm mb-1">/ {total.toLocaleString()}</span>
    </div>
    <ProgressBar value={value} total={total} color={color} />
  </div>
);
