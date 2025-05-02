'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function Navbar() {
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
  const router = useRouter();

  const handleNavButtonClick = (buttonName: string) => {
    switch (buttonName) {
      case 'Closet':
        router.push('/closet');
        break;
      case 'AI Advice':
        router.push('/ai-advice');
        break;
      case 'Upload Clothing':
        router.push('/upload');
        break;
      case 'Inspiration':
        router.push('/inspiration');
        break;
    }
  };

  const handleProfileOption = (option: string) => {
    switch (option) {
      case 'User Profile':
        router.push('/profile');
        break;
      case 'Sign Out':
        router.push('/login');
        break;
    }
    setIsProfileMenuOpen(false);
  };

  return (
    <nav className="w-full bg-white px-6 py-4 flex items-center justify-between shadow-lg border-b border-[#B5A48B]">
      {/* Logo/Brand */}
      <Link href="/home" className="text-[#1D1D1D] text-xl font-bold hover:text-[#B5A48B] transition-colors">
        Thread Bros
      </Link>

      {/* Navigation Buttons */}
      <div className="flex items-center space-x-6">
        <button
          onClick={() => handleNavButtonClick('Closet')}
          className="text-[#4F5B62] hover:text-[#B5A48B] transition-colors px-3 py-1"
        >
          Closet
        </button>
        <button
          onClick={() => handleNavButtonClick('AI Advice')}
          className="text-[#4F5B62] hover:text-[#B5A48B] transition-colors px-3 py-1"
        >
          AI Advice
        </button>
        <button
          onClick={() => handleNavButtonClick('Upload Clothing')}
          className="text-[#4F5B62] hover:text-[#B5A48B] transition-colors px-3 py-1"
        >
          Upload Clothing
        </button>
        <button
          onClick={() => handleNavButtonClick('Inspiration')}
          className="text-[#4F5B62] hover:text-[#B5A48B] transition-colors px-3 py-1"
        >
          Inspiration
        </button>
      </div>

      {/* Profile Section */}
      <div className="relative">
        <button
          onClick={() => setIsProfileMenuOpen(!isProfileMenuOpen)}
          className="w-10 h-10 rounded-full bg-[#B5A48B] border-2 border-white focus:outline-none hover:bg-[#A4B0BC] transition-colors"
        />
        
        {/* Profile Dropdown Menu */}
        {isProfileMenuOpen && (
          <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg py-2 border border-[#B5A48B]">
            <button
              onClick={() => handleProfileOption('User Profile')}
              className="block w-full text-left px-4 py-2 text-[#4F5B62] hover:bg-[#B5A48B] hover:text-[#1D1D1D] transition-colors"
            >
              User Profile
            </button>
            <button
              onClick={() => handleProfileOption('Sign Out')}
              className="block w-full text-left px-4 py-2 text-[#4F5B62] hover:bg-[#B5A48B] hover:text-[#1D1D1D] transition-colors"
            >
              Sign Out
            </button>
          </div>
        )}
      </div>
    </nav>
  );
} 