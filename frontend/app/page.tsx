'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

export default function LandingPage() {
  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-b from-[#1D1D1D] via-[#2D3436] to-[#4F5B62]">
      {/* Header Section */}
      <header className="w-full p-4 flex justify-between items-center bg-[#1D1D1D] shadow-lg">
        <h1 className="text-2xl font-bold text-[#B5A48B]">fashionAI</h1>
        <Link href="/upload" legacyBehavior>
          <a className="px-6 py-2 bg-[#4F5B62] text-[#A4B0BC] rounded-lg hover:bg-[#2D3436] transition-colors border border-[#B5A48B]">
            Login
          </a>
        </Link>
      </header>

      {/* Top White Bar */}
      <div className="w-full h-4 bg-white"></div>

      {/* Hero Section with Closet Image */}
      <section className="w-full h-[400px] relative">
        <Image
          src="/images/mensClosetLandscape.webp"
          alt="Organized closet with clothes"
          fill
          style={{ objectFit: 'cover' }}
          priority
          className="brightness-100 contrast-100"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#1D1D1D] via-transparent to-transparent opacity-10"></div>
      </section>

      {/* Bottom White Bar */}
      <div className="w-full h-4 bg-white"></div>

      {/* About Section */}
      <section className="py-16 px-4">
        <h2 className="text-3xl font-bold text-center text-[#B5A48B] mb-8">Your AI Fashion Assistant</h2>
        <div className="max-w-3xl mx-auto text-center mb-16">
          <p className="text-[#A4B0BC] text-lg leading-relaxed mb-6">
            Transform your wardrobe management and style journey with our AI-powered virtual closet. Upload your clothing items to create a comprehensive digital inventory of your wardrobe, and let our sophisticated AI help you discover perfect outfit combinations.
          </p>
          <p className="text-[#A4B0BC] text-lg leading-relaxed mb-6">
            Whether you&apos;re just beginning to explore fashion or you&apos;re a seasoned style enthusiast, our AI assistant provides personalized recommendations based on:
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-[#B5A48B] text-left max-w-2xl mx-auto mb-8">
            <ul className="space-y-2">
              <li className="flex items-center">
                <span className="mr-2">•</span>
                Current fashion trends
              </li>
              <li className="flex items-center">
                <span className="mr-2">•</span>
                Complementary color matching
              </li>
            </ul>
            <ul className="space-y-2">
              <li className="flex items-center">
                <span className="mr-2">•</span>
                Personal style preferences
              </li>
              <li className="flex items-center">
                <span className="mr-2">•</span>
                Outfit optimization
              </li>
            </ul>
          </div>
        </div>
        
        <div className="w-full bg-white py-12">
          <div className="max-w-6xl mx-auto px-4">
            <h3 className="text-2xl font-semibold text-center text-[#B5A48B] mb-8">Style Inspiration</h3>
            <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
              <div className="aspect-[3/4] relative group">
                <Image
                  src="/images/mensExample1.jpg"
                  alt="Fashion Example 1"
                  fill
                  style={{ objectFit: 'cover' }}
                  className="rounded-lg transition-transform duration-300 group-hover:scale-105 border-2 border-[#B5A48B]"
                />
                <div className="absolute inset-0 bg-[#1D1D1D] opacity-0 group-hover:opacity-20 transition-opacity duration-300 rounded-lg"></div>
              </div>
              <div className="aspect-[3/4] relative group">
                <Image
                  src="/images/mensexample2.jpg"
                  alt="Fashion Example 2"
                  fill
                  style={{ objectFit: 'cover' }}
                  className="rounded-lg transition-transform duration-300 group-hover:scale-105 border-2 border-[#B5A48B]"
                />
                <div className="absolute inset-0 bg-[#1D1D1D] opacity-0 group-hover:opacity-20 transition-opacity duration-300 rounded-lg"></div>
              </div>
              <div className="aspect-[3/4] relative group">
                <Image
                  src="/images/mensexample3.jpg"
                  alt="Fashion Example 3"
                  fill
                  style={{ objectFit: 'cover' }}
                  className="rounded-lg transition-transform duration-300 group-hover:scale-105 border-2 border-[#B5A48B]"
                />
                <div className="absolute inset-0 bg-[#1D1D1D] opacity-0 group-hover:opacity-20 transition-opacity duration-300 rounded-lg"></div>
              </div>
              <div className="aspect-[3/4] relative group">
                <Image
                  src="/images/mensexample4.jpg"
                  alt="Fashion Example 4"
                  fill
                  style={{ objectFit: 'cover' }}
                  className="rounded-lg transition-transform duration-300 group-hover:scale-105 border-2 border-[#B5A48B]"
                />
                <div className="absolute inset-0 bg-[#1D1D1D] opacity-0 group-hover:opacity-20 transition-opacity duration-300 rounded-lg"></div>
              </div>
              <div className="aspect-[3/4] relative group">
                <Image
                  src="/images/mensexample5.jpg"
                  alt="Fashion Example 5"
                  fill
                  style={{ objectFit: 'cover' }}
                  className="rounded-lg transition-transform duration-300 group-hover:scale-105 border-2 border-[#B5A48B]"
                />
                <div className="absolute inset-0 bg-[#1D1D1D] opacity-0 group-hover:opacity-20 transition-opacity duration-300 rounded-lg"></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Message Section (replacing original Sign Up button) */}
      <section className="py-16 px-4">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-[#B5A48B] mb-6">We Get It.</h2>
          <p className="text-[#A4B0BC] text-xl leading-relaxed mb-4">
            Looking good shouldn&apos;t be a daily struggle.
          </p>
          <p className="text-[#A4B0BC] text-lg leading-relaxed">
            Let us take the guesswork out of getting dressed, so you can focus on being your best self.
          </p>
        </div>
      </section>

      {/* Bottom Landscape Image Section */}
      <section className="w-full h-[500px] relative">
        <Image
          src="/images/landscapeFashion.webp"
          alt="Fashion Landscape"
          fill
          style={{ objectFit: 'cover' }}
          className="brightness-95"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#1D1D1D] via-transparent to-transparent opacity-50"></div>
        <div className="absolute inset-0 flex items-center justify-center">
          <Link href="/createAccount" legacyBehavior>
            <a className="px-8 py-4 bg-[#B5A48B] text-[#1D1D1D] text-xl font-semibold rounded-lg hover:bg-[#A4B0BC] transition-all duration-300 transform hover:scale-105 shadow-lg border border-[#4F5B62] z-10">
              Sign Up Now
            </a>
          </Link>
        </div>
      </section>
    </div>
  );
}