'use client';

import React, { useEffect, useState } from 'react';
import AppLayout from '@/components/AppLayout';

import {
  User,
  Briefcase,
  GraduationCap,
  Mail,
  Sparkles,
} from 'lucide-react';

export default function MySpacePage() {

  const [form, setForm] = useState({
    full_name: '',
    profession: '',
    college: '',
    bio: '',
    interests: '',
    });


    useEffect(() => {

    const fetchProfile = async () => {

        try {

        const token = localStorage.getItem('token');

        const response = await fetch(
            'http://localhost:8000/profile',
            {
            headers: {
                Authorization: `Bearer ${token}`,
            },
            }
        );

        const data = await response.json();

        setForm({
            full_name: data.full_name || '',
            profession: data.profession || '',
            college: data.college || '',
            bio: data.bio || '',
            interests: data.interests || '',
        });

        } catch (err) {

        console.log(err);
        }
    };

    fetchProfile();

    }, []);
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {

    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const saveProfile = async () => {

    try {

      const token = localStorage.getItem('token');

      const response = await fetch(
        'http://localhost:8000/profile',
        {
          method: 'PUT',

          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },

          body: JSON.stringify(form),
        }
      );

      const data = await response.json();

      alert(data.message);

    } catch (err) {

      console.log(err);

      alert('Failed to save profile');
    }
  };

  return (
    <AppLayout currentPath="/my-space">

      <div
        className="
          min-h-screen
          px-6
          py-8
          bg-[#050816]
          text-white
        "
      >

        {/* HEADER */}
        <div className="mb-8">

          <h1 className="text-4xl font-bold mb-2">
            My Space
          </h1>

          <p className="text-gray-400 text-lg">
            Build your personal AI identity
          </p>

        </div>

        {/* CARD */}
        <div
          className="
            max-w-4xl
            rounded-3xl
            border
            border-[#23263a]
            bg-[#0b1020]
            p-8
          "
        >

          {/* TOP PROFILE */}
          <div className="flex items-center gap-5 mb-10">

            <div
              className="
                w-24
                h-24
                rounded-full
                bg-gradient-to-r
                from-violet-600
                to-blue-500
                flex
                items-center
                justify-center
              "
            >
              <User size={42} />
            </div>

            <div>

              <h2 className="text-2xl font-semibold">
                Personal Profile
              </h2>

              <p className="text-gray-400">
                Your AI learning identity
              </p>

            </div>

          </div>

          {/* FORM */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

            {/* NAME */}
            <div>

              <label className="text-sm text-gray-400 mb-2 block">
                Full Name
              </label>

              <div className="relative">

                <User
                  size={18}
                  className="
                    absolute
                    left-4
                    top-4
                    text-violet-400
                  "
                />

                <input
                  type="text"
                  name="full_name"
                  value={form.full_name}
                  onChange={handleChange}
                  placeholder="Enter your name"
                  className="
                    w-full
                    rounded-xl
                    bg-[#12182b]
                    border
                    border-[#2a2f45]
                    py-3
                    pl-12
                    pr-4
                    outline-none
                    focus:border-violet-500
                  "
                />

              </div>

            </div>

            {/* PROFESSION */}
            <div>

              <label className="text-sm text-gray-400 mb-2 block">
                Profession
              </label>

              <div className="relative">

                <Briefcase
                  size={18}
                  className="
                    absolute
                    left-4
                    top-4
                    text-violet-400
                  "
                />

                <input
                  type="text"
                  name="profession"
                  value={form.profession}
                  onChange={handleChange}
                  placeholder="AI Engineer / Student"
                  className="
                    w-full
                    rounded-xl
                    bg-[#12182b]
                    border
                    border-[#2a2f45]
                    py-3
                    pl-12
                    pr-4
                    outline-none
                    focus:border-violet-500
                  "
                />

              </div>

            </div>

            {/* COLLEGE */}
            <div>

              <label className="text-sm text-gray-400 mb-2 block">
                College
              </label>

              <div className="relative">

                <GraduationCap
                  size={18}
                  className="
                    absolute
                    left-4
                    top-4
                    text-violet-400
                  "
                />

                <input
                  type="text"
                  name="college"
                  value={form.college}
                  onChange={handleChange}
                  placeholder="Your college"
                  className="
                    w-full
                    rounded-xl
                    bg-[#12182b]
                    border
                    border-[#2a2f45]
                    py-3
                    pl-12
                    pr-4
                    outline-none
                    focus:border-violet-500
                  "
                />

              </div>

            </div>

            {/* INTERESTS */}
            <div>

              <label className="text-sm text-gray-400 mb-2 block">
                Interests
              </label>

              <div className="relative">

                <Sparkles
                  size={18}
                  className="
                    absolute
                    left-4
                    top-4
                    text-violet-400
                  "
                />

                <input
                  type="text"
                  name="interests"
                  value={form.interests}
                  onChange={handleChange}
                  placeholder="AI, ML, Systems..."
                  className="
                    w-full
                    rounded-xl
                    bg-[#12182b]
                    border
                    border-[#2a2f45]
                    py-3
                    pl-12
                    pr-4
                    outline-none
                    focus:border-violet-500
                  "
                />

              </div>

            </div>

          </div>

          {/* BIO */}
          <div className="mt-6">

            <label className="text-sm text-gray-400 mb-2 block">
              Bio
            </label>

            <textarea
              name="bio"
              value={form.bio}
              onChange={handleChange}
              rows={5}
              placeholder="Tell your AI assistant about yourself..."
              className="
                w-full
                rounded-2xl
                bg-[#12182b]
                border
                border-[#2a2f45]
                p-4
                outline-none
                focus:border-violet-500
              "
            />

          </div>

          {/* SAVE BUTTON */}
          <button
            onClick={saveProfile}
            className="
              mt-8
              rounded-2xl
              bg-gradient-to-r
              from-violet-600
              to-blue-500
              px-8
              py-3
              font-semibold
              hover:opacity-90
              transition
            "
          >
            {
              form.full_name
                ? 'Update Profile'
                : 'Save Profile'
            }
          </button>

        </div>

      </div>

    </AppLayout>
  );
}