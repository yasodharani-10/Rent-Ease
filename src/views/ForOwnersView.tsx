import React, { useState } from 'react';
import { Home, ShieldCheck, CheckCircle2, IndianRupee, Users, FileText, Wrench, Bell, ArrowRight, Sparkles } from 'lucide-react';
import { Property, PropertyType, FurnishingType, PreferredTenant } from '../types';
import { storageService } from '../services/storageService';
import { MARKAPUR_LOCALITIES } from '../data/mockData';

interface ForOwnersViewProps {
  onPropertyAdded: (newProp: Property) => void;
  onNavigate: (tab: string) => void;
}

export const ForOwnersView: React.FC<ForOwnersViewProps> = ({
  onPropertyAdded,
  onNavigate,
}) => {
  // Form fields
  const [ownerName, setOwnerName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [title, setTitle] = useState('');
  const [selectedLocality, setSelectedLocality] = useState('College Road');
  const [propertyType, setPropertyType] = useState<PropertyType>('2BHK');
  const [monthlyRent, setMonthlyRent] = useState<number>(7500);
  const [securityDeposit, setSecurityDeposit] = useState<number>(15000);
  const [bedrooms, setBedrooms] = useState<number>(2);
  const [bathrooms, setBathrooms] = useState<number>(2);
  const [furnishing, setFurnishing] = useState<FurnishingType>('Semi-Furnished');
  const [preferredTenant, setPreferredTenant] = useState<PreferredTenant>('All');
  const [description, setDescription] = useState('');
  const [sqft, setSqft] = useState<number>(900);
  const [floor, setFloor] = useState('1st Floor');
  const [amenities, setAmenities] = useState<string[]>([
    '24/7 Water Supply',
    'Inverter Wiring',
    'Bike Parking'
  ]);

  const [formSubmitted, setFormSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [addedPropId, setAddedPropId] = useState('');

  const toggleAmenity = (name: string) => {
    if (amenities.includes(name)) {
      setAmenities(amenities.filter(a => a !== name));
    } else {
      setAmenities([...amenities, name]);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');

    if (!ownerName || !email || !phone || !title || !description) {
      setErrorMsg('Please fill in all required fields marked with *');
      return;
    }

    if (monthlyRent <= 0) {
      setErrorMsg('Monthly rent must be greater than zero.');
      return;
    }

    setLoading(true);

    setTimeout(() => {
      setLoading(false);

      const category =
        propertyType === '1RK'
          ? 'studio'
          : propertyType === 'Independent House'
          ? 'villa'
          : propertyType === '3BHK'
          ? 'apartment'
          : 'family';

      const created = storageService.addProperty({
        title,
        description,
        location: `${selectedLocality}, Markapur, Andhra Pradesh`,
        areaName: selectedLocality,
        city: 'Markapur',
        state: 'Andhra Pradesh',
        monthlyRent,
        securityDeposit,
        propertyType,
        bedrooms,
        bathrooms,
        furnishing,
        preferredTenant,
        amenities,
        imageCategory: category,
        images: [],
        status: 'Available',
        sqft,
        floor,
        ownerId: `owner-${Date.now()}`,
        ownerName,
        ownerPhone: phone,
        ownerEmail: email,
      });

      setAddedPropId(created.id);
      setFormSubmitted(true);
      onPropertyAdded(created);
    }, 600);
  };

  const handleResetForm = () => {
    setTitle('');
    setDescription('');
    setFormSubmitted(false);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-16">
      
      {/* 1. Header Section */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <div className="inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-1 bg-[#FFF1E4] text-[#F28C28] rounded-full border border-[#F28C28]/25">
          <Home className="w-3.5 h-3.5" />
          <span>For Property Owners & Landlords</span>
        </div>

        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#17365D] tracking-tight leading-tight">
          Manage Your Rental Property the Smarter Way.
        </h1>

        <p className="text-sm sm:text-base text-[#68778A] leading-relaxed">
          Zero broker commission. Direct communication with verified students, professionals, and families in Markapur. All your rent tracking and maintenance in one place.
        </p>
      </div>

      {/* 2. Feature Cards for Landlords */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        
        <div className="p-6 bg-white rounded-xl border border-[#E2E8F0] shadow-xs space-y-3">
          <div className="w-10 h-10 rounded-lg bg-[#F2F7FF] text-[#3678C8] flex items-center justify-center">
            <Home className="w-5 h-5" />
          </div>
          <h3 className="text-base font-bold text-[#17365D]">Instant Listing Management</h3>
          <p className="text-xs text-[#68778A] leading-relaxed">
            Publish your house or room vacancy with accurate rental terms, photos, and preferred tenant guidelines. Turn listings on or off as occupancy changes.
          </p>
        </div>

        <div className="p-6 bg-white rounded-xl border border-[#E2E8F0] shadow-xs space-y-3">
          <div className="w-10 h-10 rounded-lg bg-[#FFF1E4] text-[#F28C28] flex items-center justify-center">
            <Users className="w-5 h-5" />
          </div>
          <h3 className="text-base font-bold text-[#17365D]">Tenant Records & Direct Enquiries</h3>
          <p className="text-xs text-[#68778A] leading-relaxed">
            Screen interested tenants before scheduling appointments. Maintain clear digital contact records, move-in agreements, and emergency phone numbers.
          </p>
        </div>

        <div className="p-6 bg-white rounded-xl border border-[#E2E8F0] shadow-xs space-y-3">
          <div className="w-10 h-10 rounded-lg bg-[#EAF7EE] text-emerald-700 flex items-center justify-center">
            <IndianRupee className="w-5 h-5" />
          </div>
          <h3 className="text-base font-bold text-[#17365D]">Automated Rent Tracking</h3>
          <p className="text-xs text-[#68778A] leading-relaxed">
            Track monthly dues with automatic status tags (Paid, Pending, Overdue). Send automated courtesy SMS/WhatsApp reminders without awkward conversations.
          </p>
        </div>

        <div className="p-6 bg-white rounded-xl border border-[#E2E8F0] shadow-xs space-y-3">
          <div className="w-10 h-10 rounded-lg bg-[#F2F7FF] text-[#17365D] flex items-center justify-center">
            <Wrench className="w-5 h-5" />
          </div>
          <h3 className="text-base font-bold text-[#17365D]">Maintenance Request Desk</h3>
          <p className="text-xs text-[#68778A] leading-relaxed">
            Receive organized tickets for plumbing, electrical, and water tank issues with photos. Update progress and record repair costs digitally.
          </p>
        </div>

        <div className="p-6 bg-white rounded-xl border border-[#E2E8F0] shadow-xs space-y-3">
          <div className="w-10 h-10 rounded-lg bg-[#FFF1E4] text-[#17365D] flex items-center justify-center">
            <FileText className="w-5 h-5" />
          </div>
          <h3 className="text-base font-bold text-[#17365D]">Standard Rental Agreements</h3>
          <p className="text-xs text-[#68778A] leading-relaxed">
            Access standardized AP rental agreement templates covering clear deposit refund terms, 30-day notice periods, and maintenance obligations.
          </p>
        </div>

        <div className="p-6 bg-white rounded-xl border border-[#E2E8F0] shadow-xs space-y-3">
          <div className="w-10 h-10 rounded-lg bg-[#EAF7EE] text-[#3678C8] flex items-center justify-center">
            <ShieldCheck className="w-5 h-5" />
          </div>
          <h3 className="text-base font-bold text-[#17365D]">Zero Broker Commission</h3>
          <p className="text-xs text-[#68778A] leading-relaxed">
            Keep 100% of your rental income. RentEase never charges landlords or tenants broker cut fees, ensuring full financial transparency.
          </p>
        </div>

      </div>

      {/* 3. Interactive Listing Form */}
      <div className="bg-white rounded-2xl border border-[#E2E8F0] shadow-lg p-6 sm:p-10 max-w-4xl mx-auto">
        <div className="text-center max-w-xl mx-auto mb-8">
          <h2 className="text-2xl font-bold text-[#17365D]">
            List Your Property on RentEase
          </h2>
          <p className="text-xs sm:text-sm text-[#68778A] mt-1">
            Fill in the details below. Your listing will immediately become searchable by tenants across Markapur.
          </p>
        </div>

        {errorMsg && (
          <div className="mb-6 p-3 bg-red-50 text-red-700 text-xs rounded-md border border-red-200">
            {errorMsg}
          </div>
        )}

        {formSubmitted ? (
          <div className="p-8 bg-[#EAF7EE] rounded-xl border border-emerald-200 text-center space-y-4">
            <div className="w-14 h-14 rounded-full bg-emerald-600 text-white flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <h3 className="text-xl font-bold text-emerald-950">
              Property Successfully Listed!
            </h3>
            <p className="text-xs text-emerald-800 max-w-md mx-auto leading-relaxed">
              Your property has been registered in the RentEase database (ID: <span className="font-mono">{addedPropId}</span>). You can view it live in the Find Homes search page or manage it in your Landlord Dashboard.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
              <button
                onClick={() => onNavigate('find-homes')}
                className="px-5 py-2.5 text-xs font-semibold text-white bg-[#17365D] hover:bg-[#22487A] rounded-md transition-colors cursor-pointer"
              >
                View in Search Page
              </button>
              <button
                onClick={() => onNavigate('landlord-dashboard')}
                className="px-5 py-2.5 text-xs font-semibold text-[#17365D] bg-white border border-[#17365D] hover:bg-slate-50 rounded-md transition-colors cursor-pointer"
              >
                Open Landlord Dashboard
              </button>
              <button
                onClick={handleResetForm}
                className="px-4 py-2.5 text-xs font-semibold text-[#68778A] hover:underline cursor-pointer"
              >
                List another property
              </button>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-6">
            
            {/* Section 1: Owner Contact */}
            <div>
              <h3 className="text-xs font-bold uppercase tracking-wider text-[#17365D] mb-3 pb-2 border-b border-[#E2E8F0]">
                1. Owner Information
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-[#263445] mb-1">Owner Legal Name *</label>
                  <input
                    type="text"
                    required
                    value={ownerName}
                    onChange={(e) => setOwnerName(e.target.value)}
                    placeholder="e.g. V. Ramanjaneyulu"
                    className="w-full text-xs px-3 py-2 border border-[#E2E8F0] rounded-md focus:border-[#3678C8] focus:outline-hidden"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-[#263445] mb-1">Owner Email *</label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="owner@example.com"
                    className="w-full text-xs px-3 py-2 border border-[#E2E8F0] rounded-md focus:border-[#3678C8] focus:outline-hidden"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-[#263445] mb-1">Mobile Number *</label>
                  <input
                    type="tel"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="+91 94402 11223"
                    className="w-full text-xs px-3 py-2 border border-[#E2E8F0] rounded-md focus:border-[#3678C8] focus:outline-hidden"
                  />
                </div>
              </div>
            </div>

            {/* Section 2: Property Specifics */}
            <div>
              <h3 className="text-xs font-bold uppercase tracking-wider text-[#17365D] mb-3 pb-2 border-b border-[#E2E8F0]">
                2. Property Specifications
              </h3>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-[#263445] mb-1">Listing Headline Title *</label>
                  <input
                    type="text"
                    required
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="e.g. Well-Ventilated 2 BHK with 24/7 Water near Samuel George College"
                    className="w-full text-xs px-3 py-2 border border-[#E2E8F0] rounded-md focus:border-[#3678C8] focus:outline-hidden"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-[#263445] mb-1">Locality in Markapur *</label>
                    <select
                      value={selectedLocality}
                      onChange={(e) => setSelectedLocality(e.target.value)}
                      className="w-full text-xs px-3 py-2 border border-[#E2E8F0] rounded-md focus:border-[#3678C8] bg-white text-[#263445]"
                    >
                      {MARKAPUR_LOCALITIES.filter(l => l !== 'All Areas in Markapur').map((l) => (
                        <option key={l} value={l}>
                          {l}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-[#263445] mb-1">Property Type *</label>
                    <select
                      value={propertyType}
                      onChange={(e) => setPropertyType(e.target.value as any)}
                      className="w-full text-xs px-3 py-2 border border-[#E2E8F0] rounded-md focus:border-[#3678C8] bg-white text-[#263445]"
                    >
                      <option value="1RK">1 RK (Single Student Room)</option>
                      <option value="1BHK">1 BHK</option>
                      <option value="2BHK">2 BHK</option>
                      <option value="3BHK">3 BHK</option>
                      <option value="Independent House">Independent House</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-[#263445] mb-1">Furnishing Status *</label>
                    <select
                      value={furnishing}
                      onChange={(e) => setFurnishing(e.target.value as any)}
                      className="w-full text-xs px-3 py-2 border border-[#E2E8F0] rounded-md focus:border-[#3678C8] bg-white text-[#263445]"
                    >
                      <option value="Furnished">Furnished</option>
                      <option value="Semi-Furnished">Semi-Furnished</option>
                      <option value="Unfurnished">Unfurnished</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-[#263445] mb-1">Monthly Rent (₹) *</label>
                    <input
                      type="number"
                      required
                      min={1000}
                      step={100}
                      value={monthlyRent}
                      onChange={(e) => setMonthlyRent(Number(e.target.value))}
                      className="w-full text-xs px-3 py-2 border border-[#E2E8F0] rounded-md focus:border-[#3678C8] focus:outline-hidden font-bold tabular-nums"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-[#263445] mb-1">Deposit (₹) *</label>
                    <input
                      type="number"
                      required
                      min={1000}
                      step={500}
                      value={securityDeposit}
                      onChange={(e) => setSecurityDeposit(Number(e.target.value))}
                      className="w-full text-xs px-3 py-2 border border-[#E2E8F0] rounded-md focus:border-[#3678C8] focus:outline-hidden font-bold tabular-nums"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-[#263445] mb-1">Bedrooms</label>
                    <input
                      type="number"
                      min={1}
                      max={6}
                      value={bedrooms}
                      onChange={(e) => setBedrooms(Number(e.target.value))}
                      className="w-full text-xs px-3 py-2 border border-[#E2E8F0] rounded-md focus:border-[#3678C8] focus:outline-hidden tabular-nums"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-[#263445] mb-1">Bathrooms</label>
                    <input
                      type="number"
                      min={1}
                      max={5}
                      value={bathrooms}
                      onChange={(e) => setBathrooms(Number(e.target.value))}
                      className="w-full text-xs px-3 py-2 border border-[#E2E8F0] rounded-md focus:border-[#3678C8] focus:outline-hidden tabular-nums"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-[#263445] mb-1">Built-up Area (Sq.Ft)</label>
                    <input
                      type="number"
                      value={sqft}
                      onChange={(e) => setSqft(Number(e.target.value))}
                      className="w-full text-xs px-3 py-2 border border-[#E2E8F0] rounded-md focus:border-[#3678C8] focus:outline-hidden tabular-nums"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-[#263445] mb-1">Floor Level</label>
                    <input
                      type="text"
                      value={floor}
                      onChange={(e) => setFloor(e.target.value)}
                      placeholder="e.g. 1st Floor (Out of 3)"
                      className="w-full text-xs px-3 py-2 border border-[#E2E8F0] rounded-md focus:border-[#3678C8] focus:outline-hidden"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-[#263445] mb-1">Preferred Tenants</label>
                    <select
                      value={preferredTenant}
                      onChange={(e) => setPreferredTenant(e.target.value as any)}
                      className="w-full text-xs px-3 py-2 border border-[#E2E8F0] rounded-md focus:border-[#3678C8] bg-white text-[#263445]"
                    >
                      <option value="All">All Tenants (Family/Students/Singles)</option>
                      <option value="Students">Students Only</option>
                      <option value="Working Professionals">Working Professionals</option>
                      <option value="Family">Families Only</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#263445] mb-1">Property Description & Rules *</label>
                  <textarea
                    rows={4}
                    required
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Describe cross-ventilation, water schedule, proximity to bus stop/colleges, electricity meter arrangement, etc."
                    className="w-full text-xs px-3 py-2 border border-[#E2E8F0] rounded-md focus:border-[#3678C8] focus:outline-hidden leading-relaxed"
                  />
                </div>

                {/* Amenities */}
                <div>
                  <label className="block text-xs font-semibold text-[#263445] mb-2">Available Amenities</label>
                  <div className="flex flex-wrap gap-2">
                    {[
                      '24/7 Water Supply',
                      'Inverter Wiring',
                      'Bike Parking',
                      'Covered Car Parking',
                      'High-Speed WiFi',
                      'RO Drinking Water',
                      'CCTV Security',
                      'Lift Access'
                    ].map((am) => {
                      const isSelected = amenities.includes(am);
                      return (
                        <button
                          key={am}
                          type="button"
                          onClick={() => toggleAmenity(am)}
                          className={`text-xs px-3 py-1.5 rounded-md font-medium border cursor-pointer transition-colors ${
                            isSelected
                              ? 'bg-[#17365D] text-white border-[#17365D]'
                              : 'bg-white text-[#68778A] border-[#E2E8F0] hover:bg-slate-50'
                          }`}
                        >
                          {isSelected ? '✓ ' : '+ '}
                          {am}
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>

            {/* Submission Button */}
            <div className="pt-4 border-t border-[#E2E8F0]">
              <button
                type="submit"
                disabled={loading}
                className="w-full py-3 px-6 text-xs sm:text-sm font-semibold text-white bg-[#17365D] hover:bg-[#22487A] rounded-md transition-all shadow-xs cursor-pointer flex items-center justify-center gap-2"
              >
                {loading ? (
                  <span>Publishing Listing to RentEase...</span>
                ) : (
                  <>
                    <span>Submit & Publish Property Listing</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>
              <div className="text-[11px] text-[#68778A] text-center mt-2">
                By publishing, you agree to our direct transparency guidelines with zero broker fees.
              </div>
            </div>

          </form>
        )}
      </div>

    </div>
  );
};
