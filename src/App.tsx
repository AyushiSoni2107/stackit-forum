import React, { useState } from 'react';
import { AuthProvider } from './contexts/AuthContext';
import { NotificationProvider } from './contexts/NotificationContext';
import Header from './components/Layout/Header';
import AuthModal from './components/Auth/AuthModal';
import QuestionForm from './components/Questions/QuestionForm';
import QuestionCard from './components/Questions/QuestionCard';
import QuestionDetail from './components/Questions/QuestionDetail';
import Chatbot from './components/Chatbot/Chatbot';
import { useQuestions } from './hooks/useQuestions';
import { useAuth } from './contexts/AuthContext';
import { Question } from './types';

const AppContent: React.FC = () => {
  const { user } = useAuth();
  const { questions, answers, addQuestion, addAnswer, vote, acceptAnswer } = useQuestions();
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [showQuestionForm, setShowQuestionForm] = useState(false);
  const [selectedQuestion, setSelectedQuestion] = useState<Question | null>(null);

  const handleAskQuestion = () => {
    if (user) {
      setShowQuestionForm(true);
    } else {
      setShowAuthModal(true);
    }
  };

  const handleQuestionSubmit = (questionData: { title: string; description: string; tags: string[] }) => {
    addQuestion(questionData);
  };

  const handleAnswerSubmit = (content: string) => {
    if (selectedQuestion) {
      addAnswer(selectedQuestion.id, content);
    }
  };

  const handleAcceptAnswer = (answerId: string) => {
    if (selectedQuestion) {
      acceptAnswer(selectedQuestion.id, answerId);
    }
  };

  if (selectedQuestion) {
    const questionAnswers = answers[selectedQuestion.id] || [];
    return (
      <div className="min-h-screen bg-gray-50">
        <Header onAskQuestion={handleAskQuestion} onShowAuth={() => setShowAuthModal(true)} />
        <main className="py-8 px-4 sm:px-6 lg:px-8">
          <QuestionDetail
            question={selectedQuestion}
            answers={questionAnswers}
            onBack={() => setSelectedQuestion(null)}
            onVote={vote}
            onAcceptAnswer={handleAcceptAnswer}
            onSubmitAnswer={handleAnswerSubmit}
          />
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header onAskQuestion={handleAskQuestion} onShowAuth={() => setShowAuthModal(true)} />
      
      <main className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Welcome to StackIt
          </h1>
          <p className="text-xl text-gray-600 mb-8">
            A minimal Q&A platform for collaborative learning and knowledge sharing
          </p>
          {!user && (
            <button
              onClick={() => setShowAuthModal(true)}
              className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-lg text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors"
            >
              Join the Community
            </button>
          )}
        </div>

        {/* Questions List */}
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold text-gray-900">Recent Questions</h2>
            <div className="text-sm text-gray-500">
              {questions.length} questions
            </div>
          </div>

          {questions.length === 0 ? (
            <div className="text-center py-12">
              <div className="text-gray-500 mb-4">No questions yet</div>
              <button
                onClick={handleAskQuestion}
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-lg text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors"
              >
                Ask the first question
              </button>
            </div>
          ) : (
            <div className="space-y-4">
              {questions.map((question) => (
                <QuestionCard
                  key={question.id}
                  question={question}
                  onClick={() => setSelectedQuestion(question)}
                />
              ))}
            </div>
          )}
        </div>
      </main>

      {/* Modals */}
      <AuthModal isOpen={showAuthModal} onClose={() => setShowAuthModal(false)} />
      <QuestionForm
        isOpen={showQuestionForm}
        onClose={() => setShowQuestionForm(false)}
        onSubmit={handleQuestionSubmit}
      />
      
      {/* Chatbot */}
      <Chatbot />
    </div>
  );
};

function App() {
  return (
    <AuthProvider>
      <NotificationProvider>
        <AppContent />
      </NotificationProvider>
    </AuthProvider>
  );
}

export default App;