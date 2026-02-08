import { Home, Activity, Dumbbell, Menu } from 'lucide-react';

interface CCCAREHeaderProps {
  cccareId: string;
  scanDate: string;
  programType: string;
  onOpenMenu: () => void;
  onReturnHome: () => void;
}

export function CCCAREHeader({ cccareId, scanDate, programType, onOpenMenu, onReturnHome }: CCCAREHeaderProps) {
  return (
    <header className="bg-white border-b-2 border-gray-300 px-8 py-6">
      <div className="max-w-[1400px] mx-auto">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-4">
            <button
              onClick={onOpenMenu}
              className="bg-gray-100 hover:bg-gray-200 rounded-lg p-3 transition-colors"
              title="Open participant menu"
            >
              <Menu className="w-10 h-10 text-gray-700" />
            </button>
            <button
              onClick={onReturnHome}
              className="bg-gray-100 hover:bg-gray-200 rounded-lg p-3 transition-colors"
              title="Return to main menu"
            >
              <Home className="w-10 h-10 text-gray-700" />
            </button>
            <div>
              <h1 className="text-3xl font-medium text-gray-900">CCCARE</h1>
              <p className="text-lg text-gray-600 mt-1">Post-Scan Exercise Log Summary</p>
            </div>
          </div>
          
          <div className="flex items-center gap-8">
            <div className="text-right">
              <p className="text-sm text-gray-600 uppercase tracking-wide mb-1">Pre-Assessment</p>
              <p className="text-3xl font-medium text-gray-900">Done</p>
            </div>
            <div className="text-right">
              <p className="text-sm text-gray-600 uppercase tracking-wide mb-1">CCCARE ID</p>
              <p className="text-3xl font-medium text-gray-900">{cccareId}</p>
            </div>
            <div className="w-px h-16 bg-gray-300"></div>
            <div className="text-right">
              <p className="text-sm text-gray-600 uppercase tracking-wide mb-1">Scan Date</p>
              <p className="text-xl font-medium text-gray-900">{scanDate}</p>
            </div>
            <div className="w-px h-16 bg-gray-300"></div>
            <div className="flex items-center gap-3">
              <Activity className="w-6 h-6 text-gray-700" />
              <Dumbbell className="w-6 h-6 text-gray-700" />
              <div className="text-left">
                <p className="text-sm text-gray-600 uppercase tracking-wide mb-1">Program Type</p>
                <p className="text-xl font-medium text-gray-900">{programType}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}