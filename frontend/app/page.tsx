'use client';

export default function Home() {
  const testBackend = async () => {
    try {
      const response = await fetch('http://localhost:5001/test');
      const data = await response.json();
      alert(data.message);
    } catch (error) {
      alert('Failed to connect to backend: ' + error);
    }
  };

  return (
    <div className="flex flex-col items-center justify-between min-h-screen bg-gradient-to-b from-blue-500 to-blue-900 p-6">
      {/* Title and Excerpt */}
      <div className="flex flex-col items-center mt-10">
        <h1 className="text-4xl font-bold text-white mb-2">The Thread Bros</h1>
        <p className="text-lg text-gray-300 text-center mb-6">
          Just a bunch of dudes coming together to create a fashion app for styling your sweet baggy jeans.
        </p>
      </div>
      {/* Test Backend Button */}
      <button
        onClick={testBackend}
        className="absolute bottom-6 right-6 px-6 py-3 text-white bg-yellow-600 rounded-lg 
                 transition-all duration-300 ease-in-out
                 hover:bg-yellow-700 hover:shadow-purple
                 transform hover:scale-105
                 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:ring-opacity-50"
      >
        Test Flask Backend
      </button>
    </div>
  );
}
