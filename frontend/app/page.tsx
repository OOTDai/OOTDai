'use client';

import React, { useState, ChangeEvent, DragEvent, useRef } from 'react';

export default function Home() {
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreviewUrl, setImagePreviewUrl] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);
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
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreviewUrl(reader.result as string);
      };
      reader.readAsDataURL(file);
      // Reset file input value here too, allows re-selecting the same file after an initial selection
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    } else {
      // If a file was provided but wasn't an image, alert the user
      if (file) {
        alert('Please select an image file.');
      }
      // Don't clear the state here if it wasn't a valid image file,
      // let the clearImage function handle explicit clearing.
      // Reset the input ref in case an invalid file was attempted
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    }
  };

  // Clears the current image state and resets the input
  const clearImage = () => {
    setImageFile(null);
    setImagePreviewUrl(null);
    // Reset the file input so the same file can be re-selected if needed
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
    processFile(file); // Use the unified handler
    // Clear the data transfer buffer
    if (event.dataTransfer.items) {
      event.dataTransfer.items.clear();
    } else {
      event.dataTransfer.clearData();
    }
  };

  // Opens the file selection dialog
  const triggerFileInput = () => {
    // Don't trigger if there's already an image, let the overlay handle replacement indication
    if (!imagePreviewUrl) {
      fileInputRef.current?.click();
    } else {
      // If an image exists, clicking the area should still allow replacement
      fileInputRef.current?.click();
    }
  };

  // Handles the submit action
  const handleSubmit = () => {
    if (!imageFile) {
      alert("Please select an image first.");
      return;
    }
    console.log("submit button clicked");
    // Here you would typically send the imageFile to the backend
    // e.g., using FormData and fetch
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
            } ${imagePreviewUrl ? '' : 'cursor-pointer'}`} // Only show pointer cursor when no image
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          onClick={triggerFileInput} // Clicking the area triggers file input
        >
          {imagePreviewUrl ? (
            <>
              <img src={imagePreviewUrl} alt="Image preview" className="max-h-full max-w-full object-contain rounded" />
              {/* Overlay shown on hover when image is present */}
              <div
                className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity duration-300 rounded cursor-pointer"
                onClick={triggerFileInput} // Allow clicking overlay to replace
              >
                <span className="text-white text-lg font-semibold pointer-events-none">Click or drop to replace</span>
              </div>
            </>
          ) : (
            // Content shown when no image is present
            <div className="text-gray-300 pointer-events-none"> {/* Prevent text blocking drop */}
              <p>Drag & drop an image here</p>
              <p className="my-2">or</p>
              <button
                type="button"
                onClick={(e) => { e.stopPropagation(); triggerFileInput(); }} // Allow button click without triggering div click again
                className="px-4 py-2 bg-blue-600 rounded hover:bg-blue-700 transition-colors pointer-events-auto" // Re-enable pointer events for button
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
          className="hidden" // Keep the default input hidden
        />
        {/* Buttons container - shown only when an image is selected */}
        {imageFile && (
          <div className="flex space-x-4 mt-4 mb-10">
            <button
              onClick={clearImage} // Use the dedicated clear function
              className="px-4 py-2 bg-red-600 rounded hover:bg-red-700 transition-colors "
            >
              Clear Image
            </button>
            <button
              onClick={handleSubmit} // Use the submit handler
              className="px-4 py-2 bg-green-600 rounded hover:bg-green-700 transition-colors"
            >
              Submit Image
            </button>
          </div>
        )}

      </div>

      {/* Test Backend Button */}
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
