import { useState, useEffect } from 'react';
import { ParticipantList } from './components/ParticipantList';
import { ParticipantSidebar } from './components/ParticipantSidebar';
import { ParticipantNavigation } from './components/ParticipantNavigation';
import { CCCAREHeader } from './components/CCCAREHeader';
import { SessionOverview } from './components/SessionOverview';
import { CardioTrends } from './components/CardioTrends';
import { StrengthSummaryTable } from './components/StrengthSummaryTable';
import { ExerciseDetailModal } from './components/ExerciseDetailModal';
import { RPETrend } from './components/RPETrend';
import { ExpandableComments } from './components/ExpandableComments';
import { loadParticipantData } from './utils/dataLoader';

// Participant list - CCCARE ID format: MM-YY.XXX (birth month-year.last 3 letters of last name)
const participants = [
  { id: '11-59.VEL', name: 'Thomas Velly', lastSession: 'Jan 28, 2026' },
  { id: '09-54.OST', name: 'Walker Ostrom', lastSession: 'Jan 15, 2026'},
  { id: '07-53.SMI', name: 'John Smith', lastSession: 'Jan 20, 2026'},
  //{ id: '08-29.BAD', name: 'Alex Badder', lastSession: 'Jan 25, 2026'},
  // Additional participants can be added here once their data files are created
  // Format: { id: 'MM-YY.XXX', name: 'First Last', lastSession: 'Date' },
];

