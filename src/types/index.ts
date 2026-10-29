export type PropertyType = '1RK' | '1BHK' | '2BHK' | '3BHK' | 'Independent House' | 'Hostel/PG';
export type FurnishingType = 'Furnished' | 'Semi-Furnished' | 'Unfurnished';
export type PreferredTenant = 'All' | 'Students' | 'Working Professionals' | 'Family';

export interface Property {
  id: string;
  title: string;
  description: string;
  location: string;
  areaName: string;
  city: string;
  state: string;
  monthlyRent: number;
  securityDeposit: number;
  propertyType: PropertyType;
  bedrooms: number;
  bathrooms: number;
  furnishing: FurnishingType;
  preferredTenant: PreferredTenant;
  amenities: string[];
  imageCategory: 'studio' | 'apartment' | 'villa' | 'family' | 'hostel';
  images: string[];
  status: 'Available' | 'Rented' | 'Under Maintenance';
  sqft: number;
  floor: string;
  ownerId: string;
  ownerName: string;
  ownerPhone: string;
  ownerEmail: string;
  createdAt: string;
  isVerified?: boolean;
  distanceToCollegeKm?: number;
  nearestLandmark?: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  role: 'tenant' | 'landlord';
  avatarInitials: string;
  joinedDate: string;
}

export interface Enquiry {
  id: string;
  propertyId: string;
  propertyTitle: string;
  propertyLocation: string;
  tenantName: string;
  tenantEmail: string;
  tenantPhone: string;
  tenantType: 'Student' | 'Professional' | 'Family' | 'Other';
  message: string;
  preferredMoveInDate: string;
  status: 'Pending' | 'Contacted' | 'Viewing Scheduled' | 'Closed';
  createdAt: string;
}

export interface ViewingRequest {
  id: string;
  propertyId: string;
  propertyTitle: string;
  propertyLocation: string;
  name: string;
  phone: string;
  email: string;
  preferredDate: string;
  preferredTimeSlot: string;
  notes: string;
  status: 'Pending' | 'Confirmed' | 'Completed' | 'Cancelled';
  createdAt: string;
}

export interface RentRecord {
  id: string;
  propertyId: string;
  propertyTitle: string;
  tenantName: string;
  tenantPhone: string;
  amount: number;
  monthYear: string;
  dueDate: string;
  paymentStatus: 'Paid' | 'Pending' | 'Overdue';
  paidDate?: string;
  paymentMethod?: string;
}

export interface MaintenanceRequest {
  id: string;
  propertyId: string;
  propertyTitle: string;
  tenantName: string;
  category: 'Plumbing' | 'Electrical' | 'Water Supply' | 'Carpentry' | 'Painting' | 'Other';
  priority: 'Low' | 'Medium' | 'High';
  description: string;
  status: 'Open' | 'In Progress' | 'Resolved';
  reportedDate: string;
  resolvedDate?: string;
}

export interface FilterState {
  searchQuery: string;
  location: string;
  minRent: number;
  maxRent: number;
  propertyType: string;
  bedrooms: string;
  furnishing: string;
  preferredTenant: string;
  sortBy: 'price-asc' | 'price-desc' | 'newest' | 'relevance';
  amenities: string[];
}
