import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Activity } from 'lucide-react';

interface RPEData {
  date: string;
  rpe: number;
}

interface RPETrendProps {
  data: RPEData[];
}

export function RPETrend({ data }: RPETrendProps) {
  // Reverse data for chart (oldest to newest, left to right)
  const chartData = [...data].reverse();
  
  return (
    <div className="bg-white rounded-lg border-2 border-gray-300 p-6">
      <div className="flex items-center gap-3 mb-6 pb-4 border-b-2 border-gray-200">
        <Activity className="w-8 h-8 text-gray-700" />
        <h2 className="text-2xl font-medium text-gray-900">RPE & Perceived Effort Trend</h2>
      </div>
      
      <div className="h-[300px]">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={chartData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
            <XAxis 
              dataKey="date" 
              tick={{ fill: '#374151', fontSize: 14 }}
              axisLine={{ stroke: '#9ca3af' }}
            />
            <YAxis 
              domain={[6, 20]}
              ticks={[6, 8, 10, 12, 14, 16, 18, 20]}
              tick={{ fill: '#374151', fontSize: 14 }}
              axisLine={{ stroke: '#9ca3af' }}
              label={{ value: 'RPE (6-20 Scale)', angle: -90, position: 'insideLeft', style: { fill: '#374151', fontSize: 14 } }}
            />
            <Tooltip 
              contentStyle={{ 
                backgroundColor: '#ffffff', 
                border: '2px solid #d1d5db',
                borderRadius: '8px',
                fontSize: '14px'
              }}
              formatter={(value: number) => [`${value} / 20`, 'RPE']}
            />
            <Line 
              type="monotone" 
              dataKey="rpe" 
              stroke="#3b82f6" 
              strokeWidth={3}
              dot={{ fill: '#3b82f6', r: 6 }}
              activeDot={{ r: 8 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
      
      <div className="mt-6 p-4 bg-gray-50 rounded-lg border-2 border-gray-200">
        <p className="text-base text-gray-700">
          <span className="font-medium">RPE Scale:</span> Rate of Perceived Exertion on a scale from 6 (No exertion) to 20 (Maximal exertion)
        </p>
      </div>
    </div>
  );
}