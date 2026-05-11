'use client'

import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts'

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8']

interface HoldingsChartInnerProps {
  chartData: Array<{ name: string; value: number }>
}

export default function HoldingsChartInner({ chartData }: HoldingsChartInnerProps) {
  return (
    <div 
      className="h-[300px] w-full" 
      role="img" 
      aria-label={`Donut chart showing asset allocation: ${chartData.map(d => `${d.name}: Rp ${d.value.toLocaleString()}`).join(', ')}`}
      aria-labelledby="holdings-chart-title"
    >
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={chartData}
            cx="50%"
            cy="50%"
            innerRadius={60}
            outerRadius={80}
            paddingAngle={5}
            dataKey="value"
            nameKey="name"
            animationBegin={0}
            animationDuration={1000}
          >
            {chartData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip 
            formatter={(value: number | string | ReadonlyArray<number | string> | undefined) => 
              typeof value === 'number' ? `Rp ${value.toLocaleString()}` : (value?.toString() ?? '')
            }
            contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}
          />
          <Legend 
            verticalAlign="bottom" 
            height={36}
            formatter={(value) => <span className="text-sm font-medium">{value}</span>}
          />
        </PieChart>
      </ResponsiveContainer>
    </div>
  )
}
