import { useState } from 'react';
import { MessageSquare, Calendar, ChevronDown, ChevronUp, CheckCircle2, Circle, Plus, Trash2 } from 'lucide-react';

interface Comment {
  id: string;
  date: string;
  comment: string;
  type?: 'fatigue' | 'pain' | 'energy' | 'general';
  details?: string;
  isRead: boolean;
}

interface ExpandableCommentsProps {
  comments: Comment[];
  onToggleRead: (id: string) => void;
  onAddComment: (comment: Omit<Comment, 'id'>) => void;
  onDeleteComment: (id: string) => void;
}

function getCommentBadge(type?: string) {
  switch (type) {
    case 'fatigue':
      return <span className="text-xs uppercase tracking-wide bg-orange-200 text-orange-800 px-2 py-1 rounded">Fatigue</span>;
    case 'pain':
      return <span className="text-xs uppercase tracking-wide bg-red-200 text-red-800 px-2 py-1 rounded">Pain</span>;
    case 'energy':
      return <span className="text-xs uppercase tracking-wide bg-green-200 text-green-800 px-2 py-1 rounded">Energy Level</span>;
    default:
      return <span className="text-xs uppercase tracking-wide bg-gray-200 text-gray-700 px-2 py-1 rounded">General</span>;
  }
}

