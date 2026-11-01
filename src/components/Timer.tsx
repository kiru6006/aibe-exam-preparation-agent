import React, { useEffect, useState } from 'react';
import { Clock, AlertTriangle } from 'lucide-react';

interface TimerProps {
  durationMinutes: number;
  onExpire: () => void;
  isPaused?: boolean;
  onTick?: (remainingSeconds: number) => void;
}

export const Timer: React.FC<TimerProps> = ({
  durationMinutes,
  onExpire,
  isPaused = false,
  onTick
}) => {
  const [secondsLeft, setSecondsLeft] = useState<number>(durationMinutes * 60);

  useEffect(() => {
    if (isPaused || secondsLeft <= 0) return;

    const interval = setInterval(() => {
      setSecondsLeft(prev => {
        const next = prev - 1;
        if (onTick) onTick(next);
        if (next <= 0) {
          clearInterval(interval);
          onExpire();
          return 0;
        }
        return next;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [isPaused, secondsLeft, onExpire, onTick]);

  const hours = Math.floor(secondsLeft / 3600);
  const minutes = Math.floor((secondsLeft % 3600) / 60);
  const seconds = secondsLeft % 60;

  const isWarning = secondsLeft <= 300 && secondsLeft > 0;

  const formatDigits = (n: number) => String(n).padStart(2, '0');

  return (
    <div 
      className={`flex items-center gap-2 px-3 py-1 rounded-lg border text-xs font-mono font-medium ${
        isWarning 
          ? 'bg-[#FEF2F2] text-[#991B1B] border-[#FECACA] animate-pulse' 
          : 'bg-white text-[#2A2825] border-[#E8E2DA]'
      }`}
      role="timer"
      aria-live="polite"
      aria-label={`Time remaining: ${hours > 0 ? `${hours} hours ` : ''}${minutes} minutes ${seconds} seconds`}
    >
      {isWarning ? (
        <AlertTriangle className="w-3.5 h-3.5 text-[#DC2626]" />
      ) : (
        <Clock className="w-3.5 h-3.5 text-[#78716C]" />
      )}
      <span>
        {hours > 0 ? `${formatDigits(hours)}:` : ''}
        {formatDigits(minutes)}:{formatDigits(seconds)}
      </span>
      {isWarning && <span className="text-[10px] font-sans text-[#DC2626] font-semibold">5m left</span>}
    </div>
  );
};
