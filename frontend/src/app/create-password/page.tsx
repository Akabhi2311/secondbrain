'use client';

import { useState } from 'react';

import { useRouter } from 'next/navigation';

import {
  Lock,
  ArrowRight,
  Brain,
} from 'lucide-react';

export default function CreatePasswordPage() {

  const router = useRouter();

  const [password, setPassword] =
    useState('');

  const [confirmPassword,
    setConfirmPassword] =
    useState('');

  const [loading, setLoading] =
    useState(false);

  async function handleCreatePassword() {

    if (password !== confirmPassword) {

      alert('Passwords do not match');

      return;
    }

    const email =
      localStorage.getItem(
        'signup_email'
      );

    if (!email) {

      alert('Signup session expired');

      return;
    }

    setLoading(true);

    try {

      const response = await fetch(
        'http://localhost:8000/create-password',
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

      const data =
        await response.json();

      if (data.message) {

        alert(
          'Password created successfully'
        );

        router.push('/login');

      } else {

        alert(
          data.error ||
          'Something went wrong'
        );
      }

    } catch {

      alert('Failed to create password');
    }

    setLoading(false);
  }

  return (
    <div className="min-h-screen bg-black flex items-center justify-center px-6">

      <div className="w-full max-w-md bg-[#0b1020] border border-white/10 rounded-3xl p-10 shadow-2xl">

        <div className="flex flex-col items-center mb-8">

          <div className="w-20 h-20 rounded-3xl bg-gradient-to-r from-violet-600 to-blue-500 flex items-center justify-center shadow-2xl shadow-violet-500/30 mb-6">

            <Brain
              size={38}
              className="text-white"
            />

          </div>

          <h1 className="text-4xl font-bold text-white">
            Create Password
          </h1>

          <p className="text-gray-400 mt-3 text-center">
            Set a secure password for your account
          </p>

        </div>

        <div className="space-y-5">

          <div className="relative">

            <Lock
              size={18}
              className="absolute left-4 top-4 text-violet-400"
            />

            <input
              type="password"
              placeholder="New Password"
              value={password}
              onChange={(e) =>
                setPassword(e.target.value)
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
              placeholder="Confirm Password"
              value={confirmPassword}
              onChange={(e) =>
                setConfirmPassword(
                  e.target.value
                )
              }
              className="w-full pl-12 pr-4 py-4 rounded-2xl bg-[#121933] border border-white/10 text-white outline-none"
            />

          </div>

          <button
            onClick={handleCreatePassword}
            disabled={loading}
            className="w-full py-4 rounded-2xl bg-gradient-to-r from-violet-600 to-blue-500 text-white font-semibold flex items-center justify-center gap-2 hover:scale-[1.02] transition"
          >
            {loading
              ? 'Creating...'
              : 'Create Password'}

            <ArrowRight size={18} />
          </button>

        </div>
      </div>
    </div>
  );
}