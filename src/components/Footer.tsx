import React from 'react';
import { Home, Mail, Phone, MapPin, ShieldCheck, ExternalLink } from 'lucide-react';

interface FooterProps {
  onNavigate: (tab: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  return (
    <footer className="bg-[#17365D] text-slate-200 border-t border-[#22487A] mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          
          {/* Brand & Mission Statement */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-md bg-white text-[#17365D] flex items-center justify-center font-bold text-lg">
                R
              </div>
              <span className="text-xl font-bold tracking-tight text-white">
                Rent<span className="text-[#F28C28]">Ease</span>
              </span>
            </div>
            
            <p className="text-sm text-slate-300 max-w-sm leading-relaxed">
              Find Homes. Manage Rent. Live Easier. RentEase simplifies rental housing discovery for students, working professionals, and families while empowering property owners with streamlined management tools.
            </p>

            <div className="pt-2 text-xs text-slate-400 space-y-1">
              <div className="flex items-center gap-1.5 text-[#F28C28] font-medium">
                <ShieldCheck className="w-4 h-4 shrink-0" />
                <span>Wadhwani Ignite Entrepreneurship Venture</span>
              </div>
              <p>Pilot initiative in Markapur & Andhra Pradesh college clusters.</p>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-3">
            <h4 className="text-sm font-semibold text-white tracking-wider uppercase">
              Platform
            </h4>
            <ul className="space-y-2 text-sm text-slate-300">
              <li>
                <button
                  onClick={() => onNavigate('home')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Home
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('find-homes')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Find Homes
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('for-owners')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  For Landlords
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('features')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Features & Roadmap
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('about')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  About RentEase
                </button>
              </li>
            </ul>
          </div>

          {/* Management & Portals */}
          <div className="space-y-3">
            <h4 className="text-sm font-semibold text-white tracking-wider uppercase">
              Portals & Legal
            </h4>
            <ul className="space-y-2 text-sm text-slate-300">
              <li>
                <button
                  onClick={() => onNavigate('tenant-dashboard')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Tenant Dashboard
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('landlord-dashboard')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Landlord Dashboard
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('contact')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Contact & Support
                </button>
              </li>
              <li>
                <span className="text-slate-400 hover:text-slate-300 cursor-pointer text-xs block pt-1">
                  Privacy Policy & Transparency
                </span>
              </li>
              <li>
                <span className="text-slate-400 hover:text-slate-300 cursor-pointer text-xs block">
                  Terms of Service (Direct Agreements)
                </span>
              </li>
            </ul>
          </div>

          {/* Contact & Local Pilot Desk */}
          <div className="space-y-3">
            <h4 className="text-sm font-semibold text-white tracking-wider uppercase">
              Pilot Desk
            </h4>
            <ul className="space-y-2.5 text-xs text-slate-300">
              <li className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-[#F28C28] shrink-0 mt-0.5" />
                <span>College Road, Near Samuel George Campus, Markapur, Andhra Pradesh - 523316</span>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-[#F28C28] shrink-0" />
                <span>contact@rentease-ap.in</span>
              </li>
              <li className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-[#F28C28] shrink-0" />
                <span>+91 8596 200000 (Mon–Sat, 9AM–6PM)</span>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom Bar with Copyright */}
        <div className="mt-12 pt-8 border-t border-[#22487A] flex flex-col sm:flex-row items-center justify-between text-xs text-slate-400 gap-4">
          <p>© {new Date().getFullYear()} RentEase Technologies. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <span>Built for Wadhwani Ignite 2026</span>
            <span>·</span>
            <span>Zero Brokerage Pilot Platform</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
