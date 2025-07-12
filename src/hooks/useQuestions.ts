import { useState, useEffect } from 'react';
import { Question, Answer, User } from '../types';
import { useAuth } from '../contexts/AuthContext';
import { useNotifications } from '../contexts/NotificationContext';

export const useQuestions = () => {
  const { user } = useAuth();
  const { addNotification } = useNotifications();
  const [questions, setQuestions] = useState<Question[]>([]);
  const [answers, setAnswers] = useState<{ [questionId: string]: Answer[] }>({});

  // Mock users
  const mockUsers: User[] = [
    {
      id: '1',
      username: 'AyushiSoni',
      email: 'ayushi@example.com',
      role: 'user',
      createdAt: new Date(),
      avatar: 'https://img.freepik.com/free-vector/cute-girl-hacker-operating-laptop-cartoon-vector-icon-illustration-people-technology-isolated-flat_138676-9487.jpg?semt=ais_hybrid&w=740'
    },
    {
      id: '2',
      username: 'DhrumilSoni',
      email: 'john@example.com',
      role: 'user',
      createdAt: new Date(),
      avatar: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop'
    },
    {
      id: '3',
      username: 'sarahlee',
      email: 'sara@example.com',
      role: 'user',
      createdAt: new Date(),
      avatar: 'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop'
    }
  ];

  useEffect(() => {
    // Load mock questions
    const mockQuestions: Question[] = [
      {
        id: '1',
        title: 'How to use React hooks effectively?',
        description: '<p>I\'m new to React hooks and wondering about best practices. When should I use <strong>useState</strong> vs <strong>useReducer</strong>? Any tips for avoiding common pitfalls?</p>',
        tags: ['React', 'JavaScript', 'Hooks'],
        authorId: '2',
        author: mockUsers[0],
        votes: 15,
        answerCount: 3,
        createdAt: new Date(Date.now() - 1000 * 60 * 60 * 2),
        updatedAt: new Date(Date.now() - 1000 * 60 * 60 * 2)
      },
      {
        id: '2',
        title: 'TypeScript generic constraints explained',
        description: '<p>Can someone explain how generic constraints work in TypeScript? I\'m having trouble understanding when and how to use <code>extends</code> keyword with generics.</p><p>Here\'s an example I\'m struggling with:</p><pre><code>function getValue&lt;T extends keyof U, U&gt;(obj: U, key: T): U[T] {\n  return obj[key];\n}</code></pre>',
        tags: ['TypeScript', 'Generics'],
        authorId: '3',
        author: mockUsers[1],
        votes: 8,
        answerCount: 2,
        acceptedAnswerId: 'a3',
        createdAt: new Date(Date.now() - 1000 * 60 * 60 * 4),
        updatedAt: new Date(Date.now() - 1000 * 60 * 60 * 4)
      },
      {
        id: '3',
        title: 'Best practices for Node.js error handling',
        description: '<p>What are the recommended patterns for error handling in Node.js applications? Should I use try-catch blocks everywhere or are there better approaches?</p><ul><li>How to handle async errors?</li><li>When to use error-first callbacks vs promises?</li><li>Best practices for logging errors?</li></ul>',
        tags: ['Node.js', 'JavaScript', 'Error Handling'],
        authorId: '4',
        author: mockUsers[2],
        votes: 12,
        answerCount: 1,
        createdAt: new Date(Date.now() - 1000 * 60 * 60 * 6),
        updatedAt: new Date(Date.now() - 1000 * 60 * 60 * 6)
      }
    ];

    const mockAnswers: { [questionId: string]: Answer[] } = {
      '1': [
        {
          id: 'a1',
          content: '<p><strong>useState</strong> is perfect for simple state management, while <strong>useReducer</strong> shines when you have complex state logic or multiple sub-values.</p><p>Here are some guidelines:</p><ul><li>Use <code>useState</code> for simple values (strings, numbers, booleans)</li><li>Use <code>useReducer</code> when state depends on previous state</li><li>Use <code>useReducer</code> when you have complex state objects</li></ul><p>Hope this helps! 😊</p>',
          questionId: '1',
          authorId: '3',
          author: mockUsers[1],
          votes: 10,
          isAccepted: false,
          createdAt: new Date(Date.now() - 1000 * 60 * 60 * 1),
          updatedAt: new Date(Date.now() - 1000 * 60 * 60 * 1)
        },
        {
          id: 'a2',
          content: '<p>Great question! I\'d also add that <strong>useCallback</strong> and <strong>useMemo</strong> are crucial for performance optimization.</p><p>Common pitfalls to avoid:</p><ol><li>Don\'t forget dependency arrays in useEffect</li><li>Avoid creating objects/functions inside render</li><li>Use the functional update pattern when state depends on previous state</li></ol>',
          questionId: '1',
          authorId: '4',
          author: mockUsers[2],
          votes: 7,
          isAccepted: false,
          createdAt: new Date(Date.now() - 1000 * 60 * 30),
          updatedAt: new Date(Date.now() - 1000 * 60 * 30)
        }
      ],
      '2': [
        {
          id: 'a3',
          content: '<p>Generic constraints allow you to limit the types that can be used with a generic. The <code>extends</code> keyword creates a constraint.</p><p>In your example:</p><pre><code>function getValue&lt;T extends keyof U, U&gt;(obj: U, key: T): U[T]</code></pre><p>This means:</p><ul><li><code>T</code> must be a key that exists in <code>U</code></li><li><code>U</code> can be any object type</li><li>The return type is the type of the property at key <code>T</code> in object <code>U</code></li></ul><p>This ensures type safety! ✅</p>',
          questionId: '2',
          authorId: '2',
          author: mockUsers[0],
          votes: 15,
          isAccepted: true,
          createdAt: new Date(Date.now() - 1000 * 60 * 60 * 3),
          updatedAt: new Date(Date.now() - 1000 * 60 * 60 * 3)
        }
      ],
      '3': [
        {
          id: 'a4',
          content: '<p>For Node.js error handling, I recommend a layered approach:</p><ol><li><strong>Use try-catch for async/await</strong></li><li><strong>Implement global error handlers</strong></li><li><strong>Use proper logging libraries like Winston</strong></li></ol><p>Example:</p><pre><code>app.use((err, req, res, next) => {\n  logger.error(err.stack);\n  res.status(500).send(\'Something broke!\');\n});</code></pre>',
          questionId: '3',
          authorId: '2',
          author: mockUsers[0],
          votes: 5,
          isAccepted: false,
          createdAt: new Date(Date.now() - 1000 * 60 * 60 * 5),
          updatedAt: new Date(Date.now() - 1000 * 60 * 60 * 5)
        }
      ]
    };

    setQuestions(mockQuestions);
    setAnswers(mockAnswers);
  }, []);

  const addQuestion = (questionData: { title: string; description: string; tags: string[] }) => {
    if (!user) return;

    const newQuestion: Question = {
      id: Date.now().toString(),
      title: questionData.title,
      description: questionData.description,
      tags: questionData.tags,
      authorId: user.id,
      author: user,
      votes: 0,
      answerCount: 0,
      createdAt: new Date(),
      updatedAt: new Date()
    };

    setQuestions(prev => [newQuestion, ...prev]);
  };

  const addAnswer = (questionId: string, content: string) => {
    if (!user) return;

    const newAnswer: Answer = {
      id: Date.now().toString(),
      content,
      questionId,
      authorId: user.id,
      author: user,
      votes: 0,
      isAccepted: false,
      createdAt: new Date(),
      updatedAt: new Date()
    };

    setAnswers(prev => ({
      ...prev,
      [questionId]: [...(prev[questionId] || []), newAnswer]
    }));

    // Update question answer count
    setQuestions(prev => prev.map(q => 
      q.id === questionId 
        ? { ...q, answerCount: q.answerCount + 1 }
        : q
    ));

    // Notify question author
    const question = questions.find(q => q.id === questionId);
    if (question && question.authorId !== user.id) {
      addNotification({
        userId: question.authorId,
        type: 'answer',
        message: `${user.username} answered your question "${question.title}"`,
        isRead: false,
        relatedId: questionId
      });
    }
  };

  const vote = (targetId: string, targetType: 'question' | 'answer', voteType: 'up' | 'down') => {
    if (!user) return;

    const voteValue = voteType === 'up' ? 1 : -1;

    if (targetType === 'question') {
      setQuestions(prev => prev.map(q => 
        q.id === targetId 
          ? { ...q, votes: q.votes + voteValue }
          : q
      ));
    } else {
      setAnswers(prev => ({
        ...prev,
        ...Object.keys(prev).reduce((acc, questionId) => {
          acc[questionId] = prev[questionId].map(a => 
            a.id === targetId 
              ? { ...a, votes: a.votes + voteValue }
              : a
          );
          return acc;
        }, {} as { [questionId: string]: Answer[] })
      }));
    }
  };

  const acceptAnswer = (questionId: string, answerId: string) => {
    if (!user) return;

    // Update question
    setQuestions(prev => prev.map(q => 
      q.id === questionId 
        ? { ...q, acceptedAnswerId: answerId }
        : q
    ));

    // Update answers
    setAnswers(prev => ({
      ...prev,
      [questionId]: prev[questionId]?.map(a => ({
        ...a,
        isAccepted: a.id === answerId
      })) || []
    }));

    // Notify answer author
    const answer = answers[questionId]?.find(a => a.id === answerId);
    if (answer && answer.authorId !== user.id) {
      addNotification({
        userId: answer.authorId,
        type: 'accepted',
        message: `Your answer was accepted!`,
        isRead: false,
        relatedId: questionId
      });
    }
  };

  return {
    questions,
    answers,
    addQuestion,
    addAnswer,
    vote,
    acceptAnswer
  };
};