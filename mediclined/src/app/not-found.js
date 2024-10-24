// pages/404.js
"use client";

import { useRouter } from "next/navigation";

export default function NotFound() {
  const router = useRouter();
  return (
    <div className="flex items-center justify-center min-h-screen bg-customSkyblue">
      <div className="bg-customWhite shadow-lg rounded-lg p-10 max-w-md w-full text-center">
        <img
          src="/404.svg" // You can use any SVG image for 404 here
          alt="Not Found"
          className="mx-auto w-32 mb-6"
        />
        <h1 className="text-3xl font-bold text-blue-600 mb-4">
          404 - Not Found
        </h1>
        <p className="text-gray-600 mb-8">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <button
          onClick={() => {
            router.back();
          }}
          className="bg-blue-500 text-white py-2 px-6 rounded-full transition-colors hover:bg-blue-600"
        >
          Go Back
        </button>
      </div>
    </div>
  );
}
