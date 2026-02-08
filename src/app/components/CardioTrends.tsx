import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ReferenceLine, Label } from 'recharts';
import { Activity, Clock } from 'lucide-react';

interface CardioTrendData {
  date: string;
  avgHeartRate: number;
  peakHeartRate: number;
  duration: number;
}

interface CardioTrendsProps {
  data: CardioTrendData[];
  targetHRMin?: number;
  targetHRMax?: number;
}

export function CardioTrends({ data, targetHRMin, targetHRMax }: CardioTrendsProps) {
  // Reverse data for chart (oldest to newest, left to right)
  const chartData = [...data].reverse();
  
  return (
    <div className="bg-white rounded-lg border-2 border-gray-300 p-6">
      <div className="flex items-center gap-3 mb-6 pb-4 border-b-2 border-gray-200">
        <Activity className="w-8 h-8 text-gray-700" />
        <h2 className="text-2xl font-medium text-gray-900">Cardiovascular Trends</h2>
      </div>
      
      <div className="space-y-8">
        {/* Heart Rate Chart */}
        <div>
          <h3 className="text-lg font-medium text-gray-900 mb-4">Heart Rate Progression</h3>
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
                  tick={{ fill: '#374151', fontSize: 14 }}
                  axisLine={{ stroke: '#9ca3af' }}
                  label={{ value: 'Heart Rate (bpm)', angle: -90, position: 'insideLeft', style: { fill: '#374151', fontSize: 14 } }}
                />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: '#ffffff', 
                    border: '2px solid #d1d5db',
                    borderRadius: '8px',
                    fontSize: '14px'
                  }}
                />
                {targetHRMin !== undefined && targetHRMax !== undefined && (
                  <ReferenceLine 
                    y={(targetHRMin + targetHRMax) / 2} 
                    stroke="#10b981" 
                    strokeDasharray="5 5"
                    strokeWidth={2}
                    label={{ value: 'Target HR', position: 'right', fill: '#10b981', fontSize: 12 }}
                  />
                )}
                <Line 
                  type="monotone" 
                  dataKey="avgHeartRate" 
                  stroke="#3b82f6" 
                  strokeWidth={3}
                  name="Avg HR"
                  dot={{ fill: '#3b82f6', r: 6 }}
                  activeDot={{ r: 8 }}
                />
                <Line 
                  type="monotone" 
                  dataKey="peakHeartRate" 
                  stroke="#ef4444" 
                  strokeWidth={3}
                  name="Peak HR"
                  dot={{ fill: '#ef4444', r: 6 }}
                  activeDot={{ r: 8 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Duration Chart */}
        <div>
          <h3 className="text-lg font-medium text-gray-900 mb-4">Cardio Duration Progression</h3>
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
                  tick={{ fill: '#374151', fontSize: 14 }}
                  axisLine={{ stroke: '#9ca3af' }}
                  label={{ value: 'Duration (minutes)', angle: -90, position: 'insideLeft', style: { fill: '#374151', fontSize: 14 } }}
                />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: '#ffffff', 
                    border: '2px solid #d1d5db',
                    borderRadius: '8px',
                    fontSize: '14px'
                  }}
                  formatter={(value: number) => [`${value} min`, 'Duration']}
                />
                <Line 
                  type="monotone" 
                  dataKey="duration" 
                  stroke="#8b5cf6" 
                  strokeWidth={3}
                  dot={{ fill: '#8b5cf6', r: 6 }}
                  activeDot={{ r: 8 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
}