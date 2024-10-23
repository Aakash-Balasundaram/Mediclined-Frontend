'use client';

import { useState } from "react";
import { useRouter } from 'next/navigation';

export default function Continue() {
  const [opacity, setOpacity] = useState(1);
  const router = useRouter();

  const handleClick = () => {
    setOpacity(0.7); 

    const selectedCategory = localStorage.getItem("selectedCategory");
    if (selectedCategory === "Clinic") {
      router.push("/clinic");
    } else if (selectedCategory === "Doctor") {
      router.push("/doctor"); 
    } else if (selectedCategory === "Admin") {
      router.push("/admin");
    }
  };

  return (
    <div className="flex justify-center mt-4">
      <button
        className="w-full py-3 bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-md text-[18px] transition-opacity duration-200"
        style={{ opacity }} 
        onClick={handleClick}
      >
        Continue
      </button>
    </div>
  );
}
