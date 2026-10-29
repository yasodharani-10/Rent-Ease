import React, { useState } from 'react';
import { Search, MapPin, Sparkles, ShieldCheck, ArrowRight, Home as HomeIcon, CheckCircle2, Users, FileText, Wrench, IndianRupee, Clock, ChevronRight } from 'lucide-react';
import { Property, FilterState } from '../types';
import { PropertyCard } from '../components/PropertyCard';
import { PropertyImageVisual } from '../components/PropertyImageVisual';
import { MARKAPUR_LOCALITIES } from '../data/mockData';

interface HomeViewProps {
  properties: Property[];
  favorites: string[];
  onToggleFavorite: (id: string) => void;
  onViewDetails: (property: Property) => void;
  onNavigate: (tab: string, initialFilter?: Partial<FilterState>) => void;
  onOpenAiModal: () => void;
}

export const HomeView: React.FC<HomeViewProps> = ({
  properties,
  favorites,
  onToggleFavorite,
  onViewDetails,
  onNavigate,
  onOpenAiModal,
}) => {
  // Hero Search Panel State
  const [selectedLocation, setSelectedLocation] = useState('All Areas in Markapur');
  const [propertyType, setPropertyType] = useState('All');
  const [maxRent, setMaxRent] = useState(15000);
  const [furnishing, setFurnishing] = useState('All');

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onNavigate('find-homes', {
      location: selectedLocation === 'All Areas in Markapur' ? '' : selectedLocation,
      propertyType: propertyType === 'All' ? '' : propertyType,
      maxRent: maxRent,
      furnishing: furnishing === 'All' ? '' : furnishing,
    });
  };

  const featuredList = properties.slice(0, 3);

  return (
    <div className="space-y-16 sm:space-y-24">
      
      {/* 1. HERO SECTION */}
      <section className="relative pt-6 sm:pt-12 pb-8 overflow-hidden">
        {/* Subtle background ambient gradient */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#F2F7FF] via-[#FAFCFF] to-white -z-10" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            
            {/* Left Column: Headlines & Direct CTAs */}
            <div className="lg:col-span-7 space-y-6">
              
              {/* Pilot Location Tag */}
              <div className="inline-flex items-center gap-2 text-xs font-semibold px-3 py-1 bg-[#FFF1E4] text-[#F28C28] rounded-full border border-[#F28C28]/20">
                <MapPin className="w-3.5 h-3.5" />
                <span>Markapur & Andhra Pradesh College Corridors Pilot</span>
              </div>

              {/* Headline */}
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#17365D] tracking-tight leading-[1.15] text-balance">
                Find Your Perfect Rental Home, Without the Stress.
              </h1>

              {/* Supporting Text */}
              <p className="text-base sm:text-lg text-[#68778A] leading-relaxed max-w-xl">
                Discover affordable homes that fit your budget and lifestyle. RentEase helps tenants find suitable properties and gives landlords simpler tools to manage rentals.
              </p>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center gap-3 pt-2">
                <button
                  onClick={() => onNavigate('find-homes')}
                  className="px-6 py-3 rounded-md text-sm font-semibold text-white bg-[#17365D] hover:bg-[#22487A] transition-all shadow-md hover:shadow-lg cursor-pointer flex items-center gap-2 whitespace-nowrap"
                >
                  <span>Find a Home</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

                <button
                  onClick={() => onNavigate('for-owners')}
                  className="px-6 py-3 rounded-md text-sm font-semibold text-[#17365D] bg-[#FFF1E4] hover:bg-[#FFE3CA] border border-[#F28C28]/30 transition-all cursor-pointer whitespace-nowrap"
                >
                  List Your Property
                </button>

                <button
                  onClick={onOpenAiModal}
                  className="px-4 py-3 rounded-md text-sm font-semibold text-[#3678C8] hover:bg-[#F2F7FF] transition-all cursor-pointer flex items-center gap-1.5 whitespace-nowrap"
                >
                  <Sparkles className="w-4 h-4 text-[#F28C28]" />
                  <span>AI Match Assistant</span>
                </button>
              </div>

              {/* 3 Short Core Benefits (Zero-Pill clean typography) */}
              <div className="pt-6 border-t border-[#E2E8F0] grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs font-medium text-[#263445]">
                <div className="flex items-center gap-2">
                  <div className="w-5 h-5 rounded-full bg-[#EAF7EE] text-emerald-700 flex items-center justify-center shrink-0">
                    ✓
                  </div>
                  <span>Smart Property Recommendations</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-5 h-5 rounded-full bg-[#EAF7EE] text-emerald-700 flex items-center justify-center shrink-0">
                    ✓
                  </div>
                  <span>Transparent Rental Terms</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-5 h-5 rounded-full bg-[#EAF7EE] text-emerald-700 flex items-center justify-center shrink-0">
                    ✓
                  </div>
                  <span>Easy Digital Management</span>
                </div>
              </div>

            </div>

            {/* Right Column: Hero Visual Showcase */}
            <div className="lg:col-span-5 relative">
              <div className="relative rounded-2xl overflow-hidden border border-[#E2E8F0] shadow-xl bg-white">
                <PropertyImageVisual
                  category="apartment"
                  title="Modern Indian Residential Community in Andhra Pradesh"
                  aspectRatio="4/3"
                />

                {/* Overlay Card: Live Availability Snapshot */}
                <div className="p-4 bg-white/95 backdrop-blur-xs border-t border-[#E2E8F0]">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="text-xs text-[#68778A]">Markapur College Hub</div>
                      <div className="text-sm font-bold text-[#17365D]">Verified Rentals from ₹3,500/mo</div>
                    </div>
                    <button
                      onClick={() => onNavigate('find-homes')}
                      className="text-xs font-semibold text-[#3678C8] hover:text-[#17365D] flex items-center gap-1 cursor-pointer"
                    >
                      <span>Explore</span>
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 2. PROPERTY SEARCH PANEL */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-xl shadow-lg border border-[#E2E8F0] p-5 sm:p-7">
          <div className="mb-4 flex items-center justify-between flex-wrap gap-2">
            <div>
              <h2 className="text-base sm:text-lg font-bold text-[#17365D]">
                Search Rental Homes in Markapur
              </h2>
              <p className="text-xs text-[#68778A]">
                Filter by locality, monthly budget, furnishing level, and bedroom count
              </p>
            </div>
            <span className="text-xs font-medium text-[#3678C8] bg-[#F2F7FF] px-2.5 py-1 rounded-sm">
              Live Demo Database
            </span>
          </div>

          <form onSubmit={handleSearchSubmit} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 items-end">
            {/* Locality */}
            <div>
              <label className="block text-xs font-semibold text-[#263445] mb-1">Locality</label>
              <select
                value={selectedLocation}
                onChange={(e) => setSelectedLocation(e.target.value)}
                className="w-full text-xs px-3 py-2.5 border border-[#E2E8F0] rounded-md focus:border-[#3678C8] bg-white text-[#263445]"
              >
                {MARKAPUR_LOCALITIES.map((loc) => (
                  <option key={loc} value={loc}>
                    {loc}
                  </option>
                ))}
              </select>
            </div>

            {/* Property Type */}
            <div>
              <label className="block text-xs font-semibold text-[#263445] mb-1">Property Type</label>
              <select
                value={propertyType}
                onChange={(e) => setPropertyType(e.target.value)}
                className="w-full text-xs px-3 py-2.5 border border-[#E2E8F0] rounded-md focus:border-[#3678C8] bg-white text-[#263445]"
              >
                <option value="All">All Types</option>
                <option value="1RK">1 RK (Student Room)</option>
                <option value="1BHK">1 BHK Apartment</option>
                <option value="2BHK">2 BHK Apartment</option>
                <option value="3BHK">3 BHK Penthouse/Flat</option>
                <option value="Independent House">Independent House</option>
              </select>
            </div>

            {/* Max Rent */}
            <div>
              <div className="flex justify-between items-center mb-1">
                <label className="text-xs font-semibold text-[#263445]">Max Budget</label>
                <span className="text-xs font-bold text-[#17365D] tabular-nums">
                  ₹{maxRent.toLocaleString('en-IN')}/mo
                </span>
              </div>
              <input
                type="range"
                min={3000}
                max={25000}
                step={500}
                value={maxRent}
                onChange={(e) => setMaxRent(Number(e.target.value))}
                className="w-full accent-[#17365D] cursor-pointer mt-2"
              />
            </div>

            {/* Furnishing */}
            <div>
              <label className="block text-xs font-semibold text-[#263445] mb-1">Furnishing</label>
              <select
                value={furnishing}
                onChange={(e) => setFurnishing(e.target.value)}
                className="w-full text-xs px-3 py-2.5 border border-[#E2E8F0] rounded-md focus:border-[#3678C8] bg-white text-[#263445]"
              >
                <option value="All">Any Furnishing</option>
                <option value="Furnished">Furnished</option>
                <option value="Semi-Furnished">Semi-Furnished</option>
                <option value="Unfurnished">Unfurnished</option>
              </select>
            </div>

            {/* Search Button */}
            <div>
              <button
                type="submit"
                className="w-full py-2.5 px-4 text-xs sm:text-sm font-semibold text-white bg-[#17365D] hover:bg-[#22487A] rounded-md transition-all shadow-xs flex items-center justify-center gap-2 cursor-pointer h-10"
              >
                <Search className="w-4 h-4" />
                <span>Find Properties</span>
              </button>
            </div>
          </form>
        </div>
      </section>

      {/* 3. FEATURED RENTAL PROPERTIES */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-8 flex-wrap gap-4">
          <div>
            <h2 className="text-2xl sm:text-3xl font-bold text-[#17365D] tracking-tight">
              Featured Rental Homes
            </h2>
            <p className="text-sm text-[#68778A] mt-1">
              Curated rental options in Markapur with transparent pricing and direct landlord contact
            </p>
          </div>
          <button
            onClick={() => onNavigate('find-homes')}
            className="text-sm font-semibold text-[#3678C8] hover:text-[#17365D] flex items-center gap-1 cursor-pointer"
          >
            <span>View All Listings ({properties.length})</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {featuredList.map((property) => (
            <PropertyCard
              key={property.id}
              property={property}
              isFavorite={favorites.includes(property.id)}
              onToggleFavorite={onToggleFavorite}
              onViewDetails={onViewDetails}
              onScheduleViewing={onViewDetails}
            />
          ))}
        </div>
      </section>

      {/* 4. HOW RENTEASE WORKS */}
      <section className="bg-[#F2F7FF] py-16 border-y border-[#E2E8F0]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <h2 className="text-2xl sm:text-3xl font-bold text-[#17365D] tracking-tight">
              How RentEase Works
            </h2>
            <p className="text-sm text-[#68778A] mt-2">
              Three clear steps to eliminate rental hassle for college students, families, and owners
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Step 1 */}
            <div className="bg-white rounded-xl p-6 border border-[#E2E8F0] shadow-xs flex flex-col items-start space-y-3">
              <div className="w-10 h-10 rounded-lg bg-[#FFF1E4] text-[#F28C28] flex items-center justify-center font-bold text-base">
                1
              </div>
              <h3 className="text-base font-bold text-[#17365D]">Search & Specify</h3>
              <p className="text-xs text-[#68778A] leading-relaxed">
                Enter your monthly budget, desired locality in Markapur, bedroom requirements, and whether you prefer furnished study rooms or full family homes.
              </p>
            </div>

            {/* Step 2 */}
            <div className="bg-white rounded-xl p-6 border border-[#E2E8F0] shadow-xs flex flex-col items-start space-y-3">
              <div className="w-10 h-10 rounded-lg bg-[#F2F7FF] text-[#3678C8] flex items-center justify-center font-bold text-base">
                2
              </div>
              <h3 className="text-base font-bold text-[#17365D]">Discover & Match</h3>
              <p className="text-xs text-[#68778A] leading-relaxed">
                Explore transparent rental listings with clear photos, water availability details, and power backup status. Use our AI assistant to rank homes by student suitability.
              </p>
            </div>

            {/* Step 3 */}
            <div className="bg-white rounded-xl p-6 border border-[#E2E8F0] shadow-xs flex flex-col items-start space-y-3">
              <div className="w-10 h-10 rounded-lg bg-[#EAF7EE] text-emerald-700 flex items-center justify-center font-bold text-base">
                3
              </div>
              <h3 className="text-base font-bold text-[#17365D]">Connect & Manage</h3>
              <p className="text-xs text-[#68778A] leading-relaxed">
                Contact owners directly with zero middleman brokerage fees. Schedule physical viewings, generate digital rent receipts, and submit maintenance tickets anytime.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 5. BENEFITS SECTION (TENANTS VS LANDLORDS) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <h2 className="text-2xl sm:text-3xl font-bold text-[#17365D] tracking-tight">
            Designed for Both Sides of the Rental Market
          </h2>
          <p className="text-sm text-[#68778A] mt-2">
            RentEase bridges the gap between tenant discovery and property management
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          
          {/* For Tenants Card */}
          <div className="bg-white rounded-xl border border-[#E2E8F0] p-6 sm:p-8 flex flex-col justify-between shadow-xs">
            <div>
              <div className="w-10 h-10 rounded-lg bg-[#F2F7FF] text-[#3678C8] flex items-center justify-center mb-4">
                <Users className="w-5 h-5" />
              </div>
              <h3 className="text-xl font-bold text-[#17365D]">For Tenants & Students</h3>
              <p className="text-xs text-[#68778A] mt-1 mb-6">
                Save money, time, and stress while finding reliable housing near colleges.
              </p>

              <div className="space-y-3.5">
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <div>
                    <div className="text-xs font-semibold text-[#17365D]">Zero Brokerage Fees</div>
                    <div className="text-xs text-[#68778A]">Connect directly with genuine house owners without paying one month's rent as broker commission.</div>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <div>
                    <div className="text-xs font-semibold text-[#17365D]">Transparent Facility Details</div>
                    <div className="text-xs text-[#68778A]">Upfront disclosure of borewell water schedules, electricity meters, Wi-Fi, and bike parking.</div>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <div>
                    <div className="text-xs font-semibold text-[#17365D]">Online Viewing Appointments</div>
                    <div className="text-xs text-[#68778A]">Book inspection visits in advance without wandering around Markapur streets in the heat.</div>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-8 pt-4 border-t border-[#E2E8F0]">
              <button
                onClick={() => onNavigate('find-homes')}
                className="text-xs font-semibold text-[#17365D] hover:text-[#3678C8] flex items-center gap-1.5 cursor-pointer"
              >
                <span>Browse Student & Family Rentals</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* For Landlords Card */}
          <div className="bg-white rounded-xl border border-[#E2E8F0] p-6 sm:p-8 flex flex-col justify-between shadow-xs">
            <div>
              <div className="w-10 h-10 rounded-lg bg-[#FFF1E4] text-[#F28C28] flex items-center justify-center mb-4">
                <HomeIcon className="w-5 h-5" />
              </div>
              <h3 className="text-xl font-bold text-[#17365D]">For Property Owners & Landlords</h3>
              <p className="text-xs text-[#68778A] mt-1 mb-6">
                Keep properties occupied with verified tenants and automate your rent collection.
              </p>

              <div className="space-y-3.5">
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <div>
                    <div className="text-xs font-semibold text-[#17365D]">Instant Property Publishing</div>
                    <div className="text-xs text-[#68778A]">List your vacant flats, rooms, or houses with full terms in less than two minutes.</div>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <div>
                    <div className="text-xs font-semibold text-[#17365D]">Rent Records & Due Reminders</div>
                    <div className="text-xs text-[#68778A]">Track who has paid, send automatic courtesy reminders, and keep a digital rent payment history.</div>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <div>
                    <div className="text-xs font-semibold text-[#17365D]">Maintenance Request Log</div>
                    <div className="text-xs text-[#68778A]">Receive organized tenant tickets for plumbing or electrical repairs without frantic late-night calls.</div>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-8 pt-4 border-t border-[#E2E8F0]">
              <button
                onClick={() => onNavigate('for-owners')}
                className="text-xs font-semibold text-[#F28C28] hover:text-[#D97706] flex items-center gap-1.5 cursor-pointer"
              >
                <span>Explore Landlord Tools & List House</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

        </div>
      </section>

      {/* 6. AI-POWERED RECOMMENDATIONS SPOTLIGHT CARD */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-br from-[#17365D] to-[#22487A] rounded-2xl p-6 sm:p-10 text-white relative overflow-hidden shadow-xl">
          {/* Subtle light effect */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-[#3678C8]/20 rounded-full blur-3xl pointer-events-none" />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
            <div className="lg:col-span-7 space-y-4">
              <div className="inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-1 bg-white/10 rounded-full text-[#FFF1E4]">
                <Sparkles className="w-3.5 h-3.5 text-[#F28C28]" />
                <span>RentEase Recommendation Algorithm</span>
              </div>

              <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white">
                Find Properties Ranked by Compatibility
              </h2>

              <p className="text-xs sm:text-sm text-slate-200 leading-relaxed max-w-xl">
                Instead of scrolling through hundreds of irrelevant listings, our smart matching engine evaluates your exact student budget, distance to Markapur engineering/degree colleges, and required facilities to recommend top matches.
              </p>

              <div className="pt-2">
                <button
                  onClick={onOpenAiModal}
                  className="px-5 py-2.5 rounded-md text-xs sm:text-sm font-semibold text-[#17365D] bg-white hover:bg-slate-100 transition-all shadow-xs cursor-pointer flex items-center gap-2"
                >
                  <Sparkles className="w-4 h-4 text-[#F28C28]" />
                  <span>Try AI Match Engine Now</span>
                </button>
              </div>
            </div>

            {/* Visual recommendation preview card */}
            <div className="lg:col-span-5 bg-white/10 backdrop-blur-md rounded-xl p-5 border border-white/15 space-y-3">
              <div className="flex items-center justify-between text-xs text-slate-300">
                <span>Sample Student Profile</span>
                <span className="text-emerald-300 font-semibold font-mono">96% Compatibility</span>
              </div>
              <div className="text-sm font-bold text-white">
                Furnished 1 RK near SVKP College
              </div>
              <div className="text-xs text-[#FFF1E4] space-y-1">
                <div>✓ ₹4,200/mo is within ₹5,000 budget</div>
                <div>✓ 0.4 km from lecture hall</div>
                <div>✓ High-speed WiFi included in maintenance</div>
              </div>
              <div className="text-[11px] text-slate-400 italic pt-1 border-t border-white/10">
                Transparent matching heuristics demonstrated live.
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 7. TRUST & TRANSPARENCY SECTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-xl border border-[#E2E8F0] p-6 sm:p-8">
          <div className="flex items-start gap-4">
            <div className="w-10 h-10 rounded-lg bg-[#EAF7EE] text-emerald-700 flex items-center justify-center shrink-0">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div className="space-y-2">
              <h3 className="text-lg font-bold text-[#17365D]">
                Our Commitment to Trust & Transparency
              </h3>
              <p className="text-xs sm:text-sm text-[#68778A] leading-relaxed">
                RentEase addresses the lack of formal rental standards in regional Andhra Pradesh towns. We believe in clear, unhidden pricing: exact security deposits, notice periods, and authentic photographs. We clearly label sample data as demonstrations and distinguish self-declared property details from verified on-site visits.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 8. CALL-TO-ACTION SECTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center py-8">
        <div className="bg-[#FFF1E4] rounded-2xl p-8 sm:p-12 border border-[#F28C28]/25 space-y-4">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-[#17365D] tracking-tight">
            Your Next Home Is Closer Than You Think.
          </h2>
          <p className="text-sm text-[#68778A] max-w-lg mx-auto">
            Start exploring rental homes or bring your property to more potential tenants.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
            <button
              onClick={() => onNavigate('find-homes')}
              className="px-6 py-3 rounded-md text-xs sm:text-sm font-semibold text-white bg-[#17365D] hover:bg-[#22487A] transition-all shadow-xs cursor-pointer"
            >
              Explore Homes
            </button>
            <button
              onClick={() => onNavigate('for-owners')}
              className="px-6 py-3 rounded-md text-xs sm:text-sm font-semibold text-[#17365D] bg-white border border-[#17365D] hover:bg-slate-50 transition-all cursor-pointer"
            >
              List Your Property
            </button>
          </div>
        </div>
      </section>

    </div>
  );
};
