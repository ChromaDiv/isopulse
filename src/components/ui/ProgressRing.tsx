// ============================================================
// IsoPulse — ProgressRing Component
// Animated SVG circular progress indicator
// ============================================================

'use client';

import React, { useEffect, useState } from 'react';

interface ProgressRingProps {
  value: number;       // 0 - 100
  size?: number;       // px
  strokeWidth?: number;
  color?: string;
  trackColor?: string;
  className?: string;
  showLabel?: boolean;
  label?: string;
}

export default function ProgressRing({
  value,
  size = 160,
  strokeWidth = 10,
  color = '#4f46e5',
  trackColor = '#e2e8f0',
  className = '',
  showLabel = true,
  label,
}: ProgressRingProps) {
  const [animatedValue, setAnimatedValue] = useState(0);

  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const dashOffset = circumference - (animatedValue / 100) * circumference;
  const center = size / 2;

  useEffect(() => {
    // Delay animation slightly for visual effect on mount
    const timer = setTimeout(() => {
      setAnimatedValue(value);
    }, 200);
    return () => clearTimeout(timer);
  }, [value]);

  // Determine color based on value
  const getScoreColor = () => {
    if (value >= 85) return '#059669'; // emerald-600
    if (value >= 70) return '#4f46e5'; // indigo-600
    if (value >= 50) return '#d97706'; // amber-600
    return '#e11d48';                  // rose-600
  };

  const activeColor = color === '#4f46e5' ? getScoreColor() : color;

  return (
    <div className={`relative inline-flex items-center justify-center ${className}`}>
      <svg
        width={size}
        height={size}
        viewBox={`0 0 ${size} ${size}`}
        className="transform -rotate-90"
      >
        {/* Track */}
        <circle
          cx={center}
          cy={center}
          r={radius}
          fill="none"
          stroke={trackColor}
          strokeWidth={strokeWidth}
          strokeLinecap="round"
        />
        {/* Progress */}
        <circle
          cx={center}
          cy={center}
          r={radius}
          fill="none"
          stroke={activeColor}
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={dashOffset}
          className="progress-ring-circle"
        />
      </svg>
      {showLabel && (
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span
            className="text-3xl font-bold tracking-tight"
            style={{ color: activeColor }}
          >
            {Math.round(animatedValue)}%
          </span>
          {label && (
            <span className="text-xs text-slate-500 font-medium mt-0.5">{label}</span>
          )}
        </div>
      )}
    </div>
  );
}
