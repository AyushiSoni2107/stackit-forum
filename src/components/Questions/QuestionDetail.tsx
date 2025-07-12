import React, { useState } from 'react';
import { formatDistanceToNow } from 'date-fns';
import { ArrowUp, ArrowDown, Tag, Check, MessageCircle, ArrowLeft } from 'lucide-react';
import { Question, Answer } from '../../types';
import { useAuth } from '../../contexts/AuthContext';
import RichTextEditor from '../RichTextEditor/RichTextEditor';
import AnswerCard from './AnswerCard';

interface QuestionDetailProps {
  question: Question;
  answers: Answer[];
  onBack: () => void;
  onVote: (targetId: string, targetType: 'question' | 'answer', voteType: 'up' | 'down') => void;
  onAcceptAnswer: (answerId: string) => void;
  onSubmitAnswer: (content: string) => void;
}

const QuestionDetail: React.FC<QuestionDetailProps> = ({
  question,
  answers,
  onBack,
  onVote,
  onAcceptAnswer,
  onSubmitAnswer
}) => {
  const { user } = useAuth();
  const [answerContent, setAnswerContent] = useState('');

  const handleSubmitAnswer = (e: React.FormEvent) => {
    e.preventDefault();
    if (answerContent.trim()) {
      onSubmitAnswer(answerContent);
      setAnswerContent('');
    }
  };

  const isQuestionOwner = user?.id === question.authorId;

  return (
    <div className="max-w-4xl mx-auto">
      {/* Back Button */}
      <button
        onClick={onBack}
        className="flex items-center text-indigo-600 hover:text-indigo-800 mb-6 transition-colors"
      >
        <ArrowLeft className="h-4 w-4 mr-2" />
        Back to questions
      </button>

      {/* Question */}
      <div className="bg-white border border-gray-200 rounded-lg p-6 mb-6">
        <div className="flex items-start space-x-4">
          {/* Vote buttons */}
          <div className="flex flex-col items-center space-y-2">
            <button
              onClick={() => onVote(question.id, 'question', 'up')}
              className="p-2 text-gray-500 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors"
              disabled={!user}
            >
              <ArrowUp className="h-6 w-6" />
            </button>
            <span className="text-lg font-semibold text-gray-900">{question.votes}</span>
            <button
              onClick={() => onVote(question.id, 'question', 'down')}
              className="p-2 text-gray-500 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
              disabled={!user}
            >
              <ArrowDown className="h-6 w-6" />
            </button>
          </div>

          {/* Question content */}
          <div className="flex-1">
            <h1 className="text-2xl font-bold text-gray-900 mb-4">{question.title}</h1>
            
            <div 
              className="prose max-w-none mb-6"
              dangerouslySetInnerHTML={{ __html: question.description }}
            />

            <div className="flex flex-wrap gap-2 mb-6">
              {question.tags.map((tag) => (
                <span
                  key={tag}
                  className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-indigo-100 text-indigo-800"
                >
                  <Tag className="h-3 w-3 mr-1" />
                  {tag}
                </span>
              ))}
            </div>

            <div className="flex items-center justify-between text-sm text-gray-500">
              <div className="flex items-center space-x-4">
                <span>{answers.length} answers</span>
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
                  className="h-8 w-8 rounded-full object-cover"
                />
                <div className="text-right">
                  <div className="font-medium text-gray-900">{question.author.username}</div>
                  <div>{formatDistanceToNow(question.createdAt, { addSuffix: true })}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Answers */}
      <div className="space-y-6">
        <h2 className="text-xl font-semibold text-gray-900">
          {answers.length} {answers.length === 1 ? 'Answer' : 'Answers'}
        </h2>

        {answers.map((answer) => (
          <AnswerCard
            key={answer.id}
            answer={answer}
            onVote={onVote}
            onAccept={isQuestionOwner ? () => onAcceptAnswer(answer.id) : undefined}
            canAccept={isQuestionOwner && !question.acceptedAnswerId}
          />
        ))}

        {/* Answer Form */}
        {user ? (
          <div className="bg-white border border-gray-200 rounded-lg p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Your Answer</h3>
            <form onSubmit={handleSubmitAnswer}>
              <RichTextEditor
                value={answerContent}
                onChange={setAnswerContent}
                placeholder="Write your answer here..."
                className="mb-4"
              />
              <button
                type="submit"
                disabled={!answerContent.trim()}
                className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                Post Answer
              </button>
            </form>
          </div>
        ) : (
          <div className="bg-gray-50 border border-gray-200 rounded-lg p-6 text-center">
            <MessageCircle className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-600 mb-4">Sign in to post an answer</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default QuestionDetail;