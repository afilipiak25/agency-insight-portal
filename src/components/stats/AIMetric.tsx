
interface AIMetricProps {
  label: string;
  value: number;
}

export const AIMetric = ({ label, value }: AIMetricProps) => (
  <div className="flex items-center justify-between mb-4">
    <span className="text-sm text-gray-600">{label}</span>
    <div className="flex items-center gap-2">
      <span className="text-sm font-medium">{value}%</span>
      <div className="w-32 h-2 bg-gray-100 rounded-full overflow-hidden">
        <div 
          className="h-full bg-[#6366F1]"
          style={{ width: `${value}%` }}
        />
      </div>
    </div>
  </div>
);
