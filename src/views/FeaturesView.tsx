import React, { useState } from 'react';
import { Sparkles, Filter, Heart, FileSpreadsheet, LayoutDashboard, Users, Receipt, Wrench, MessageSquare, Smartphone, CheckCircle2, Clock, ArrowRight } from 'lucide-react';

interface FeaturesViewProps {
  onNavigate: (tab: string) => void;
  onOpenAiModal: () => void;
}

export const FeaturesView: React.FC<FeaturesViewProps> = ({
  onNavigate,
  onOpenAiModal,
}) => {
  const [activeCategory, setActiveCategory] = useState<'all' | 'live' | 'roadmap'>('all');

  const liveFeatures = [
    {
      title: 'AI Compatibility Recommendation Heuristics',
      description: 'Scores properties based on tenant profile, college proximity, furnishing preferences, and budget ceiling with transparent reasoning.',
      icon: Sparkles,
      status: 'Live & Working',
      actionLabel: 'Try AI Matcher',
      action: onOpenAiModal,
    },
    {
      title: 'Multi-Facet Search & Locality Filter',
      description: 'Filter rental properties by specific Markapur localities (College Rd, SVKP, George Town, R.R. Nagar), BHK count, and budget sliders.',
      icon: Filter,
      status: 'Live & Working',
      actionLabel: 'Search Homes',
      action: () => onNavigate('find-homes'),
    },
    {
      title: 'Favorites & Saved Properties',
      description: 'Bookmark interesting rental units in 1-click and review them inside your personal tenant dashboard anytime.',
      icon: Heart,
      status: 'Live & Working',
      actionLabel: 'View Favorites',
      action: () => onNavigate('tenant-dashboard'),
    },
    {
      title: 'Instant Property Listing Engine',
      description: 'Landlords can publish vacancies with photos, square footage, amenities, and preferred tenant rules with instant search visibility.',
      icon: FileSpreadsheet,
      status: 'Live & Working',
      actionLabel: 'List Property',
      action: () => onNavigate('for-owners'),
    },
    {
      title: 'Landlord & Tenant Dashboards',
      description: 'Role-tailored interfaces providing viewing request tracking, direct tenant enquiry management, and tenancy records.',
      icon: LayoutDashboard,
      status: 'Live & Working',
      actionLabel: 'Open Dashboard',
      action: () => onNavigate('landlord-dashboard'),
    },
    {
      title: 'Rent Tracking Ledger',
      description: 'Digital tracking of monthly dues with payment status indicators (Paid, Pending, Overdue) and instant receipt logging.',
      icon: Receipt,
      status: 'Live & Working',
      actionLabel: 'View Rent Ledger',
      action: () => onNavigate('landlord-dashboard'),
    },
    {
      title: 'Maintenance Request Management',
      description: 'Tenants log plumbing, electrical, and water supply issues with priority tags; landlords track and mark tickets as resolved.',
      icon: Wrench,
      status: 'Live & Working',
      actionLabel: 'Track Tickets',
      action: () => onNavigate('landlord-dashboard'),
    },
    {
      title: 'Mobile-Optimized Responsive Web App',
      description: 'Engineered for seamless one-handed touch interactions across 360px mobile screens up to 1440px+ desktop workstations.',
      icon: Smartphone,
      status: 'Live & Working',
      actionLabel: null,
      action: null,
    },
  ];

  const plannedFeatures = [
    {
      title: 'Automated UPI Payment Gateway & Escrow',
      description: 'Direct in-app UPI integration with auto-split security deposit escrow release upon move-out agreement.',
      icon: Receipt,
      status: 'Roadmap (Q1 2027)',
    },
    {
      title: 'Digital Aadhaar KYC & Police Intimation',
      description: 'Paperless identity verification for tenants and automated digital local police intimation forms for Andhra Pradesh.',
      icon: Users,
      status: 'Roadmap (Q2 2027)',
    },
    {
      title: 'Bi-directional WhatsApp & SMS Notifications',
      description: 'Instant WhatsApp bot alerts for viewing confirmations, rent receipt PDFs, and urgent maintenance alerts.',
      icon: MessageSquare,
      status: 'Roadmap (Q2 2027)',
    },
    {
      title: 'Machine Learning Image Room Quality Assessment',
      description: 'Computer-vision model to verify natural lighting, room dimensions, and condition from tenant inspection uploads.',
      icon: Sparkles,
      status: 'Roadmap (Q3 2027)',
    },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12">
      
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto space-y-3">
        <h1 className="text-3xl sm:text-4xl font-extrabold text-[#17365D] tracking-tight">
          RentEase Platform Capabilities
        </h1>
        <p className="text-sm text-[#68778A] leading-relaxed">
          Explore the features built into our pilot release alongside planned milestones on our entrepreneurship roadmap.
        </p>

        {/* Filter Controls (Segmented Tabs) */}
        <div className="inline-flex p-1 bg-slate-100 rounded-lg text-xs font-medium pt-3">
          <button
            onClick={() => setActiveCategory('all')}
            className={`px-4 py-2 rounded-md transition-colors cursor-pointer ${
              activeCategory === 'all' ? 'bg-white text-[#17365D] font-bold shadow-xs' : 'text-[#68778A]'
            }`}
          >
            All Features
          </button>
          <button
            onClick={() => setActiveCategory('live')}
            className={`px-4 py-2 rounded-md transition-colors cursor-pointer ${
              activeCategory === 'live' ? 'bg-white text-[#17365D] font-bold shadow-xs' : 'text-[#68778A]'
            }`}
          >
            Active Pilot Tools (Live)
          </button>
          <button
            onClick={() => setActiveCategory('roadmap')}
            className={`px-4 py-2 rounded-md transition-colors cursor-pointer ${
              activeCategory === 'roadmap' ? 'bg-white text-[#17365D] font-bold shadow-xs' : 'text-[#68778A]'
            }`}
          >
            Upcoming Roadmap
          </button>
        </div>
      </div>

      {/* Section 1: Active Live Features */}
      {(activeCategory === 'all' || activeCategory === 'live') && (
        <div className="space-y-6">
          <div className="flex items-center gap-2 pb-2 border-b border-[#E2E8F0]">
            <CheckCircle2 className="w-5 h-5 text-emerald-600" />
            <h2 className="text-lg font-bold text-[#17365D]">
              Live & Fully Interactive in Current Release
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {liveFeatures.map((feat, idx) => {
              const Icon = feat.icon;
              return (
                <div
                  key={idx}
                  className="bg-white p-5 rounded-xl border border-[#E2E8F0] shadow-xs flex flex-col justify-between hover:border-[#3678C8]/40 transition-all"
                >
                  <div className="space-y-3">
                    <div className="w-9 h-9 rounded-lg bg-[#F2F7FF] text-[#3678C8] flex items-center justify-center">
                      <Icon className="w-4 h-4" />
                    </div>

                    <div className="text-[11px] font-semibold text-emerald-700 bg-[#EAF7EE] px-2 py-0.5 rounded-sm inline-block">
                      {feat.status}
                    </div>

                    <h3 className="text-sm font-bold text-[#17365D] leading-snug">
                      {feat.title}
                    </h3>

                    <p className="text-xs text-[#68778A] leading-relaxed">
                      {feat.description}
                    </p>
                  </div>

                  {feat.actionLabel && feat.action && (
                    <div className="pt-4 mt-4 border-t border-[#E2E8F0]">
                      <button
                        onClick={feat.action}
                        className="text-xs font-semibold text-[#17365D] hover:text-[#3678C8] flex items-center gap-1 cursor-pointer"
                      >
                        <span>{feat.actionLabel}</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Section 2: Planned Roadmap Features */}
      {(activeCategory === 'all' || activeCategory === 'roadmap') && (
        <div className="space-y-6 pt-6">
          <div className="flex items-center gap-2 pb-2 border-b border-[#E2E8F0]">
            <Clock className="w-5 h-5 text-[#F28C28]" />
            <h2 className="text-lg font-bold text-[#17365D]">
              Planned Roadmap Capabilities (Pre-Production)
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {plannedFeatures.map((feat, idx) => {
              const Icon = feat.icon;
              return (
                <div
                  key={idx}
                  className="bg-slate-50 p-5 rounded-xl border border-[#E2E8F0] flex flex-col justify-between space-y-3"
                >
                  <div className="space-y-3">
                    <div className="w-9 h-9 rounded-lg bg-[#FFF1E4] text-[#F28C28] flex items-center justify-center">
                      <Icon className="w-4 h-4" />
                    </div>

                    <div className="text-[11px] font-semibold text-[#F28C28] bg-white px-2 py-0.5 rounded-sm border border-[#F28C28]/25 inline-block">
                      {feat.status}
                    </div>

                    <h3 className="text-sm font-bold text-[#17365D] leading-snug">
                      {feat.title}
                    </h3>

                    <p className="text-xs text-[#68778A] leading-relaxed">
                      {feat.description}
                    </p>
                  </div>

                  <div className="pt-4 text-[11px] text-[#68778A] italic">
                    Requires third-party banking/KYC gateway approval.
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

    </div>
  );
};
