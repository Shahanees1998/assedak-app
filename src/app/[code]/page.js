"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";

export default function CodeRedirectPage() {
  const { code } = useParams();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!code) return;

    // Attempt to open the Aseedak app
    window.location.href = `aseedak://profile/${code}`;

    // Fallback to Play Store if app not installed
    // const timeout = setTimeout(() => {
    //   window.location.href =
    //     "https://play.google.com/store/apps/details?id=com.example.aseedak";
    // }, 1500);

    // // Stop loader after short delay
    const loaderTimeout = setTimeout(() => setLoading(false), 2500);

    return () => {
      clearTimeout(timeout);
      clearTimeout(loaderTimeout);
    };
  }, [code]);

  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-br from-blue-50 to-blue-100 text-center font-sans">
      <div className="bg-white shadow-xl rounded-2xl px-8 py-10 w-full max-w-md">
        <h1 className="text-2xl font-semibold text-gray-900 mb-3">
          Opening Aseedak
        </h1>

        {loading ? (
          <div className="flex flex-col items-center space-y-4 mt-4">
            <div className="h-10 w-10 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
            <p className="text-gray-500 text-sm">
              Connecting to your game room...
            </p>
          </div>
        ) : (
          <div className="mt-4">
            <p className="text-gray-600 mb-6 text-base">
              If the app didn’t open automatically, tap below to continue.
            </p>
            <button
              onClick={() => {
                window.location.href = `aseedak://profile/${code}`;
                setTimeout(() => {
                  window.location.href =
                    "https://play.google.com/store/apps/details?id=com.example.aseedak";
                }, 1500);
              }}
              className="w-full px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition"
            >
              Open in Aseedak App
            </button>
          </div>
        )}

        <p className="mt-8 text-xs text-gray-400 tracking-wide">
          ROOM CODE — <span className="font-semibold text-gray-600">{code}</span>
        </p>
      </div>
    </main>
  );
}
