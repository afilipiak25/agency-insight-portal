
interface ProgressBarProps {
  value: number;
  total: number;
  color: string;
}

export const ProgressBar = ({ value, total, color }: ProgressBarProps) => (
  <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
    <div 
      className={`h-full ${color}`}
      style={{ width: `${(value / total) * 100}%` }}
    />
  </div>
);
