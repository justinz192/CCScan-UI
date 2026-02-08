import { Dumbbell, ChevronRight } from 'lucide-react';

interface SetData {
  reps: number;
  weight: number;
}

interface ExerciseSession {
  date: string;
  sets: SetData[];
}

interface Exercise {
  exerciseName: string;
  sessions: ExerciseSession[];
}

interface StrengthSummaryTableProps {
  exercises: Exercise[];
  dates: string[];
  onSelectExercise: (exerciseName: string) => void;
}

function shouldHighlight(sets: SetData[]): boolean {
  // Highlight if both sets have 15+ reps
  if (sets.length < 2) return false;
  return sets.every(set => set.reps >= 15);
}

function getRepHighlight(reps: number): string {
  if (reps > 15) return 'bg-green-100 border-green-300';
  if (reps < 10) return 'bg-red-100 border-red-300';
  return '';
}

export function StrengthSummaryTable({ exercises, dates, onSelectExercise }: StrengthSummaryTableProps) {
  return (
    <div className="bg-white rounded-lg border-2 border-gray-300 p-6">
      <div className="flex items-center gap-3 mb-6 pb-4 border-b-2 border-gray-200">
        <Dumbbell className="w-8 h-8 text-gray-700" />
        <h2 className="text-2xl font-medium text-gray-900">Strength Training Summary</h2>
      </div>
      
      <div className="overflow-x-auto">
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-gray-100">
              <th className="border-2 border-gray-300 px-4 py-3 text-left sticky left-0 bg-gray-100 z-10">
                <span className="text-base font-medium text-gray-900 uppercase tracking-wide">Exercise</span>
              </th>
              {dates.map((date) => (
                <th key={date} className="border-2 border-gray-300 px-4 py-3 min-w-[200px]">
                  <span className="text-base font-medium text-gray-900">{date}</span>
                </th>
              ))}
              <th className="border-2 border-gray-300 px-4 py-3 sticky right-0 bg-gray-100 z-10">
                <span className="text-base font-medium text-gray-900 uppercase tracking-wide">Details</span>
              </th>
            </tr>
          </thead>
          <tbody>
            {exercises.map((exercise, idx) => (
              <tr key={idx} className="hover:bg-gray-50">
                <td className="border-2 border-gray-300 px-4 py-3 sticky left-0 bg-white z-10">
                  <span className="text-base font-medium text-gray-900">{exercise.exerciseName}</span>
                </td>
                {dates.map((date) => {
                  const session = exercise.sessions.find(s => s.date === date);
                  const isHighlighted = session ? shouldHighlight(session.sets) : false;
                  
                  return (
                    <td 
                      key={date} 
                      className={`border-2 border-gray-300 px-4 py-3`}
                    >
                      {session ? (
                        <div className="space-y-2">
                          {session.sets.map((set, setIdx) => (
                            <div 
                              key={setIdx} 
                              className={`flex items-center gap-3 p-2 rounded ${getRepHighlight(set.reps)}`}
                            >
                              <span className="text-sm text-gray-600 font-medium min-w-[50px]">Set {setIdx + 1}:</span>
                              <span className="text-base font-medium text-gray-900">{set.reps} reps</span>
                              <span className="text-gray-400">×</span>
                              <span className="text-base font-medium text-gray-900">{set.weight} lbs</span>
                            </div>
                          ))}
                        </div>
                      ) : (
                        <span className="text-gray-400">—</span>
                      )}
                    </td>
                  );
                })}
                <td className="border-2 border-gray-300 px-4 py-3 sticky right-0 bg-white z-10">
                  <button
                    onClick={() => onSelectExercise(exercise.exerciseName)}
                    className="flex items-center gap-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
                  >
                    <span className="text-sm font-medium text-gray-900">View Charts</span>
                    <ChevronRight className="w-4 h-4 text-gray-700" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}