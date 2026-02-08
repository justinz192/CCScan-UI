import { Heart } from 'lucide-react';

interface CardioExercise {
  exercise: string;
  duration: number;
  avgHeartRate: number;
  peakHeartRate: number;
}

interface CardioSectionProps {
  exercises: CardioExercise[];
}

export function CardioSection({ exercises }: CardioSectionProps) {
  return (
    <div className="bg-white rounded-lg border-2 border-gray-200 p-6">
      <div className="flex items-center gap-3 mb-6 pb-4 border-b-2 border-gray-200">
        <Heart className="w-8 h-8 text-gray-700" />
        <h2 className="text-2xl font-medium text-gray-900">Cardio</h2>
      </div>
      
      <div className="space-y-4">
        {exercises.map((exercise, index) => (
          <div key={index} className="bg-gray-50 rounded-lg p-5 border border-gray-200">
            <p className="text-xl font-medium text-gray-900 mb-4">{exercise.exercise}</p>
            <div className="grid grid-cols-3 gap-6">
              <div>
                <p className="text-sm text-gray-600 uppercase tracking-wide mb-2">Duration (min)</p>
                <p className="text-3xl font-medium text-gray-900">{exercise.duration}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600 uppercase tracking-wide mb-2">Avg HR (bpm)</p>
                <p className="text-3xl font-medium text-gray-900">{exercise.avgHeartRate}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600 uppercase tracking-wide mb-2">Peak HR (bpm)</p>
                <p className="text-3xl font-medium text-gray-900">{exercise.peakHeartRate}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
