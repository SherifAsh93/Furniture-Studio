'use client';

import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';

type AuthView = 'login' | 'register';

interface User {
  id: string;
  email: string;
  name?: string | null;
  role: 'ADMIN' | 'VENDOR' | 'USER';
}

interface AuthContextType {
  isOpen: boolean;
  view: AuthView;
  user: User | null;
  loading: boolean;
  initialRole: 'VENDOR' | 'USER' | null;
  openModal: (view?: AuthView, role?: 'VENDOR' | 'USER') => void;
  closeModal: () => void;
  setView: (view: AuthView) => void;
  setInitialRole: (role: 'VENDOR' | 'USER' | null) => void;
  setUser: (user: User | null) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const [view, setView] = useState<AuthView>('login');
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  // Initialize user from localStorage
  useEffect(() => {
    const savedUser = localStorage.getItem('furniture_studio_user');
    if (savedUser) {
      try {
        setUser(JSON.parse(savedUser));
      } catch (e) {
        console.error('Failed to parse saved user', e);
      }
    }
    setLoading(false);
  }, []);

  const [initialRole, setInitialRole] = useState<'VENDOR' | 'USER' | null>(null);

  const openModal = useCallback((newView: AuthView = 'login', role?: 'VENDOR' | 'USER') => {
    setView(newView);
    setInitialRole(role || null);
    setIsOpen(true);
  }, []);

  const closeModal = useCallback(() => {
    setIsOpen(false);
  }, []);

  const logout = useCallback(() => {
    setUser(null);
    localStorage.removeItem('furniture_studio_user');
    window.location.reload(); // Simple way to clear state across app
  }, []);

  // Sync user to localStorage
  useEffect(() => {
    if (user) {
      localStorage.setItem('furniture_studio_user', JSON.stringify(user));
    } else {
      localStorage.removeItem('furniture_studio_user');
    }
  }, [user]);

  return (
    <AuthContext.Provider value={{ 
      isOpen, 
      view, 
      user, 
      loading,
      initialRole,
      openModal,
      closeModal,
      setView,
      setInitialRole,
      setUser,
      logout 
    }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
