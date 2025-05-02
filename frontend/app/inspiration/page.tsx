'use client';

import React, { useState } from 'react';
import Navbar from '../../components/Navbar';
import Image from 'next/image';

export default function InspirationPage() {
  const [selectedCategory, setSelectedCategory] = useState('All');

  // Placeholder data for inspiration posts
  const inspirationPosts = [
    {
      id: 1,
      image: '/images/fashionSkate.jpg',
      title: 'Street Style Look',
      likes: 234,
      category: 'Casual'
    },
    {
      id: 2,
      image: '/images/fashionBoard.jpg',
      title: 'Business Casual',
      likes: 187,
      category: 'Professional'
    },
    // Add more posts as needed
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-white via-[#B5A48B]/30 to-[#B5A48B]/50">
      <Navbar />
      
      <div className="container mx-auto px-4 py-8">
        {/* Header Section */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-[#1D1D1D] mb-2">Style Inspiration</h1>
          <p className="text-[#4F5B62]">Discover trending outfits and get inspired</p>
        </div>

        {/* Categories */}
        <div className="flex gap-4 mb-8 overflow-x-auto pb-2">
          {['All', 'Casual', 'Professional', 'Streetwear', 'Formal', 'Athletic'].map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-6 py-2 rounded-full font-medium transition-all duration-300 whitespace-nowrap
                ${selectedCategory === category 
                  ? 'bg-[#B5A48B] text-[#1D1D1D] border-2 border-white' 
                  : 'bg-white text-[#1D1D1D] hover:bg-[#F5F5F5] border border-[#B5A48B]'
                }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Inspiration Grid */}
        <div className="columns-1 md:columns-2 lg:columns-3 xl:columns-4 gap-4 space-y-4">
          {inspirationPosts.map((post) => (
            <div key={post.id} className="break-inside-avoid">
              <div className="bg-white rounded-lg overflow-hidden shadow-lg mb-4 border border-[#B5A48B]">
                {/* Image Container */}
                <div className="relative aspect-[3/4] group">
                  <Image
                    src={post.image}
                    alt={post.title}
                    fill
                    style={{ objectFit: 'cover' }}
                    className="border-b border-[#B5A48B]"
                  />
                  {/* Hover Overlay */}
                  <div className="absolute inset-0 bg-[#B5A48B] bg-opacity-0 group-hover:bg-opacity-30 transition-all duration-300 flex items-center justify-center">
                    <button className="opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-300 bg-[#B5A48B] text-[#1D1D1D] px-6 py-2 rounded-lg font-semibold border-2 border-white">
                      Save Look
                    </button>
                  </div>
                </div>
                {/* Content */}
                <div className="p-4">
                  <h3 className="text-[#1D1D1D] font-semibold mb-2">{post.title}</h3>
                  <div className="flex items-center justify-between">
                    <span className="text-[#4F5B62] text-sm">{post.category}</span>
                    <div className="flex items-center gap-1">
                      <svg className="w-4 h-4 text-[#B5A48B]" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M10 18l-1.45-1.32C3.89 12.36 1 9.28 1 5.5 1 3.01 3.01 1 5.5 1c1.74 0 3.41.81 4.5 2.09C11.09 1.81 12.76 1 14.5 1 16.99 1 19 3.01 19 5.5c0 3.78-2.89 6.86-7.55 11.54L10 18z"/>
                      </svg>
                      <span className="text-[#4F5B62] text-sm">{post.likes}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
} 