"use client";
import { useEffect, useState } from "react";
import { useRouter } from 'next/navigation';

export default function VoicePage() {
  const router = useRouter();
  const [countdown, setCountdown] = useState(3);
  const redirectUrl = "https://hushhvoice-2.onrender.com/";

  useEffect(() => {
    // Immediate redirect attempt
    const immediateRedirect = () => {
      try {
        window.location.href = redirectUrl;
      } catch (error) {
        console.error('Immediate redirect failed:', error);
      }
    };

    // Backup redirect with countdown
    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          // Fallback redirect methods
          try {
            window.location.replace(redirectUrl);
          } catch (error) {
            try {
              window.open(redirectUrl, '_self');
            } catch (error2) {
              console.error('All redirect methods failed:', error2);
            }
          }
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    // Try immediate redirect after a short delay to ensure page is loaded
    const immediateTimer = setTimeout(immediateRedirect, 100);

    return () => {
      clearInterval(timer);
      clearTimeout(immediateTimer);
    };
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="text-center p-8 max-w-md mx-auto">
        <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-blue-600 mx-auto mb-6"></div>
        
        <h1 className="text-2xl font-bold text-gray-800 mb-3">
          Redirecting to Hushh Voice...
        </h1>
        
        <p className="text-gray-600 mb-4">
          Taking you to your private, consent-first AI copilot
        </p>
        
        {countdown > 0 && (
          <div className="mb-6">
            <p className="text-lg font-semibold text-blue-600">
              Redirecting in {countdown} seconds...
            </p>
          </div>
        )}
        
        <div className="space-y-4">
          <p className="text-sm text-gray-500">
            If you're not redirected automatically:
          </p>
          
          <a 
            href={redirectUrl}
            className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-200 shadow-lg hover:shadow-xl"
            target="_self"
            rel="noopener noreferrer"
          >
            Continue to Hushh Voice
          </a>
          
          <p className="text-xs text-gray-400 mt-4">
            {redirectUrl}
          </p>
        </div>
      </div>
    </div>
  );
}
