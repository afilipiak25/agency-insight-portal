
interface ProgressBarProps {
  value: number;
  total: number;
  color?: string;
}

export const ProgressBar = ({ value, total, color = "bg-gradient-dashboard" }: ProgressBarProps) => (
  <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
    <div 
      className={color}
      style={{ width: `${(value / total) * 100}%` }}
    />
  </div>
);
