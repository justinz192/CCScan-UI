import { TrendingUp } from 'lucide-react';

interface SessionOverviewProps {
  sessionDate: string;
  totalCardioTime: number;
  avgHeartRate: number;
  peakHeartRate: number;
  avgRPE: number;
}

export function SessionOverview({ sessionDate, totalCardioTime, avgHeartRate, peakHeartRate, avgRPE }: SessionOverviewProps) {
  return (
    <div className="bg-white rounded-lg border-2 border-gray-300 p-6">
      <div className="flex items-center gap-3 mb-6 pb-4 border-b-2 border-gray-200">
        <TrendingUp className="w-8 h-8 text-gray-700" />
        <h2 className="text-2xl font-medium text-gray-900">Current Session Overview</h2>
        <span className="text-lg text-gray-600 ml-2">({sessionDate})</span>
      </div>
      
      <div className="grid grid-cols-4 gap-6">
        <div className="bg-gray-50 rounded-lg p-5 border-2 border-gray-200">
          <p className="text-sm text-gray-600 uppercase tracking-wide mb-2">Total Cardio Time</p>
          <p className="text-4xl font-medium text-gray-900">{totalCardioTime}</p>
          <p className="text-base text-gray-600 mt-1">minutes</p>
        </div>
        
        <div className="bg-gray-50 rounded-lg p-5 border-2 border-gray-200">
          <p className="text-sm text-gray-600 uppercase tracking-wide mb-2">Avg Heart Rate</p>
          <p className="text-4xl font-medium text-gray-900">{avgHeartRate}</p>
          <p className="text-base text-gray-600 mt-1">bpm</p>
        </div>
        
        <div className="bg-gray-50 rounded-lg p-5 border-2 border-gray-200">
          <p className="text-sm text-gray-600 uppercase tracking-wide mb-2">Peak Heart Rate</p>
          <p className="text-4xl font-medium text-gray-900">{peakHeartRate}</p>
          <p className="text-base text-gray-600 mt-1">bpm</p>
        </div>
        
        <div className="bg-gray-50 rounded-lg p-5 border-2 border-gray-200">
          <p className="text-sm text-gray-600 uppercase tracking-wide mb-2">Avg RPE</p>
          <p className="text-4xl font-medium text-gray-900">{avgRPE}</p>
          <p className="text-base text-gray-600 mt-1">/ 20</p>
        </div>
      </div>
    </div>
  );
}