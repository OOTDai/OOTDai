'use client';

import React from 'react';
import Navbar from '../../components/Navbar';
import Image from 'next/image';

export default function HomePage() {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      
      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        {/* Welcome Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-[#1D1D1D] mb-4">Welcome to Thread Bros</h1>
          <p className="text-[#4F5B62] text-xl">Your personal AI-powered fashion assistant</p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-8">
          {/* Closet Feature */}
          <div className="bg-white p-6 rounded-lg shadow-lg border border-[#B5A48B]">
            <div className="h-48 relative rounded-lg overflow-hidden mb-4">
              <Image
                src="/images/closetLeft.jpg"
                alt="Virtual Closet"
                fill
                style={{ objectFit: 'cover' }}
                className="border border-[#B5A48B]"
              />
            </div>
            <h3 className="text-[#1D1D1D] text-xl font-semibold mb-2">Your Virtual Closet</h3>
            <p className="text-[#4F5B62]">Organize and manage your wardrobe digitally. Upload your clothes and create your perfect collection.</p>
          </div>

          {/* AI Advice Feature */}
          <div className="bg-white p-6 rounded-lg shadow-lg border border-[#B5A48B]">
            <div className="h-48 relative rounded-lg overflow-hidden mb-4">
              <Image
                src="/images/fashionBoard.jpg"
                alt="AI Fashion Advice"
                fill
                style={{ objectFit: 'cover' }}
                className="border border-[#B5A48B]"
              />
            </div>
            <h3 className="text-[#1D1D1D] text-xl font-semibold mb-2">AI Fashion Advice</h3>
            <p className="text-[#4F5B62]">Get personalized outfit recommendations and style tips from our AI fashion assistant.</p>
          </div>

          {/* Inspiration Feature */}
          <div className="bg-white p-6 rounded-lg shadow-lg border border-[#B5A48B]">
            <div className="h-48 relative rounded-lg overflow-hidden mb-4">
              <Image
                src="/images/fashionSkate.jpg"
                alt="Style Inspiration"
                fill
                style={{ objectFit: 'cover' }}
                className="border border-[#B5A48B]"
              />
            </div>
            <h3 className="text-[#1D1D1D] text-xl font-semibold mb-2">Style Inspiration</h3>
            <p className="text-[#4F5B62]">Discover new trends and get inspired by curated outfit combinations.</p>
          </div>
        </div>

        {/* Video Section */}
        <div className="w-full my-16 relative">
          <div className="w-full h-[500px] relative overflow-hidden rounded-lg border-2 border-[#B5A48B]">
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
              <h2 className="text-4xl font-bold text-white mb-4 text-center px-4 [text-shadow:_2px_2px_0_rgb(0_0_0)]">
                Don&apos;t Stress About What to Wear
              </h2>
              <p className="text-2xl text-white text-center px-4 [text-shadow:_1px_1px_0_rgb(0_0_0)]">
                Let us help you choose your perfect outfit, every time
              </p>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="mt-12 text-center">
          <h2 className="text-2xl font-semibold text-[#1D1D1D] mb-6">Get Started</h2>
          <div className="flex justify-center gap-4">
            <button 
              onClick={() => window.location.href = '/upload'}
              className="px-6 py-3 bg-[#B5A48B] text-[#1D1D1D] font-semibold rounded-lg hover:bg-[#A4B0BC] transition-all duration-300 border-2 border-white"
            >
              Upload Clothes
            </button>
            <button 
              onClick={() => window.location.href = '/ai-advice'}
              className="px-6 py-3 bg-white border-2 border-[#B5A48B] text-[#1D1D1D] font-semibold rounded-lg hover:bg-[#B5A48B] transition-all duration-300"
            >
              Get AI Advice
            </button>
          </div>
        </div>
      </div>
    </div>
  );
} 