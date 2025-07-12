import React, { useState, useRef, useEffect } from 'react';
import { MessageCircle, X, Send, Bot, User, HelpCircle } from 'lucide-react';

interface Message {
  id: string;
  text: string;
  isBot: boolean;
  timestamp: Date;
}

const Chatbot: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    if (isOpen && messages.length === 0) {
      // Welcome message when chatbot opens
      const welcomeMessage: Message = {
        id: '1',
        text: "Hi! I'm StackBot, your guide to StackIt! 🤖\n\nI can help you with:\n• How to ask questions\n• Using the rich text editor\n• Understanding voting and answers\n• Platform features and navigation\n\nWhat would you like to know?",
        isBot: true,
        timestamp: new Date()
      };
      setMessages([welcomeMessage]);
    }
  }, [isOpen, messages.length]);

  const getBotResponse = (userMessage: string): string => {
    const message = userMessage.toLowerCase();

    // Question-related help
    if (message.includes('question') || message.includes('ask')) {
      return "To ask a question:\n\n1. Click the 'Ask Question' button in the header\n2. Write a clear, specific title\n3. Use the rich text editor for detailed description\n4. Add relevant tags (up to 5)\n5. Click 'Post Question'\n\nTips:\n• Be specific and descriptive\n• Include code examples if relevant\n• Use proper tags for better visibility";
    }

    // Rich text editor help
    if (message.includes('editor') || message.includes('format') || message.includes('rich text')) {
      return "The rich text editor supports:\n\n• **Bold**, *Italic*, ~~Strikethrough~~\n• Numbered and bullet lists\n• 😊 Emoji insertion\n• 🔗 Hyperlinks\n• 📷 Image uploads\n• Text alignment (left, center, right)\n\nUse the toolbar buttons or keyboard shortcuts!";
    }

    // Voting help
    if (message.includes('vote') || message.includes('upvote') || message.includes('downvote')) {
      return "Voting helps highlight quality content:\n\n• ⬆️ Upvote good questions/answers\n• ⬇️ Downvote poor quality content\n• Only logged-in users can vote\n• You can't vote on your own content\n\nVotes help the community identify the best answers!";
    }

    // Answer help
    if (message.includes('answer') || message.includes('respond')) {
      return "To answer questions:\n\n1. Click on any question to view details\n2. Scroll to the bottom\n3. Use the rich text editor to write your answer\n4. Click 'Post Answer'\n\nTips:\n• Provide clear, helpful explanations\n• Include code examples when relevant\n• Be respectful and constructive";
    }

    // Accepted answers
    if (message.includes('accept') || message.includes('solved')) {
      return "About accepted answers:\n\n• Only question owners can accept answers\n• Click the ✅ checkmark next to the best answer\n• Accepted answers appear at the top\n• This marks the question as 'Solved'\n• It helps others find the best solution quickly";
    }

    // Tags help
    if (message.includes('tag') || message.includes('category')) {
      return "Tags help organize questions:\n\n• Add up to 5 relevant tags per question\n• Use existing popular tags when possible\n• Tags like 'React', 'JavaScript', 'CSS' are common\n• Click popular tag suggestions for quick selection\n• Good tags improve question discoverability";
    }

    // Notifications
    if (message.includes('notification') || message.includes('bell')) {
      return "Notifications keep you updated:\n\n🔔 You'll be notified when:\n• Someone answers your question\n• Someone comments on your answer\n• Someone mentions you with @username\n• Your answer gets accepted\n\nClick the bell icon to view all notifications!";
    }

    // Account/Profile
    if (message.includes('account') || message.includes('profile') || message.includes('sign')) {
      return "Account features:\n\n• Sign up to ask questions and post answers\n• Vote on content to help the community\n• Get notifications for interactions\n• Build your reputation through quality contributions\n\nClick 'Sign In' in the header to get started!";
    }

    // General help
    if (message.includes('help') || message.includes('how') || message.includes('what')) {
      return "I can help you with:\n\n📝 Asking questions\n✏️ Using the rich text editor\n👍 Voting and answers\n🏷️ Adding tags\n🔔 Notifications\n👤 Account features\n\nJust ask me about any of these topics!";
    }

    // Default response
    return "I'm here to help! You can ask me about:\n\n• How to ask questions\n• Using the rich text editor\n• Voting and accepting answers\n• Tags and notifications\n• Account features\n\nWhat specific topic would you like help with?";
  };

  const handleSendMessage = () => {
    if (!inputValue.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputValue,
      isBot: false,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsTyping(true);

    // Simulate bot typing delay
    setTimeout(() => {
      const botResponse: Message = {
        id: (Date.now() + 1).toString(),
        text: getBotResponse(inputValue),
        isBot: true,
        timestamp: new Date()
      };
      setMessages(prev => [...prev, botResponse]);
      setIsTyping(false);
    }, 1000);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const quickQuestions = [
    "How do I ask a question?",
    "How to use the rich text editor?",
    "How does voting work?",
    "How to accept an answer?"
  ];

  const handleQuickQuestion = (question: string) => {
    setInputValue(question);
    handleSendMessage();
  };

  return (
    <>
      {/* Chatbot Toggle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 bg-indigo-600 text-white p-4 rounded-full shadow-lg hover:bg-indigo-700 transition-all duration-300 z-50 hover:scale-110"
        title="Get help from StackBot"
      >
        {isOpen ? <X className="h-6 w-6" /> : <MessageCircle className="h-6 w-6" />}
      </button>

      {/* Chatbot Window */}
      {isOpen && (
        <div className="fixed bottom-24 right-6 w-96 h-[500px] bg-white rounded-lg shadow-2xl border border-gray-200 flex flex-col z-50">
          {/* Header */}
          <div className="bg-indigo-600 text-white p-4 rounded-t-lg flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Bot className="h-6 w-6" />
              <div>
                <h3 className="font-semibold">StackBot</h3>
                <p className="text-xs text-indigo-200">Your StackIt Guide</p>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="text-indigo-200 hover:text-white transition-colors"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${message.isBot ? 'justify-start' : 'justify-end'}`}
              >
                <div
                  className={`max-w-[80%] p-3 rounded-lg ${
                    message.isBot
                      ? 'bg-gray-100 text-gray-800'
                      : 'bg-indigo-600 text-white'
                  }`}
                >
                  <div className="flex items-start space-x-2">
                    {message.isBot && <Bot className="h-4 w-4 mt-1 flex-shrink-0" />}
                    <div className="whitespace-pre-line text-sm">{message.text}</div>
                    {!message.isBot && <User className="h-4 w-4 mt-1 flex-shrink-0" />}
                  </div>
                </div>
              </div>
            ))}

            {/* Typing indicator */}
            {isTyping && (
              <div className="flex justify-start">
                <div className="bg-gray-100 text-gray-800 p-3 rounded-lg max-w-[80%]">
                  <div className="flex items-center space-x-2">
                    <Bot className="h-4 w-4" />
                    <div className="flex space-x-1">
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Quick Questions */}
            {messages.length === 1 && (
              <div className="space-y-2">
                <p className="text-sm text-gray-600 font-medium">Quick questions:</p>
                {quickQuestions.map((question, index) => (
                  <button
                    key={index}
                    onClick={() => handleQuickQuestion(question)}
                    className="block w-full text-left p-2 text-sm bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors border border-gray-200"
                  >
                    <HelpCircle className="h-3 w-3 inline mr-2" />
                    {question}
                  </button>
                ))}
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <div className="p-4 border-t border-gray-200">
            <div className="flex space-x-2">
              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Ask me anything about StackIt..."
                className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-sm"
              />
              <button
                onClick={handleSendMessage}
                disabled={!inputValue.trim() || isTyping}
                className="bg-indigo-600 text-white p-2 rounded-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                <Send className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Chatbot;