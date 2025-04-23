'use client';

import React, { useState } from 'react';
import Link from 'next/link';

export default function LoginPage() {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
  };

  return (
    <div className="relative h-screen w-screen overflow-hidden">
      {/* Video Background */}
      <video
        autoPlay
        muted
        loop
        playsInline
        className="absolute top-0 left-0 min-h-full min-w-full object-cover z-0"
      >
        <source src="/videos/fashionWalk.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-black bg-opacity-40 z-10"></div>

      {/* Login Form Container */}
      <div className="absolute top-0 right-0 w-1/3 h-full bg-white bg-opacity-90 z-20 flex flex-col justify-center px-8">
        <form onSubmit={handleSubmit} className="space-y-6">
          <h2 className="text-3xl font-bold text-[#1D1D1D] mb-8">Login Page</h2>
          
          <div className="space-y-2">
            <label htmlFor="email" className="block text-[#1D1D1D] font-medium">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              className="w-full px-4 py-2 rounded-lg border border-[#4F5B62] focus:outline-none focus:border-[#B5A48B] text-[#1D1D1D] font-medium"
              required
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="password" className="block text-[#1D1D1D] font-medium">
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleInputChange}
              className="w-full px-4 py-2 rounded-lg border border-[#4F5B62] focus:outline-none focus:border-[#B5A48B] text-[#1D1D1D] font-medium"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full py-3 bg-[#B5A48B] text-[#1D1D1D] font-semibold rounded-lg hover:bg-[#A4B0BC] transition-all duration-300"
          >
            Login
          </button>

          <p className="text-[#2D3436] text-center mt-4">
            Need to create an account? Click{' '}
            <Link href="/createAccount" className="text-[#B5A48B] hover:text-[#A4B0BC] font-medium text-decoration-line: underline">
              here
            </Link>
          </p>
        </form>
      </div>

      {/* Bypass Login Button */}
      <div className="absolute bottom-4 right-4 z-30">
        <Link href="/home" legacyBehavior>
          <a className="px-4 py-2 bg-[#B5A48B] text-[#1D1D1D] text-sm font-semibold rounded-lg hover:bg-[#A4B0BC] transition-all duration-300 transform hover:scale-105 shadow-lg border border-white">
            Bypass Login
          </a>
        </Link>
      </div>
    </div>
  );
} 