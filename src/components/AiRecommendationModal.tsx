import React, { useState } from 'react';
import { X, Sparkles, SlidersHorizontal, CheckCircle2, ArrowRight, AlertCircle, Building2, MapPin } from 'lucide-react';
import { Property, PreferredTenant } from '../types';
import { aiRecommendationService, RecommendationResult } from '../services/aiRecommendationService';
import { PropertyCard } from './PropertyCard';

interface AiRecommendationModalProps {
  isOpen: boolean;
  onClose: () => void;
  properties: Property[];
  favorites: string[];
  onToggleFavorite: (id: string) => void;
  onViewDetails: (property: Property) => void;
}

export const AiRecommendationModal: React.FC<AiRecommendationModalProps> = ({
  isOpen,
  onClose,
  properties,
  favorites,
  onToggleFavorite,
  onViewDetails,
}) => {
  const [maxBudget, setMaxBudget] = useState<number>(8000);
  const [tenantType, setTenantType] = useState<PreferredTenant>('Students');
  const [nearCollegeOnly, setNearCollegeOnly] = useState<boolean>(true);
  const [furnishing, setFurnishing] = useState<'Any' | 'Furnished' | 'Semi-Furnished' | 'Unfurnished'>('Furnished');
  const [selectedAmenities, setSelectedAmenities] = useState<string[]>(['WiFi', 'Water Supply']);

  const [results, setResults] = useState<RecommendationResult[]>([]);
  const [hasEvaluated, setHasEvaluated] = useState(false);

  if (!isOpen) return null;

  const handleRunRecommendation = () => {
    const recs = aiRecommendationService.getRecommendations(properties, {
      maxBudget,
      tenantType,
      nearCollegeOnly,
      furnishingPreference: furnishing,
      requiredAmenities: selectedAmenities,
    });
    setResults(recs);
    setHasEvaluated(true);
  };

  const toggleAmenity = (name: string) => {
    if (selectedAmenities.includes(name)) {
      setSelectedAmenities(selectedAmenities.filter(a => a !== name));
    } else {
      setSelectedAmenities([...selectedAmenities, name]);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-[#17365D]/65 backdrop-blur-xs overflow-y-auto">
      <div className="relative w-full max-w-4xl bg-white rounded-xl shadow-2xl border border-[#E2E8F0] my-8 overflow-hidden flex flex-col max-h-[92vh]">
        
        {/* Header */}
        <div className="p-4 sm:px-6 border-b border-[#E2E8F0] flex items-center justify-between bg-white shrink-0">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-md bg-[#FFF1E4] text-[#F28C28] flex items-center justify-center">
              <Sparkles className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-base sm:text-lg font-bold text-[#17365D]">
                AI-Powered Match Engine
              </h2>
              <p className="text-xs text-[#68778A]">
                Smart recommendation model for Markapur students, professionals & families
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 text-[#68778A] hover:text-[#17365D] rounded-md transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Content */}
        <div className="overflow-y-auto p-4 sm:p-6 space-y-6">
          
          {/* Transparency Disclaimer Notice */}
          <div className="p-3.5 bg-[#F2F7FF] rounded-lg border border-[#3678C8]/20 flex items-start gap-3 text-xs text-[#263445]">
            <AlertCircle className="w-4 h-4 text-[#3678C8] shrink-0 mt-0.5" />
            <div className="leading-relaxed">
              <span className="font-semibold text-[#17365D]">Recommendation Demonstration:</span>{' '}
              Scores and suitability reasons are computed using RentEase's multi-variable compatibility heuristics (Budget, College Distance, Furnishing, Amenities). Once our ML server is connected, live tenant feedback loops will refine recommendations.
            </div>
          </div>

          {/* Form Controls */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 bg-slate-50 p-4 sm:p-5 rounded-lg border border-[#E2E8F0]">
            {/* Budget Slider */}
            <div>
              <div className="flex justify-between items-center mb-1.5">
                <label className="text-xs font-semibold text-[#17365D]">Monthly Budget Ceiling</label>
                <span className="text-xs font-bold text-[#F28C28] tabular-nums">
                  ₹{maxBudget.toLocaleString('en-IN')}/month
                </span>
              </div>
              <input
                type="range"
                min={3000}
                max={20000}
                step={500}
                value={maxBudget}
                onChange={(e) => setMaxBudget(Number(e.target.value))}
                className="w-full accent-[#F28C28] cursor-pointer"
              />
              <div className="flex justify-between text-[11px] text-[#68778A] mt-1 tabular-nums">
                <span>₹3,000 (Student)</span>
                <span>₹10,000 (2BHK)</span>
                <span>₹20,000 (Villa)</span>
              </div>
            </div>

            {/* Tenant Category */}
            <div>
              <label className="block text-xs font-semibold text-[#17365D] mb-1.5">Who is looking for housing?</label>
              <div className="grid grid-cols-3 gap-2">
                {(['Students', 'Working Professionals', 'Family'] as PreferredTenant[]).map((type) => (
                  <button
                    key={type}
                    type="button"
                    onClick={() => setTenantType(type)}
                    className={`py-2 px-2 text-xs font-medium rounded-md transition-colors border cursor-pointer text-center ${
                      tenantType === type
                        ? 'bg-[#17365D] text-white border-[#17365D]'
                        : 'bg-white text-[#263445] border-[#E2E8F0] hover:bg-slate-100'
                    }`}
                  >
                    {type === 'Working Professionals' ? 'Professionals' : type}
                  </button>
                ))}
              </div>
            </div>

            {/* Furnishing Preference */}
            <div>
              <label className="block text-xs font-semibold text-[#17365D] mb-1.5">Furnishing Preference</label>
              <select
                value={furnishing}
                onChange={(e) => setFurnishing(e.target.value as any)}
                className="w-full text-xs px-3 py-2 border border-[#E2E8F0] rounded-md focus:border-[#3678C8] bg-white text-[#263445]"
              >
                <option value="Any">Any Furnishing Level</option>
                <option value="Furnished">Furnished (Bed, Study Table, Wardrobe)</option>
                <option value="Semi-Furnished">Semi-Furnished (Fans, Lights, Kitchen Cabinets)</option>
                <option value="Unfurnished">Unfurnished (Bare)</option>
              </select>
            </div>

            {/* Campus Proximity Toggle */}
            <div className="flex items-center justify-between p-3 bg-white rounded-md border border-[#E2E8F0]">
              <div>
                <div className="text-xs font-semibold text-[#17365D]">Proximity to Colleges</div>
                <div className="text-[11px] text-[#68778A]">Prioritize homes within 1.5km of campus</div>
              </div>
              <input
                type="checkbox"
                checked={nearCollegeOnly}
                onChange={(e) => setNearCollegeOnly(e.target.checked)}
                className="w-4 h-4 accent-[#17365D] cursor-pointer"
              />
            </div>

            {/* Desired Amenities */}
            <div className="md:col-span-2">
              <label className="block text-xs font-semibold text-[#17365D] mb-2">Priority Amenities</label>
              <div className="flex flex-wrap gap-2">
                {['WiFi', 'Water Supply', 'Inverter Backup', 'Bike Parking', 'Car Parking', 'CCTV'].map((am) => {
                  const isChecked = selectedAmenities.includes(am);
                  return (
                    <button
                      key={am}
                      type="button"
                      onClick={() => toggleAmenity(am)}
                      className={`text-xs px-3 py-1.5 rounded-md font-medium border cursor-pointer transition-colors ${
                        isChecked
                          ? 'bg-[#FFF1E4] text-[#F28C28] border-[#F28C28]/40'
                          : 'bg-white text-[#68778A] border-[#E2E8F0] hover:bg-slate-100'
                      }`}
                    >
                      {isChecked ? '✓ ' : '+ '}
                      {am}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Run Button */}
            <div className="md:col-span-2 pt-2">
              <button
                type="button"
                onClick={handleRunRecommendation}
                className="w-full py-2.5 px-4 text-xs sm:text-sm font-semibold text-white bg-[#17365D] hover:bg-[#22487A] rounded-md transition-all shadow-xs flex items-center justify-center gap-2 cursor-pointer"
              >
                <Sparkles className="w-4 h-4 text-[#F28C28]" />
                Calculate Property Matches
              </button>
            </div>
          </div>

          {/* Results Area */}
          {hasEvaluated && (
            <div className="space-y-4 pt-2">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-bold text-[#17365D] uppercase tracking-wider">
                  Top Matched Properties ({results.length})
                </h3>
                <span className="text-xs text-[#68778A]">
                  Ranked by compatibility percentage
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {results.slice(0, 4).map((rec) => (
                  <div
                    key={rec.property.id}
                    className="p-4 rounded-xl border border-[#E2E8F0] bg-white hover:border-[#3678C8]/40 transition-all shadow-2xs flex flex-col justify-between"
                  >
                    <div>
                      {/* Score Header */}
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-2">
                          <span className="text-xs font-semibold px-2 py-0.5 bg-[#F2F7FF] text-[#17365D] rounded-sm">
                            {rec.property.propertyType}
                          </span>
                          <span className="text-xs text-[#68778A] truncate max-w-[120px]">
                            {rec.property.areaName}
                          </span>
                        </div>
                        <div className="flex items-center gap-1 font-bold text-xs px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-700 tabular-nums">
                          <span>{rec.score}% Match</span>
                        </div>
                      </div>

                      {/* Title */}
                      <h4
                        onClick={() => onViewDetails(rec.property)}
                        className="text-sm font-semibold text-[#17365D] hover:text-[#3678C8] cursor-pointer line-clamp-2"
                      >
                        {rec.property.title}
                      </h4>

                      {/* Pricing */}
                      <div className="mt-2 text-sm font-bold text-[#17365D] tabular-nums">
                        ₹{rec.property.monthlyRent.toLocaleString('en-IN')}
                        <span className="text-xs font-normal text-[#68778A]"> / month</span>
                      </div>

                      {/* Recommendation Reasons */}
                      <div className="mt-3 space-y-1.5 pt-2 border-t border-slate-100">
                        {rec.matchReasons.map((reason, i) => (
                          <div key={i} className="flex items-start gap-1.5 text-xs text-[#263445]">
                            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                            <span>{reason}</span>
                          </div>
                        ))}
                        {rec.caveats.map((caveat, i) => (
                          <div key={i} className="flex items-start gap-1.5 text-xs text-amber-700">
                            <AlertCircle className="w-3.5 h-3.5 text-amber-600 shrink-0 mt-0.5" />
                            <span>{caveat}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="mt-4 pt-3 border-t border-[#E2E8F0] flex items-center justify-between">
                      <button
                        onClick={() => onViewDetails(rec.property)}
                        className="text-xs font-semibold text-[#3678C8] hover:text-[#17365D] flex items-center gap-1 cursor-pointer"
                      >
                        <span>View Details</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </button>

                      <button
                        onClick={() => onToggleFavorite(rec.property.id)}
                        className="text-xs text-[#68778A] hover:text-[#17365D] cursor-pointer"
                      >
                        {favorites.includes(rec.property.id) ? 'Saved' : 'Save Property'}
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

        </div>

      </div>
    </div>
  );
};
