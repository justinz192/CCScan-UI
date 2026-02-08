import { Users, ChevronRight } from 'lucide-react';

interface Participant {
  id: string;
  name: string;
  lastSession: string;
}

interface ParticipantListProps {
  participants: Participant[];
  onSelectParticipant: (id: string) => void;
}

export function ParticipantList({ participants, onSelectParticipant }: ParticipantListProps) {
  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-white border-b-2 border-gray-300 px-8 py-6">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center gap-4">
            <div className="bg-gray-100 rounded-lg p-3">
              <Users className="w-10 h-10 text-gray-700" />
            </div>
            <div>
              <h1 className="text-3xl font-medium text-gray-900">CCCARE</h1>
              <p className="text-lg text-gray-600 mt-1">Participant Directory</p>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-8 py-8">
        <div className="bg-white rounded-lg border-2 border-gray-300 overflow-hidden">
          <div className="bg-gray-50 px-6 py-4 border-b-2 border-gray-300">
            <h2 className="text-xl font-medium text-gray-900">Select Participant</h2>
          </div>
          <div className="divide-y divide-gray-200">
            {participants.map((participant) => (
              <button
                key={participant.id}
                onClick={() => onSelectParticipant(participant.id)}
                className="w-full px-6 py-5 flex items-center justify-between hover:bg-gray-50 transition-colors text-left"
              >
                <div>
                  <p className="text-xl font-medium text-gray-900 mb-1">{participant.name}</p>
                  <p className="text-base text-gray-600">CCCARE ID: {participant.id}</p>
                </div>
                <div className="flex items-center gap-4">
                  <div className="text-right">
                    <p className="text-sm text-gray-600 uppercase tracking-wide mb-1">Last Session</p>
                    <p className="text-base font-medium text-gray-900">{participant.lastSession}</p>
                  </div>
                  <ChevronRight className="w-6 h-6 text-gray-400" />
                </div>
              </button>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
