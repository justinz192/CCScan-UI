import { MessageSquare } from 'lucide-react';

interface CommentsSectionProps {
  comments: string;
}

export function CommentsSection({ comments }: CommentsSectionProps) {
  if (!comments || comments.trim() === '') {
    return null;
  }

  return (
    <div className="bg-blue-50 rounded-lg border-2 border-blue-200 p-6">
      <div className="flex items-center gap-3 mb-4">
        <MessageSquare className="w-8 h-8 text-blue-700" />
        <h2 className="text-2xl font-medium text-gray-900">Session Notes</h2>
      </div>
      <div className="bg-white rounded-lg p-5 border border-blue-200">
        <p className="text-lg text-gray-900 leading-relaxed whitespace-pre-wrap">{comments}</p>
      </div>
    </div>
  );
}
