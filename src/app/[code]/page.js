"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";

export default function CodeRedirectPage() {
  const { code } = useParams();
  const [isRedirecting, setIsRedirecting] = useState(false);

  const handleRedirect = () => {
    if (!code) return;
    
    setIsRedirecting(true);
    
    // Try to open the custom scheme
    window.location.href = `aseedak://game/${code}`;

    // Fallback to Play Store after 1.5 seconds
    const timeout = setTimeout(() => {
      window.location.href = "https://play.google.com/store/apps/details?id=com.example.aseedak";
    }, 1500);

    // Reset loading state after timeout
    setTimeout(() => setIsRedirecting(false), 2000);
  };

  // Auto redirect on page load
  useEffect(() => {
    if (!code) return;
    
    // Auto redirect immediately
    window.location.href = `aseedak://game/${code}`;

    // Fallback to Play Store after 1.5 seconds
    const timeout = setTimeout(() => {
      window.location.href = "https://play.google.com/store/apps/details?id=com.example.aseedak";
    }, 1500);

    return () => clearTimeout(timeout);
  }, [code]);

  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-br from-blue-50 to-blue-100 text-center font-sans px-6">
      <div className="bg-white shadow-xl rounded-2xl px-8 py-10 w-full max-w-md">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          Welcome to Aseedak
        </h1>
        <p className="text-gray-600 mb-8">
          Ready to join your game room?
        </p>

        {isRedirecting ? (
          <div className="flex flex-col items-center space-y-4 mt-4">
            <div className="h-12 w-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
            <p className="text-gray-500 text-sm">
              Opening Aseedak app...
            </p>
          </div>
        ) : (
          <div className="mt-4">
            <button
              onClick={handleRedirect}
              className="w-full px-6 py-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg shadow-md transition-all duration-200 transform hover:scale-105"
            >
              Open in Aseedak App
            </button>
            <p className="text-sm text-gray-500 mt-4">
              Don't have the app? You'll be redirected to download it.
            </p>
          </div>
        )}

        <div className="mt-8 pt-6 border-t border-gray-200">
          <p className="text-xs text-gray-400 tracking-wide">
            ROOM CODE
          </p>
          <p className="text-lg font-bold text-gray-800 mt-1">
            {code}
          </p>
        </div>
      </div>
    </main>
  );
}
