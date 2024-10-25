"use client";

import React, { useState } from "react";
import Image from "next/image";
import Category from "../components/category";
import Homebutton from "../components/homebutton";
import Continue from "../components/continuebutton";
import secureLocalStorage from "react-secure-storage";

import { useRouter } from "next/navigation";

import axios from "axios";
const { LOGIN_URL, CLINIC_LOGIN_URL } = require("../constants.js");

export default function Login() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [clinicID, setClinicID] = useState(null);
  const [password, setPassword] = useState("");
  const [category, setCategory] = useState("Clinic");

  const [focusedInput, setFocusedInput] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      let response;
      if (category == "Clinic") {
        response = await axios.post(CLINIC_LOGIN_URL, {
          id: clinicID,
          password: password,
          role: "D",
        });
      } else if (category == "Doctor") {
        response = await axios.post(LOGIN_URL, {
          email: email,
          password: password,
          role: "D",
        });
      } else if (category == "Admin") {
        response = await axios.post(LOGIN_URL, {
          email: email,
          password: password,
          role: "A",
        });
      }
      console.log(response.data.MSG);
      if (response.status == 200 && response.data.MSG) {
        secureLocalStorage.setItem("token", response.data.MSG.token);
        secureLocalStorage.setItem("role", response.data.MSG.role);
        if (response.data.MSG.role == "A") {
          router.push("/adminHome");
        }
      }
    } catch (error) {
      console.error("Login failed", error);
    }
  };

  return (
    <div className="flex items-center justify-center h-screen w-screen bg-customWhite">
      <div className="flex flex-col sm:w-[350px] md:w-[500px] lg:w-[682px] h-[672px] justify-center items-center bg-white gap-4">
        <div className="flex flex-row items-center justify-between w-[95%]">
          <div className="flex flex-row items-center w-[296px] justify-between">
            <div>
              <Image
                src="/mediclined_logo-modified.png"
                alt="hello"
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
            <Category selected={category} setSelected={setCategory} />
          </div>
          <div className="p-16">
            <div className="flex flex-col justify-between gap-2">
              <div className="text-[32px] font-semibold">Login</div>
              <div className="text-[20px] w-[450px]">
                Use your email to access your account and apply in the best
                technology vacancies.
              </div>
            </div>
            <div className="flex flex-col gap-6">
              <div className="mt-8">
                {/* Email Input */}
                {category == "Clinic" ? (
                  <>
                    <label
                      htmlFor="clinicID"
                      className={`block text-[18px] mb-2 ${
                        focusedInput === "clinicID"
                          ? "text-blue-500"
                          : "text-black"
                      }`}
                    >
                      Clinic ID
                    </label>
                    <input
                      type="text"
                      id="clinicID"
                      className={`w-full p-2 border-2 rounded-md text-[18px] ${
                        focusedInput === "clinicID"
                          ? "border-blue-500"
                          : "border-black"
                      } focus:outline-none`}
                      placeholder="325"
                      value={clinicID}
                      onChange={(e) => setClinicID(e.target.value)}
                      onFocus={() => setFocusedInput("clinicID")}
                      onBlur={() => setFocusedInput("")}
                    />
                  </>
                ) : (
                  <>
                    <label
                      htmlFor="email"
                      className={`block text-[18px] mb-2 ${
                        focusedInput === "email"
                          ? "text-blue-500"
                          : "text-black"
                      }`}
                    >
                      E-mail
                    </label>
                    <input
                      type="email"
                      id="email"
                      className={`w-full p-2 border-2 rounded-md text-[18px] ${
                        focusedInput === "email"
                          ? "border-blue-500"
                          : "border-black"
                      } focus:outline-none`}
                      placeholder="aakash@example.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      onFocus={() => setFocusedInput("email")}
                      onBlur={() => setFocusedInput("")}
                    />
                  </>
                )}

                {/* Password Input */}
                <label
                  htmlFor="password"
                  className={`block mt-4 text-[18px] ${
                    focusedInput === "password"
                      ? "text-blue-500"
                      : "text-gray-500"
                  }`}
                >
                  Password
                </label>
                <input
                  type="password"
                  id="password"
                  className={`w-full p-2 border-2 rounded-md text-[18px] ${
                    focusedInput === "password"
                      ? "border-blue-500"
                      : "border-black"
                  } focus:outline-none`}
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  onFocus={() => setFocusedInput("password")}
                  onBlur={() => setFocusedInput("")}
                />
              </div>
              <div>
                <Continue handleClick={handleLogin} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
