import React, { useState } from 'react';
import { X, Heart, MapPin, Bed, Bath, Compass, Check, Calendar, MessageSquare, Phone, Mail, ShieldAlert, Sparkles, Clock, Share2 } from 'lucide-react';
import { Property, User } from '../types';
import { PropertyImageVisual } from './PropertyImageVisual';
import { storageService } from '../services/storageService';

interface PropertyDetailsModalProps {
  property: Property | null;
  isOpen: boolean;
  onClose: () => void;
  isFavorite: boolean;
  onToggleFavorite: (id: string) => void;
  currentUser: User | null;
  onEnquirySuccess?: () => void;
  onViewingSuccess?: () => void;
}

export const PropertyDetailsModal: React.FC<PropertyDetailsModalProps> = ({
  property,
  isOpen,
  onClose,
  isFavorite,
  onToggleFavorite,
  currentUser,
  onEnquirySuccess,
  onViewingSuccess,
}) => {
  const [activeTab, setActiveTab] = useState<'overview' | 'enquire' | 'schedule'>('overview');
  
  // Enquiry form state
  const [enquiryName, setEnquiryName] = useState(currentUser?.name || '');
  const [enquiryEmail, setEnquiryEmail] = useState(currentUser?.email || '');
  const [enquiryPhone, setEnquiryPhone] = useState(currentUser?.phone || '');
  const [enquiryTenantType, setEnquiryTenantType] = useState<'Student' | 'Professional' | 'Family' | 'Other'>('Student');
  const [enquiryMessage, setEnquiryMessage] = useState('Hi, I am interested in this rental property in Markapur. Could you please share more details regarding viewing and occupancy?');
  const [moveInDate, setMoveInDate] = useState('2026-11-01');
  const [enquirySubmitted, setEnquirySubmitted] = useState(false);

  // Viewing form state
  const [viewingName, setViewingName] = useState(currentUser?.name || '');
  const [viewingPhone, setViewingPhone] = useState(currentUser?.phone || '');
  const [viewingEmail, setViewingEmail] = useState(currentUser?.email || '');
  const [viewingDate, setViewingDate] = useState('2026-10-31');
  const [viewingSlot, setViewingSlot] = useState('10:00 AM - 11:30 AM');
  const [viewingNotes, setViewingNotes] = useState('Would like to inspect the room ventilation, water supply, and bike parking area.');
  const [viewingSubmitted, setViewingSubmitted] = useState(false);

  const [copiedLink, setCopiedLink] = useState(false);

  if (!isOpen || !property) return null;

  const handleEnquirySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!enquiryName || !enquiryPhone) return;

    storageService.addEnquiry({
      propertyId: property.id,
      propertyTitle: property.title,
      propertyLocation: property.location,
      tenantName: enquiryName,
      tenantEmail: enquiryEmail,
      tenantPhone: enquiryPhone,
      tenantType: enquiryTenantType,
      message: enquiryMessage,
      preferredMoveInDate: moveInDate,
    });

    setEnquirySubmitted(true);
    if (onEnquirySuccess) onEnquirySuccess();
  };

  const handleViewingSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!viewingName || !viewingPhone) return;

    storageService.addViewing({
      propertyId: property.id,
      propertyTitle: property.title,
      propertyLocation: property.location,
      name: viewingName,
      phone: viewingPhone,
      email: viewingEmail,
      preferredDate: viewingDate,
      preferredTimeSlot: viewingSlot,
      notes: viewingNotes,
    });

    setViewingSubmitted(true);
    if (onViewingSuccess) onViewingSuccess();
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-[#17365D]/60 backdrop-blur-xs overflow-y-auto">
      <div className="relative w-full max-w-4xl bg-white rounded-xl shadow-2xl border border-[#E2E8F0] my-8 overflow-hidden flex flex-col max-h-[90vh]">
        
        {/* Modal Header */}
        <div className="p-4 sm:px-6 border-b border-[#E2E8F0] flex items-center justify-between bg-white shrink-0">
          <div className="flex items-center gap-3">
            <span className="text-xs font-semibold px-2.5 py-1 bg-[#F2F7FF] text-[#17365D] rounded-sm">
              {property.propertyType}
            </span>
            <span className="text-xs text-[#68778A]">
              Listing ID: <span className="font-mono">{property.id}</span>
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleCopyLink}
              title="Copy share link"
              className="p-2 text-[#68778A] hover:text-[#17365D] rounded-md transition-colors cursor-pointer"
            >
              <Share2 className="w-4 h-4" />
            </button>
            <button
              onClick={() => onToggleFavorite(property.id)}
              className="p-2 text-[#68778A] hover:text-red-500 rounded-md transition-colors cursor-pointer"
            >
              <Heart
                className={`w-5 h-5 ${isFavorite ? 'fill-red-500 text-red-500' : ''}`}
              />
            </button>
            <button
              onClick={onClose}
              className="p-2 text-[#68778A] hover:text-[#17365D] rounded-md transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Modal Scrollable Body */}
        <div className="overflow-y-auto p-4 sm:p-6 space-y-6">
          
          {/* Top Visual & Quick Pricing Banner */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-start">
            <div className="md:col-span-2 rounded-lg overflow-hidden border border-[#E2E8F0]">
              <PropertyImageVisual
                category={property.imageCategory}
                title={property.title}
                aspectRatio="video"
              />
            </div>

            {/* Price Box */}
            <div className="bg-[#F2F7FF] rounded-lg p-5 border border-[#3678C8]/20 flex flex-col justify-between h-full">
              <div>
                <div className="text-xs text-[#68778A] font-medium">Monthly Rent</div>
                <div className="text-2xl sm:text-3xl font-extrabold text-[#17365D] tabular-nums mt-0.5">
                  ₹{property.monthlyRent.toLocaleString('en-IN')}
                  <span className="text-xs font-normal text-[#68778A]"> / month</span>
                </div>

                <div className="mt-3 text-xs text-[#263445] space-y-1.5 pt-3 border-t border-[#E2E8F0]">
                  <div className="flex justify-between">
                    <span className="text-[#68778A]">Security Deposit:</span>
                    <span className="font-semibold tabular-nums">₹{property.securityDeposit.toLocaleString('en-IN')}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#68778A]">Notice Period:</span>
                    <span className="font-semibold">1 Month</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#68778A]">Lock-in Period:</span>
                    <span className="font-semibold">3 Months</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#68778A]">Preferred Tenant:</span>
                    <span className="font-semibold">{property.preferredTenant}</span>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="mt-5 space-y-2">
                <button
                  onClick={() => setActiveTab('schedule')}
                  className="w-full py-2.5 px-4 text-xs sm:text-sm font-semibold text-white bg-[#F28C28] hover:bg-[#D97706] rounded-md transition-all shadow-xs flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Calendar className="w-4 h-4" />
                  Schedule In-Person Viewing
                </button>
                <button
                  onClick={() => setActiveTab('enquire')}
                  className="w-full py-2.5 px-4 text-xs sm:text-sm font-semibold text-[#17365D] bg-white border border-[#17365D] hover:bg-[#F2F7FF] rounded-md transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  <MessageSquare className="w-4 h-4" />
                  Send Enquiry to Owner
                </button>
              </div>
            </div>
          </div>

          {/* Navigation Tabs inside modal */}
          <div className="flex border-b border-[#E2E8F0] gap-6 text-sm font-medium">
            <button
              onClick={() => setActiveTab('overview')}
              className={`pb-2.5 cursor-pointer transition-colors relative ${
                activeTab === 'overview'
                  ? 'text-[#17365D] font-semibold border-b-2 border-[#17365D]'
                  : 'text-[#68778A] hover:text-[#17365D]'
              }`}
            >
              Overview & Specifications
            </button>
            <button
              onClick={() => setActiveTab('schedule')}
              className={`pb-2.5 cursor-pointer transition-colors relative ${
                activeTab === 'schedule'
                  ? 'text-[#17365D] font-semibold border-b-2 border-[#17365D]'
                  : 'text-[#68778A] hover:text-[#17365D]'
              }`}
            >
              Schedule Viewing
            </button>
            <button
              onClick={() => setActiveTab('enquire')}
              className={`pb-2.5 cursor-pointer transition-colors relative ${
                activeTab === 'enquire'
                  ? 'text-[#17365D] font-semibold border-b-2 border-[#17365D]'
                  : 'text-[#68778A] hover:text-[#17365D]'
              }`}
            >
              Direct Owner Enquiry
            </button>
          </div>

          {/* TAB 1: OVERVIEW */}
          {activeTab === 'overview' && (
            <div className="space-y-6">
              {/* Title & Location */}
              <div>
                <h2 className="text-xl sm:text-2xl font-bold text-[#17365D]">
                  {property.title}
                </h2>
                <div className="flex items-center gap-2 mt-1.5 text-sm text-[#68778A]">
                  <MapPin className="w-4 h-4 text-[#3678C8] shrink-0" />
                  <span>{property.location}</span>
                </div>
              </div>

              {/* Key Specs Matrix */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                <div className="p-3 bg-slate-50 border border-[#E2E8F0] rounded-md">
                  <div className="text-xs text-[#68778A]">Bedrooms</div>
                  <div className="text-sm font-semibold text-[#17365D] mt-0.5">{property.bedrooms} BHK</div>
                </div>
                <div className="p-3 bg-slate-50 border border-[#E2E8F0] rounded-md">
                  <div className="text-xs text-[#68778A]">Bathrooms</div>
                  <div className="text-sm font-semibold text-[#17365D] mt-0.5">{property.bathrooms} Western</div>
                </div>
                <div className="p-3 bg-slate-50 border border-[#E2E8F0] rounded-md">
                  <div className="text-xs text-[#68778A]">Super Built-up Area</div>
                  <div className="text-sm font-semibold text-[#17365D] mt-0.5">{property.sqft} sq.ft</div>
                </div>
                <div className="p-3 bg-slate-50 border border-[#E2E8F0] rounded-md">
                  <div className="text-xs text-[#68778A]">Floor Level</div>
                  <div className="text-sm font-semibold text-[#17365D] mt-0.5">{property.floor}</div>
                </div>
              </div>

              {/* Description */}
              <div>
                <h4 className="text-sm font-semibold text-[#17365D] uppercase tracking-wider mb-2">
                  About this Property
                </h4>
                <p className="text-sm text-[#263445] leading-relaxed whitespace-pre-line">
                  {property.description}
                </p>
              </div>

              {/* Amenities Grid */}
              <div>
                <h4 className="text-sm font-semibold text-[#17365D] uppercase tracking-wider mb-3">
                  Amenities & Facilities
                </h4>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
                  {property.amenities.map((amenity, idx) => (
                    <div
                      key={idx}
                      className="flex items-center gap-2 text-xs text-[#263445] p-2 bg-slate-50 rounded-md border border-[#E2E8F0]"
                    >
                      <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                      <span>{amenity}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Transparent Owner & Verification Info */}
              <div className="p-4 bg-[#F2F7FF] rounded-lg border border-[#3678C8]/20 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div>
                  <div className="text-xs font-semibold text-[#17365D]">
                    Listed by Owner: {property.ownerName}
                  </div>
                  <div className="text-xs text-[#68778A] mt-0.5">
                    Phone: {property.ownerPhone} · Direct tenant-to-owner connection, zero brokerage commission.
                  </div>
                </div>
                <div className="text-[11px] text-emerald-800 bg-[#EAF7EE] px-2.5 py-1 rounded-sm border border-emerald-200 shrink-0 font-medium">
                  Direct Listing · No Middlemen
                </div>
              </div>

              {/* Simulated Map / Locality View for Markapur */}
              <div className="rounded-lg border border-[#E2E8F0] overflow-hidden bg-slate-50 p-4">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2 text-xs font-semibold text-[#17365D]">
                    <MapPin className="w-4 h-4 text-[#F28C28]" />
                    <span>Locality Map: Markapur (AP)</span>
                  </div>
                  <span className="text-[11px] text-[#68778A]">
                    {property.nearestLandmark || 'Central Markapur Area'}
                  </span>
                </div>
                <div className="h-44 w-full bg-slate-200 rounded-md relative flex items-center justify-center overflow-hidden border border-slate-300">
                  {/* Subtle Map Grid styling */}
                  <div className="absolute inset-0 opacity-40 bg-[radial-gradient(#3678c8_1px,transparent_1px)] [background-size:16px_16px]" />
                  <div className="relative z-10 bg-white/90 backdrop-blur-xs p-3 rounded-lg shadow-md border border-[#E2E8F0] text-center max-w-xs">
                    <div className="w-8 h-8 rounded-full bg-[#17365D] text-white flex items-center justify-center mx-auto mb-1">
                      <MapPin className="w-4 h-4 text-[#F28C28]" />
                    </div>
                    <div className="text-xs font-bold text-[#17365D]">{property.areaName}</div>
                    <div className="text-[11px] text-[#68778A] mt-0.5">
                      {property.distanceToCollegeKm
                        ? `${property.distanceToCollegeKm} km from college campus`
                        : 'Central college & residential zone'}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: SCHEDULE VIEWING */}
          {activeTab === 'schedule' && (
            <div className="max-w-xl mx-auto py-2">
              {viewingSubmitted ? (
                <div className="p-6 bg-[#EAF7EE] rounded-xl border border-emerald-200 text-center space-y-3">
                  <div className="w-12 h-12 rounded-full bg-emerald-600 text-white flex items-center justify-center mx-auto">
                    <Check className="w-6 h-6" />
                  </div>
                  <h3 className="text-lg font-bold text-emerald-950">Viewing Request Recorded!</h3>
                  <p className="text-xs text-emerald-800 leading-relaxed">
                    Your appointment request for <strong>{viewingDate}</strong> ({viewingSlot}) has been logged in your Tenant Dashboard and forwarded to {property.ownerName}.
                  </p>
                  <button
                    onClick={() => setViewingSubmitted(false)}
                    className="mt-2 text-xs font-semibold text-emerald-900 underline cursor-pointer"
                  >
                    Schedule another slot
                  </button>
                </div>
              ) : (
                <form onSubmit={handleViewingSubmit} className="space-y-4">
                  <div className="text-center mb-4">
                    <h3 className="text-lg font-bold text-[#17365D]">Schedule an In-Person Property Visit</h3>
                    <p className="text-xs text-[#68778A]">
                      Select your preferred date and time to inspect the property in Markapur.
                    </p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-[#263445] mb-1">Full Name *</label>
                      <input
                        type="text"
                        required
                        value={viewingName}
                        onChange={(e) => setViewingName(e.target.value)}
                        placeholder="e.g. K. Sai Krishna"
                        className="w-full text-xs px-3 py-2 border border-[#E2E8F0] rounded-md focus:border-[#3678C8] focus:outline-hidden"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-[#263445] mb-1">Mobile Number *</label>
                      <input
                        type="tel"
                        required
                        value={viewingPhone}
                        onChange={(e) => setViewingPhone(e.target.value)}
                        placeholder="e.g. +91 99887 76655"
                        className="w-full text-xs px-3 py-2 border border-[#E2E8F0] rounded-md focus:border-[#3678C8] focus:outline-hidden"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-[#263445] mb-1">Preferred Date *</label>
                      <input
                        type="date"
                        required
                        value={viewingDate}
                        onChange={(e) => setViewingDate(e.target.value)}
                        className="w-full text-xs px-3 py-2 border border-[#E2E8F0] rounded-md focus:border-[#3678C8] focus:outline-hidden"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-[#263445] mb-1">Time Slot *</label>
                      <select
                        value={viewingSlot}
                        onChange={(e) => setViewingSlot(e.target.value)}
                        className="w-full text-xs px-3 py-2 border border-[#E2E8F0] rounded-md focus:border-[#3678C8] focus:outline-hidden bg-white"
                      >
                        <option>09:00 AM - 10:30 AM</option>
                        <option>10:30 AM - 12:00 PM</option>
                        <option>02:00 PM - 03:30 PM</option>
                        <option>04:00 PM - 05:30 PM</option>
                        <option>05:30 PM - 07:00 PM</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-[#263445] mb-1">Notes / Questions for Owner</label>
                    <textarea
                      rows={3}
                      value={viewingNotes}
                      onChange={(e) => setViewingNotes(e.target.value)}
                      placeholder="e.g. Visiting with parents to check bike parking and study space."
                      className="w-full text-xs px-3 py-2 border border-[#E2E8F0] rounded-md focus:border-[#3678C8] focus:outline-hidden"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-2.5 text-xs sm:text-sm font-semibold text-white bg-[#F28C28] hover:bg-[#D97706] rounded-md transition-colors cursor-pointer"
                  >
                    Confirm Viewing Slot
                  </button>
                </form>
              )}
            </div>
          )}

          {/* TAB 3: DIRECT ENQUIRY */}
          {activeTab === 'enquire' && (
            <div className="max-w-xl mx-auto py-2">
              {enquirySubmitted ? (
                <div className="p-6 bg-[#EAF7EE] rounded-xl border border-emerald-200 text-center space-y-3">
                  <div className="w-12 h-12 rounded-full bg-emerald-600 text-white flex items-center justify-center mx-auto">
                    <Check className="w-6 h-6" />
                  </div>
                  <h3 className="text-lg font-bold text-emerald-950">Enquiry Dispatched!</h3>
                  <p className="text-xs text-emerald-800 leading-relaxed">
                    Your enquiry regarding <strong>{property.title}</strong> has been logged in your dashboard and notified to property owner {property.ownerName}.
                  </p>
                  <button
                    onClick={() => setEnquirySubmitted(false)}
                    className="mt-2 text-xs font-semibold text-emerald-900 underline cursor-pointer"
                  >
                    Send another query
                  </button>
                </div>
              ) : (
                <form onSubmit={handleEnquirySubmit} className="space-y-4">
                  <div className="text-center mb-4">
                    <h3 className="text-lg font-bold text-[#17365D]">Direct Enquiry to Owner</h3>
                    <p className="text-xs text-[#68778A]">
                      No broker charges. We forward your details directly to the property owner.
                    </p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-[#263445] mb-1">Your Name *</label>
                      <input
                        type="text"
                        required
                        value={enquiryName}
                        onChange={(e) => setEnquiryName(e.target.value)}
                        placeholder="e.g. V. Divya"
                        className="w-full text-xs px-3 py-2 border border-[#E2E8F0] rounded-md focus:border-[#3678C8] focus:outline-hidden"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-[#263445] mb-1">Contact Phone *</label>
                      <input
                        type="tel"
                        required
                        value={enquiryPhone}
                        onChange={(e) => setEnquiryPhone(e.target.value)}
                        placeholder="e.g. +91 98480 12345"
                        className="w-full text-xs px-3 py-2 border border-[#E2E8F0] rounded-md focus:border-[#3678C8] focus:outline-hidden"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-[#263445] mb-1">I am a *</label>
                      <select
                        value={enquiryTenantType}
                        onChange={(e) => setEnquiryTenantType(e.target.value as any)}
                        className="w-full text-xs px-3 py-2 border border-[#E2E8F0] rounded-md focus:border-[#3678C8] focus:outline-hidden bg-white"
                      >
                        <option value="Student">Student (College/University)</option>
                        <option value="Professional">Working Professional</option>
                        <option value="Family">Family</option>
                        <option value="Other">Other</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-[#263445] mb-1">Expected Move-in Date</label>
                      <input
                        type="date"
                        value={moveInDate}
                        onChange={(e) => setMoveInDate(e.target.value)}
                        className="w-full text-xs px-3 py-2 border border-[#E2E8F0] rounded-md focus:border-[#3678C8] focus:outline-hidden"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-[#263445] mb-1">Message for Owner</label>
                    <textarea
                      rows={3}
                      value={enquiryMessage}
                      onChange={(e) => setEnquiryMessage(e.target.value)}
                      className="w-full text-xs px-3 py-2 border border-[#E2E8F0] rounded-md focus:border-[#3678C8] focus:outline-hidden"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-2.5 text-xs sm:text-sm font-semibold text-white bg-[#17365D] hover:bg-[#22487A] rounded-md transition-colors cursor-pointer"
                  >
                    Submit Enquiry
                  </button>
                </form>
              )}
            </div>
          )}

        </div>

      </div>
    </div>
  );
};
