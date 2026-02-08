import { Dumbbell, TrendingUp, Minus, TrendingDown } from 'lucide-react';

interface ExerciseRecord {
  date: string;
  weight: number;
  reps: number;
  notes?: string;
}

interface ExerciseGroup {
  exerciseName: string;
  records: ExerciseRecord[];
}

interface StrengthSummaryProps {
  exercises: ExerciseGroup[];
}

function getTrendIndicator(records: ExerciseRecord[]) {
  if (records.length < 2) return null;
  
  const lastTwo = records.slice(-2);
  const previousVolume = lastTwo[0].weight * lastTwo[0].reps;
  const currentVolume = lastTwo[1].weight * lastTwo[1].reps;
  
  if (currentVolume > previousVolume) {
    return <TrendingUp className="w-5 h-5 text-gray-700" />;
  } else if (currentVolume < previousVolume) {
    return <TrendingDown className="w-5 h-5 text-gray-700" />;
  }
  return <Minus className="w-5 h-5 text-gray-500" />;
}

export function StrengthSummary({ exercises }: StrengthSummaryProps) {
  return (
    <div className="bg-white rounded-lg border-2 border-gray-300 p-6">
      <div className="flex items-center gap-3 mb-6 pb-4 border-b-2 border-gray-200">
        <Dumbbell className="w-8 h-8 text-gray-700" />
        <h2 className="text-2xl font-medium text-gray-900">Strength Training Summary</h2>
      </div>
      
      <div className="space-y-6">
        {exercises.map((exercise, idx) => (
          <div key={idx} className="bg-gray-50 rounded-lg border border-gray-200 overflow-hidden">
            <div className="bg-gray-100 px-5 py-3 flex items-center justify-between border-b border-gray-200">
              <h3 className="text-xl font-medium text-gray-900">{exercise.exerciseName}</h3>
              <div className="flex items-center gap-2">
                <span className="text-sm text-gray-600 uppercase tracking-wide">Volume Trend</span>
                {getTrendIndicator(exercise.records)}
              </div>
            </div>
            
            <div className="p-5">
              <div className="grid grid-cols-1 gap-3">
                {exercise.records.map((record, recordIdx) => (
                  <div key={recordIdx} className="grid grid-cols-4 gap-4 bg-white rounded-lg p-4 border border-gray-200">
                    <div>
                      <p className="text-sm text-gray-600 uppercase tracking-wide mb-1">Date</p>
                      <p className="text-lg font-medium text-gray-900">{record.date}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600 uppercase tracking-wide mb-1">Weight</p>
                      <p className="text-lg font-medium text-gray-900">{record.weight} lbs</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600 uppercase tracking-wide mb-1">Reps</p>
                      <p className="text-lg font-medium text-gray-900">{record.reps}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600 uppercase tracking-wide mb-1">Total Volume</p>
                      <p className="text-lg font-medium text-gray-900">{record.weight * record.reps}</p>
                    </div>
                    {record.notes && (
                      <div className="col-span-4 pt-2 border-t border-gray-200">
                        <p className="text-sm text-gray-600 uppercase tracking-wide mb-1">Notes</p>
                        <p className="text-base text-gray-900">{record.notes}</p>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
