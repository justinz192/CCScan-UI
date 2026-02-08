// Import JSON data directly
// To add a new participant, create a folder /src/data/{CCCARE_ID with . replaced by _}/
// and add a file named {CCCARE_ID with . replaced by _}.json
// Then import it here and add to participantDataMap below
import participantData_11_59_VEL from '../../data/11-59_VEL/11-59_VEL.json';
import participantData_09_54_OST from '../../data/09-54_OST/09-54_OST.json';

interface CardioSession {
  date: string;
  activity: string;
  time_minutes: number;
  work_rate: string;
  heart_rate_range: string;
  rpe: number;
  comments: string | null;
  watch: string;
  kinesiologist_signed: boolean;
}

interface CardioJSON {
  cccare_id: string;
  confidence: string;
  notes: string;
  cardio_data: {
    cccare_id: string | null;
    target_hr: string | null;
    target_rpe: string;
    sessions: CardioSession[];
  };
}

interface StrengthSet {
  reps: number;
  weight: number;
}

interface Exercise {
  exercise_name: string;
  sets: StrengthSet[];
}

interface StrengthSession {
  date: string;
  exercises: Exercise[];
  stretches_completed: string[] | boolean;
  kinesiologist_signed: boolean;
}

interface StrengthJSON {
  strength_data: {
    cccare_id: string;
    year: number;
    sessions: StrengthSession[];
  };
}

interface CombinedParticipantData {
  cccare_id: string;
  confidence: string;
  notes: string;
  strength_data: {
    cccare_id: string;
    year: number;
    sessions: StrengthSession[];
  };
  cardio_data: {
    cccare_id: string | null;
    target_hr: string | null;
    target_rpe: string;
    sessions: CardioSession[];
  };
}

// Map of CCCARE IDs to their imported data
const participantDataMap: Record<string, CombinedParticipantData> = {
  '11-59.VEL': participantData_11_59_VEL as CombinedParticipantData,
  '09-54.OST': participantData_09_54_OST as CombinedParticipantData,
};

// Parse heart rate range string (e.g., "87-105") to get average and peak
function parseHeartRateRange(range: string): { avg: number; peak: number } {
  const parts = range.split('-').map(s => parseInt(s.trim()));
  if (parts.length === 2) {
    return {
      avg: Math.round((parts[0] + parts[1]) / 2),
      peak: parts[1]
    };
  }
  return { avg: 0, peak: 0 };
}

// Parse date string to Date object for sorting (assumes format like "Jan 5")
function parseDate(dateStr: string, year: number = 2026): Date {
  const months: Record<string, number> = {
    'Jan': 0, 'Feb': 1, 'Mar': 2, 'Apr': 3, 'May': 4, 'Jun': 5,
    'Jul': 6, 'Aug': 7, 'Sep': 8, 'Oct': 9, 'Nov': 10, 'Dec': 11
  };
  
  const parts = dateStr.split(' ');
  const month = months[parts[0]];
  const day = parseInt(parts[1]);
  
  return new Date(year, month, day);
}

// Load cardio data from imported JSON
export function loadCardioData(cccareId: string): any {
  try {
    const data = participantDataMap[cccareId];
    if (!data) {
      console.error(`No cardio data found for ${cccareId}`);
      return null;
    }
    
    // Transform to app format
    const cardioTrendData = data.cardio_data.sessions.map(session => {
      const hr = parseHeartRateRange(session.heart_rate_range);
      return {
        date: session.date,
        avgHeartRate: hr.avg,
        peakHeartRate: hr.peak,
        duration: session.time_minutes
      };
    });

    const rpeTrendData = data.cardio_data.sessions.map(session => ({
      date: session.date,
      rpe: session.rpe
    }));

    const sessionComments = data.cardio_data.sessions
      .filter(session => session.comments)
      .map((session, idx) => ({
        id: `cardio-comment-${idx}`,
        date: `${session.date}, 2026`,
        comment: session.comments || '',
        type: 'general' as const,
        details: `Activity: ${session.activity}, Duration: ${session.time_minutes} min, Work Rate: ${session.work_rate}, HR: ${session.heart_rate_range}, RPE: ${session.rpe}`,
        isRead: false
      }));

    return {
      cardioTrendData,
      rpeTrendData,
      sessionComments,
      targetHR: data.cardio_data.target_hr,
      targetRPE: data.cardio_data.target_rpe
    };
  } catch (error) {
    console.error('Error loading cardio data:', error);
    return null;
  }
}

