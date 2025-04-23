'use client';

import Image from 'next/image';
import { useState } from 'react';
import Link from 'next/link';

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

  return (
    <div className="relative h-screen w-screen overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0">
        <Image
          src="/images/closetLeft.jpg"
          alt="Light Closet"
          fill
          quality={100}
          sizes="100vw"
          placeholder="blur"
          blurDataURL="/images/closetRight.jpg"
          style={{ 
            objectFit: 'cover',
            objectPosition: 'center',
          }}
          priority
        />
      </div>

      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-black bg-opacity-10 z-10"></div>

      {/* Form Container */}
      <div className="absolute top-0 right-0 w-1/3 h-full bg-white bg-opacity-100 z-20 flex flex-col justify-center px-8">
        <form onSubmit={handleSubmit} className="space-y-6">
          <h2 className="text-3xl font-bold text-[#1D1D1D] mb-8">Create Account</h2>
          
          {/* Name Fields */}
          <div className="flex gap-4">
            <div className="flex-1 space-y-2">
              <label htmlFor="firstName" className="block text-[#1D1D1D] font-medium">
                First Name
              </label>
              <input
                type="text"
                id="firstName"
                name="firstName"
                value={formData.firstName}
                onChange={handleInputChange}
                className="w-full px-4 py-2 rounded-lg border border-[#4F5B62] focus:outline-none focus:border-[#B5A48B] text-[#1D1D1D]"
                required
              />
            </div>
            <div className="flex-1 space-y-2">
              <label htmlFor="lastName" className="block text-[#1D1D1D] font-medium">
                Last Name
              </label>
              <input
                type="text"
                id="lastName"
                name="lastName"
                value={formData.lastName}
                onChange={handleInputChange}
                className="w-full px-4 py-2 rounded-lg border border-[#4F5B62] focus:outline-none focus:border-[#B5A48B] text-[#1D1D1D]"
                required
              />
            </div>
          </div>

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
              className="w-full px-4 py-2 rounded-lg border border-[#4F5B62] focus:outline-none focus:border-[#B5A48B] text-[#1D1D1D]"
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
              className="w-full px-4 py-2 rounded-lg border border-[#4F5B62] focus:outline-none focus:border-[#B5A48B] text-[#1D1D1D]"
              required
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="confirmPassword" className="block text-[#1D1D1D] font-medium">
              Confirm Password
            </label>
            <input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleInputChange}
              className="w-full px-4 py-2 rounded-lg border border-[#4F5B62] focus:outline-none focus:border-[#B5A48B] text-[#1D1D1D]"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full py-3 bg-[#B5A48B] text-[#1D1D1D] font-semibold rounded-lg hover:bg-[#A4B0BC] transition-all duration-300"
          >
            Create Account
          </button>

          <p className="text-[#2D3436] text-center mt-4">
            Already have an account?{' '}
            <Link href="/login" className="text-[#B5A48B] hover:text-[#A4B0BC] font-medium text-decoration-line: underline">
              Login here
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
} 