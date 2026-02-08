import { ChevronLeft, ChevronRight, Users, X } from 'lucide-react';

interface Participant {
  id: string;
  name: string;
}

interface ParticipantSidebarProps {
  participants: Participant[];
  currentParticipantId: string;
  onSelectParticipant: (id: string) => void;
  isOpen: boolean;
  onToggle: () => void;
  onClose: () => void;
}

export function ParticipantSidebar({ 
  participants, 
  currentParticipantId, 
  onSelectParticipant,
  isOpen,
  onToggle,
  onClose
}: ParticipantSidebarProps) {
  return (
    <>
      {/* Toggle Button */}
      {!isOpen && (
        <button
          onClick={onToggle}
          className="fixed left-0 top-1/2 -translate-y-1/2 bg-white border-2 border-l-0 border-gray-300 rounded-r-lg px-2 py-4 hover:bg-gray-50 transition-colors z-40"
        >
          <ChevronRight className="w-6 h-6 text-gray-700" />
        </button>
      )}

      {/* Sidebar */}
      <div
        className={`fixed left-0 top-0 h-full bg-white border-r-2 border-gray-300 transition-transform duration-300 z-50 ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
        style={{ width: '320px' }}
      >
        <div className="flex flex-col h-full">
          <div className="bg-gray-100 px-6 py-4 border-b-2 border-gray-300 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Users className="w-6 h-6 text-gray-700" />
              <h2 className="text-lg font-medium text-gray-900">Participants</h2>
            </div>
            <button
              onClick={onToggle}
              className="p-1 hover:bg-gray-200 rounded transition-colors"
            >
              <ChevronLeft className="w-5 h-5 text-gray-700" />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto">
            <div className="divide-y divide-gray-200">
              {participants.map((participant) => (
                <button
                  key={participant.id}
                  onClick={() => {
                    onSelectParticipant(participant.id);
                    onToggle();
                  }}
                  className={`w-full px-6 py-4 text-left hover:bg-gray-50 transition-colors ${
                    participant.id === currentParticipantId ? 'bg-blue-50 border-l-4 border-blue-500' : ''
                  }`}
                >
                  <p className="text-base font-medium text-gray-900 mb-1">{participant.name}</p>
                  <p className="text-sm text-gray-600">{participant.id}</p>
                </button>
              ))}
            </div>
          </div>

          <div className="border-t-2 border-gray-300 px-6 py-4">
            <button
              onClick={onClose}
              className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-gray-700 hover:bg-gray-800 text-white rounded-lg transition-colors"
            >
              <X className="w-5 h-5" />
              <span className="text-base font-medium">Return to Main Menu</span>
            </button>
          </div>
        </div>
      </div>

      {/* Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-30 z-40"
          onClick={onToggle}
        />
      )}
    </>
  );
}