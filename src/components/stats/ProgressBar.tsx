
import React from 'react';

interface ProgressBarProps {
  value: number;
  total: number;
  color?: string;
  animated?: boolean;
}

export const ProgressBar = ({ 
  value, 
  total, 
  color = "bg-gradient-amplifa", // Updated to use the new gradient
  animated = true,
}: ProgressBarProps) => {
  const percentage = (value / total) * 100;
  
  return (
    <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
      <div 
        className={`h-full ${color} ${animated ? 'animate-shimmer bg-[length:200%_100%]' : ''} transition-all duration-1000 ease-out`}
        style={{ 
          width: `${percentage}%`, 
          backgroundImage: animated ? 'linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent)' : 'none',
          backgroundSize: '200% 100%',
          backgroundPosition: 'right -100% center',
        }}
      />
    </div>
  );
};