export default function App() {
  const [selectedParticipantId, setSelectedParticipantId] = useState<string | null>(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [selectedExercise, setSelectedExercise] = useState<string | null>(null);
  const [commentsState, setCommentsState] = useState<Record<string, any[]>>({});
  const [participantDataCache, setParticipantDataCache] = useState<Record<string, any>>({});
  const [isLoading, setIsLoading] = useState(false);

  const handleSelectParticipant = (id: string) => {
    setSelectedParticipantId(id);
    
    // Load data if not already cached
    if (!participantDataCache[id]) {
      const participant = participants.find(p => p.id === id);
      if (participant) {
        const data = loadParticipantData(id, participant.name);
        if (data) {
          setParticipantDataCache(prev => ({ ...prev, [id]: data }));
          setCommentsState(prev => ({ ...prev, [id]: data.sessionComments }));
        }
      }
    } else if (!commentsState[id]) {
      // Initialize comments state if data is cached but comments aren't
      setCommentsState(prev => ({
        ...prev,
        [id]: participantDataCache[id].sessionComments
      }));
    }
  };

  const handleCloseDashboard = () => {
    setSelectedParticipantId(null);
    setSidebarOpen(false);
  };

  const handleToggleRead = (commentId: string) => {
    if (!selectedParticipantId) return;
    
    setCommentsState(prev => ({
      ...prev,
      [selectedParticipantId]: prev[selectedParticipantId].map(comment =>
        comment.id === commentId
          ? { ...comment, isRead: !comment.isRead }
          : comment
      )
    }));
  };

  const handleAddComment = (comment: any) => {
    if (!selectedParticipantId) return;
    
    setCommentsState(prev => ({
      ...prev,
      [selectedParticipantId]: [...prev[selectedParticipantId], comment]
    }));
  };

  const handleDeleteComment = (commentId: string) => {
    if (!selectedParticipantId) return;
    
    setCommentsState(prev => ({
      ...prev,
      [selectedParticipantId]: prev[selectedParticipantId].filter(comment =>
        comment.id !== commentId
      )
    }));
  };

  // If no participant selected, show participant list
  if (!selectedParticipantId) {
    return (
      <ParticipantList 
        participants={participants}
        onSelectParticipant={handleSelectParticipant}
      />
    );
  }

  // Show dashboard for selected participant
  const data = participantDataCache[selectedParticipantId as keyof typeof participantDataCache];
  const currentParticipant = participants.find(p => p.id === selectedParticipantId)!;
  
  // If no data for this participant, show message
  if (!data) {
    return (
      <div className="min-h-screen bg-gray-100">
        <ParticipantSidebar
          participants={participants}
          currentParticipantId={selectedParticipantId}
          onSelectParticipant={handleSelectParticipant}
          isOpen={sidebarOpen}
          onToggle={() => setSidebarOpen(!sidebarOpen)}
          onClose={handleCloseDashboard}
        />
        
        <CCCAREHeader 
          cccareId={selectedParticipantId}
          scanDate="N/A"
          programType="N/A"
          onOpenMenu={() => setSidebarOpen(true)}
          onReturnHome={handleCloseDashboard}
        />
        
        <ParticipantNavigation
          participants={participants}
          currentParticipantId={selectedParticipantId}
          onNavigate={handleSelectParticipant}
        />
        
        <main className="max-w-[1400px] mx-auto px-8 py-8">
          <div className="bg-white rounded-lg border-2 border-gray-300 p-12 text-center">
            <p className="text-xl text-gray-600">No exercise log data available for this participant.</p>
            <p className="text-base text-gray-500 mt-2">Please scan and upload exercise logs to view data.</p>
          </div>
        </main>
      </div>
    );
  }
  
  // Get all unique dates for the strength table (most recent first)
  const allDates = Array.from(new Set(
    data.strengthExercises.flatMap(ex => ex.sessions.map(s => s.date))
  )).sort((a, b) => {
    const parseDate = (dateStr: string) => {
      const months: Record<string, number> = {
        'Jan': 0, 'Feb': 1, 'Mar': 2, 'Apr': 3, 'May': 4, 'Jun': 5,
        'Jul': 6, 'Aug': 7, 'Sep': 8, 'Oct': 9, 'Nov': 10, 'Dec': 11
      };
      const parts = dateStr.split(' ');
      const month = months[parts[0]];
      const day = parseInt(parts[1]);
      return new Date(data.year || 2026, month, day);
    };
    return parseDate(b).getTime() - parseDate(a).getTime(); // Most recent first
  });

  const selectedExerciseData = selectedExercise 
    ? data.strengthExercises.find(ex => ex.exerciseName === selectedExercise)
    : null;

  // Get comments for current participant
  const currentComments = commentsState[selectedParticipantId] || data.sessionComments;

  return (
    <div className="min-h-screen bg-gray-100">
      <ParticipantSidebar
        participants={participants}
        currentParticipantId={selectedParticipantId}
        onSelectParticipant={handleSelectParticipant}
        isOpen={sidebarOpen}
        onToggle={() => setSidebarOpen(!sidebarOpen)}
        onClose={handleCloseDashboard}
      />

      <CCCAREHeader 
        cccareId={selectedParticipantId}
        scanDate={data.scanDate}
        programType="Cardio + Strength"
        onOpenMenu={() => setSidebarOpen(true)}
        onReturnHome={handleCloseDashboard}
      />

      <ParticipantNavigation
        participants={participants}
        currentParticipantId={selectedParticipantId}
        onNavigate={handleSelectParticipant}
      />

      <main className="max-w-[1400px] mx-auto px-8 py-8 space-y-6">
        {/* Section 1: Session Overview */}
        <SessionOverview 
          sessionDate={data.currentSession.date}
          totalCardioTime={data.currentSession.totalCardioTime}
          avgHeartRate={data.currentSession.avgHeartRate}
          peakHeartRate={data.currentSession.peakHeartRate}
          avgRPE={data.currentSession.avgRPE}
        />

        {/* Section 2: Cardio Trends */}
        <CardioTrends 
          data={data.cardioTrendData}
          targetHRMin={90}
          targetHRMax={100}
        />

        {/* Section 3: Strength Training Summary */}
        <StrengthSummaryTable 
          exercises={data.strengthExercises}
          dates={allDates}
          onSelectExercise={setSelectedExercise}
        />

        {/* Section 4: RPE & Perceived Effort */}
        <RPETrend data={data.rpeTrendData} />

        {/* Section 5: Comments & Notes */}
        <ExpandableComments 
          comments={currentComments}
          onToggleRead={handleToggleRead}
          onAddComment={handleAddComment}
          onDeleteComment={handleDeleteComment}
        />
      </main>

      {/* Exercise Detail Modal */}
      {selectedExercise && selectedExerciseData && (
        <ExerciseDetailModal
          exerciseName={selectedExercise}
          sessions={selectedExerciseData.sessions}
          onClose={() => setSelectedExercise(null)}
        />
      )}
    </div>
  );
}