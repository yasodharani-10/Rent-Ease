import React, { useState, useMemo } from 'react';
import { Search, SlidersHorizontal, LayoutGrid, List, MapPin, X, RotateCcw, Sparkles, Filter, ChevronDown, Check } from 'lucide-react';
import { Property, FilterState } from '../types';
import { PropertyCard } from '../components/PropertyCard';
import { MARKAPUR_LOCALITIES } from '../data/mockData';

interface FindHomesViewProps {
  properties: Property[];
  favorites: string[];
  onToggleFavorite: (id: string) => void;
  onViewDetails: (property: Property) => void;
  initialFilter?: Partial<FilterState>;
  onOpenAiModal: () => void;
}

export const FindHomesView: React.FC<FindHomesViewProps> = ({
  properties,
  favorites,
  onToggleFavorite,
  onViewDetails,
  initialFilter,
  onOpenAiModal,
}) => {
  const [searchQuery, setSearchQuery] = useState(initialFilter?.searchQuery || '');
  const [selectedLocation, setSelectedLocation] = useState(initialFilter?.location || '');
  const [propertyType, setPropertyType] = useState(initialFilter?.propertyType || '');
  const [bedrooms, setBedrooms] = useState(initialFilter?.bedrooms || '');
  const [furnishing, setFurnishing] = useState(initialFilter?.furnishing || '');
  const [tenantType, setTenantType] = useState(initialFilter?.preferredTenant || '');
  const [maxRent, setMaxRent] = useState<number>(initialFilter?.maxRent || 25000);
  const [minRent, setMinRent] = useState<number>(initialFilter?.minRent || 2000);
  const [sortBy, setSortBy] = useState<'relevance' | 'price-asc' | 'price-desc' | 'newest'>('relevance');
  const [selectedAmenities, setSelectedAmenities] = useState<string[]>(initialFilter?.amenities || []);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);
  const [showMapPin, setShowMapPin] = useState(false);

  const availableAmenities = [
    '24/7 Water Supply',
    'High-Speed WiFi',
    'Inverter Wiring',
    'Bike Parking',
    'Covered Car Parking',
    'CCTV Security',
    'RO Drinking Water',
    'Lift Access'
  ];

  const handleToggleAmenity = (amenity: string) => {
    if (selectedAmenities.includes(amenity)) {
      setSelectedAmenities(selectedAmenities.filter(a => a !== amenity));
    } else {
      setSelectedAmenities([...selectedAmenities, amenity]);
    }
  };

  const handleClearFilters = () => {
    setSearchQuery('');
    setSelectedLocation('');
    setPropertyType('');
    setBedrooms('');
    setFurnishing('');
    setTenantType('');
    setMinRent(2000);
    setMaxRent(25000);
    setSelectedAmenities([]);
    setSortBy('relevance');
  };

  // Filter & Sort Logic
  const filteredProperties = useMemo(() => {
    return properties.filter((prop) => {
      // 1. Text Search (title, description, area, landmark)
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchesQuery =
          prop.title.toLowerCase().includes(q) ||
          prop.location.toLowerCase().includes(q) ||
          prop.areaName.toLowerCase().includes(q) ||
          (prop.nearestLandmark && prop.nearestLandmark.toLowerCase().includes(q));
        if (!matchesQuery) return false;
      }

      // 2. Locality filter
      if (selectedLocation && selectedLocation !== 'All Areas in Markapur') {
        const areaMatch =
          prop.areaName.toLowerCase().includes(selectedLocation.toLowerCase()) ||
          prop.location.toLowerCase().includes(selectedLocation.toLowerCase());
        if (!areaMatch) return false;
      }

      // 3. Rent Range
      if (prop.monthlyRent < minRent || prop.monthlyRent > maxRent) {
        return false;
      }

      // 4. Property Type
      if (propertyType && prop.propertyType !== propertyType) {
        return false;
      }

      // 5. Bedrooms
      if (bedrooms) {
        if (bedrooms === '3+' && prop.bedrooms < 3) return false;
        if (bedrooms !== '3+' && prop.bedrooms !== Number(bedrooms)) return false;
      }

      // 6. Furnishing
      if (furnishing && prop.furnishing !== furnishing) {
        return false;
      }

      // 7. Preferred Tenant
      if (tenantType && prop.preferredTenant !== 'All' && prop.preferredTenant !== tenantType) {
        return false;
      }

      // 8. Amenities Check
      if (selectedAmenities.length > 0) {
        const hasAllAmenities = selectedAmenities.every(needed =>
          prop.amenities.some(item => item.toLowerCase().includes(needed.toLowerCase()))
        );
        if (!hasAllAmenities) return false;
      }

      return true;
    }).sort((a, b) => {
      if (sortBy === 'price-asc') return a.monthlyRent - b.monthlyRent;
      if (sortBy === 'price-desc') return b.monthlyRent - a.monthlyRent;
      if (sortBy === 'newest') return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
      return 0; // relevance preserves natural score
    });
  }, [
    properties,
    searchQuery,
    selectedLocation,
    propertyType,
    bedrooms,
    furnishing,
    tenantType,
    minRent,
    maxRent,
    selectedAmenities,
    sortBy,
  ]);

  const activeFilterCount =
    (searchQuery ? 1 : 0) +
    (selectedLocation ? 1 : 0) +
    (propertyType ? 1 : 0) +
    (bedrooms ? 1 : 0) +
    (furnishing ? 1 : 0) +
    (tenantType ? 1 : 0) +
    (maxRent < 25000 || minRent > 2000 ? 1 : 0) +
    selectedAmenities.length;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      
      {/* Top Banner / Breadcrumb */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[#E2E8F0]">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-[#17365D] tracking-tight">
            Find Rental Homes in Markapur
          </h1>
          <p className="text-xs sm:text-sm text-[#68778A] mt-1">
            Browse verified student studios, family flats, and independent houses across Andhra Pradesh
          </p>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <button
            onClick={onOpenAiModal}
            className="px-3.5 py-2 rounded-md text-xs font-semibold text-[#17365D] bg-[#FFF1E4] hover:bg-[#FFE3CA] border border-[#F28C28]/30 transition-colors flex items-center gap-1.5 cursor-pointer"
          >
            <Sparkles className="w-3.5 h-3.5 text-[#F28C28]" />
            <span>AI Match Assistant</span>
          </button>

          <button
            onClick={() => setShowMapPin(!showMapPin)}
            className={`px-3 py-2 rounded-md text-xs font-semibold border transition-colors flex items-center gap-1.5 cursor-pointer ${
              showMapPin
                ? 'bg-[#17365D] text-white border-[#17365D]'
                : 'bg-white text-[#263445] border-[#E2E8F0] hover:bg-slate-50'
            }`}
          >
            <MapPin className="w-3.5 h-3.5 text-[#F28C28]" />
            <span>{showMapPin ? 'Hide Map' : 'Locality Map'}</span>
          </button>
        </div>
      </div>

      {/* Locality Map Drawer if toggled */}
      {showMapPin && (
        <div className="bg-[#F2F7FF] rounded-xl border border-[#3678C8]/30 p-5 animate-in slide-in-from-top duration-200">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <MapPin className="w-4 h-4 text-[#F28C28]" />
              <h3 className="text-xs sm:text-sm font-bold text-[#17365D]">
                Markapur College Corridors & Key Localities Map
              </h3>
            </div>
            <button
              onClick={() => setShowMapPin(false)}
              className="text-xs text-[#68778A] hover:text-[#17365D] cursor-pointer"
            >
              Close Map
            </button>
          </div>
          <p className="text-xs text-[#68778A] mb-3">
            Click any locality chip below to immediately focus results on that college area:
          </p>
          <div className="flex flex-wrap gap-2">
            {MARKAPUR_LOCALITIES.map((loc) => (
              <button
                key={loc}
                onClick={() => setSelectedLocation(loc === 'All Areas in Markapur' ? '' : loc)}
                className={`text-xs px-3 py-1.5 rounded-md border font-medium cursor-pointer transition-colors ${
                  (selectedLocation === loc || (!selectedLocation && loc === 'All Areas in Markapur'))
                    ? 'bg-[#17365D] text-white border-[#17365D]'
                    : 'bg-white text-[#263445] border-[#E2E8F0] hover:bg-slate-100'
                }`}
              >
                {loc}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Main Layout: Left Filters Sidebar + Right Listings Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 items-start">
        
        {/* Desktop Filter Sidebar */}
        <aside className="hidden lg:block lg:col-span-1 bg-white rounded-xl border border-[#E2E8F0] p-5 space-y-6 shadow-2xs">
          <div className="flex items-center justify-between pb-3 border-b border-[#E2E8F0]">
            <div className="flex items-center gap-2 font-bold text-sm text-[#17365D]">
              <Filter className="w-4 h-4 text-[#3678C8]" />
              <span>Filter Properties</span>
            </div>
            {activeFilterCount > 0 && (
              <button
                onClick={handleClearFilters}
                className="text-xs text-[#F28C28] hover:underline flex items-center gap-1 cursor-pointer"
              >
                <RotateCcw className="w-3 h-3" />
                <span>Reset ({activeFilterCount})</span>
              </button>
            )}
          </div>

          {/* Search Query */}
          <div>
            <label className="block text-xs font-semibold text-[#263445] mb-1.5">Search Keywords</label>
            <div className="relative">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="e.g. Samuel George, WiFi..."
                className="w-full text-xs pl-8 pr-3 py-2 border border-[#E2E8F0] rounded-md focus:border-[#3678C8] focus:outline-hidden"
              />
              <Search className="w-3.5 h-3.5 text-[#68778A] absolute left-2.5 top-2.5" />
            </div>
          </div>

          {/* Locality */}
          <div>
            <label className="block text-xs font-semibold text-[#263445] mb-1.5">Locality in Markapur</label>
            <select
              value={selectedLocation}
              onChange={(e) => setSelectedLocation(e.target.value)}
              className="w-full text-xs px-2.5 py-2 border border-[#E2E8F0] rounded-md focus:border-[#3678C8] bg-white text-[#263445]"
            >
              <option value="">All Localities</option>
              {MARKAPUR_LOCALITIES.filter(l => l !== 'All Areas in Markapur').map((loc) => (
                <option key={loc} value={loc}>
                  {loc}
                </option>
              ))}
            </select>
          </div>

          {/* Budget Range */}
          <div>
            <div className="flex justify-between items-center mb-1 text-xs">
              <label className="font-semibold text-[#263445]">Max Monthly Rent</label>
              <span className="font-bold text-[#17365D] tabular-nums">
                ₹{maxRent.toLocaleString('en-IN')}
              </span>
            </div>
            <input
              type="range"
              min={2500}
              max={25000}
              step={500}
              value={maxRent}
              onChange={(e) => setMaxRent(Number(e.target.value))}
              className="w-full accent-[#17365D] cursor-pointer"
            />
            <div className="flex justify-between text-[11px] text-[#68778A] mt-1 tabular-nums">
              <span>₹2,500</span>
              <span>₹25,000</span>
            </div>
          </div>

          {/* Property Type */}
          <div>
            <label className="block text-xs font-semibold text-[#263445] mb-1.5">Property Type</label>
            <select
              value={propertyType}
              onChange={(e) => setPropertyType(e.target.value)}
              className="w-full text-xs px-2.5 py-2 border border-[#E2E8F0] rounded-md focus:border-[#3678C8] bg-white text-[#263445]"
            >
              <option value="">All Types</option>
              <option value="1RK">1 RK (Student Room)</option>
              <option value="1BHK">1 BHK</option>
              <option value="2BHK">2 BHK</option>
              <option value="3BHK">3 BHK</option>
              <option value="Independent House">Independent House</option>
            </select>
          </div>

          {/* Bedrooms */}
          <div>
            <label className="block text-xs font-semibold text-[#263445] mb-1.5">Bedrooms</label>
            <div className="grid grid-cols-4 gap-1.5">
              {['', '1', '2', '3+'].map((b) => (
                <button
                  key={b}
                  type="button"
                  onClick={() => setBedrooms(b)}
                  className={`py-1.5 text-xs font-medium rounded-md border text-center transition-colors cursor-pointer ${
                    bedrooms === b
                      ? 'bg-[#17365D] text-white border-[#17365D]'
                      : 'bg-white text-[#263445] border-[#E2E8F0] hover:bg-slate-50'
                  }`}
                >
                  {b === '' ? 'Any' : `${b} Bed`}
                </button>
              ))}
            </div>
          </div>

          {/* Furnishing */}
          <div>
            <label className="block text-xs font-semibold text-[#263445] mb-1.5">Furnishing</label>
            <select
              value={furnishing}
              onChange={(e) => setFurnishing(e.target.value)}
              className="w-full text-xs px-2.5 py-2 border border-[#E2E8F0] rounded-md focus:border-[#3678C8] bg-white text-[#263445]"
            >
              <option value="">Any Furnishing</option>
              <option value="Furnished">Furnished</option>
              <option value="Semi-Furnished">Semi-Furnished</option>
              <option value="Unfurnished">Unfurnished</option>
            </select>
          </div>

          {/* Tenant Category */}
          <div>
            <label className="block text-xs font-semibold text-[#263445] mb-1.5">Suitable For</label>
            <select
              value={tenantType}
              onChange={(e) => setTenantType(e.target.value)}
              className="w-full text-xs px-2.5 py-2 border border-[#E2E8F0] rounded-md focus:border-[#3678C8] bg-white text-[#263445]"
            >
              <option value="">All Tenants</option>
              <option value="Students">Students</option>
              <option value="Working Professionals">Working Professionals</option>
              <option value="Family">Families</option>
            </select>
          </div>

          {/* Amenities Filter */}
          <div>
            <label className="block text-xs font-semibold text-[#263445] mb-2">Amenities</label>
            <div className="space-y-1.5">
              {availableAmenities.map((amenity) => {
                const isSelected = selectedAmenities.includes(amenity);
                return (
                  <label
                    key={amenity}
                    className="flex items-center gap-2 text-xs text-[#263445] cursor-pointer hover:text-[#17365D]"
                  >
                    <input
                      type="checkbox"
                      checked={isSelected}
                      onChange={() => handleToggleAmenity(amenity)}
                      className="w-3.5 h-3.5 accent-[#17365D] rounded-xs"
                    />
                    <span>{amenity}</span>
                  </label>
                );
              })}
            </div>
          </div>

        </aside>

        {/* Mobile Filter Toggle Drawer Trigger */}
        <div className="lg:hidden flex items-center justify-between bg-white p-3 rounded-lg border border-[#E2E8F0]">
          <button
            onClick={() => setMobileFilterOpen(!mobileFilterOpen)}
            className="flex items-center gap-2 text-xs font-semibold text-[#17365D] cursor-pointer"
          >
            <SlidersHorizontal className="w-4 h-4 text-[#3678C8]" />
            <span>Filter & Sort {activeFilterCount > 0 ? `(${activeFilterCount})` : ''}</span>
          </button>
          {activeFilterCount > 0 && (
            <button
              onClick={handleClearFilters}
              className="text-xs text-[#F28C28] hover:underline cursor-pointer"
            >
              Reset
            </button>
          )}
        </div>

        {/* Mobile Filters Modal */}
        {mobileFilterOpen && (
          <div className="lg:hidden fixed inset-0 z-50 bg-[#17365D]/60 backdrop-blur-xs flex flex-col justify-end">
            <div className="bg-white rounded-t-2xl p-5 max-h-[85vh] overflow-y-auto space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-[#E2E8F0]">
                <h3 className="text-sm font-bold text-[#17365D]">Filters & Sorting</h3>
                <button
                  onClick={() => setMobileFilterOpen(false)}
                  className="p-1.5 text-[#68778A] hover:text-[#17365D]"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Keyword */}
              <div>
                <label className="block text-xs font-semibold text-[#263445] mb-1">Keywords</label>
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="e.g. College Road..."
                  className="w-full text-xs p-2 border border-[#E2E8F0] rounded-md"
                />
              </div>

              {/* Locality */}
              <div>
                <label className="block text-xs font-semibold text-[#263445] mb-1">Locality</label>
                <select
                  value={selectedLocation}
                  onChange={(e) => setSelectedLocation(e.target.value)}
                  className="w-full text-xs p-2 border border-[#E2E8F0] rounded-md bg-white"
                >
                  <option value="">All Localities</option>
                  {MARKAPUR_LOCALITIES.map((l) => (
                    <option key={l} value={l}>
                      {l}
                    </option>
                  ))}
                </select>
              </div>

              {/* Max Rent */}
              <div>
                <div className="flex justify-between text-xs mb-1">
                  <span>Max Rent</span>
                  <span className="font-bold text-[#17365D] tabular-nums">₹{maxRent.toLocaleString('en-IN')}</span>
                </div>
                <input
                  type="range"
                  min={2500}
                  max={25000}
                  step={500}
                  value={maxRent}
                  onChange={(e) => setMaxRent(Number(e.target.value))}
                  className="w-full accent-[#17365D]"
                />
              </div>

              {/* Done button */}
              <button
                onClick={() => setMobileFilterOpen(false)}
                className="w-full py-2.5 text-xs font-semibold text-white bg-[#17365D] rounded-md"
              >
                Apply Filters ({filteredProperties.length} Homes)
              </button>
            </div>
          </div>
        )}

        {/* Listings Section (Grid / List) */}
        <div className="lg:col-span-3 space-y-4">
          
          {/* Controls Bar: Count, Sort Dropdown & View Switcher */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-white p-3.5 rounded-lg border border-[#E2E8F0]">
            <div className="text-xs text-[#263445]">
              Showing <span className="font-bold text-[#17365D] tabular-nums">{filteredProperties.length}</span> rental homes available in Markapur
            </div>

            <div className="flex items-center gap-3">
              {/* Sort By */}
              <div className="flex items-center gap-1.5 text-xs">
                <span className="text-[#68778A]">Sort:</span>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as any)}
                  className="text-xs py-1 px-2 border border-[#E2E8F0] rounded-md bg-white text-[#263445] font-medium focus:outline-hidden"
                >
                  <option value="relevance">Relevance</option>
                  <option value="price-asc">Rent: Low to High</option>
                  <option value="price-desc">Rent: High to Low</option>
                  <option value="newest">Newest First</option>
                </select>
              </div>

              {/* Grid / List Switcher */}
              <div className="hidden sm:flex items-center gap-1 p-0.5 bg-slate-100 rounded-md">
                <button
                  onClick={() => setViewMode('grid')}
                  title="Grid View"
                  className={`p-1 rounded-sm cursor-pointer transition-colors ${
                    viewMode === 'grid' ? 'bg-white text-[#17365D] shadow-2xs' : 'text-[#68778A]'
                  }`}
                >
                  <LayoutGrid className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  title="List View"
                  className={`p-1 rounded-sm cursor-pointer transition-colors ${
                    viewMode === 'list' ? 'bg-white text-[#17365D] shadow-2xs' : 'text-[#68778A]'
                  }`}
                >
                  <List className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>

          {/* Listings Container */}
          {filteredProperties.length > 0 ? (
            <div
              className={`grid gap-6 ${
                viewMode === 'grid'
                  ? 'grid-cols-1 md:grid-cols-2 xl:grid-cols-3'
                  : 'grid-cols-1'
              }`}
            >
              {filteredProperties.map((property) => (
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
          ) : (
            /* Empty State */
            <div className="bg-white rounded-xl border border-[#E2E8F0] p-12 text-center space-y-4">
              <div className="w-12 h-12 rounded-full bg-[#FFF1E4] text-[#F28C28] flex items-center justify-center mx-auto">
                <Search className="w-6 h-6" />
              </div>
              <h3 className="text-base font-bold text-[#17365D]">
                No Properties Match Your Filter Criteria
              </h3>
              <p className="text-xs text-[#68778A] max-w-sm mx-auto">
                Try widening your budget range, clearing specific amenities, or searching for other localities in Markapur.
              </p>
              <button
                onClick={handleClearFilters}
                className="px-4 py-2 text-xs font-semibold text-white bg-[#17365D] hover:bg-[#22487A] rounded-md transition-colors cursor-pointer"
              >
                Clear All Filters
              </button>
            </div>
          )}

        </div>

      </div>

    </div>
  );
};
