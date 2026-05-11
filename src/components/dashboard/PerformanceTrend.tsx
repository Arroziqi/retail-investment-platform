'use client';

import { 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  AreaChart,
  Area
} from 'recharts';
import { PortfolioSnapshot } from '@/types/portfolio';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

interface PerformanceTrendProps {
  data: PortfolioSnapshot[];
}

export function PerformanceTrend({ data }: PerformanceTrendProps) {
  if (!data || data.length === 0) {
    return (
      <Card className="h-[400px] flex flex-col items-center justify-center text-center">
        <CardHeader>
          <CardTitle>Performance Trend</CardTitle>
          <CardDescription>No performance history available yet</CardDescription>
        </CardHeader>
      </Card>
    );
  }

  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle>Performance Trend</CardTitle>
        <CardDescription>Growth of your investments over time</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="h-[300px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={data}>
              <defs>
                <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="oklch(0.205 0 0)" stopOpacity={0.3}/>
                  <stop offset="95%" stopColor="oklch(0.205 0 0)" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="hsl(var(--muted))" />
              <XAxis 
                dataKey="date" 
                axisLine={false}
                tickLine={false}
                tick={{ fontSize: 12, fill: 'hsl(var(--muted-foreground))' }}
                tickFormatter={(date) => new Date(date).toLocaleDateString(undefined, { month: 'short', day: 'numeric' })}
              />
              <YAxis 
                axisLine={false}
                tickLine={false}
                tick={{ fontSize: 12, fill: 'hsl(var(--muted-foreground))' }}
                tickFormatter={(value) => `IDR ${value >= 1000000 ? (value / 1000000).toFixed(1) + 'M' : (value / 1000).toFixed(0) + 'k'}`}
              />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: 'hsl(var(--card))', 
                  borderColor: 'hsl(var(--border))',
                  borderRadius: '8px'
                }}
                formatter={(value: number | string) => [`IDR ${Number(value).toLocaleString()}`, 'Total Value']}
              />
              <Area 
                type="monotone" 
                dataKey="totalValue" 
                stroke="oklch(0.205 0 0)" 
                strokeWidth={2}
                fillOpacity={1} 
                fill="url(#colorValue)" 
              />
              <Line 
                type="monotone" 
                dataKey="investedValue" 
                stroke="hsl(var(--muted-foreground))" 
                strokeDasharray="5 5" 
                dot={false}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}
