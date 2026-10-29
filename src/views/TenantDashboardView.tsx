import React, { useState } from 'react';
import { Heart, Calendar, MessageSquare, Sliders, Home as HomeIcon, MapPin, CheckCircle2, Clock, XCircle, ArrowRight, User as UserIcon } from 'lucide-react';
import { Property, ViewingRequest, Enquiry, User } from '../types';
import { PropertyCard } from '../components/PropertyCard';
import { storageService } from '../services/storageService';

interface TenantDashboardViewProps {
  currentUser: User | null;
  properties: Property[];
  favorites: string[];
  onToggleFavorite: (id: string) => void;
  onViewDetails: (property: Property) => void;
  onNavigate: (tab: string) => void;
  onOpenAiModal: () => void;
}

export const TenantDashboardView: React.FC<TenantDashboardViewProps> = ({
  currentUser,
  properties,
  favorites,
  onToggleFavorite,
  onViewDetails,
  onNavigate,
  onOpenAiModal,
}) => {
  const [activeTab, setActiveTab] = useState<'favorites' | 'viewings' | 'enquiries' | 'preferences'>('favorites');
  
  const viewings = storageService.getViewings();
  const enquiries = storageService.getEnquiries();

  const favoriteProperties = properties.filter((p) => favorites.includes(p.id));

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      {/* Top Banner / User Welcome */}
      <div className="bg-white rounded-xl border border-[#E2E8F0] p-5 sm:p-6 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-full bg-[#17365D] text-white flex items-center justify-center font-bold text-lg">
            {currentUser?.avatarInitials || 'TN'}
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-xl font-bold text-[#17365D]">
                {currentUser?.name || 'K. Sai Krishna'}
              </h1>
              <span className="text-[11px] font-semibold text-[#17365D] bg-[#F2F7FF] px-2 py-0.5 rounded-sm">
                Tenant Portal
              </span>
            </div>
            <p className="text-xs text-[#68778A] mt-0.5">
              {currentUser?.email || 'krishna.student@gmail.com'} · Member since {currentUser?.joinedDate || 'October 2026'}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={onOpenAiModal}
            className="px-3.5 py-2 text-xs font-semibold text-[#17365D] bg-[#FFF1E4] hover:bg-[#FFE3CA] border border-[#F28C28]/25 rounded-md transition-colors cursor-pointer"
          >
            Launch AI Matcher
          </button>
          <button
            onClick={() => onNavigate('find-homes')}
            className="px-4 py-2 text-xs font-semibold text-white bg-[#17365D] hover:bg-[#22487A] rounded-md transition-colors cursor-pointer"
          >
            Find Homes
          </button>
        </div>
      </div>

      {/* Segmented Navigation Tabs */}
      <div className="flex border-b border-[#E2E8F0] gap-6 text-sm font-medium overflow-x-auto">
        <button
          onClick={() => setActiveTab('favorites')}
          className={`pb-3 cursor-pointer transition-colors relative whitespace-nowrap ${
            activeTab === 'favorites'
              ? 'text-[#17365D] font-bold border-b-2 border-[#17365D]'
              : 'text-[#68778A] hover:text-[#17365D]'
          }`}
        >
          <span>Saved Properties ({favoriteProperties.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('viewings')}
          className={`pb-3 cursor-pointer transition-colors relative whitespace-nowrap ${
            activeTab === 'viewings'
              ? 'text-[#17365D] font-bold border-b-2 border-[#17365D]'
              : 'text-[#68778A] hover:text-[#17365D]'
          }`}
        >
          <span>Scheduled Viewings ({viewings.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('enquiries')}
          className={`pb-3 cursor-pointer transition-colors relative whitespace-nowrap ${
            activeTab === 'enquiries'
              ? 'text-[#17365D] font-bold border-b-2 border-[#17365D]'
              : 'text-[#68778A] hover:text-[#17365D]'
          }`}
        >
          <span>Sent Enquiries ({enquiries.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('preferences')}
          className={`pb-3 cursor-pointer transition-colors relative whitespace-nowrap ${
            activeTab === 'preferences'
              ? 'text-[#17365D] font-bold border-b-2 border-[#17365D]'
              : 'text-[#68778A] hover:text-[#17365D]'
          }`}
        >
          <span>Rental Preferences</span>
        </button>
      </div>

      {/* TAB 1: SAVED PROPERTIES */}
      {activeTab === 'favorites' && (
        <div className="space-y-4">
          {favoriteProperties.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {favoriteProperties.map((prop) => (
                <PropertyCard
                  key={prop.id}
                  property={prop}
                  isFavorite={true}
                  onToggleFavorite={onToggleFavorite}
                  onViewDetails={onViewDetails}
                  onScheduleViewing={onViewDetails}
                />
              ))}
            </div>
          ) : (
            <div className="bg-white rounded-xl border border-[#E2E8F0] p-10 text-center space-y-3">
              <Heart className="w-10 h-10 text-slate-300 mx-auto" />
              <h3 className="text-base font-bold text-[#17365D]">No Saved Properties Yet</h3>
              <p className="text-xs text-[#68778A] max-w-sm mx-auto">
                Click the heart icon on any rental home to keep it bookmarked here for easy comparison.
              </p>
              <button
                onClick={() => onNavigate('find-homes')}
                className="mt-2 px-4 py-2 text-xs font-semibold text-white bg-[#17365D] rounded-md"
              >
                Browse Markapur Homes
              </button>
            </div>
          )}
        </div>
      )}

      {/* TAB 2: SCHEDULED VIEWINGS */}
      {activeTab === 'viewings' && (
        <div className="space-y-4">
          {viewings.length > 0 ? (
            <div className="bg-white rounded-xl border border-[#E2E8F0] overflow-hidden shadow-xs">
              <div className="divide-y divide-[#E2E8F0]">
                {viewings.map((v) => (
                  <div key={v.id} className="p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:bg-slate-50 transition-colors">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-bold text-[#17365D]">{v.propertyTitle}</span>
                        <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-sm ${
                          v.status === 'Confirmed'
                            ? 'bg-emerald-50 text-emerald-700'
                            : 'bg-amber-50 text-amber-800'
                        }`}>
                          {v.status}
                        </span>
                      </div>
                      <div className="text-xs text-[#68778A] flex items-center gap-2">
                        <MapPin className="w-3.5 h-3.5 text-[#3678C8]" />
                        <span>{v.propertyLocation}</span>
                      </div>
                      <div className="text-xs text-[#263445] flex items-center gap-3 pt-1">
                        <div className="flex items-center gap-1 text-[#17365D] font-medium">
                          <Calendar className="w-3.5 h-3.5 text-[#F28C28]" />
                          <span>{v.preferredDate}</span>
                        </div>
                        <div className="flex items-center gap-1 text-[#68778A]">
                          <Clock className="w-3.5 h-3.5" />
                          <span>{v.preferredTimeSlot}</span>
                        </div>
                      </div>
                      {v.notes && (
                        <p className="text-[11px] text-[#68778A] italic pt-1">
                          Note: “{v.notes}”
                        </p>
                      )}
                    </div>

                    <div className="flex items-center gap-2 shrink-0">
                      <button
                        onClick={() => {
                          const prop = properties.find(p => p.id === v.propertyId);
                          if (prop) onViewDetails(prop);
                        }}
                        className="text-xs font-semibold text-[#17365D] bg-[#F2F7FF] hover:bg-[#E2E8F0] px-3 py-1.5 rounded-md transition-colors cursor-pointer"
                      >
                        View Property
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <div className="bg-white rounded-xl border border-[#E2E8F0] p-10 text-center space-y-3">
              <Calendar className="w-10 h-10 text-slate-300 mx-auto" />
              <h3 className="text-base font-bold text-[#17365D]">No Upcoming Visits</h3>
              <p className="text-xs text-[#68778A]">
                Schedule in-person visits to inspect study spaces, water supply, and parking.
              </p>
            </div>
          )}
        </div>
      )}

      {/* TAB 3: ENQUIRIES */}
      {activeTab === 'enquiries' && (
        <div className="space-y-4">
          {enquiries.length > 0 ? (
            <div className="space-y-3">
              {enquiries.map((enq) => (
                <div key={enq.id} className="bg-white p-5 rounded-xl border border-[#E2E8F0] shadow-xs space-y-2">
                  <div className="flex items-center justify-between">
                    <h3 className="text-sm font-bold text-[#17365D]">{enq.propertyTitle}</h3>
                    <span className="text-[11px] font-semibold text-emerald-700 bg-[#EAF7EE] px-2 py-0.5 rounded-sm">
                      {enq.status}
                    </span>
                  </div>
                  <p className="text-xs text-[#68778A]">{enq.propertyLocation}</p>
                  <p className="text-xs text-[#263445] bg-slate-50 p-3 rounded-md border border-[#E2E8F0]">
                    “{enq.message}”
                  </p>
                  <div className="flex items-center justify-between text-[11px] text-[#68778A] pt-1">
                    <span>Sent by: {enq.tenantName} ({enq.tenantPhone})</span>
                    <span>Date: {enq.createdAt}</span>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="bg-white rounded-xl border border-[#E2E8F0] p-10 text-center space-y-3">
              <MessageSquare className="w-10 h-10 text-slate-300 mx-auto" />
              <h3 className="text-base font-bold text-[#17365D]">No Messages Sent</h3>
              <p className="text-xs text-[#68778A]">
                Submit questions to house owners directly through any property details page.
              </p>
            </div>
          )}
        </div>
      )}

      {/* TAB 4: RENTAL PREFERENCES */}
      {activeTab === 'preferences' && (
        <div className="bg-white rounded-xl border border-[#E2E8F0] p-6 max-w-2xl space-y-5">
          <div>
            <h2 className="text-base font-bold text-[#17365D]">Your Rental Criteria Profile</h2>
            <p className="text-xs text-[#68778A]">
              These preferences configure the automatic AI property recommendation engine.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div className="p-3 bg-slate-50 rounded-md border border-[#E2E8F0]">
              <span className="text-[#68778A]">Preferred Role:</span>
              <div className="font-semibold text-[#17365D] mt-0.5">Engineering College Student</div>
            </div>
            <div className="p-3 bg-slate-50 rounded-md border border-[#E2E8F0]">
              <span className="text-[#68778A]">Target Budget:</span>
              <div className="font-semibold text-[#17365D] mt-0.5">₹4,000 – ₹7,000 / month</div>
            </div>
            <div className="p-3 bg-slate-50 rounded-md border border-[#E2E8F0]">
              <span className="text-[#68778A]">Preferred Locality:</span>
              <div className="font-semibold text-[#17365D] mt-0.5">College Road / George Town (Markapur)</div>
            </div>
            <div className="p-3 bg-slate-50 rounded-md border border-[#E2E8F0]">
              <span className="text-[#68778A]">Must-have Facilities:</span>
              <div className="font-semibold text-[#17365D] mt-0.5">WiFi, Borewell Water, Study Table</div>
            </div>
          </div>

          <button
            onClick={onOpenAiModal}
            className="px-4 py-2 text-xs font-semibold text-white bg-[#17365D] rounded-md transition-colors cursor-pointer"
          >
            Update Criteria with AI Matcher
          </button>
        </div>
      )}

    </div>
  );
};
