import React, { useState } from 'react';
import { Menu, X, User as UserIcon, Heart, LogOut, Home as HomeIcon } from 'lucide-react';
import { User } from '../types';

interface HeaderProps {
  currentTab: string;
  onNavigate: (tab: string) => void;
  currentUser: User | null;
  onOpenAuth: () => void;
  onLogout: () => void;
  favoriteCount: number;
}

export const Header: React.FC<HeaderProps> = ({
  currentTab,
  onNavigate,
  currentUser,
  onOpenAuth,
  onLogout,
  favoriteCount,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { id: 'home', label: 'Home' },
    { id: 'find-homes', label: 'Find Homes' },
    { id: 'for-owners', label: 'For Owners' },
    { id: 'features', label: 'Features' },
    { id: 'about', label: 'About' },
    { id: 'contact', label: 'Contact' },
  ];

  const handleNavClick = (tabId: string) => {
    onNavigate(tabId);
    setMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-[#E2E8F0] shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Strictly compliant 3-zone Top Bar Contract */}
        <div className="flex items-center justify-between gap-8 h-18">
          
          {/* Zone 1: Brand Wordmark (Single text element) */}
          <button
            onClick={() => handleNavClick('home')}
            className="flex items-center gap-2.5 text-left group whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-hidden"
          >
            <div className="w-9 h-9 rounded-md bg-[#17365D] text-white flex items-center justify-center font-bold text-lg shadow-xs group-hover:bg-[#3678C8] transition-colors">
              R
            </div>
            <span className="text-xl font-bold tracking-tight text-[#17365D]">
              Rent<span className="text-[#F28C28]">Ease</span>
            </span>
          </button>

          {/* Zone 2: Navigation Links (single-line, clean text with subtle underlines) */}
          <nav className="hidden md:flex items-center gap-7 text-sm font-medium text-[#263445]">
            {navItems.map((item) => {
              const isActive = currentTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className={`relative py-1 cursor-pointer transition-colors whitespace-nowrap shrink-0 ${
                    isActive
                      ? 'text-[#17365D] font-semibold'
                      : 'text-[#68778A] hover:text-[#17365D]'
                  }`}
                >
                  {item.label}
                  {isActive && (
                    <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#F28C28] rounded-full" />
                  )}
                </button>
              );
            })}
          </nav>

          {/* Zone 3: Actions (Favorites, Auth/Dashboard, and Primary CTA) */}
          <div className="hidden sm:flex items-center gap-3 shrink-0">
            {/* Favorites button */}
            <button
              onClick={() => handleNavClick(currentUser?.role === 'landlord' ? 'landlord-dashboard' : 'tenant-dashboard')}
              title="Saved Properties"
              className="relative p-2 text-[#68778A] hover:text-[#17365D] rounded-md transition-colors cursor-pointer"
            >
              <Heart className="w-5 h-5" />
              {favoriteCount > 0 && (
                <span className="absolute top-1 right-1 w-4 h-4 rounded-full bg-[#F28C28] text-white text-[10px] font-bold flex items-center justify-center tabular-nums">
                  {favoriteCount}
                </span>
              )}
            </button>

            {/* Auth / Dashboard Profile state */}
            {currentUser ? (
              <div className="flex items-center gap-2 pl-2 border-l border-[#E2E8F0]">
                <button
                  onClick={() =>
                    handleNavClick(
                      currentUser.role === 'landlord' ? 'landlord-dashboard' : 'tenant-dashboard'
                    )
                  }
                  className="flex items-center gap-2 py-1.5 px-3 rounded-md bg-[#F2F7FF] text-[#17365D] text-xs font-semibold hover:bg-[#E2E8F0] transition-colors cursor-pointer whitespace-nowrap shrink-0"
                >
                  <span className="w-5 h-5 rounded-full bg-[#17365D] text-white text-[10px] flex items-center justify-center font-bold">
                    {currentUser.avatarInitials}
                  </span>
                  <span>{currentUser.name.split(' ')[0]} ({currentUser.role === 'landlord' ? 'Owner' : 'Tenant'})</span>
                </button>
                <button
                  onClick={onLogout}
                  title="Sign Out"
                  className="p-1.5 text-[#68778A] hover:text-red-600 rounded-md transition-colors cursor-pointer"
                >
                  <LogOut className="w-4 h-4" />
                </button>
              </div>
            ) : (
              <button
                onClick={onOpenAuth}
                className="text-xs font-semibold text-[#17365D] hover:text-[#3678C8] px-3 py-2 cursor-pointer transition-colors whitespace-nowrap shrink-0"
              >
                Sign In
              </button>
            )}

            {/* Primary Action Button */}
            <button
              onClick={() => handleNavClick('find-homes')}
              className="px-4 py-2 text-xs sm:text-sm font-semibold text-white bg-[#17365D] hover:bg-[#22487A] rounded-md transition-all shadow-xs hover:shadow-md cursor-pointer whitespace-nowrap shrink-0"
            >
              Find a Home
            </button>
          </div>

          {/* Mobile Menu Hamburger Trigger */}
          <div className="flex items-center gap-2 md:hidden">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-[#263445] hover:text-[#17365D] rounded-md cursor-pointer"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Navigation */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-[#E2E8F0] bg-white px-4 pt-3 pb-6 shadow-lg animate-in slide-in-from-top duration-200">
          <nav className="flex flex-col space-y-2 mb-4">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`text-left px-3 py-2.5 rounded-md text-sm font-medium transition-colors ${
                  currentTab === item.id
                    ? 'bg-[#F2F7FF] text-[#17365D] font-semibold'
                    : 'text-[#263445] hover:bg-slate-50'
                }`}
              >
                {item.label}
              </button>
            ))}
          </nav>

          <div className="pt-3 border-t border-[#E2E8F0] flex flex-col gap-2">
            {currentUser ? (
              <>
                <button
                  onClick={() =>
                    handleNavClick(
                      currentUser.role === 'landlord' ? 'landlord-dashboard' : 'tenant-dashboard'
                    )
                  }
                  className="w-full text-left px-3 py-2 text-sm font-medium text-[#17365D] bg-[#F2F7FF] rounded-md flex items-center justify-between"
                >
                  <span>Dashboard ({currentUser.role === 'landlord' ? 'Owner' : 'Tenant'})</span>
                  <span className="text-xs bg-[#17365D] text-white px-2 py-0.5 rounded-sm">
                    {currentUser.name}
                  </span>
                </button>
                <button
                  onClick={() => {
                    onLogout();
                    setMobileMenuOpen(false);
                  }}
                  className="w-full text-left px-3 py-2 text-sm text-red-600 hover:bg-red-50 rounded-md flex items-center gap-2"
                >
                  <LogOut className="w-4 h-4" />
                  <span>Sign Out</span>
                </button>
              </>
            ) : (
              <button
                onClick={() => {
                  onOpenAuth();
                  setMobileMenuOpen(false);
                }}
                className="w-full py-2.5 px-4 text-center text-sm font-semibold text-[#17365D] border border-[#17365D] rounded-md"
              >
                Sign In / Register
              </button>
            )}

            <button
              onClick={() => handleNavClick('find-homes')}
              className="w-full py-2.5 px-4 text-center text-sm font-semibold text-white bg-[#17365D] rounded-md shadow-xs"
            >
              Find a Home
            </button>
            <button
              onClick={() => handleNavClick('for-owners')}
              className="w-full py-2.5 px-4 text-center text-sm font-semibold text-[#F28C28] bg-[#FFF1E4] rounded-md"
            >
              List Your Property
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
