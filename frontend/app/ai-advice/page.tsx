'use client';

import React, { useState } from 'react';
import Navbar from '../../components/Navbar';
import Image from 'next/image';

export default function AIAdvicePage() {
  const [prompt, setPrompt] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle AI request here
    console.log('Sending prompt:', prompt);
  };

  return (
    <div className="min-h-screen bg-[#1D1D1D]">
      <Navbar />
      
      <div className="container mx-auto px-4 py-8">
        {/* Header Section */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-[#B5A48B] mb-2">AI Fashion Advice</h1>
          <p className="text-[#A4B0BC]">Get personalized style recommendations from our AI assistant</p>
        </div>

        {/* Quick Prompts */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
          <button className="p-4 bg-[#2D3436] text-[#B5A48B] rounded-lg hover:bg-[#3D4446] transition-colors text-left">
            "What should I wear to a casual dinner?"
          </button>
          <button className="p-4 bg-[#2D3436] text-[#B5A48B] rounded-lg hover:bg-[#3D4446] transition-colors text-left">
            "Help me create an outfit for a job interview"
          </button>
          <button className="p-4 bg-[#2D3436] text-[#B5A48B] rounded-lg hover:bg-[#3D4446] transition-colors text-left">
            "Suggest an outfit from my closet for today's weather"
          </button>
        </div>

        {/* Chat Interface */}
        <div className="bg-[#2D3436] rounded-lg p-6 mb-4 min-h-[400px] flex flex-col">
          {/* Messages Container */}
          <div className="flex-1 space-y-4 mb-4">
            {/* AI Message */}
            <div className="flex items-start gap-4">
              <div className="w-8 h-8 rounded-full bg-[#B5A48B] flex items-center justify-center text-[#1D1D1D] font-bold">
                AI
              </div>
              <div className="bg-[#3D4446] p-4 rounded-lg max-w-[80%]">
                <p className="text-[#A4B0BC]">
                  Hello! I'm your AI fashion assistant. How can I help you with your style today?
                </p>
              </div>
            </div>
          </div>

          {/* Input Form */}
          <form onSubmit={handleSubmit} className="flex gap-4">
            <input
              type="text"
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder="Ask for style advice..."
              className="flex-1 bg-[#1D1D1D] text-[#A4B0BC] p-4 rounded-lg border border-[#4F5B62] focus:outline-none focus:border-[#B5A48B]"
            />
            <button
              type="submit"
              className="bg-[#B5A48B] text-[#1D1D1D] px-6 py-2 rounded-lg font-semibold hover:bg-[#A4B0BC] transition-all duration-300"
            >
              Send
            </button>
          </form>
        </div>

        {/* Features */}
        
      </div>
    </div>
  );
} 