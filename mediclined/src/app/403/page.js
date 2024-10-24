"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";

export default function Custom403() {
  const router = useRouter();
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-customSkyblue">
      {/* Main Content */}
      <main className="flex flex-col items-center mt-16">
        <h2 className="text-4xl font-bold text-red-500">
          403 - Unauthorized Access
        </h2>
        <p className="mt-4 text-lg text-gray-600">
          You do not have permission to view this page.
        </p>
        <button
          onClick={() => {
            router.back();
          }}
          className="mt-6 bg-blue-500 text-white px-6 py-2 rounded-md text-lg hover:bg-blue-600 transition"
        >
          Go Back
        </button>
      </main>
    </div>
  );
}
