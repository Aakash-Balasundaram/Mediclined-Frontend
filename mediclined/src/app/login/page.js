"use client";

import React, { useState } from "react";
import Image from "next/image";
import Category from "../components/category";
import Homebutton from "../components/homebutton";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <div className="flex items-center justify-center h-screen w-screen bg-customWhite">
      <div className="flex flex-col sm:w-[350px] md:w-[500px] lg:w-[682px] h-[672px] justify-center items-center bg-white">
        <div className="flex flex-row items-center justify-between w-[95%]">
          <div className="flex flex-row items-center w-[296px] justify-between">
            <div>
              <Image
                src="/mediclined_logo-modified.png"
                alt="helllo"
                width={60}
                height={60}
                className="mx-auto"
              />
            </div>
            <div className="text-[42px] font-bold">Mediclined</div>
          </div>
          <div>
            <Homebutton />
          </div>
        </div>

        {/* Category and Other Content */}
        <div className="flex flex-col w-full">
          <div>
            <Category />
          </div>
          <div className="p-16">
            <div className="flex flex-col justify-between">
              <div className="text-[32px] font-semibold">Login</div>
              <div className="text-[20px] w-[450px]">
                Use your email to access your account and apply in the best
                technology vacancies.
              </div>
            </div>

            <div className="mt-8">
              {/* Email Input */}
              <label htmlFor="email" className="block text-blue-500 text-[18px] mb-2">
                E-mail
              </label>
              <input
                type="email"
                id="email"
                className="w-full p-2 border-2 border-black rounded-md text-[18px] focus:border-blue-500 focus:outline-none"
                placeholder="aakash@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              

              {/* Password Input */}
              <label htmlFor="password" className="block mt-4 text-gray-500 text-[18px]">
                Password
              </label>
              <input
                type="password"
                id="password"
                className="w-full p-2 border-2 border-black rounded-md text-[18px] focus:border-blue-500 focus:outline-none"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
