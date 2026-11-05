import React, { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';

import { repository } from '@/data/repository';
import type { AuthResult, User } from '@/data/types';

interface AuthValue {
  user: User | null;
  /** true until the stored session has been read */
  loading: boolean;
  signIn: (phone: string, pin: string) => Promise<AuthResult>;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthValue | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let alive = true;
    repository.getSession().then((u) => {
      if (!alive) return;
      setUser(u);
      setLoading(false);
    });
    return () => {
      alive = false;
    };
  }, []);

  const signIn = useCallback(async (phone: string, pin: string) => {
    const result = await repository.signIn(phone, pin);
    if (result.ok) setUser(result.user);
    return result;
  }, []);

  const signOut = useCallback(async () => {
    await repository.signOut();
    setUser(null);
  }, []);

  const value = useMemo(() => ({ user, loading, signIn, signOut }), [user, loading, signIn, signOut]);
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth(): AuthValue {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used inside AuthProvider');
  return ctx;
}
