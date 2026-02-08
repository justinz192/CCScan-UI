import { ChevronLeft, ChevronRight } from 'lucide-react';

interface Session {
  id: string;
  date: string;
  displayDate: string;
}

interface SessionSelectorProps {
  sessions: Session[];
  currentSessionId: string;
  onSessionChange: (sessionId: string) => void;
}

export function SessionSelector({ sessions, currentSessionId, onSessionChange }: SessionSelectorProps) {
  const currentIndex = sessions.findIndex(s => s.id === currentSessionId);
  const canGoPrevious = currentIndex > 0;
  const canGoNext = currentIndex < sessions.length - 1;

  const handlePrevious = () => {
    if (canGoPrevious) {
      onSessionChange(sessions[currentIndex - 1].id);
    }
  };

  const handleNext = () => {
    if (canGoNext) {
      onSessionChange(sessions[currentIndex + 1].id);
    }
  };

  return (
    <div className="bg-gray-50 border-b-2 border-gray-200 px-8 py-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-gray-600 uppercase tracking-wide mb-2">Session Date</p>
            <p className="text-2xl font-medium text-gray-900">
              {sessions.find(s => s.id === currentSessionId)?.displayDate}
            </p>
          </div>
          <div className="flex items-center gap-4">
            <button
              onClick={handlePrevious}
              disabled={!canGoPrevious}
              className="flex items-center gap-2 px-6 py-3 bg-white border-2 border-gray-300 rounded-lg text-lg font-medium text-gray-900 hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
            >
              <ChevronLeft className="w-6 h-6" />
              Previous
            </button>
            <div className="text-lg text-gray-600 font-medium min-w-[120px] text-center">
              {currentIndex + 1} of {sessions.length}
            </div>
            <button
              onClick={handleNext}
              disabled={!canGoNext}
              className="flex items-center gap-2 px-6 py-3 bg-white border-2 border-gray-300 rounded-lg text-lg font-medium text-gray-900 hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
            >
              Next
              <ChevronRight className="w-6 h-6" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
