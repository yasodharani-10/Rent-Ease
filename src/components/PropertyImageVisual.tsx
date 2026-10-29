import React, { useState } from 'react';
import { Home, Building2, Bed, Sparkles, MapPin } from 'lucide-react';

interface PropertyImageVisualProps {
  category: 'studio' | 'apartment' | 'villa' | 'family' | 'hostel';
  title: string;
  className?: string;
  imageSrc?: string;
  aspectRatio?: 'video' | 'square' | '4/3';
}

export const PropertyImageVisual: React.FC<PropertyImageVisualProps> = ({
  category,
  title,
  className = '',
  imageSrc,
  aspectRatio = '4/3',
}) => {
  const [imageError, setImageError] = useState(false);

  const ratioClass =
    aspectRatio === 'video'
      ? 'aspect-[16/9]'
      : aspectRatio === 'square'
      ? 'aspect-square'
      : 'aspect-[4/3]';

  // If real image URL provided and no error, display it with no-referrer
  if (imageSrc && !imageError) {
    return (
      <div className={`relative overflow-hidden w-full ${ratioClass} ${className} bg-slate-100`}>
        <img
          src={imageSrc}
          alt={title}
          referrerPolicy="no-referrer"
          onError={() => setImageError(true)}
          className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
        />
      </div>
    );
  }

  // Domain-specific styled architectural SVG visuals for Indian rental homes
  return (
    <div
      className={`relative overflow-hidden w-full ${ratioClass} ${className} select-none flex items-center justify-center`}
    >
      {category === 'apartment' && (
        <svg
          viewBox="0 0 400 300"
          className="w-full h-full object-cover"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <linearGradient id="skyGradApt" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#E6F0FA" />
              <stop offset="100%" stopColor="#F2F7FF" />
            </linearGradient>
            <linearGradient id="buildingGrad1" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#17365D" />
              <stop offset="100%" stopColor="#22487A" />
            </linearGradient>
            <linearGradient id="buildingGrad2" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#3678C8" />
              <stop offset="100%" stopColor="#4A8ED8" />
            </linearGradient>
            <linearGradient id="accentSun" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#F28C28" stopOpacity="0.8" />
              <stop offset="100%" stopColor="#FFF1E4" stopOpacity="0.2" />
            </linearGradient>
          </defs>
          <rect width="400" height="300" fill="url(#skyGradApt)" />
          {/* Morning sun */}
          <circle cx="330" cy="65" r="32" fill="url(#accentSun)" />
          {/* Ground */}
          <rect y="235" width="400" height="65" fill="#E2E8F0" />
          <rect y="250" width="400" height="50" fill="#CBD5E1" />
          {/* Modern Building 1 */}
          <rect x="50" y="70" width="130" height="175" rx="4" fill="url(#buildingGrad1)" />
          {/* Balconies */}
          <rect x="65" y="95" width="40" height="20" rx="2" fill="#FFFFFF" fillOpacity="0.9" />
          <rect x="65" y="130" width="40" height="20" rx="2" fill="#FFFFFF" fillOpacity="0.9" />
          <rect x="65" y="165" width="40" height="20" rx="2" fill="#FFFFFF" fillOpacity="0.9" />
          <rect x="120" y="95" width="45" height="20" rx="2" fill="#93C5FD" fillOpacity="0.4" />
          <rect x="120" y="130" width="45" height="20" rx="2" fill="#93C5FD" fillOpacity="0.4" />
          <rect x="120" y="165" width="45" height="20" rx="2" fill="#93C5FD" fillOpacity="0.4" />
          {/* Modern Building 2 */}
          <rect x="195" y="45" width="150" height="200" rx="4" fill="url(#buildingGrad2)" />
          {/* Windows grid */}
          <rect x="215" y="75" width="45" height="24" rx="2" fill="#FFFFFF" fillOpacity="0.95" />
          <rect x="275" y="75" width="45" height="24" rx="2" fill="#FFFFFF" fillOpacity="0.95" />
          <rect x="215" y="115" width="45" height="24" rx="2" fill="#FFF1E4" />
          <rect x="275" y="115" width="45" height="24" rx="2" fill="#FFFFFF" fillOpacity="0.95" />
          <rect x="215" y="155" width="45" height="24" rx="2" fill="#FFFFFF" fillOpacity="0.95" />
          <rect x="275" y="155" width="45" height="24" rx="2" fill="#FFF1E4" />
          {/* Canopy entrance */}
          <rect x="240" y="215" width="55" height="30" fill="#17365D" />
          <rect x="235" y="210" width="65" height="6" rx="2" fill="#F28C28" />
          {/* Trees / Courtyard greenery */}
          <circle cx="35" cy="235" r="24" fill="#34D399" fillOpacity="0.75" />
          <circle cx="185" cy="235" r="18" fill="#10B981" fillOpacity="0.85" />
          <circle cx="365" cy="235" r="28" fill="#059669" fillOpacity="0.8" />
        </svg>
      )}

      {category === 'studio' && (
        <svg
          viewBox="0 0 400 300"
          className="w-full h-full object-cover"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <linearGradient id="roomWall" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#FFF7ED" />
              <stop offset="100%" stopColor="#F2F7FF" />
            </linearGradient>
            <linearGradient id="windowLight" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#BAE6FD" />
              <stop offset="100%" stopColor="#E0F2FE" />
            </linearGradient>
          </defs>
          <rect width="400" height="300" fill="url(#roomWall)" />
          {/* Floor */}
          <rect y="210" width="400" height="90" fill="#E2E8F0" />
          {/* Bright Window */}
          <rect x="40" y="40" width="110" height="120" rx="4" fill="url(#windowLight)" stroke="#CBD5E1" strokeWidth="4" />
          <line x1="95" y1="40" x2="95" y2="160" stroke="#CBD5E1" strokeWidth="3" />
          <line x1="40" y1="100" x2="150" y2="100" stroke="#CBD5E1" strokeWidth="3" />
          {/* Study Table & Bookshelf */}
          <rect x="40" y="170" width="130" height="55" rx="3" fill="#17365D" />
          <rect x="35" y="165" width="140" height="8" rx="2" fill="#F28C28" />
          {/* Laptop on desk */}
          <rect x="80" y="145" width="35" height="20" rx="2" fill="#64748B" />
          <polygon points="75,165 120,165 115,160 80,160" fill="#475569" />
          {/* Study Chair */}
          <rect x="90" y="175" width="25" height="35" rx="3" fill="#3678C8" />
          {/* Bed */}
          <rect x="220" y="160" width="160" height="60" rx="5" fill="#3678C8" />
          <rect x="220" y="145" width="50" height="20" rx="4" fill="#FFFFFF" />
          <rect x="210" y="130" width="15" height="90" rx="3" fill="#17365D" />
          {/* Wall Art / Poster */}
          <rect x="240" y="45" width="70" height="50" rx="3" fill="#EAF7EE" stroke="#3678C8" strokeWidth="2" />
          <circle cx="275" cy="70" r="12" fill="#F28C28" />
        </svg>
      )}

      {category === 'villa' && (
        <svg
          viewBox="0 0 400 300"
          className="w-full h-full object-cover"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <linearGradient id="villaSky" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#DCEBFA" />
              <stop offset="100%" stopColor="#F8FAFC" />
            </linearGradient>
          </defs>
          <rect width="400" height="300" fill="url(#villaSky)" />
          {/* Paved Front Yard & Pathway */}
          <polygon points="0,220 400,220 400,300 0,300" fill="#E2E8F0" />
          <polygon points="170,220 230,220 260,300 140,300" fill="#CBD5E1" />
          {/* Independent House Structure */}
          <rect x="70" y="100" width="260" height="120" rx="4" fill="#FFFFFF" stroke="#E2E8F0" strokeWidth="2" />
          {/* Terraced Roof / Parapet */}
          <polygon points="50,100 200,45 350,100" fill="#17365D" />
          <rect x="180" y="35" width="40" height="15" fill="#F28C28" rx="2" />
          {/* Main Entrance Verandah */}
          <rect x="170" y="145" width="60" height="75" fill="#FFF1E4" stroke="#17365D" strokeWidth="2" />
          <rect x="185" y="160" width="30" height="60" fill="#17365D" />
          <circle cx="192" cy="190" r="2.5" fill="#F28C28" />
          {/* Windows with awnings */}
          <rect x="95" y="130" width="50" height="40" rx="2" fill="#BAE6FD" />
          <polygon points="90,130 150,130 145,122 95,122" fill="#F28C28" />
          <rect x="255" y="130" width="50" height="40" rx="2" fill="#BAE6FD" />
          <polygon points="250,130 310,130 305,122 255,122" fill="#F28C28" />
          {/* Garden Palms / Shrubs */}
          <circle cx="45" cy="220" r="22" fill="#10B981" fillOpacity="0.8" />
          <circle cx="355" cy="220" r="22" fill="#059669" fillOpacity="0.8" />
        </svg>
      )}

      {(category === 'family' || category === 'hostel') && (
        <svg
          viewBox="0 0 400 300"
          className="w-full h-full object-cover"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <linearGradient id="familySky" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#EAF7EE" />
              <stop offset="100%" stopColor="#F2F7FF" />
            </linearGradient>
          </defs>
          <rect width="400" height="300" fill="url(#familySky)" />
          <rect y="215" width="400" height="85" fill="#E2E8F0" />
          {/* Clean 2-story building */}
          <rect x="80" y="80" width="240" height="145" rx="4" fill="#FFFFFF" />
          <rect x="80" y="65" width="240" height="18" fill="#17365D" />
          {/* Balcony Railing */}
          <rect x="100" y="125" width="90" height="25" fill="#FFF1E4" stroke="#CBD5E1" />
          <line x1="115" y1="125" x2="115" y2="150" stroke="#94A3B8" strokeWidth="2" />
          <line x1="145" y1="125" x2="145" y2="150" stroke="#94A3B8" strokeWidth="2" />
          <line x1="175" y1="125" x2="175" y2="150" stroke="#94A3B8" strokeWidth="2" />
          {/* Large Living Room Window */}
          <rect x="215" y="105" width="80" height="50" rx="3" fill="#BAE6FD" />
          {/* Ground entrance */}
          <rect x="160" y="170" width="80" height="55" fill="#17365D" />
          <rect x="180" y="180" width="40" height="45" fill="#F28C28" />
        </svg>
      )}

      {/* Category badge overlay with clean unboxed contrast label */}
      <div className="absolute bottom-3 left-3 bg-[#17365D]/85 backdrop-blur-xs text-white text-xs px-2.5 py-1 rounded-sm font-medium tracking-wide">
        {category === 'studio' && 'Student Studio'}
        {category === 'apartment' && 'Apartment Flat'}
        {category === 'villa' && 'Independent House'}
        {category === 'family' && 'Residential Home'}
        {category === 'hostel' && 'Hostel / PG'}
      </div>
    </div>
  );
};
