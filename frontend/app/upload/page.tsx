'use client';

import React, { useState, ChangeEvent, DragEvent, useRef } from 'react';
import Navbar from '../../components/Navbar';

export default function Home() {
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreviewUrl, setImagePreviewUrl] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [analysisResult, setAnalysisResult] = useState<string | null>(null); // State for analysis result
  const [isLoading, setIsLoading] = useState(false); // State for loading indicator
  const fileInputRef = useRef<HTMLInputElement>(null);

  const testBackend = async () => {
    try {
      const response = await fetch('http://127.0.0.1:5001/test');
      const data = await response.json();
      alert(data.message);
    } catch (error) {
      alert('Failed to connect to backend: ' + error);
    }
  };

  // Handles setting the image state
  const processFile = (file: File | null) => {
    if (file && file.type.startsWith('image/')) {
      setImageFile(file);
      setAnalysisResult(null); // Clear previous analysis when new image is selected
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreviewUrl(reader.result as string);
      };
      reader.readAsDataURL(file);
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    } else {
      if (file) {
        alert('Please select an image file.');
      }
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    }
  };

  // Clears the current image state and resets the input
  const clearImage = () => {
    setImageFile(null);
    setImagePreviewUrl(null);
    setAnalysisResult(null); // Clear analysis result
    setIsLoading(false); // Reset loading state
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  // Called when the file input value changes (manual selection)
  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    processFile(event.target.files ? event.target.files[0] : null);
  };

  const handleDragOver = (event: DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (event: DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setIsDragging(false);
  };

  // Called when a file is dropped
  const handleDrop = (event: DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setIsDragging(false);
    const file = event.dataTransfer.files ? event.dataTransfer.files[0] : null;
    processFile(file);
    if (event.dataTransfer.items) {
      event.dataTransfer.items.clear();
    } else {
      event.dataTransfer.clearData();
    }
  };

  // Opens the file selection dialog
  const triggerFileInput = () => {
    if (!imagePreviewUrl || imagePreviewUrl) { // Allow triggering even if image exists (for replacement)
      fileInputRef.current?.click();
    }
  };

  // Handles the submit action
  const handleSubmit = async () => {
    if (!imageFile) {
      alert("Please select an image first.");
      return;
    }

    setIsLoading(true); // Start loading
    setAnalysisResult(null); // Clear previous results

    const formData = new FormData();
    formData.append('image', imageFile);

    try {
      const response = await fetch('http://127.0.0.1:5001/analyze-clothing', {
        method: 'POST',
        body: formData,
      });

      const data = await response.json(); // Always try to parse JSON


      // ###TRIAL CODE###

      // const response = await fetch('http://127.0.0.1:5001/analyze-clothing', {
      //   method: 'POST',
      //   body: formData,
      // });
      
      // // Try to safely parse the response
      // const text = await response.text();
      // let data;
      
      // try {
      //   data = JSON.parse(text);
      // } catch (err) {
      //   console.error("Invalid JSON from backend:", text);
      //   throw new Error("Backend returned invalid JSON");
      // }
      
      // if (!response.ok) {
      //   console.error("Backend error:", data);
      //   throw new Error(data?.message || `Server responded with ${response.status}`);
      // }
      
      // ###END TRIAL CODE###

      // if (!response.ok) {
      //   // Use message from parsed JSON error response if available
      //   throw new Error(data.message || `Server responded with ${response.status}`);
      // }

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        console.error("Backend error:", errorData);
        throw new Error(errorData?.message || `Server responded with ${response.status}`);
      }
      

      console.log("Backend response:", data);
      if (data.description) {
        setAnalysisResult(data.description); // Set the description result state
      } else {
        // Handle case where description might be missing even on success
        setAnalysisResult("Analysis complete, but no description was returned.");
      }

    } catch (error) {
      console.error("Failed to send image or analyze:", error);
      // Display the error message from the caught error
      setAnalysisResult(`Analysis failed: ${error instanceof Error ? error.message : String(error)}`);
      // Optionally use alert as fallback or primary notification
      // alert(`Failed to analyze image: ${error instanceof Error ? error.message : String(error)}`);
    } finally {
       setIsLoading(false); // Stop loading regardless of outcome
    }
  };


  return (
    <div className="min-h-screen bg-gradient-to-b from-white via-[#B5A48B]/30 to-[#B5A48B]/50">
      <Navbar />
      <div className="flex flex-col items-center justify-start p-6 text-[#1D1D1D]">
        {/* Title and Excerpt */}
        <div className="flex flex-col items-center mt-10 text-center">
          <h1 className="text-4xl font-bold mb-2 text-[#1D1D1D]">The Thread Bros</h1>
          <p className="text-lg text-[#4F5B62] mb-6 max-w-md">
            Just a bunch of dudes coming together to create a fashion app for styling your sweet baggy jeans.
          </p>
          <div className="text-[#4F5B62] text-sm mt-2">
            <p>Upload an image of an article of clothing</p>
          </div>
        </div>

        {/* Image Upload Area */}
        <div className="flex flex-col items-center w-full max-w-lg my-4">
          <div
            className={`relative w-full h-64 border-2 rounded-lg flex flex-col items-center justify-center p-4 text-center transition-colors duration-200 ease-in-out ${
              isDragging ? 'border-[#B5A48B] bg-[#F5F5F5]' : 'border-[#B5A48B] hover:border-[#A4B0BC]'
            } ${imagePreviewUrl ? '' : 'cursor-pointer'}`}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            onClick={triggerFileInput}
          >
            {imagePreviewUrl ? (
              <>
                <img src={imagePreviewUrl} alt="Image preview" className="max-h-full max-w-full object-contain rounded" />
                <div
                  className="absolute inset-0 bg-white bg-opacity-50 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity duration-300 rounded cursor-pointer"
                  onClick={triggerFileInput}
                >
                  <span className="text-[#1D1D1D] text-lg font-semibold pointer-events-none">Click or drop to replace</span>
                </div>
              </>
            ) : (
              <div className="text-[#4F5B62] pointer-events-none">
                <p>Drag & drop an image here</p>
                <p className="my-2">or</p>
                <button
                  type="button"
                  onClick={(e) => { e.stopPropagation(); triggerFileInput(); }}
                  className="px-4 py-2 bg-[#B5A48B] text-[#1D1D1D] rounded hover:bg-[#A4B0BC] transition-colors pointer-events-auto border border-white"
                >
                  Select Image
                </button>
              </div>
            )}
          </div>
          <input
            type="file"
            accept="image/*"
            ref={fileInputRef}
            onChange={handleInputChange}
            className="hidden"
          />
          {/* Buttons container - shown only when an image is selected */}
          {imageFile && (
            <div className="flex space-x-4 mt-4">
              <button
                onClick={clearImage}
                className="px-4 py-2 bg-white text-[#1D1D1D] rounded hover:bg-[#F5F5F5] transition-colors border border-[#B5A48B]"
                disabled={isLoading}
              >
                Clear Image
              </button>
              <button
                onClick={handleSubmit}
                className={`px-4 py-2 rounded transition-colors ${
                  isLoading 
                  ? 'bg-[#F5F5F5] text-[#4F5B62] cursor-not-allowed border border-[#B5A48B]' 
                  : 'bg-[#B5A48B] text-[#1D1D1D] hover:bg-[#A4B0BC] border-2 border-white'
                }`}
                disabled={isLoading}
              >
                {isLoading ? 'Analyzing...' : 'Submit Image'}
              </button>
            </div>
          )}

          {/* Analysis Result */}
          {analysisResult && (
            <div className="mt-6 p-4 bg-white rounded-lg border border-[#B5A48B] w-full">
              <h3 className="text-[#1D1D1D] font-semibold mb-2">Analysis Result:</h3>
              <p className="text-[#4F5B62]">{analysisResult}</p>
            </div>
          )}
        </div>

        {/* Test Backend Button */}
        <div className="w-full flex justify-end p-6 absolute bottom-0 right-0">
          <button
            onClick={testBackend}
            className="px-6 py-3 text-[#1D1D1D] bg-[#B5A48B] rounded-lg
                     transition-all duration-300 ease-in-out
                     hover:bg-[#A4B0BC] hover:shadow-lg
                     transform hover:scale-105
                     focus:outline-none focus:ring-2 focus:ring-[#4F5B62] focus:ring-opacity-50
                     border border-[#4F5B62]"
          >
            Test Flask Backend
          </button>
        </div>
      </div>
    </div>
  );
}

