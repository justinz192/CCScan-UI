import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { X, TrendingUp } from 'lucide-react';

interface SetData {
  reps: number;
  weight: number;
}

interface ExerciseSession {
  date: string;
  sets: SetData[];
}

interface ExerciseDetailModalProps {
  exerciseName: string;
  sessions: ExerciseSession[];
  onClose: () => void;
}

export function ExerciseDetailModal({ exerciseName, sessions, onClose }: ExerciseDetailModalProps) {
  // Prepare data for charts
  const chartData = sessions.map(session => ({
    date: session.date,
    set1Weight: session.sets[0]?.weight || 0,
    set2Weight: session.sets[1]?.weight || 0,
    set1Reps: session.sets[0]?.reps || 0,
    set2Reps: session.sets[1]?.reps || 0,
  }));

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-8">
      <div className="bg-white rounded-lg border-2 border-gray-300 max-w-5xl w-full max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-white border-b-2 border-gray-300 px-6 py-4 flex items-center justify-between z-10">
          <div className="flex items-center gap-3">
            <TrendingUp className="w-7 h-7 text-gray-700" />
            <h2 className="text-2xl font-medium text-gray-900">{exerciseName}</h2>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <X className="w-6 h-6 text-gray-700" />
          </button>
        </div>

        <div className="p-6 space-y-6">
          {/* Weight Progression Chart */}
          <div className="bg-gray-50 rounded-lg border border-gray-200 p-6">
            <h3 className="text-xl font-medium text-gray-900 mb-4">Weight Progression</h3>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={chartData} margin={{ top: 5, right: 30, left: 10, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                <XAxis 
                  dataKey="date" 
                  stroke="#6b7280"
                  style={{ fontSize: '13px', fontWeight: 500 }}
                  height={50}
                />
                <YAxis 
                  stroke="#6b7280"
                  style={{ fontSize: '13px', fontWeight: 500 }}
                  label={{ value: 'Weight (lbs)', angle: -90, position: 'insideLeft', style: { fontSize: '13px', fill: '#6b7280' } }}
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
                <Legend wrapperStyle={{ fontSize: '14px', fontWeight: 500 }} />
                <Line 
                  type="monotone" 
                  dataKey="set1Weight" 
                  stroke="#3b82f6" 
                  strokeWidth={3}
                  name="Set 1 Weight"
                  dot={{ r: 6, fill: '#3b82f6', strokeWidth: 2, stroke: '#fff' }}
                />
                <Line 
                  type="monotone" 
                  dataKey="set2Weight" 
                  stroke="#60a5fa" 
                  strokeWidth={3}
                  name="Set 2 Weight"
                  dot={{ r: 6, fill: '#60a5fa', strokeWidth: 2, stroke: '#fff' }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>

          {/* Reps Progression Chart */}
          <div className="bg-gray-50 rounded-lg border border-gray-200 p-6">
            <h3 className="text-xl font-medium text-gray-900 mb-4">Reps Progression</h3>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={chartData} margin={{ top: 5, right: 30, left: 10, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                <XAxis 
                  dataKey="date" 
                  stroke="#6b7280"
                  style={{ fontSize: '13px', fontWeight: 500 }}
                  height={50}
                />
                <YAxis 
                  stroke="#6b7280"
                  style={{ fontSize: '13px', fontWeight: 500 }}
                  label={{ value: 'Reps', angle: -90, position: 'insideLeft', style: { fontSize: '13px', fill: '#6b7280' } }}
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
                <Legend wrapperStyle={{ fontSize: '14px', fontWeight: 500 }} />
                <Line 
                  type="monotone" 
                  dataKey="set1Reps" 
                  stroke="#6b7280" 
                  strokeWidth={3}
                  name="Set 1 Reps"
                  dot={{ r: 6, fill: '#6b7280', strokeWidth: 2, stroke: '#fff' }}
                />
                <Line 
                  type="monotone" 
                  dataKey="set2Reps" 
                  stroke="#9ca3af" 
                  strokeWidth={3}
                  name="Set 2 Reps"
                  dot={{ r: 6, fill: '#9ca3af', strokeWidth: 2, stroke: '#fff' }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>

          {/* Session Details Table */}
          <div className="bg-gray-50 rounded-lg border border-gray-200 p-6">
            <h3 className="text-xl font-medium text-gray-900 mb-4">Session Details</h3>
            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="bg-gray-100">
                    <th className="border border-gray-300 px-4 py-2 text-left text-sm font-medium text-gray-900">Date</th>
                    <th className="border border-gray-300 px-4 py-2 text-left text-sm font-medium text-gray-900">Set 1</th>
                    <th className="border border-gray-300 px-4 py-2 text-left text-sm font-medium text-gray-900">Set 2</th>
                    <th className="border border-gray-300 px-4 py-2 text-left text-sm font-medium text-gray-900">Total Volume</th>
                  </tr>
                </thead>
                <tbody>
                  {sessions.map((session, idx) => {
                    const totalVolume = session.sets.reduce((sum, set) => sum + (set.weight * set.reps), 0);
                    return (
                      <tr key={idx}>
                        <td className="border border-gray-300 px-4 py-2 text-base text-gray-900">{session.date}</td>
                        <td className="border border-gray-300 px-4 py-2 text-base text-gray-900">
                          {session.sets[0] ? `${session.sets[0].reps} reps × ${session.sets[0].weight} lbs` : '—'}
                        </td>
                        <td className="border border-gray-300 px-4 py-2 text-base text-gray-900">
                          {session.sets[1] ? `${session.sets[1].reps} reps × ${session.sets[1].weight} lbs` : '—'}
                        </td>
                        <td className="border border-gray-300 px-4 py-2 text-base font-medium text-gray-900">{totalVolume}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
