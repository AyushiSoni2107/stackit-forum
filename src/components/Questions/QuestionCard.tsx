import React from 'react';
import { formatDistanceToNow } from 'date-fns';
import { MessageCircle, ArrowUp, ArrowDown, Tag, Check } from 'lucide-react';
import { Question } from '../../types';

interface QuestionCardProps {
  question: Question;
  onClick: () => void;
}

const QuestionCard: React.FC<QuestionCardProps> = ({ question, onClick }) => {
  return (
    <div 
      className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow cursor-pointer"
      onClick={onClick}
    >
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <h3 className="text-lg font-semibold text-gray-900 mb-2 hover:text-indigo-600 transition-colors">
            {question.title}
          </h3>
          
          <div 
            className="text-gray-600 mb-4 line-clamp-3"
            dangerouslySetInnerHTML={{ __html: question.description }}
          />

          <div className="flex flex-wrap gap-2 mb-4">
            {question.tags.map((tag) => (
              <span
                key={tag}
                className="inline-flex items-center px-2 py-1 rounded-md text-xs bg-gray-100 text-gray-700"
              >
                <Tag className="h-3 w-3 mr-1" />
                {tag}
              </span>
            ))}
          </div>

          <div className="flex items-center justify-between text-sm text-gray-500">
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-1">
                <ArrowUp className="h-4 w-4" />
                <span>{question.votes}</span>
              </div>
              
              <div className="flex items-center space-x-1">
                <MessageCircle className="h-4 w-4" />
                <span>{question.answerCount} answers</span>
              </div>

              {question.acceptedAnswerId && (
                <div className="flex items-center space-x-1 text-green-600">
                  <Check className="h-4 w-4" />
                  <span>Solved</span>
                </div>
              )}
            </div>

            <div className="flex items-center space-x-2">
              <img
                src={question.author.avatar || `https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=40&h=40&fit=crop`}
                alt={question.author.username}
                className="h-6 w-6 rounded-full object-cover"
              />
              <span>{question.author.username}</span>
              <span>•</span>
              <span>{formatDistanceToNow(question.createdAt, { addSuffix: true })}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuestionCard;