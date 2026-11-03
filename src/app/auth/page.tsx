'use client';

import React, { useState, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Mail, Sparkles, CheckCircle2, ArrowRight, Loader2, Lock, UserCheck } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/Card';
import { Input } from '@/components/ui/Input';
import { ThemeToggle } from '@/components/ui/ThemeToggle';
import { createClient } from '@/lib/supabase/client';

function AuthContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirectTo = searchParams.get('redirectTo') || '/dashboard';
  const urlError = searchParams.get('error');

  const [authMode, setAuthMode] = useState<'password' | 'magic'>('password');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSignUp, setIsSignUp] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingGoogle, setIsLoadingGoogle] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState(
    urlError ? 'Authentication failed. Please try signing in again.' : ''
  );

  const handlePasswordAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      setErrorMessage('Please provide both email and password.');
      return;
    }

    setIsLoading(true);
    setErrorMessage('');

    try {
      const supabase = createClient();

      if (isSignUp) {
        // Sign up with password
        const { error, data } = await supabase.auth.signUp({
          email,
          password,
        });

        if (error) {
          setErrorMessage(error.message);
        } else if (data.session) {
          router.push(redirectTo);
        } else {
          // If email confirmation is required by Supabase
          setIsSuccess(true);
        }
      } else {
        // Sign in with password (instant - NO email rate limits)
        const { error } = await supabase.auth.signInWithPassword({
          email,
          password,
        });

        if (error) {
          // If invalid login, suggest signing up
          if (error.message.toLowerCase().includes('invalid login credentials')) {
            setErrorMessage('Invalid credentials. If this is your first time, click "Sign Up" below.');
          } else {
            setErrorMessage(error.message);
          }
        } else {
          router.push(redirectTo);
        }
      }
    } catch {
      setErrorMessage('An unexpected error occurred. Please check your connection.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleEmailMagicLink = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes('@')) {
      setErrorMessage('Please enter a valid email address.');
      return;
    }

    setIsLoading(true);
    setErrorMessage('');

    try {
      const supabase = createClient();
      const origin = window.location.origin;
      const { error } = await supabase.auth.signInWithOtp({
        email,
        options: {
          emailRedirectTo: `${origin}/auth/callback?next=${encodeURIComponent(redirectTo)}`,
        },
      });

      if (error) {
        if (error.message.toLowerCase().includes('rate limit')) {
          setErrorMessage('Supabase free email limit reached (max 3/hr). Please use Password Login or Guest Mode below!');
        } else {
          setErrorMessage(error.message);
        }
      } else {
        setIsSuccess(true);
      }
    } catch {
      setErrorMessage('An unexpected error occurred. Please check your connection.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    setIsLoadingGoogle(true);
    setErrorMessage('');

    try {
      const supabase = createClient();
      const origin = window.location.origin;
      const { error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: `${origin}/auth/callback?next=${encodeURIComponent(redirectTo)}`,
        },
      });

      if (error) {
        setErrorMessage(error.message);
        setIsLoadingGoogle(false);
      }
    } catch {
      setErrorMessage('Failed to connect to Google authentication.');
      setIsLoadingGoogle(false);
    }
  };

  const handleGuestContinue = () => {
    // Instant bypass for testing without credentials
    router.push(redirectTo);
  };

  return (
    <Card className="border border-surface-border p-8 sm:p-10 shadow-xl shadow-black/[0.04]">
      <CardHeader className="text-center p-0 pb-6">
        <span className="text-xs uppercase tracking-widest font-semibold text-accent-emerald mb-2 block">
          India Clean Energy Portal
        </span>
        <CardTitle className="text-3xl font-display font-bold tracking-tight">
          Welcome to ImVerde
        </CardTitle>
        <CardDescription className="text-sm mt-2">
          Transform your monthly electricity bill into carbon clarity and monetary savings.
        </CardDescription>

        {/* Auth Mode Switcher */}
        <div className="flex items-center justify-center p-1 bg-surface-hover border border-surface-border rounded-full mt-5 max-w-xs mx-auto">
          <button
            type="button"
            onClick={() => {
              setAuthMode('password');
              setErrorMessage('');
            }}
            className={`flex-1 py-1.5 px-3 rounded-full text-xs font-semibold transition-all ${
              authMode === 'password'
                ? 'bg-primary text-primary-foreground shadow-sm'
                : 'text-muted-fg hover:text-foreground'
            }`}
          >
            Password (Instant)
          </button>
          <button
            type="button"
            onClick={() => {
              setAuthMode('magic');
              setErrorMessage('');
            }}
            className={`flex-1 py-1.5 px-3 rounded-full text-xs font-semibold transition-all ${
              authMode === 'magic'
                ? 'bg-primary text-primary-foreground shadow-sm'
                : 'text-muted-fg hover:text-foreground'
            }`}
          >
            Magic Link
          </button>
        </div>
      </CardHeader>

      <CardContent className="p-0">
        {isSuccess ? (
          /* Success / Check Email State */
          <div className="flex flex-col items-center text-center py-6 space-y-4">
            <div className="w-16 h-16 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 flex items-center justify-center">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <h4 className="font-display text-xl font-semibold text-foreground">
              Check your inbox
            </h4>
            <p className="text-sm text-muted-fg leading-relaxed max-w-xs">
              We sent a secure sign-in link to{' '}
              <span className="font-semibold text-foreground">{email}</span>.
            </p>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setIsSuccess(false)}
              className="mt-4"
            >
              Back to Sign In
            </Button>
          </div>
        ) : (
          /* Auth Form */
          <div className="space-y-5">
            {/* Password Login / Signup Form */}
            {authMode === 'password' ? (
              <form onSubmit={handlePasswordAuth} className="space-y-3.5">
                <Input
                  type="email"
                  label="Email address"
                  placeholder="name@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  leadingIcon={<Mail className="w-4 h-4" />}
                  autoComplete="email"
                  required
                />

                <Input
                  type="password"
                  label="Password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  leadingIcon={<Lock className="w-4 h-4" />}
                  error={errorMessage}
                  autoComplete={isSignUp ? 'new-password' : 'current-password'}
                  required
                />

                <Button
                  type="submit"
                  variant="primary"
                  size="lg"
                  isLoading={isLoading}
                  className="w-full flex items-center justify-center gap-2 group mt-2"
                >
                  <span>{isSignUp ? 'Create Account & Sign In' : 'Sign In with Password'}</span>
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </Button>

                <div className="flex items-center justify-between text-xs pt-1 px-1">
                  <button
                    type="button"
                    onClick={() => {
                      setIsSignUp(!isSignUp);
                      setErrorMessage('');
                    }}
                    className="text-accent-emerald hover:underline font-medium"
                  >
                    {isSignUp ? 'Already have an account? Sign In' : 'Need an account? Sign Up'}
                  </button>
                  <button
                    type="button"
                    onClick={handleGuestContinue}
                    className="text-muted-fg hover:text-foreground font-medium underline"
                  >
                    Guest Demo &rarr;
                  </button>
                </div>
              </form>
            ) : (
              /* Magic Link Form */
              <form onSubmit={handleEmailMagicLink} className="space-y-4">
                <Input
                  type="email"
                  label="Email address"
                  placeholder="name@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  leadingIcon={<Mail className="w-4 h-4" />}
                  error={errorMessage}
                  helperText="Sends a login link to your email (rate limited to 3/hr by Supabase free tier)"
                  autoComplete="email"
                  required
                />

                <Button
                  type="submit"
                  variant="primary"
                  size="lg"
                  isLoading={isLoading}
                  className="w-full flex items-center justify-center gap-2 group"
                >
                  <span>Send Magic Link</span>
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </Button>
              </form>
            )}

            <div className="relative flex items-center justify-center pt-2">
              <div className="border-t border-surface-border w-full" />
              <span className="bg-surface px-3 text-xs uppercase tracking-widest text-muted-fg font-medium">
                Or continue with
              </span>
            </div>

            {/* Quick Actions: Google & Guest */}
            <div className="grid grid-cols-2 gap-3">
              <Button
                type="button"
                variant="secondary"
                size="md"
                isLoading={isLoadingGoogle}
                onClick={handleGoogleSignIn}
                className="w-full flex items-center justify-center gap-2 border border-surface-border text-xs font-medium"
              >
                <svg className="w-4 h-4" viewBox="0 0 24 24">
                  <path
                    fill="#4285F4"
                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                  />
                  <path
                    fill="#34A853"
                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  />
                  <path
                    fill="#FBBC05"
                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
                  />
                  <path
                    fill="#EA4335"
                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
                  />
                </svg>
                <span>Google</span>
              </Button>

              <Button
                type="button"
                variant="outline"
                size="md"
                onClick={handleGuestContinue}
                className="w-full flex items-center justify-center gap-1.5 text-xs font-medium"
              >
                <UserCheck className="w-4 h-4 text-accent-emerald" />
                <span>Guest Demo</span>
              </Button>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}

export default function AuthPage() {
  const router = useRouter();

  return (
    <div className="min-h-screen w-full flex flex-col justify-between p-6 sm:p-12 relative overflow-hidden bg-background">
      {/* Top Bar */}
      <div className="w-full max-w-6xl mx-auto flex items-center justify-between z-10">
        <div className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-full bg-primary flex items-center justify-center text-primary-foreground shadow-sm">
            <Sparkles className="w-4 h-4 text-emerald-400" />
          </div>
          <span className="font-display text-xl font-bold tracking-tight text-foreground">
            ImVerde
          </span>
        </div>
        <div className="flex items-center gap-3">
          <ThemeToggle />
        </div>
      </div>

      {/* Main Container */}
      <div className="w-full max-w-md mx-auto my-auto py-10 z-10">
        <Suspense
          fallback={
            <Card className="p-10 flex flex-col items-center justify-center space-y-4">
              <Loader2 className="w-8 h-8 animate-spin text-primary" />
              <p className="text-sm text-muted-fg">Loading portal...</p>
            </Card>
          }
        >
          <AuthContent />
        </Suspense>
      </div>

      {/* Footer */}
      <div className="w-full max-w-6xl mx-auto flex items-center justify-between text-xs text-muted-fg z-10 pt-4">
        <span>© 2026 ImVerde Technologies. Target region: India.</span>
        <button
          onClick={() => router.push('/design')}
          className="hover:text-foreground transition-colors underline underline-offset-4"
        >
          View Design System
        </button>
      </div>
    </div>
  );
}
