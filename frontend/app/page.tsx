'use client';

import React from 'react';
import Link from 'next/link'; // Import Link for navigation

export default function LandingPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-purple-600 via-purple-800 to-indigo-900 text-white p-6">
      <div className="text-center max-w-2xl">
        {/* You can add a logo here if needed */}
        {/* <div className="mb-8">
          <img src="/your-logo.svg" alt="Logo" className="h-12 mx-auto" />
        </div> */}

        <h1 className="text-5xl md:text-6xl font-bold mb-4 leading-tight">
          OOTDai Fashion Analysis
        </h1>
        <p className="text-lg md:text-xl text-purple-200 mb-8">
          Upload an image of your clothing item and get instant AI-powered analysis on its style, color, season, and more. Discover your next favorite outfit!
        </p>

        <Link href="/upload" legacyBehavior>
          <a className="inline-block px-8 py-4 bg-white text-purple-700 font-semibold rounded-lg shadow-lg hover:bg-gray-100 transition-colors duration-300 transform hover:scale-105">
            Get Started Now!
          </a>
        </Link>

        {/* Optional: Add illustration/image similar to the example */}
        {/* <div className="mt-12">
          <img src="/fashion-illustration.svg" alt="Fashion Illustration" className="max-w-md mx-auto" />
        </div> */}
      </div>
    </div>
  );
}