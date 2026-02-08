import { Calendar, FileText } from 'lucide-react';

interface DashboardHeaderProps {
  participantId: string;
  scanDate: string;
}

export function DashboardHeader({ participantId, scanDate }: DashboardHeaderProps) {
  return (
    <header className="bg-white border-b-2 border-gray-200 px-8 py-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <FileText className="w-10 h-10 text-gray-700" />
            <div>
              <h1 className="text-3xl font-medium text-gray-900">Exercise Log Review</h1>
              <p className="text-lg text-gray-600 mt-1">Scanned Exercise Sheet Data</p>
            </div>
          </div>
          <div className="flex items-center gap-6 text-right">
            <div>
              <p className="text-sm text-gray-600 uppercase tracking-wide mb-1">Participant ID</p>
              <p className="text-2xl font-medium text-gray-900">{participantId}</p>
            </div>
            <div className="w-px h-12 bg-gray-300"></div>
            <div className="flex items-center gap-3">
              <Calendar className="w-6 h-6 text-gray-600" />
              <div>
                <p className="text-sm text-gray-600 uppercase tracking-wide mb-1">Scan Date</p>
                <p className="text-xl font-medium text-gray-900">{scanDate}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
