import React, { createContext, useContext, useState, useEffect } from 'react';
import { User } from '../types';

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  register: (username: string, email: string, password: string) => Promise<void>;
  logout: () => void;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check for stored user session
    const storedUser = localStorage.getItem('stackit_user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setIsLoading(false);
  }, []);

  const login = async (email: string, _password: string) => {
    setIsLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Determine gender based on common name patterns or ask user
      const username = email.split('@')[0].toLowerCase();
      const femaleNames = ['sarah', 'emily', 'jessica', 'ashley', 'amanda', 'jennifer', 'lisa', 'michelle', 'kimberly', 'amy', 'angela', 'tiffany', 'heather', 'rachel', 'nicole', 'samantha', 'stephanie', 'catherine', 'deborah', 'rebecca', 'laura', 'sharon', 'cynthia', 'kathleen', 'helen', 'maria', 'sandra', 'donna', 'carol', 'ruth', 'anna', 'mary', 'patricia', 'linda', 'barbara', 'elizabeth', 'susan', 'margaret', 'dorothy', 'nancy', 'karen', 'betty', 'helen', 'sandra', 'donna', 'carol', 'ruth', 'sharon', 'michelle', 'laura', 'sarah', 'kimberly', 'deborah', 'dorothy', 'lisa', 'nancy', 'karen', 'betty', 'helen', 'sandra', 'donna', 'carol', 'ruth', 'sharon'];
      const isFemale = femaleNames.some(name => username.includes(name));
      
      const avatar = isFemale 
        ? `https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop`
        : `https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop`;
        
        const mockUser: User = {
        id: '1',
        username: email.split('@')[0],
        email,
        role: 'user',
        createdAt: new Date(),
        avatar
      };
      
      setUser(mockUser);
      localStorage.setItem('stackit_user', JSON.stringify(mockUser));
    } catch (error) {
      throw new Error('Login failed');
    } finally {
      setIsLoading(false);
    }
  };

  const register = async (username: string, email: string, _password: string) => {
    setIsLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Determine gender based on username
      const lowerUsername = username.toLowerCase();
      const femaleNames = ['Ayushi', 'Krishna', 'sarah', 'emily', 'jessica', 'ashley', 'amanda', 'jennifer', 'lisa', 'michelle', 'kimberly', 'amy', 'angela', 'tiffany', 'heather', 'rachel', 'nicole', 'samantha', 'stephanie', 'catherine', 'deborah', 'rebecca', 'laura', 'sharon', 'cynthia', 'kathleen', 'helen', 'maria', 'sandra', 'donna', 'carol', 'ruth', 'anna', 'mary', 'patricia', 'linda', 'barbara', 'elizabeth', 'susan', 'margaret', 'dorothy', 'nancy', 'karen', 'betty'];
      const isFemale = femaleNames.some(name => lowerUsername.includes(name));
      
      const avatar = isFemale === true
  ? 'https://https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop/female.jpg'
  : isFemale === false
    ? 'https://https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop/male.jpg'
    : 'https://example.com/neutral.jpg';

      
      const mockUser: User = {
        id: Date.now().toString(),
        username,
        email,
        role: 'user',
        createdAt: new Date(),
        avatar
      };

      
      setUser(mockUser);
      localStorage.setItem('stackit_user', JSON.stringify(mockUser));
    } catch (error) {
      throw new Error('Registration failed');
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('stackit_user');
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
};