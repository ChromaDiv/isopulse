// ============================================================
// IsoPulse — AuditTrendChart Component
// SVG bar chart showing internal audit scores over 6 months
// ============================================================

'use client';

import React, { useState } from 'react';
import Card from '@/components/ui/Card';
import { BarChart3 } from 'lucide-react';
import type { AuditTrendPoint } from '@/lib/types';

interface AuditTrendChartProps {
  data: AuditTrendPoint[];
}

export default function AuditTrendChart({ data }: AuditTrendChartProps) {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const maxScore = 100;
  const chartHeight = 200;
  const chartPadding = { top: 20, right: 16, bottom: 40, left: 40 };
  const barGap = 12;

  const barCount = data.length;

  // Calculate bar positions
  const getBarColor = (score: number) => {
    if (score >= 85) return { fill: '#059669', bg: '#d1fae5' }; // emerald
    if (score >= 70) return { fill: '#4f46e5', bg: '#e0e7ff' }; // indigo
    if (score >= 50) return { fill: '#d97706', bg: '#fef3c7' }; // amber
    return { fill: '#e11d48', bg: '#ffe4e6' }; // rose
  };

  // Compute average
  const avgScore = Math.round(data.reduce((sum, d) => sum + d.score, 0) / data.length);

  return (
    <Card className="animate-fade-in">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-indigo-50">
            <BarChart3 className="w-4 h-4 text-indigo-600" />
          </div>
          <div>
            <h3 className="text-sm font-semibold text-slate-900">Audit Score Trend</h3>
            <p className="text-xs text-slate-500">Internal audit performance (6 months)</p>
          </div>
        </div>
        <div className="text-right">
          <p className="text-lg font-bold text-slate-900">{avgScore}%</p>
          <p className="text-[10px] text-slate-400 font-medium">Average</p>
        </div>
      </div>

      {/* Chart */}
      <div className="relative w-full" style={{ height: chartHeight + chartPadding.top + chartPadding.bottom }}>
        <svg
          width="100%"
          height="100%"
          viewBox={`0 0 400 ${chartHeight + chartPadding.top + chartPadding.bottom}`}
          preserveAspectRatio="xMidYMid meet"
          className="overflow-visible"
        >
          {/* Grid lines */}
          {[0, 25, 50, 75, 100].map((tick) => {
            const y = chartPadding.top + chartHeight - (tick / maxScore) * chartHeight;
            return (
              <g key={tick}>
                <line
                  x1={chartPadding.left}
                  y1={y}
                  x2={400 - chartPadding.right}
                  y2={y}
                  stroke="#f1f5f9"
                  strokeWidth="1"
                />
                <text
                  x={chartPadding.left - 8}
                  y={y + 4}
                  textAnchor="end"
                  className="text-[10px] fill-slate-400"
                  fontFamily="Inter, sans-serif"
                >
                  {tick}
                </text>
              </g>
            );
          })}

          {/* Average line */}
          {(() => {
            const y = chartPadding.top + chartHeight - (avgScore / maxScore) * chartHeight;
            return (
              <line
                x1={chartPadding.left}
                y1={y}
                x2={400 - chartPadding.right}
                y2={y}
                stroke="#4f46e5"
                strokeWidth="1"
                strokeDasharray="4 4"
                opacity="0.4"
              />
            );
          })()}

          {/* Bars */}
          {data.map((point, index) => {
            const barWidth = (400 - chartPadding.left - chartPadding.right - barGap * (barCount - 1)) / barCount;
            const x = chartPadding.left + index * (barWidth + barGap);
            const barHeight = (point.score / maxScore) * chartHeight;
            const y = chartPadding.top + chartHeight - barHeight;
            const colors = getBarColor(point.score);
            const isHovered = hoveredIndex === index;

            return (
              <g
                key={point.month}
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
                className="cursor-pointer"
              >
                {/* Bar background */}
                <rect
                  x={x}
                  y={chartPadding.top}
                  width={barWidth}
                  height={chartHeight}
                  rx="4"
                  fill={colors.bg}
                  opacity={isHovered ? 0.6 : 0.3}
                  className="transition-opacity duration-200"
                />

                {/* Bar */}
                <rect
                  x={x}
                  y={y}
                  width={barWidth}
                  height={barHeight}
                  rx="4"
                  fill={colors.fill}
                  opacity={isHovered ? 1 : 0.85}
                  className="transition-all duration-300"
                >
                  <animate
                    attributeName="height"
                    from="0"
                    to={barHeight}
                    dur="0.8s"
                    begin={`${index * 0.1}s`}
                    fill="freeze"
                  />
                  <animate
                    attributeName="y"
                    from={chartPadding.top + chartHeight}
                    to={y}
                    dur="0.8s"
                    begin={`${index * 0.1}s`}
                    fill="freeze"
                  />
                </rect>

                {/* Score label on hover */}
                {isHovered && (
                  <g>
                    <rect
                      x={x + barWidth / 2 - 22}
                      y={y - 28}
                      width="44"
                      height="22"
                      rx="6"
                      fill="#1e293b"
                    />
                    <text
                      x={x + barWidth / 2}
                      y={y - 14}
                      textAnchor="middle"
                      className="text-[11px] fill-white font-semibold"
                      fontFamily="Inter, sans-serif"
                    >
                      {point.score}%
                    </text>
                  </g>
                )}

                {/* Month label */}
                <text
                  x={x + barWidth / 2}
                  y={chartPadding.top + chartHeight + 20}
                  textAnchor="middle"
                  className={`text-[11px] font-medium ${isHovered ? 'fill-slate-800' : 'fill-slate-400'}`}
                  fontFamily="Inter, sans-serif"
                >
                  {point.month}
                </text>

                {/* Audit count */}
                <text
                  x={x + barWidth / 2}
                  y={chartPadding.top + chartHeight + 34}
                  textAnchor="middle"
                  className="text-[9px] fill-slate-300"
                  fontFamily="Inter, sans-serif"
                >
                  {point.auditsCompleted} audits
                </text>
              </g>
            );
          })}
        </svg>
      </div>
    </Card>
  );
}
