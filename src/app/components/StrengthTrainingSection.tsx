import { Dumbbell } from 'lucide-react';

interface StrengthExercise {
  exercise: string;
  sets: number;
  reps: number;
  weight: number;
  rpe: number;
}

interface StrengthTrainingSectionProps {
  exercises: StrengthExercise[];
}

export function StrengthTrainingSection({ exercises }: StrengthTrainingSectionProps) {
  return (
    <div className="bg-white rounded-lg border-2 border-gray-200 p-6">
      <div className="flex items-center gap-3 mb-6 pb-4 border-b-2 border-gray-200">
        <Dumbbell className="w-8 h-8 text-gray-700" />
        <h2 className="text-2xl font-medium text-gray-900">Strength Training</h2>
      </div>
      
      <div className="space-y-4">
        {exercises.map((exercise, index) => (
          <div key={index} className="bg-gray-50 rounded-lg p-5 border border-gray-200">
            <p className="text-xl font-medium text-gray-900 mb-4">{exercise.exercise}</p>
            <div className="grid grid-cols-4 gap-6">
              <div>
                <p className="text-sm text-gray-600 uppercase tracking-wide mb-2">Sets</p>
                <p className="text-3xl font-medium text-gray-900">{exercise.sets}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600 uppercase tracking-wide mb-2">Reps</p>
                <p className="text-3xl font-medium text-gray-900">{exercise.reps}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600 uppercase tracking-wide mb-2">Weight (lbs)</p>
                <p className="text-3xl font-medium text-gray-900">{exercise.weight}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600 uppercase tracking-wide mb-2">RPE</p>
                <p className="text-3xl font-medium text-gray-900">{exercise.rpe}/10</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
