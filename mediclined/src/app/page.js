import Image from "next/image";
import React from "react";
import { ArrowRight, Clock, Shield, Activity, Users } from "lucide-react";

export default function Home() {
  return (
    <div className="h-screen flex flex-col bg-gradient-to-b from-blue-50 to-white overflow-y-auto">
      {/* Navigation */}
      <nav className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Image
              src="/mediclined_logo-modified.png"
              alt="Mediclined Logo"
              width={40}
              height={40}
              className="rounded-lg"
            />
            <div className="text-2xl font-bold text-blue-600">Mediclined</div>
          </div>
        </div>
      </nav>

      {/* Main Content Wrapper */}
      <div className="flex-1 flex flex-col">
        {/* Hero Section */}
        <div className="container mx-auto px-6 py-8 md:py-12 text-center flex-shrink-0">
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
            Campus Healthcare,
            <span className="text-blue-600"> Revolutionized</span>
          </h1>
          <p className="text-lg md:text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            Seamlessly connect students with campus clinics through real-time
            monitoring, instant medical assistance, and automated healthcare
            management.
          </p>
          <a
            href="/login"
            className="inline-flex items-center px-8 py-4 text-lg font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors duration-150 ease-in-out"
          >
            Get Started
            <ArrowRight className="ml-2 h-5 w-5" />
          </a>
        </div>

        {/* Features Grid */}
        <div className="container mx-auto px-6 py-8 flex-shrink-0">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
            <div className="p-4 md:p-6 bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300">
              <div className="w-10 h-10 md:w-12 md:h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-3">
                <Clock className="h-5 w-5 md:h-6 md:w-6 text-blue-600" />
              </div>
              <h3 className="text-lg md:text-xl font-semibold mb-2">
                24/7 Monitoring
              </h3>
              <p className="text-sm md:text-base text-gray-600">
                Real-time health tracking and instant alerts for emergency
                situations.
              </p>
            </div>

            <div className="p-4 md:p-6 bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300">
              <div className="w-10 h-10 md:w-12 md:h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-3">
                <Shield className="h-5 w-5 md:h-6 md:w-6 text-blue-600" />
              </div>
              <h3 className="text-lg md:text-xl font-semibold mb-2">
                Secure Records
              </h3>
              <p className="text-sm md:text-base text-gray-600">
                Digital health records with industry-standard security
                protocols.
              </p>
            </div>

            <div className="p-4 md:p-6 bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300">
              <div className="w-10 h-10 md:w-12 md:h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-3">
                <Activity className="h-5 w-5 md:h-6 md:w-6 text-blue-600" />
              </div>
              <h3 className="text-lg md:text-xl font-semibold mb-2">
                Smart Analytics
              </h3>
              <p className="text-sm md:text-base text-gray-600">
                Automated reporting and insights for better healthcare delivery.
              </p>
            </div>

            <div className="p-4 md:p-6 bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300">
              <div className="w-10 h-10 md:w-12 md:h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-3">
                <Users className="h-5 w-5 md:h-6 md:w-6 text-blue-600" />
              </div>
              <h3 className="text-lg md:text-xl font-semibold mb-2">
                Easy Access
              </h3>
              <p className="text-sm md:text-base text-gray-600">
                Direct login system with zero setup required for users.
              </p>
            </div>
          </div>
        </div>

        {/* Stats Section */}
        <div className="bg-blue-600 py-8 mt-auto flex-shrink-0">
          <div className="container mx-auto px-6">
            <div className="grid md:grid-cols-3 gap-6 text-center">
              <div className="text-white">
                <div className="text-3xl md:text-4xl font-bold mb-1">24/7</div>
                <div className="text-blue-100">Healthcare Support</div>
              </div>
              <div className="text-white">
                <div className="text-3xl md:text-4xl font-bold mb-1">100%</div>
                <div className="text-blue-100">Digital Process</div>
              </div>
              <div className="text-white">
                <div className="text-3xl md:text-4xl font-bold mb-1">0</div>
                <div className="text-blue-100">Setup Required</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
