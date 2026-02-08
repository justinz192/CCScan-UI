import { ChevronLeft, ChevronRight } from 'lucide-react';

interface Participant {
  id: string;
  name: string;
}

interface ParticipantNavigationProps {
  participants: Participant[];
  currentParticipantId: string;
  onNavigate: (id: string) => void;
}

export function ParticipantNavigation({ participants, currentParticipantId, onNavigate }: ParticipantNavigationProps) {
  const currentIndex = participants.findIndex(p => p.id === currentParticipantId);
  const canGoPrevious = currentIndex > 0;
  const canGoNext = currentIndex < participants.length - 1;

  const handlePrevious = () => {
    if (canGoPrevious) {
      onNavigate(participants[currentIndex - 1].id);
    }
  };

  const handleNext = () => {
    if (canGoNext) {
      onNavigate(participants[currentIndex + 1].id);
    }
  };

  const currentParticipant = participants[currentIndex];

  return (
    <div className="bg-gray-50 border-b-2 border-gray-300 px-8 py-4">
      <div className="max-w-[1400px] mx-auto flex items-center justify-between">
        <div>
          <p className="text-lg text-gray-700">
            <span className="font-medium">Participant:</span> {currentParticipant.name}
          </p>
        </div>
        <div className="flex items-center gap-4">
          <button
            onClick={handlePrevious}
            disabled={!canGoPrevious}
            className="flex items-center gap-2 px-5 py-2 bg-white border-2 border-gray-300 rounded-lg text-base font-medium text-gray-900 hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
          >
            <ChevronLeft className="w-5 h-5" />
            Previous
          </button>
          <div className="text-base text-gray-600 font-medium min-w-[100px] text-center">
            {currentIndex + 1} of {participants.length}
          </div>
          <button
            onClick={handleNext}
            disabled={!canGoNext}
            className="flex items-center gap-2 px-5 py-2 bg-white border-2 border-gray-300 rounded-lg text-base font-medium text-gray-900 hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
          >
            Next
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
}
