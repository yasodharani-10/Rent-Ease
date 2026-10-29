import React from 'react';
import { Target, Lightbulb, Compass, ShieldCheck, HeartHandshake, MapPin, ArrowRight } from 'lucide-react';

interface AboutViewProps {
  onNavigate: (tab: string) => void;
}

export const AboutView: React.FC<AboutViewProps> = ({ onNavigate }) => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-16">
      
      {/* 1. Hero & Mission Statement */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <div className="inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-1 bg-[#F2F7FF] text-[#17365D] rounded-full border border-[#3678C8]/20">
          <ShieldCheck className="w-3.5 h-3.5 text-[#3678C8]" />
          <span>Wadhwani Ignite Entrepreneurship Venture</span>
        </div>

        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#17365D] tracking-tight leading-tight">
          About RentEase
        </h1>

        <blockquote className="text-base sm:text-lg text-[#263445] font-medium italic border-l-2 border-[#F28C28] pl-4 max-w-2xl mx-auto text-left sm:text-center sm:border-l-0 sm:pl-0">
          “Our mission is to make rental housing easier to discover and simpler to manage. RentEase aims to connect tenants and property owners through a transparent, convenient, and technology-driven platform.”
        </blockquote>
      </div>

      {/* 2. Problem & Solution Narrative */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch">
        
        {/* The Problem */}
        <div className="bg-white rounded-xl border border-[#E2E8F0] p-6 sm:p-8 space-y-4 shadow-xs">
          <div className="w-10 h-10 rounded-lg bg-red-50 text-red-600 flex items-center justify-center">
            <Target className="w-5 h-5" />
          </div>

          <h2 className="text-xl font-bold text-[#17365D]">
            The Problem We Address
          </h2>

          <p className="text-xs sm:text-sm text-[#68778A] leading-relaxed">
            In regional educational and trading hubs like Markapur (Prakasam district, Andhra Pradesh), finding rental housing is fundamentally fragmented:
          </p>

          <ul className="space-y-2.5 text-xs sm:text-sm text-[#263445]">
            <li className="flex items-start gap-2">
              <span className="text-red-500 font-bold">✕</span>
              <span><strong>Exorbitant Brokerage:</strong> Students and entry-level professionals are pressured to pay up to an entire month's rent just for a phone number.</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-red-500 font-bold">✕</span>
              <span><strong>Unclear Rental Terms:</strong> Verbal promises regarding drinking water availability, power backup, and deposit return frequently lead to tenant-landlord disputes.</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-red-500 font-bold">✕</span>
              <span><strong>Disorganized Property Management:</strong> Landlords manage records on paper notebooks, chase rent payments in person, and struggle to coordinate maintenance repairs.</span>
            </li>
          </ul>
        </div>

        {/* The Solution */}
        <div className="bg-white rounded-xl border border-[#E2E8F0] p-6 sm:p-8 space-y-4 shadow-xs">
          <div className="w-10 h-10 rounded-lg bg-[#EAF7EE] text-emerald-700 flex items-center justify-center">
            <Lightbulb className="w-5 h-5" />
          </div>

          <h2 className="text-xl font-bold text-[#17365D]">
            The RentEase Solution
          </h2>

          <p className="text-xs sm:text-sm text-[#68778A] leading-relaxed">
            RentEase builds a modern, zero-brokerage digital bridge tailored for college districts and emerging towns:
          </p>

          <ul className="space-y-2.5 text-xs sm:text-sm text-[#263445]">
            <li className="flex items-start gap-2">
              <span className="text-emerald-600 font-bold">✓</span>
              <span><strong>Zero Broker Commission:</strong> Direct connection between house owners and prospective tenants with upfront pricing and clear security deposits.</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-emerald-600 font-bold">✓</span>
              <span><strong>Transparent Listings:</strong> Disclosed details on water schedules, furnishing, student suitability, and walking distance to college campuses.</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-emerald-600 font-bold">✓</span>
              <span><strong>Integrated Management:</strong> Built-in rent status tracking, digital receipts, and structured maintenance ticketing for owners.</span>
            </li>
          </ul>
        </div>

      </div>

      {/* 3. Startup Vision & Pilot Context */}
      <div className="bg-[#F2F7FF] rounded-2xl p-6 sm:p-10 border border-[#3678C8]/25 space-y-6">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-[#17365D] text-white flex items-center justify-center">
            <Compass className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-[#17365D]">
              Our Vision & Entrepreneurship Pilot
            </h3>
            <p className="text-xs text-[#68778A]">
              Born out of the Wadhwani Ignite 2026 Student Entrepreneurship Program
            </p>
          </div>
        </div>

        <p className="text-xs sm:text-sm text-[#263445] leading-relaxed">
          While major metropolitan portals cater exclusively to tier-1 cities like Hyderabad and Bengaluru, millions of students and families in Andhra Pradesh's tier-2 and tier-3 towns remain ignored. RentEase began its journey in Markapur, home to institutes like Dr. Samuel George Institute of Engineering & Technology, SVKP College, and government institutions.
        </p>

        <p className="text-xs sm:text-sm text-[#263445] leading-relaxed">
          Our vision is to expand our transparent rental model across Prakasam, Guntur, Kurnool, and neighboring districts, transforming regional rental housing into a dependable, stress-free experience.
        </p>

        <div className="pt-2 flex flex-wrap gap-4">
          <button
            onClick={() => onNavigate('find-homes')}
            className="px-5 py-2.5 text-xs sm:text-sm font-semibold text-white bg-[#17365D] hover:bg-[#22487A] rounded-md transition-all shadow-xs cursor-pointer flex items-center gap-2"
          >
            <span>Explore Pilot Listings</span>
            <ArrowRight className="w-4 h-4" />
          </button>
          <button
            onClick={() => onNavigate('contact')}
            className="px-5 py-2.5 text-xs sm:text-sm font-semibold text-[#17365D] bg-white border border-[#17365D] hover:bg-slate-50 rounded-md transition-all cursor-pointer"
          >
            Contact Pilot Desk
          </button>
        </div>
      </div>

      {/* 4. Core Values & Principles */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-xl border border-[#E2E8F0] shadow-xs space-y-2">
          <h4 className="text-sm font-bold text-[#17365D]">Zero Deceptive Claims</h4>
          <p className="text-xs text-[#68778A] leading-relaxed">
            We never fabricate owner credentials or claim fake legal certifications. Listings are clearly categorized as self-declared or verified.
          </p>
        </div>

        <div className="bg-white p-6 rounded-xl border border-[#E2E8F0] shadow-xs space-y-2">
          <h4 className="text-sm font-bold text-[#17365D]">Fair for Tenants & Owners</h4>
          <p className="text-xs text-[#68778A] leading-relaxed">
            A sustainable marketplace treats both sides with dignity: owners get prompt rent records while tenants get habitable, safe homes.
          </p>
        </div>

        <div className="bg-white p-6 rounded-xl border border-[#E2E8F0] shadow-xs space-y-2">
          <h4 className="text-sm font-bold text-[#17365D]">Local First Approach</h4>
          <p className="text-xs text-[#68778A] leading-relaxed">
            Built with deep respect for local customs, college academic calendars, municipal water cycles, and regional Andhra housing preferences.
          </p>
        </div>
      </div>

    </div>
  );
};
