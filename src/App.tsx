import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { PropertyDetailsModal } from './components/PropertyDetailsModal';
import { AiRecommendationModal } from './components/AiRecommendationModal';
import { AuthModal } from './components/AuthModal';
import { HomeView } from './views/HomeView';
import { FindHomesView } from './views/FindHomesView';
import { ForOwnersView } from './views/ForOwnersView';
import { FeaturesView } from './views/FeaturesView';
import { AboutView } from './views/AboutView';
import { ContactView } from './views/ContactView';
import { TenantDashboardView } from './views/TenantDashboardView';
import { LandlordDashboardView } from './views/LandlordDashboardView';
import { storageService } from './services/storageService';
import { Property, User, FilterState } from './types';
import { Sparkles } from 'lucide-react';

export default function App() {
  const [currentTab, setCurrentTab] = useState<string>('home');
  const [properties, setProperties] = useState<Property[]>([]);
  const [favorites, setFavorites] = useState<string[]>([]);
  const [currentUser, setCurrentUser] = useState<User | null>(null);

  // Modals
  const [selectedProperty, setSelectedProperty] = useState<Property | null>(null);
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);
  const [isAiModalOpen, setIsAiModalOpen] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);

  // Filters passed from Home search to Find Homes view
  const [initialSearchFilter, setInitialSearchFilter] = useState<Partial<FilterState> | undefined>(undefined);

  useEffect(() => {
    // Initialize properties, favorites, and user session
    setProperties(storageService.getProperties());
    setFavorites(storageService.getFavorites());
    setCurrentUser(storageService.getCurrentUser());

    // Window scroll reset on tab change
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [currentTab]);

  const handleNavigate = (tab: string, initialFilter?: Partial<FilterState>) => {
    if (initialFilter) {
      setInitialSearchFilter(initialFilter);
    }
    setCurrentTab(tab);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleToggleFavorite = (propertyId: string) => {
    const updated = storageService.toggleFavorite(propertyId);
    setFavorites(updated);
  };

  const handleViewDetails = (property: Property) => {
    setSelectedProperty(property);
    setIsDetailsOpen(true);
  };

  const handlePropertyAdded = (newProp: Property) => {
    setProperties(storageService.getProperties());
  };

  const handleLogout = () => {
    storageService.setCurrentUser(null);
    setCurrentUser(null);
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#FAFCFF] text-[#263445]">
      
      {/* Universal Top Bar */}
      <Header
        currentTab={currentTab}
        onNavigate={handleNavigate}
        currentUser={currentUser}
        onOpenAuth={() => setIsAuthModalOpen(true)}
        onLogout={handleLogout}
        favoriteCount={favorites.length}
      />

      {/* Main View Router */}
      <main className="flex-1">
        {currentTab === 'home' && (
          <HomeView
            properties={properties}
            favorites={favorites}
            onToggleFavorite={handleToggleFavorite}
            onViewDetails={handleViewDetails}
            onNavigate={handleNavigate}
            onOpenAiModal={() => setIsAiModalOpen(true)}
          />
        )}

        {currentTab === 'find-homes' && (
          <FindHomesView
            properties={properties}
            favorites={favorites}
            onToggleFavorite={handleToggleFavorite}
            onViewDetails={handleViewDetails}
            initialFilter={initialSearchFilter}
            onOpenAiModal={() => setIsAiModalOpen(true)}
          />
        )}

        {currentTab === 'for-owners' && (
          <ForOwnersView
            onPropertyAdded={handlePropertyAdded}
            onNavigate={handleNavigate}
          />
        )}

        {currentTab === 'features' && (
          <FeaturesView
            onNavigate={handleNavigate}
            onOpenAiModal={() => setIsAiModalOpen(true)}
          />
        )}

        {currentTab === 'about' && (
          <AboutView onNavigate={handleNavigate} />
        )}

        {currentTab === 'contact' && (
          <ContactView />
        )}

        {currentTab === 'tenant-dashboard' && (
          <TenantDashboardView
            currentUser={currentUser}
            properties={properties}
            favorites={favorites}
            onToggleFavorite={handleToggleFavorite}
            onViewDetails={handleViewDetails}
            onNavigate={handleNavigate}
            onOpenAiModal={() => setIsAiModalOpen(true)}
          />
        )}

        {currentTab === 'landlord-dashboard' && (
          <LandlordDashboardView
            currentUser={currentUser}
            properties={properties}
            onNavigate={handleNavigate}
            onViewDetails={handleViewDetails}
          />
        )}
      </main>

      {/* Floating AI Match Assistant Trigger (Mobile & Desktop quick access) */}
      <div className="fixed bottom-5 right-5 z-30">
        <button
          onClick={() => setIsAiModalOpen(true)}
          className="flex items-center gap-2 px-4 py-3 bg-[#17365D] hover:bg-[#22487A] text-white rounded-full shadow-lg hover:shadow-xl transition-all cursor-pointer text-xs font-bold border border-white/20"
        >
          <Sparkles className="w-4 h-4 text-[#F28C28]" />
          <span>AI Home Match</span>
        </button>
      </div>

      {/* Universal Footer */}
      <Footer onNavigate={handleNavigate} />

      {/* Property Details Modal */}
      <PropertyDetailsModal
        property={selectedProperty}
        isOpen={isDetailsOpen}
        onClose={() => setIsDetailsOpen(false)}
        isFavorite={selectedProperty ? favorites.includes(selectedProperty.id) : false}
        onToggleFavorite={handleToggleFavorite}
        currentUser={currentUser}
      />

      {/* AI Recommendation Modal */}
      <AiRecommendationModal
        isOpen={isAiModalOpen}
        onClose={() => setIsAiModalOpen(false)}
        properties={properties}
        favorites={favorites}
        onToggleFavorite={handleToggleFavorite}
        onViewDetails={(prop) => {
          setIsAiModalOpen(false);
          handleViewDetails(prop);
        }}
      />

      {/* Auth Modal (Login, Registration, Forgot Password) */}
      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
        onLoginSuccess={(user) => {
          setCurrentUser(user);
        }}
      />

    </div>
  );
}
