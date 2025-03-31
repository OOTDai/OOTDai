'use client';

import React, { useState, ChangeEvent, DragEvent, useRef } from 'react';

export default function Home() {
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreviewUrl, setImagePreviewUrl] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [analysisResult, setAnalysisResult] = useState<string | null>(null); // State for analysis result
  const [isLoading, setIsLoading] = useState(false); // State for loading indicator
  const fileInputRef = useRef<HTMLInputElement>(null);

  const testBackend = async () => {
    try {
      const response = await fetch('http://localhost:5001/test');
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
      const response = await fetch('http://localhost:5001/analyze-image', {
        method: 'POST',
        body: formData,
      });

      const data = await response.json(); // Always try to parse JSON

      if (!response.ok) {
        // Use message from parsed JSON error response if available
        throw new Error(data.message || `Server responded with ${response.status}`);
      }

      console.log("Backend response:", data);
      if (data.analysis) {
        setAnalysisResult(data.analysis); // Set the analysis result state
      } else {
        // Handle case where analysis might be missing even on success
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
    <div className="flex flex-col items-center justify-start min-h-screen bg-gradient-to-b from-blue-500 to-blue-900 p-6 text-white">
      {/* Title and Excerpt */}
      <div className="flex flex-col items-center mt-10 text-center">
        <h1 className="text-4xl font-bold mb-2">The Thread Bros</h1>
        <p className="text-lg text-gray-300 mb-6 max-w-md">
          Just a bunch of dudes coming together to create a fashion app for styling your sweet baggy jeans.
        </p>
        <div className="text-gray-300 text-sm mt-2">
          <p>Upload an image of an article of clothing</p>
        </div>
      </div>

      {/* Image Upload Area */}
      <div className="flex flex-col items-center w-full max-w-lg my-4">
        <div
          className={`relative w-full h-64 border-4 border-dashed rounded-lg flex flex-col items-center justify-center p-4 text-center transition-colors duration-200 ease-in-out ${isDragging ? 'border-green-400 bg-blue-800 bg-opacity-50' : 'border-gray-400 hover:border-gray-300'
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
                className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity duration-300 rounded cursor-pointer"
                onClick={triggerFileInput}
              >
                <span className="text-white text-lg font-semibold pointer-events-none">Click or drop to replace</span>
              </div>
            </>
          ) : (
            <div className="text-gray-300 pointer-events-none">
              <p>Drag & drop an image here</p>
              <p className="my-2">or</p>
              <button
                type="button"
                onClick={(e) => { e.stopPropagation(); triggerFileInput(); }}
                className="px-4 py-2 bg-blue-600 rounded hover:bg-blue-700 transition-colors pointer-events-auto"
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
          <div className="flex space-x-4 mt-4"> {/* Removed mb-10 */}
            <button
              onClick={clearImage}
              className="px-4 py-2 bg-red-600 rounded hover:bg-red-700 transition-colors"
              disabled={isLoading} // Disable while loading
            >
              Clear Image
            </button>
            <button
              onClick={handleSubmit}
              className={`px-4 py-2 rounded transition-colors ${isLoading ? 'bg-gray-500 cursor-not-allowed' : 'bg-green-600 hover:bg-green-700'}`}
              disabled={isLoading} // Disable while loading
            >
              {isLoading ? 'Analyzing...' : 'Submit Image'}
            </button>
          </div>
        )}
      </div>

      {/* Analysis Result Area */}
      {isLoading && ( // Show loading indicator
        <div className="mt-4 text-lg">Analyzing image, please wait...</div>
      )}
      {analysisResult && !isLoading && ( // Show result only when not loading
        <div className="mt-6 w-full max-w-lg p-4 bg-white bg-opacity-10 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-2 text-white">Analysis Result:</h2>
          {/* Use whitespace-pre-wrap to preserve line breaks from the API response */}
          <p className="text-gray-200 whitespace-pre-wrap">{analysisResult}</p>
        </div>
      )}


      {/* Test Backend Button - Adjusted position slightly */}
      <div className="w-full flex justify-end p-6 absolute bottom-0 right-0">
        <button
          onClick={testBackend}
          className="px-6 py-3 text-white bg-yellow-600 rounded-lg
                   transition-all duration-300 ease-in-out
                   hover:bg-yellow-700 hover:shadow-purple
                   transform hover:scale-105
                   focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:ring-opacity-50"
        >
          Test Flask Backend
        </button>
      </div>
    </div>
  );
}
