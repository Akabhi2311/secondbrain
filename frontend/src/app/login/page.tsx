'use client';

import { useState } from 'react';
import { useEffect } from 'react';
import {
  Brain,
  Mail,
  Lock,
  ArrowRight,
  Sparkles,
} from 'lucide-react';

import { useRouter } from 'next/navigation';

import {
  signInWithPopup,
  GoogleAuthProvider,
} from 'firebase/auth';

import { auth } from '@/lib/firebase';

export default function LoginPage() {

  const router = useRouter();

  const [mode, setMode] = useState<
    'login' | 'signup' | 'forgot'
  >('login');

  const [email, setEmail] = useState('');

  const [password, setPassword] =
    useState('');

  const [loading, setLoading] =
    useState(false);

  // LOGIN
  async function handleLogin() {

    setLoading(true);

    try {

      const response = await fetch(
        'http://localhost:8000/auth/login',
        {
          method: 'POST',
          headers: {
            'Content-Type':
              'application/json',
          },
          body: JSON.stringify({
            email,
            password,
          }),
        }
      );

      const data = await response.json();

      if (data.token) {

        localStorage.setItem(
          'token',
          data.token
        );

        router.push('/dashboard');

      } else {

        alert(data.error);
      }

    } catch {

      alert('Login failed');
    }

    setLoading(false);
  }

  // GOOGLE SIGNUP
  async function handleGoogleSignup() {

    try {

      const provider =
        new GoogleAuthProvider();

      const result =
        await signInWithPopup(
          auth,
          provider
        );

      const user = result.user;

      await fetch(
        'http://localhost:8000/google-signup',
        {
          method: 'POST',
          headers: {
            'Content-Type':
              'application/json',
          },
          body: JSON.stringify({
            email: user.email,
            name: user.displayName,
          }),
        }
      );

      localStorage.setItem(
        'signup_email',
        user.email || ''
      );

      router.push('/create-password');

    } catch {

      alert('Google signup failed');
    }
  }

  // GOOGLE RESET
  async function handleForgotPassword() {

    try {

      const provider =
        new GoogleAuthProvider();

      const result =
        await signInWithPopup(
          auth,
          provider
        );

      const user = result.user;

      localStorage.setItem(
        'reset_email',
        user.email || ''
      );

      router.push('/reset-password');

    } catch {

      alert('Verification failed');
    }
  }

  useEffect(() => {
    const token =
      localStorage.getItem('token');
    if (token) {
      router.push('/dashboard');
    }
  }, []);

  return (
    <div className="min-h-screen bg-black flex">

      {/* LEFT SECTION */}
      <div className="hidden lg:flex flex-1 flex-col justify-center px-20 bg-gradient-to-br from-[#050816] to-[#0b1023]">

        <div className="max-w-xl">

          <div className="w-20 h-20 rounded-3xl bg-gradient-to-r from-violet-600 to-blue-500 flex items-center justify-center shadow-2xl shadow-violet-500/30 mb-8">

            <Brain
              size={40}
              className="text-white"
            />

          </div>

          <h1 className="text-6xl font-bold text-white leading-tight">
            SecondBrain
          </h1>

          <p className="text-gray-400 text-xl mt-6 leading-relaxed">
            Your AI-powered personal knowledge assistant.
          </p>

          <div className="mt-12 space-y-6">

            {[
              'Chat with PDFs',
              'Generate AI quizzes',
              'Semantic document search',
              'AI-powered insights',
            ].map((item) => (

              <div
                key={item}
                className="flex items-center gap-4"
              >
                <div className="w-10 h-10 rounded-xl bg-violet-500/20 flex items-center justify-center">
                  <Sparkles
                    size={18}
                    className="text-violet-400"
                  />
                </div>

                <span className="text-gray-300 text-lg">
                  {item}
                </span>

              </div>
            ))}
          </div>
        </div>
      </div>

      {/* RIGHT SECTION */}
      <div className="flex-1 flex items-center justify-center px-6 bg-black">

        <div className="w-full max-w-md bg-[#0b1020] border border-white/10 rounded-3xl p-10 shadow-2xl">

          <div className="flex items-center justify-center mb-8">

            <div className="flex bg-[#141b34] rounded-2xl p-1">

              <button
                onClick={() =>
                  setMode('login')
                }
                className={`px-5 py-2 rounded-xl text-sm font-medium transition ${
                  mode === 'login'
                    ? 'bg-violet-600 text-white'
                    : 'text-gray-400'
                }`}
              >
                Login
              </button>

              <button
                onClick={() =>
                  setMode('signup')
                }
                className={`px-5 py-2 rounded-xl text-sm font-medium transition ${
                  mode === 'signup'
                    ? 'bg-violet-600 text-white'
                    : 'text-gray-400'
                }`}
              >
                Sign Up
              </button>

            </div>
          </div>

          <h2 className="text-4xl font-bold text-white text-center">
            {mode === 'login'
              ? 'Welcome Back'
              : mode === 'signup'
              ? 'Create Account'
              : 'Reset Password'}
          </h2>

          <p className="text-gray-400 text-center mt-3 mb-8">
            AI-powered knowledge management
          </p>

          {mode === 'login' && (
            <>
              <div className="space-y-5">

                <div className="relative">
                  <Mail
                    size={18}
                    className="absolute left-4 top-4 text-violet-400"
                  />

                  <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) =>
                      setEmail(e.target.value)
                    }
                    className="w-full pl-12 pr-4 py-4 rounded-2xl bg-[#121933] border border-white/10 text-white outline-none"
                  />
                </div>

                <div className="relative">
                  <Lock
                    size={18}
                    className="absolute left-4 top-4 text-violet-400"
                  />

                  <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) =>
                      setPassword(
                        e.target.value
                      )
                    }
                    className="w-full pl-12 pr-4 py-4 rounded-2xl bg-[#121933] border border-white/10 text-white outline-none"
                  />
                </div>

                <button
                  onClick={handleLogin}
                  disabled={loading}
                  className="w-full py-4 rounded-2xl bg-gradient-to-r from-violet-600 to-blue-500 text-white font-semibold flex items-center justify-center gap-2 hover:scale-[1.02] transition"
                >
                  {loading
                    ? 'Logging in...'
                    : 'Login'}

                  <ArrowRight size={18} />
                </button>

                <button
                  onClick={() =>
                    setMode('forgot')
                  }
                  className="text-sm text-violet-400 hover:text-violet-300"
                >
                  Forgot Password?
                </button>

              </div>
            </>
          )}

          {mode === 'signup' && (
            <button
              onClick={
                handleGoogleSignup
              }
              className="w-full py-4 rounded-2xl bg-white text-black font-semibold hover:bg-gray-200 transition"
            >
              Continue with Google
            </button>
          )}

          {mode === 'forgot' && (
            <button
              onClick={
                handleForgotPassword
              }
              className="w-full py-4 rounded-2xl bg-white text-black font-semibold hover:bg-gray-200 transition"
            >
              Verify with Google
            </button>
          )}

        </div>
      </div>
    </div>
  );
}