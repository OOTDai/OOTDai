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
    <div className="flex items-center justify-center min-h-screen bg-slate-900">
      {/* Test Backend Button */}
      <button
        onClick={testBackend}
        className="px-6 py-3 text-white bg-purple-600 rounded-lg 
                 transition-all duration-300 ease-in-out
                 hover:bg-purple-700 hover:shadow-purple
                 transform hover:scale-105
                 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-opacity-50"
      >
        Test Flask Backend
      </button>
    </div>
  );
}
