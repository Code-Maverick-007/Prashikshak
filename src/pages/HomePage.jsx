import React from 'react';
import { Link } from 'react-router-dom';
import { SignedIn, SignedOut } from '@clerk/clerk-react';
import {
  LayoutDashboard, // For Prashikshak logo
  Building2,
  Briefcase,
  Users,
  BarChart3,
  ArrowRight, // For Login button
} from 'lucide-react';

// Import data from the new admin-focused file
import { heroContent, features } from '../data/adminHomePageData';

// Helper component for dynamic Lucide icons
const IconComponent = ({ name, ...props }) => {
  const LucideIcon = {
    LayoutDashboard,
    Building2,
    Briefcase,
    Users,
    BarChart3,
    ArrowRight,
  }[name];
  return LucideIcon ? <LucideIcon {...props} /> : null;
};

const HomePage = () => {
  return (
    <div className="min-h-screen bg-gray-50 text-gray-900 font-sans">
      {/* Navbar */}
      <nav className="sticky top-0 z-50 w-full bg-white bg-opacity-90 backdrop-blur-sm border-b border-gray-200 py-4 px-6 md:px-12 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <IconComponent name="LayoutDashboard" className="w-7 h-7 text-blue-600" />
          <span className="text-xl font-bold text-gray-900">Prashikshak</span>
        </div>
        <div className="flex items-center gap-6">
          <a href="#features" className="text-gray-700 hover:text-blue-600 transition-colors hidden md:block">Features</a>
          <SignedIn>
            <Link to="/dashboard" className="px-5 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium">
              Go to Dashboard
            </Link>
          </SignedIn>
          <SignedOut>
            <Link to="/sign-in" className="px-5 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium">
              Admin Login
            </Link>
          </SignedOut>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative flex items-center justify-center min-h-[calc(100vh-80px)] text-center py-16 px-4 md:px-8 bg-gradient-to-br from-blue-50 to-indigo-100">
        <div className="max-w-4xl mx-auto z-10">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold leading-tight mb-6 text-gray-900">
            {heroContent.title}
          </h1>
          <p className="text-lg md:text-xl text-gray-600 mb-10 max-w-3xl mx-auto">
            {heroContent.description}
          </p>
          <SignedIn>
            <Link to="/dashboard" className="inline-flex items-center gap-2 px-8 py-4 bg-blue-600 text-white text-lg font-semibold rounded-xl shadow-lg hover:bg-blue-700 transition-all transform hover:scale-105">
              Go to Dashboard <IconComponent name="ArrowRight" className="w-5 h-5" />
            </Link>
          </SignedIn>
           <SignedOut>
            <Link to="/sign-in" className="inline-flex items-center gap-2 px-8 py-4 bg-blue-600 text-white text-lg font-semibold rounded-xl shadow-lg hover:bg-blue-700 transition-all transform hover:scale-105">
              {heroContent.callToAction} <IconComponent name="ArrowRight" className="w-5 h-5" />
            </Link>
          </SignedOut>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-16 md:py-24 px-4 md:px-8 bg-white">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-extrabold mb-4 text-gray-900">A Unified Administrative Platform</h2>
          <p className="text-lg text-gray-600 mb-12">
            Key modules designed to streamline your administrative workflow.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="bg-white p-8 rounded-2xl shadow-lg border border-gray-100 transform transition-all hover:scale-105 hover:shadow-xl text-left">
                <div className="mb-6">
                  <div className="w-14 h-14 bg-blue-50 rounded-xl flex items-center justify-center">
                    <IconComponent name={feature.icon} className="w-8 h-8 text-blue-600" />
                  </div>
                </div>
                <h3 className="text-xl font-bold mb-3 text-gray-900">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      {/* A simple footer note since a full footer was removed */}
      <div className="text-center text-sm text-gray-500 py-8 bg-gray-50 border-t border-gray-200">
        &copy; {new Date().getFullYear()} Prashikshak Admin Portal. All rights reserved.
      </div>

    </div>
  );
};

export default HomePage;