"use client";

import { useState } from "react";

export default function Category() {
  const [selected, setSelected] = useState("Clinic");
  return (
    <div className="w-full h-[76px] flex items-center justify-center bg-customSkyblue">
      <div className="flex flex-row w-full">
        {/* Clinic */}
        <div
          className={`cursor-pointer flex-1 h-[76px] flex items-center justify-center text-[20px] ${
            selected === "Clinic"
              ? "bg-white border-t-4 border-blue-500 border-b-0"
              : "bg-customSkyblue border border-gray-200"
          }`}
          onClick={() => setSelected("Clinic")}
        >
          <span
            className={`${
              selected === "Clinic" ? "text-black font-bold" : "text-gray-500"
            }`}
          >
            Clinic
          </span>
        </div>

        {/* Doctor */}
        <div
          className={`cursor-pointer flex-1 h-[76px] flex items-center justify-center text-[20px] ${
            selected === "Doctor"
              ? "bg-white border-t-4 border-blue-500 border-b-0"
              : "bg-customSkyblue border border-gray-200"
          }`}
          onClick={() => setSelected("Doctor")}
        >
          <span
            className={`${
              selected === "Doctor" ? "text-black font-bold" : "text-gray-500"
            }`}
          >
            Doctor
          </span>
        </div>

        {/* Admin */}
        <div
          className={`cursor-pointer flex-1 h-[76px] flex items-center justify-center text-[20px] ${
            selected === "Admin"
              ? "bg-white border-t-4 border-blue-500 border-b-0"
              : "bg-customSkyblue border border-gray-200"
          }`}
          onClick={() => setSelected("Admin")}
        >
          <span
            className={`${
              selected === "Admin" ? "text-black font-bold" : "text-gray-500"
            }`}
          >
            Admin
          </span>
        </div>
      </div>
    </div>
  );
}