export function ExpandableComments({ comments, onToggleRead, onAddComment, onDeleteComment }: ExpandableCommentsProps) {
  const [expandedCommentIds, setExpandedCommentIds] = useState<Set<string>>(new Set());
  const [showAddForm, setShowAddForm] = useState(false);
  const [newComment, setNewComment] = useState({
    date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
    comment: '',
    type: 'general' as 'fatigue' | 'pain' | 'energy' | 'general',
    details: '',
    isRead: false
  });

  const toggleExpanded = (id: string) => {
    setExpandedCommentIds(prev => {
      const newSet = new Set(prev);
      if (newSet.has(id)) {
        newSet.delete(id);
      } else {
        newSet.add(id);
      }
      return newSet;
    });
  };

  const handleAddComment = () => {
    if (newComment.comment.trim()) {
      onAddComment(newComment);
      setNewComment({
        date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
        comment: '',
        type: 'general',
        details: '',
        isRead: false
      });
      setShowAddForm(false);
    }
  };

  const unreadCount = comments.filter(c => !c.isRead).length;

  if (!comments || comments.length === 0) {
    return (
      <div className="bg-blue-50 rounded-lg border-2 border-blue-200 p-6">
        <div className="flex items-center justify-between mb-6 pb-4 border-b-2 border-blue-300">
          <div className="flex items-center gap-3">
            <MessageSquare className="w-8 h-8 text-blue-700" />
            <h2 className="text-2xl font-medium text-gray-900">Comments & Notes</h2>
          </div>
          <button
            onClick={() => setShowAddForm(true)}
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
          >
            <Plus className="w-5 h-5" />
            <span className="text-sm font-medium">Add Comment</span>
          </button>
        </div>
        <p className="text-base text-gray-600">No comments recorded yet.</p>
      </div>
    );
  }

  return (
    <div className="bg-blue-50 rounded-lg border-2 border-blue-200 p-6">
      <div className="flex items-center justify-between mb-6 pb-4 border-b-2 border-blue-300">
        <div className="flex items-center gap-3">
          <MessageSquare className="w-8 h-8 text-blue-700" />
          <h2 className="text-2xl font-medium text-gray-900">Comments & Notes</h2>
          {unreadCount > 0 && (
            <span className="bg-red-500 text-white text-sm font-bold px-3 py-1 rounded-full">
              {unreadCount} unread
            </span>
          )}
        </div>
        <button
          onClick={() => setShowAddForm(!showAddForm)}
          className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
        >
          <Plus className="w-5 h-5" />
          <span className="text-sm font-medium">Add Comment</span>
        </button>
      </div>

      {showAddForm && (
        <div className="bg-white rounded-lg border-2 border-blue-300 p-5 mb-4">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Add New Comment</h3>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Date</label>
              <input
                type="text"
                value={newComment.date}
                onChange={(e) => setNewComment({ ...newComment, date: e.target.value })}
                className="w-full px-3 py-2 border-2 border-gray-300 rounded-lg text-base"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Type</label>
              <select
                value={newComment.type}
                onChange={(e) => setNewComment({ ...newComment, type: e.target.value as any })}
                className="w-full px-3 py-2 border-2 border-gray-300 rounded-lg text-base"
              >
                <option value="general">General</option>
                <option value="energy">Energy Level</option>
                <option value="fatigue">Fatigue</option>
                <option value="pain">Pain</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Comment</label>
              <textarea
                value={newComment.comment}
                onChange={(e) => setNewComment({ ...newComment, comment: e.target.value })}
                className="w-full px-3 py-2 border-2 border-gray-300 rounded-lg text-base"
                rows={3}
                placeholder="Enter comment..."
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Additional Details (optional)</label>
              <textarea
                value={newComment.details}
                onChange={(e) => setNewComment({ ...newComment, details: e.target.value })}
                className="w-full px-3 py-2 border-2 border-gray-300 rounded-lg text-base"
                rows={2}
                placeholder="Enter additional details..."
              />
            </div>
            <div className="flex gap-3">
              <button
                onClick={handleAddComment}
                className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors text-sm font-medium"
              >
                Save Comment
              </button>
              <button
                onClick={() => setShowAddForm(false)}
                className="px-4 py-2 bg-gray-300 hover:bg-gray-400 text-gray-900 rounded-lg transition-colors text-sm font-medium"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
      
      <div className="space-y-3">
        {comments.map((comment) => {
          const isExpanded = expandedCommentIds.has(comment.id);
          
          return (
            <div 
              key={comment.id} 
              className={`bg-white rounded-lg border-2 overflow-hidden ${
                comment.isRead ? 'border-gray-300' : 'border-blue-400'
              }`}
            >
              <button
                onClick={() => toggleExpanded(comment.id)}
                className="w-full px-5 py-4 flex items-start gap-3 hover:bg-gray-50 transition-colors text-left"
              >
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <Calendar className="w-5 h-5 text-gray-600" />
                    <p className="text-sm font-medium text-gray-700">{comment.date}</p>
                    {getCommentBadge(comment.type)}
                    {!comment.isRead && (
                      <span className="text-xs font-bold text-blue-600 uppercase">NEW</span>
                    )}
                  </div>
                  <p className="text-base text-gray-900 leading-relaxed">{comment.comment}</p>
                </div>
                <div className="flex items-center gap-2 flex-shrink-0">
                  {isExpanded ? (
                    <ChevronUp className="w-5 h-5 text-gray-600" />
                  ) : (
                    <ChevronDown className="w-5 h-5 text-gray-600" />
                  )}
                </div>
              </button>

              {isExpanded && (
                <div className="border-t-2 border-gray-200 px-5 py-4 bg-gray-50">
                  {comment.details && (
                    <div className="mb-4">
                      <p className="text-sm text-gray-600 uppercase tracking-wide mb-2">Additional Details</p>
                      <p className="text-base text-gray-900 leading-relaxed">{comment.details}</p>
                    </div>
                  )}
                  
                  <div className="flex items-center gap-3">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onToggleRead(comment.id);
                      }}
                      className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${ 
                        comment.isRead 
                          ? 'bg-green-100 hover:bg-green-200 text-green-900' 
                          : 'bg-blue-100 hover:bg-blue-200 text-blue-900'
                      }`}
                    >
                      {comment.isRead ? (
                        <CheckCircle2 className="w-5 h-5" />
                      ) : (
                        <Circle className="w-5 h-5" />
                      )}
                      <span className="text-sm font-medium">
                        {comment.isRead ? 'Marked as Read' : 'Mark as Read'}
                      </span>
                    </button>
                    
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        if (confirm('Are you sure you want to delete this comment?')) {
                          onDeleteComment(comment.id);
                        }
                      }}
                      className="flex items-center gap-2 px-4 py-2 bg-red-100 hover:bg-red-200 text-red-900 rounded-lg transition-colors"
                    >
                      <Trash2 className="w-5 h-5" />
                      <span className="text-sm font-medium">Delete</span>
                    </button>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}