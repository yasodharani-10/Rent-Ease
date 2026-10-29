import React from 'react';
import { Heart, MapPin, Bed, Bath, Compass, CheckCircle2, ArrowRight } from 'lucide-react';
import { Property } from '../types';
import { PropertyImageVisual } from './PropertyImageVisual';

interface PropertyCardProps {
  property: Property;
  isFavorite: boolean;
  onToggleFavorite: (id: string) => void;
  onViewDetails: (property: Property) => void;
  onScheduleViewing?: (property: Property) => void;
  compact?: boolean;
}

export const PropertyCard: React.FC<PropertyCardProps> = ({
  property,
  isFavorite,
  onToggleFavorite,
  onViewDetails,
  onScheduleViewing,
  compact = false,
}) => {
  return (
    <div className="group bg-white rounded-xl border border-[#E2E8F0] overflow-hidden hover:border-[#3678C8]/40 hover:shadow-md transition-all duration-200 flex flex-col h-full">
      {/* Property Visual Carrier */}
      <div className="relative">
        <PropertyImageVisual
          category={property.imageCategory}
          title={property.title}
          aspectRatio="4/3"
        />

        {/* Favorite Action Button */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            onToggleFavorite(property.id);
          }}
          aria-label={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
          className="absolute top-3 right-3 w-9 h-9 rounded-full bg-white/90 backdrop-blur-xs flex items-center justify-center text-[#263445] hover:text-red-500 hover:bg-white shadow-xs transition-colors cursor-pointer"
        >
          <Heart
            className={`w-4 h-4 transition-transform active:scale-125 ${
              isFavorite ? 'fill-red-500 text-red-500' : 'text-[#68778A]'
            }`}
          />
        </button>

        {/* Distance indicator if available */}
        {property.distanceToCollegeKm && (
          <div className="absolute top-3 left-3 bg-white/95 backdrop-blur-xs text-[#17365D] text-[11px] font-semibold px-2.5 py-0.5 rounded-sm shadow-2xs">
            {property.distanceToCollegeKm} km to College
          </div>
        )}
      </div>

      {/* Card Content Area */}
      <div className="p-5 flex-1 flex flex-col justify-between">
        <div>
          {/* Unboxed Metadata Line (Zero-Pill Rule compliant) */}
          <div className="flex items-center gap-2 text-xs text-[#68778A] font-medium mb-1.5 flex-wrap">
            <span>{property.propertyType}</span>
            <span aria-hidden="true">·</span>
            <span>{property.furnishing}</span>
            <span aria-hidden="true">·</span>
            <span>{property.preferredTenant}</span>
          </div>

          {/* Title */}
          <h3
            onClick={() => onViewDetails(property)}
            className="text-base font-semibold text-[#17365D] group-hover:text-[#3678C8] transition-colors cursor-pointer line-clamp-2 leading-snug"
          >
            {property.title}
          </h3>

          {/* Location with Icon */}
          <div className="flex items-center gap-1.5 mt-2 text-xs text-[#68778A]">
            <MapPin className="w-3.5 h-3.5 text-[#3678C8] shrink-0" />
            <span className="truncate">{property.location}</span>
          </div>

          {/* Key Specs Row */}
          <div className="flex items-center gap-4 mt-3 pt-3 border-t border-[#F2F7FF] text-xs text-[#263445] font-medium">
            <div className="flex items-center gap-1">
              <Bed className="w-3.5 h-3.5 text-[#68778A]" />
              <span>{property.bedrooms} Bed{property.bedrooms > 1 ? 's' : ''}</span>
            </div>
            <div className="flex items-center gap-1">
              <Bath className="w-3.5 h-3.5 text-[#68778A]" />
              <span>{property.bathrooms} Bath</span>
            </div>
            <div className="flex items-center gap-1">
              <Compass className="w-3.5 h-3.5 text-[#68778A]" />
              <span>{property.sqft} sq.ft</span>
            </div>
          </div>
        </div>

        {/* Pricing & Actions Row */}
        <div className="mt-4 pt-3.5 border-t border-[#E2E8F0] flex items-center justify-between gap-3">
          <div>
            <div className="text-xs text-[#68778A]">Monthly Rent</div>
            <div className="text-lg font-bold text-[#17365D] tabular-nums">
              ₹{property.monthlyRent.toLocaleString('en-IN')}
              <span className="text-xs font-normal text-[#68778A]">/mo</span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => onViewDetails(property)}
              className="py-1.5 px-3 rounded-md text-xs font-semibold text-[#17365D] bg-[#F2F7FF] hover:bg-[#E2E8F0] transition-colors cursor-pointer whitespace-nowrap"
            >
              Details
            </button>
            {onScheduleViewing && (
              <button
                onClick={() => onScheduleViewing(property)}
                className="py-1.5 px-3 rounded-md text-xs font-semibold text-white bg-[#F28C28] hover:bg-[#D97706] transition-colors cursor-pointer whitespace-nowrap"
              >
                Visit
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
