import React from 'react';

interface SpinnerProps {
  size?: 'small' | 'large';
}

export const Spinner = ({ size = 'small' }: SpinnerProps) => {
  const sizeClasses = size === 'large' ? 'w-12 h-12' : 'w-6 h-6';
  const borderWidth = size === 'large' ? 'border-4' : 'border-[3px]';
  const circleColor = size === 'small' ? 'border-white' : 'border-slate-200 dark:border-slate-700';
  const accentColor = size === 'small' ? 'border-t-blue-500' : 'border-t-blue-600';

  return (
    <div className={`${sizeClasses} ${borderWidth} ${circleColor} ${accentColor} border-solid rounded-full animate-spin`}></div>
  );
};
