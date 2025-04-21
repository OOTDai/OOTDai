'use client';

import Image from 'next/image';
import { useState } from 'react';

export default function CreateAccount() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: ''
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
    console.log('Form Data:', formData);
  };

  const handleLoginClick = () => {
    console.log('take me to login page');
  };

  return (
    <div className="flex min-h-screen bg-[#1D2B34]">
      {/* Left Section with Image */}
      <div className="flex-1 relative">
        <div className="absolute inset-0">
          <Image
            src="/images/mensCloset.jpg"
            alt="Mens Closet"
            fill
            style={{ objectFit: 'cover' }}
            priority
          />
          <div className="absolute bottom-0 left-0 right-0 p-8 bg-gradient-to-t from-[#1A1A1A]/90 to-transparent">
            <h2 className="text-4xl font-medium text-[#D4C5B3] m-0">
              Let us choose your next outfit
            </h2>
          </div>
        </div>
      </div>

      {/* Right Section with Form */}
      <div className="flex-1 flex justify-center items-center p-12 bg-[#2D4047]/90 backdrop-blur-sm">
        <div className="w-full max-w-xl">
          <h1 className="text-4xl font-semibold mb-12 text-[#D4C5B3] text-center">
            Create an account
          </h1>
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Name Fields */}
            <div className="flex gap-6">
              <div className="flex-1">
                <input
                  type="text"
                  name="firstName"
                  placeholder="First name"
                  value={formData.firstName}
                  onChange={handleInputChange}
                  required
                  className="w-full px-6 py-4 text-lg rounded-lg border border-[#717C84] focus:outline-none focus:border-[#D4C5B3] focus:ring-2 focus:ring-[#D4C5B3]/20 transition-all bg-[#1D2B34] text-[#D4C5B3] placeholder-[#717C84]"
                />
              </div>
              <div className="flex-1">
                <input
                  type="text"
                  name="lastName"
                  placeholder="Last name"
                  value={formData.lastName}
                  onChange={handleInputChange}
                  required
                  className="w-full px-6 py-4 text-lg rounded-lg border border-[#717C84] focus:outline-none focus:border-[#D4C5B3] focus:ring-2 focus:ring-[#D4C5B3]/20 transition-all bg-[#1D2B34] text-[#D4C5B3] placeholder-[#717C84]"
                />
              </div>
            </div>

            {/* Email Field */}
            <div>
              <input
                type="email"
                name="email"
                placeholder="Email"
                value={formData.email}
                onChange={handleInputChange}
                required
                className="w-full px-6 py-4 text-lg rounded-lg border border-[#717C84] focus:outline-none focus:border-[#D4C5B3] focus:ring-2 focus:ring-[#D4C5B3]/20 transition-all bg-[#1D2B34] text-[#D4C5B3] placeholder-[#717C84]"
              />
            </div>

            {/* Password Fields */}
            <div>
              <input
                type="password"
                name="password"
                placeholder="Password"
                value={formData.password}
                onChange={handleInputChange}
                required
                className="w-full px-6 py-4 text-lg rounded-lg border border-[#717C84] focus:outline-none focus:border-[#D4C5B3] focus:ring-2 focus:ring-[#D4C5B3]/20 transition-all bg-[#1D2B34] text-[#D4C5B3] placeholder-[#717C84]"
              />
            </div>
            <div>
              <input
                type="password"
                name="confirmPassword"
                placeholder="Confirm password"
                value={formData.confirmPassword}
                onChange={handleInputChange}
                required
                className="w-full px-6 py-4 text-lg rounded-lg border border-[#717C84] focus:outline-none focus:border-[#D4C5B3] focus:ring-2 focus:ring-[#D4C5B3]/20 transition-all bg-[#1D2B34] text-[#D4C5B3] placeholder-[#717C84]"
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full px-6 py-4 text-lg bg-[#D4C5B3] text-[#1A1A1A] font-medium rounded-lg shadow-md hover:bg-[#B7B8B9] transform hover:-translate-y-0.5 transition-all hover:shadow-lg"
            >
              Create account
            </button>

            {/* Login Link */}
            <div className="text-center mt-6">
              <p className="text-[#D4C5B3]">
                Already a member?{' '}
                <button
                  type="button"
                  onClick={handleLoginClick}
                  className="text-[#B7B8B9] hover:text-white underline focus:outline-none"
                >
                  Login here
                </button>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
} 