import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { TrendingUp, Activity, Gauge } from 'lucide-react';

interface TrendData {
  date: string;
  avgHeartRate: number;
  peakHeartRate: number;
  totalVolume: number;
  avgRPE: number;
}

interface TrendChartsProps {
  data: TrendData[];
}

export function TrendCharts({ data }: TrendChartsProps) {
  return (
    <div className="space-y-6">
      {/* Heart Rate Trends */}
      <div className="bg-white rounded-lg border-2 border-gray-200 p-6">
        <div className="flex items-center gap-3 mb-6 pb-4 border-b-2 border-gray-200">
          <Activity className="w-8 h-8 text-gray-700" />
          <h2 className="text-2xl font-medium text-gray-900">Heart Rate Trends</h2>
        </div>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={data} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
            <XAxis 
              dataKey="date" 
              stroke="#6b7280"
              style={{ fontSize: '14px', fontWeight: 500 }}
              height={60}
            />
            <YAxis 
              stroke="#6b7280"
              style={{ fontSize: '14px', fontWeight: 500 }}
              label={{ value: 'BPM', angle: -90, position: 'insideLeft', style: { fontSize: '14px', fill: '#6b7280' } }}
            />
            <Tooltip 
              contentStyle={{ 
                backgroundColor: 'white', 
                border: '2px solid #e5e7eb',
                borderRadius: '8px',
                fontSize: '14px',
                fontWeight: 500
              }}
            />
            <Line 
              type="monotone" 
              dataKey="avgHeartRate" 
              stroke="#3b82f6" 
              strokeWidth={3}
              name="Avg Heart Rate"
              dot={{ r: 5, fill: '#3b82f6' }}
            />
            <Line 
              type="monotone" 
              dataKey="peakHeartRate" 
              stroke="#60a5fa" 
              strokeWidth={3}
              name="Peak Heart Rate"
              dot={{ r: 5, fill: '#60a5fa' }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Volume and RPE */}
      <div className="grid grid-cols-2 gap-6">
        {/* Total Volume */}
        <div className="bg-white rounded-lg border-2 border-gray-200 p-6">
          <div className="flex items-center gap-3 mb-6 pb-4 border-b-2 border-gray-200">
            <TrendingUp className="w-8 h-8 text-gray-700" />
            <h2 className="text-2xl font-medium text-gray-900">Total Volume</h2>
          </div>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={data} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis 
                dataKey="date" 
                stroke="#6b7280"
                style={{ fontSize: '14px', fontWeight: 500 }}
                height={60}
              />
              <YAxis 
                stroke="#6b7280"
                style={{ fontSize: '14px', fontWeight: 500 }}
                label={{ value: 'Sets × Reps', angle: -90, position: 'insideLeft', style: { fontSize: '14px', fill: '#6b7280' } }}
              />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: 'white', 
                  border: '2px solid #e5e7eb',
                  borderRadius: '8px',
                  fontSize: '14px',
                  fontWeight: 500
                }}
              />
              <Bar dataKey="totalVolume" fill="#6b7280" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* RPE Trends */}
        <div className="bg-white rounded-lg border-2 border-gray-200 p-6">
          <div className="flex items-center gap-3 mb-6 pb-4 border-b-2 border-gray-200">
            <Gauge className="w-8 h-8 text-gray-700" />
            <h2 className="text-2xl font-medium text-gray-900">RPE Trends</h2>
          </div>
          <ResponsiveContainer width="100%" height={250}>
            <LineChart data={data} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis 
                dataKey="date" 
                stroke="#6b7280"
                style={{ fontSize: '14px', fontWeight: 500 }}
                height={60}
              />
              <YAxis 
                domain={[0, 10]}
                stroke="#6b7280"
                style={{ fontSize: '14px', fontWeight: 500 }}
                label={{ value: 'RPE (0-10)', angle: -90, position: 'insideLeft', style: { fontSize: '14px', fill: '#6b7280' } }}
              />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: 'white', 
                  border: '2px solid #e5e7eb',
                  borderRadius: '8px',
                  fontSize: '14px',
                  fontWeight: 500
                }}
              />
              <Line 
                type="monotone" 
                dataKey="avgRPE" 
                stroke="#6b7280" 
                strokeWidth={3}
                name="Avg RPE"
                dot={{ r: 5, fill: '#6b7280' }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
