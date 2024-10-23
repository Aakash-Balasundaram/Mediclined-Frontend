"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function Homebutton() {
  const router = useRouter(); // Hook for routing in Next.js
  const [isClicked, setIsClicked] = useState(false);

  const handleClick = () => {
    setIsClicked(true); // Set button as clicked to reduce opacity
    setTimeout(() => {
      router.push("/"); // Navigate to the home page
    }, 150); // Optional delay before navigating (just to show the opacity effect)
  };

  return (
    <div>
      <button
        className={`text-blue-500 w-[188px] h-[44px] text-[18px] font-bold bg-customSkyblue ${
          isClicked ? "opacity-50" : "opacity-100"
        } transition-opacity duration-150 ease-in-out`}
        onClick={handleClick}
      >
        Home
      </button>
    </div>
  );
}
