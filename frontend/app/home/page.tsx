'use client';

import React from 'react';
import Navbar from '../../components/Navbar';
import Image from 'next/image';

export default function HomePage() {
  return (
    <div className="min-h-screen bg-[#1D1D1D]">
      <Navbar />
      
      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        {/* Welcome Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-[#B5A48B] mb-4">Welcome to Thread Bros</h1>
          <p className="text-[#A4B0BC] text-xl">Your personal AI-powered fashion assistant</p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-8">
          {/* Closet Feature */}
          <div className="bg-[#2D3436] p-6 rounded-lg shadow-lg">
            <div className="h-48 relative rounded-lg overflow-hidden mb-4">
              <Image
                src="/images/closetLeft.jpg"
                alt="Virtual Closet"
                fill
                style={{ objectFit: 'cover' }}
              />
            </div>
            <h3 className="text-[#B5A48B] text-xl font-semibold mb-2">Your Virtual Closet</h3>
            <p className="text-[#A4B0BC]">Organize and manage your wardrobe digitally. Upload your clothes and create your perfect collection.</p>
          </div>

          {/* AI Advice Feature */}
          <div className="bg-[#2D3436] p-6 rounded-lg shadow-lg">
            <div className="h-48 relative rounded-lg overflow-hidden mb-4">
              <Image
                src="/images/fashionBoard.jpg"
                alt="AI Fashion Advice"
                fill
                style={{ objectFit: 'cover' }}
              />
            </div>
            <h3 className="text-[#B5A48B] text-xl font-semibold mb-2">AI Fashion Advice</h3>
            <p className="text-[#A4B0BC]">Get personalized outfit recommendations and style tips from our AI fashion assistant.</p>
          </div>

          {/* Inspiration Feature */}
          <div className="bg-[#2D3436] p-6 rounded-lg shadow-lg">
            <div className="h-48 relative rounded-lg overflow-hidden mb-4">
              <Image
                src="/images/fashionSkate.jpg"
                alt="Style Inspiration"
                fill
                style={{ objectFit: 'cover' }}
              />
            </div>
            <h3 className="text-[#B5A48B] text-xl font-semibold mb-2">Style Inspiration</h3>
            <p className="text-[#A4B0BC]">Discover new trends and get inspired by curated outfit combinations.</p>
          </div>
        </div>

        {/* Video Section */}
        <div className="w-full my-16 relative">
          <div className="w-full h-[500px] relative overflow-hidden">
            <video
              autoPlay
              muted
              loop
              playsInline
              className="absolute top-0 left-0 w-full h-full object-cover"
            >
              <source src="/videos/shirtRack.mp4" type="video/mp4" />
              Your browser does not support the video tag.
            </video>
            <div className="absolute inset-0 bg-black bg-opacity-20 flex flex-col items-center justify-center">
              <h2 className="text-4xl font-bold text-white mb-4 text-center px-4">
                Don&apos;t Stress About What to Wear
              </h2>
              <p className="text-2xl text-black text-center px-4">
                Let us help you choose your perfect outfit, every time
              </p>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="mt-12 text-center">
          <h2 className="text-2xl font-semibold text-[#B5A48B] mb-6">Get Started</h2>
          <div className="flex justify-center gap-4">
            <button 
              onClick={() => window.location.href = '/upload'}
              className="px-6 py-3 bg-[#B5A48B] text-[#1D1D1D] font-semibold rounded-lg hover:bg-[#A4B0BC] transition-all duration-300"
            >
              Upload Clothes
            </button>
            <button 
              onClick={() => window.location.href = '/ai-advice'}
              className="px-6 py-3 border-2 border-[#B5A48B] text-[#B5A48B] font-semibold rounded-lg hover:bg-[#B5A48B] hover:text-[#1D1D1D] transition-all duration-300"
            >
              Get AI Advice
            </button>
          </div>
        </div>
      </div>
    </div>
  );
} 