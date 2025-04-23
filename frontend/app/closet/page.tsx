'use client';

import React from 'react';
import Navbar from '../../components/Navbar';
import Image from 'next/image';

export default function ClosetPage() {
  // Placeholder data for clothing items
  const clothingItems = [
    { id: 1, name: 'Blue T-Shirt', category: 'Tops', image: '/images/fashionBoard.jpg' },
    { id: 2, name: 'Black Jeans', category: 'Bottoms', image: '/images/fashionSkate.jpg' },
    // Add more items as needed
  ];

  return (
    <div className="min-h-screen bg-[#1D1D1D]">
      <Navbar />
      
      <div className="container mx-auto px-4 py-8">
        {/* Header Section */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-[#B5A48B] mb-2">Your Closet</h1>
          <p className="text-[#A4B0BC]">Manage and organize your wardrobe</p>
        </div>

        {/* Filter Section */}
        <div className="flex gap-4 mb-8">
          <button className="px-4 py-2 bg-[#2D3436] text-[#B5A48B] rounded-lg hover:bg-[#3D4446] transition-colors">
            All Items
          </button>
          <button className="px-4 py-2 bg-[#2D3436] text-[#B5A48B] rounded-lg hover:bg-[#3D4446] transition-colors">
            Tops
          </button>
          <button className="px-4 py-2 bg-[#2D3436] text-[#B5A48B] rounded-lg hover:bg-[#3D4446] transition-colors">
            Bottoms
          </button>
          <button className="px-4 py-2 bg-[#2D3436] text-[#B5A48B] rounded-lg hover:bg-[#3D4446] transition-colors">
            Outerwear
          </button>
        </div>

        {/* Clothing Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {clothingItems.map((item) => (
            <div key={item.id} className="bg-[#2D3436] rounded-lg overflow-hidden shadow-lg">
              <div className="relative h-64">
                <Image
                  src={item.image}
                  alt={item.name}
                  fill
                  style={{ objectFit: 'cover' }}
                />
              </div>
              <div className="p-4">
                <h3 className="text-[#B5A48B] font-semibold">{item.name}</h3>
                <p className="text-[#A4B0BC] text-sm">{item.category}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Add Item Button */}
        <div className="fixed bottom-8 right-8">
          <button 
            onClick={() => window.location.href = '/upload'}
            className="bg-[#B5A48B] text-[#1D1D1D] px-6 py-3 rounded-full font-semibold shadow-lg hover:bg-[#A4B0BC] transition-all duration-300 flex items-center gap-2"
          >
            <span>Add Item</span>
            <span className="text-2xl">+</span>
          </button>
        </div>
      </div>
    </div>
  );
} 