import React from 'react';
import { formatDistanceToNow } from 'date-fns';
import { ArrowUp, ArrowDown, Check } from 'lucide-react';
import { Answer } from '../../types';
import { useAuth } from '../../contexts/AuthContext';

interface AnswerCardProps {
  answer: Answer;
  onVote: (targetId: string, targetType: 'question' | 'answer', voteType: 'up' | 'down') => void;
  onAccept?: () => void;
  canAccept?: boolean;
}

const AnswerCard: React.FC<AnswerCardProps> = ({ answer, onVote, onAccept, canAccept }) => {
  const { user } = useAuth();

  return (
    <div className={`bg-white border rounded-lg p-6 ${answer.isAccepted ? 'border-green-200 bg-green-50' : 'border-gray-200'}`}>
      <div className="flex items-start space-x-4">
        {/* Vote buttons */}
        <div className="flex flex-col items-center space-y-2">
          <button
            onClick={() => onVote(answer.id, 'answer', 'up')}
            className="p-2 text-gray-500 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors"
            disabled={!user}
          >
            <ArrowUp className="h-5 w-5" />
          </button>
          <span className="text-lg font-semibold text-gray-900">{answer.votes}</span>
          <button
            onClick={() => onVote(answer.id, 'answer', 'down')}
            className="p-2 text-gray-500 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
            disabled={!user}
          >
            <ArrowDown className="h-5 w-5" />
          </button>
          
          {/* Accept button */}
          {canAccept && onAccept && (
            <button
              onClick={onAccept}
              className="p-2 text-gray-500 hover:text-green-600 hover:bg-green-50 rounded-lg transition-colors mt-2"
              title="Accept this answer"
            >
              <Check className="h-5 w-5" />
            </button>
          )}
          
          {answer.isAccepted && (
            <div className="p-2 text-green-600 bg-green-100 rounded-lg mt-2">
              <Check className="h-5 w-5" />
            </div>
          )}
        </div>

        {/* Answer content */}
        <div className="flex-1">
          <div 
            className="prose max-w-none mb-4"
            dangerouslySetInnerHTML={{ __html: answer.content }}
          />

          <div className="flex items-center justify-between text-sm text-gray-500">
            {answer.isAccepted && (
              <div className="flex items-center space-x-1 text-green-600 font-medium">
                <Check className="h-4 w-4" />
                <span>Accepted Answer</span>
              </div>
            )}
            
            <div className="flex items-center space-x-2 ml-auto">
              <img
                src={answer.author.avatar || `https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=40&h=40&fit=crop`}
                alt={answer.author.username}
                className="h-8 w-8 rounded-full object-cover"
              />
              <div className="text-right">
                <div className="font-medium text-gray-900">{answer.author.username}</div>
                <div>{formatDistanceToNow(answer.createdAt, { addSuffix: true })}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AnswerCard;