// Load strength data from imported JSON
export function loadStrengthData(cccareId: string): any {
  try {
    const data = participantDataMap[cccareId];
    if (!data) {
      console.error(`No strength data found for ${cccareId}`);
      return null;
    }
    
    // Group exercises by name across all sessions
    const exerciseMap = new Map<string, any[]>();
    
    data.strength_data.sessions.forEach(session => {
      session.exercises.forEach(exercise => {
        // Skip exercises with no sets data
        if (exercise.sets.length === 0) return;
        
        if (!exerciseMap.has(exercise.exercise_name)) {
          exerciseMap.set(exercise.exercise_name, []);
        }
        
        exerciseMap.get(exercise.exercise_name)!.push({
          date: session.date,
          sets: exercise.sets
        });
      });
    });

    // Convert to app format
    const strengthExercises = Array.from(exerciseMap.entries()).map(([exerciseName, sessions]) => ({
      exerciseName,
      sessions
    }));

    // Extract comments from stretches
    const stretchComments = data.strength_data.sessions
      .filter(session => {
        // Handle both array and boolean types
        if (Array.isArray(session.stretches_completed)) {
          return session.stretches_completed.length > 0;
        }
        return false;
      })
      .map((session, idx) => ({
        id: `strength-comment-${idx}`,
        date: `${session.date}, 2026`,
        comment: `Stretches completed: ${Array.isArray(session.stretches_completed) ? session.stretches_completed.join(', ') : 'Yes'}`,
        type: 'general' as const,
        details: 'Post-workout stretching routine completed.',
        isRead: false
      }));

    return {
      strengthExercises,
      stretchComments,
      year: data.strength_data.year
    };
  } catch (error) {
    console.error('Error loading strength data:', error);
    return null;
  }
}

// Load complete participant data
export function loadParticipantData(cccareId: string, name: string): any {
  const cardioData = loadCardioData(cccareId);
  const strengthData = loadStrengthData(cccareId);

  if (!cardioData || !strengthData) {
    return null;
  }

  // Combine comments from both sources and sort by date (most recent first)
  const allComments = [
    ...cardioData.sessionComments,
    ...strengthData.stretchComments
  ].sort((a, b) => {
    const dateA = parseDate(a.date.split(',')[0], strengthData.year);
    const dateB = parseDate(b.date.split(',')[0], strengthData.year);
    return dateB.getTime() - dateA.getTime(); // Most recent first
  });

  // Sort cardio trend data (most recent first)
  const sortedCardioTrend = [...cardioData.cardioTrendData].sort((a, b) => {
    const dateA = parseDate(a.date, strengthData.year);
    const dateB = parseDate(b.date, strengthData.year);
    return dateB.getTime() - dateA.getTime();
  });

  // Sort RPE trend data (most recent first)
  const sortedRPETrend = [...cardioData.rpeTrendData].sort((a, b) => {
    const dateA = parseDate(a.date, strengthData.year);
    const dateB = parseDate(b.date, strengthData.year);
    return dateB.getTime() - dateA.getTime();
  });

  // Get the most recent session date
  const lastSession = sortedCardioTrend[0];

  return {
    name,
    scanDate: `${lastSession.date}, ${strengthData.year}`,
    cardioTrendData: sortedCardioTrend,
    strengthExercises: strengthData.strengthExercises,
    rpeTrendData: sortedRPETrend,
    sessionComments: allComments,
    currentSession: {
      date: `${lastSession.date}, ${strengthData.year}`,
      totalCardioTime: lastSession.duration,
      avgHeartRate: lastSession.avgHeartRate,
      peakHeartRate: lastSession.peakHeartRate,
      avgRPE: sortedRPETrend[0].rpe
    },
    targetHR: cardioData.targetHR,
    targetRPE: cardioData.targetRPE,
    year: strengthData.year
  };
}