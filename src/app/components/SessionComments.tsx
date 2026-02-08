import { MessageSquare, Calendar } from 'lucide-react';

interface Comment {
  date: string;
  comment: string;
  type?: 'fatigue' | 'pain' | 'energy' | 'general';
}

interface SessionCommentsProps {
  comments: Comment[];
}

function getCommentBadge(type?: string) {
  switch (type) {
    case 'fatigue':
      return <span className="text-xs uppercase tracking-wide bg-gray-200 text-gray-700 px-2 py-1 rounded">Fatigue</span>;
    case 'pain':
      return <span className="text-xs uppercase tracking-wide bg-gray-200 text-gray-700 px-2 py-1 rounded">Pain</span>;
    case 'energy':
      return <span className="text-xs uppercase tracking-wide bg-gray-200 text-gray-700 px-2 py-1 rounded">Energy Level</span>;
    default:
      return null;
  }
}

export function SessionComments({ comments }: SessionCommentsProps) {
  if (!comments || comments.length === 0) {
    return null;
  }

  return (
    <div className="bg-blue-50 rounded-lg border-2 border-blue-200 p-6">
      <div className="flex items-center gap-3 mb-6 pb-4 border-b-2 border-blue-300">
        <MessageSquare className="w-8 h-8 text-blue-700" />
        <h2 className="text-2xl font-medium text-gray-900">Comments & Notes</h2>
      </div>
      
      <div className="space-y-4">
        {comments.map((comment, idx) => (
          <div key={idx} className="bg-white rounded-lg p-5 border border-blue-200">
            <div className="flex items-center gap-3 mb-3">
              <Calendar className="w-5 h-5 text-gray-600" />
              <p className="text-sm font-medium text-gray-700">{comment.date}</p>
              {getCommentBadge(comment.type)}
            </div>
            <p className="text-lg text-gray-900 leading-relaxed">{comment.comment}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
