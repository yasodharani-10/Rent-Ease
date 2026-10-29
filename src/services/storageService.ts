import { Property, Enquiry, ViewingRequest, RentRecord, MaintenanceRequest, User } from '../types';
import { INITIAL_PROPERTIES, INITIAL_RENT_RECORDS, INITIAL_MAINTENANCE_REQUESTS, INITIAL_ENQUIRIES, DEMO_USERS } from '../data/mockData';

const STORAGE_KEYS = {
  PROPERTIES: 'rentease_properties',
  FAVORITES: 'rentease_favorites',
  ENQUIRIES: 'rentease_enquiries',
  VIEWINGS: 'rentease_viewings',
  RENT_RECORDS: 'rentease_rent_records',
  MAINTENANCE: 'rentease_maintenance',
  CURRENT_USER: 'rentease_current_user',
};

export const storageService = {
  getProperties(): Property[] {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.PROPERTIES);
      if (!data) {
        localStorage.setItem(STORAGE_KEYS.PROPERTIES, JSON.stringify(INITIAL_PROPERTIES));
        return INITIAL_PROPERTIES;
      }
      return JSON.parse(data);
    } catch {
      return INITIAL_PROPERTIES;
    }
  },

  addProperty(property: Omit<Property, 'id' | 'createdAt'>): Property {
    const properties = this.getProperties();
    const newProperty: Property = {
      ...property,
      id: `prop-custom-${Date.now()}`,
      createdAt: new Date().toISOString().split('T')[0],
      isVerified: false, // New submissions start unverified for transparency
    };
    properties.unshift(newProperty);
    localStorage.setItem(STORAGE_KEYS.PROPERTIES, JSON.stringify(properties));
    return newProperty;
  },

  getFavorites(): string[] {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.FAVORITES);
      return data ? JSON.parse(data) : ['prop-mkp-001', 'prop-mkp-002'];
    } catch {
      return ['prop-mkp-001', 'prop-mkp-002'];
    }
  },

  toggleFavorite(propertyId: string): string[] {
    const favs = this.getFavorites();
    const index = favs.indexOf(propertyId);
    let updated: string[];
    if (index >= 0) {
      updated = favs.filter(id => id !== propertyId);
    } else {
      updated = [...favs, propertyId];
    }
    localStorage.setItem(STORAGE_KEYS.FAVORITES, JSON.stringify(updated));
    return updated;
  },

  getEnquiries(): Enquiry[] {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.ENQUIRIES);
      if (!data) {
        localStorage.setItem(STORAGE_KEYS.ENQUIRIES, JSON.stringify(INITIAL_ENQUIRIES));
        return INITIAL_ENQUIRIES;
      }
      return JSON.parse(data);
    } catch {
      return INITIAL_ENQUIRIES;
    }
  },

  addEnquiry(enquiry: Omit<Enquiry, 'id' | 'createdAt' | 'status'>): Enquiry {
    const list = this.getEnquiries();
    const newEnq: Enquiry = {
      ...enquiry,
      id: `enq-${Date.now()}`,
      status: 'Pending',
      createdAt: new Date().toISOString().split('T')[0],
    };
    list.unshift(newEnq);
    localStorage.setItem(STORAGE_KEYS.ENQUIRIES, JSON.stringify(list));
    return newEnq;
  },

  getViewings(): ViewingRequest[] {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.VIEWINGS);
      return data ? JSON.parse(data) : [
        {
          id: 'view-001',
          propertyId: 'prop-mkp-001',
          propertyTitle: 'Spacious 2 BHK near Samuel George Engineering College',
          propertyLocation: 'College Road, Markapur',
          name: 'K. Sai Krishna',
          phone: '+91 99887 76655',
          email: 'krishna.student@gmail.com',
          preferredDate: '2026-10-31',
          preferredTimeSlot: '11:00 AM - 12:30 PM',
          notes: 'Visiting with classmate to inspect study room and water supply.',
          status: 'Confirmed',
          createdAt: '2026-10-28',
        }
      ];
    } catch {
      return [];
    }
  },

  addViewing(viewing: Omit<ViewingRequest, 'id' | 'createdAt' | 'status'>): ViewingRequest {
    const list = this.getViewings();
    const newViewing: ViewingRequest = {
      ...viewing,
      id: `view-${Date.now()}`,
      status: 'Pending',
      createdAt: new Date().toISOString().split('T')[0],
    };
    list.unshift(newViewing);
    localStorage.setItem(STORAGE_KEYS.VIEWINGS, JSON.stringify(list));
    return newViewing;
  },

  getRentRecords(): RentRecord[] {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.RENT_RECORDS);
      if (!data) {
        localStorage.setItem(STORAGE_KEYS.RENT_RECORDS, JSON.stringify(INITIAL_RENT_RECORDS));
        return INITIAL_RENT_RECORDS;
      }
      return JSON.parse(data);
    } catch {
      return INITIAL_RENT_RECORDS;
    }
  },

  updateRentStatus(recordId: string, newStatus: 'Paid' | 'Pending' | 'Overdue'): RentRecord[] {
    const records = this.getRentRecords();
    const updated = records.map(r => {
      if (r.id === recordId) {
        return {
          ...r,
          paymentStatus: newStatus,
          paidDate: newStatus === 'Paid' ? new Date().toISOString().split('T')[0] : undefined,
          paymentMethod: newStatus === 'Paid' ? 'Recorded by Owner' : undefined,
        };
      }
      return r;
    });
    localStorage.setItem(STORAGE_KEYS.RENT_RECORDS, JSON.stringify(updated));
    return updated;
  },

  getMaintenanceRequests(): MaintenanceRequest[] {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.MAINTENANCE);
      if (!data) {
        localStorage.setItem(STORAGE_KEYS.MAINTENANCE, JSON.stringify(INITIAL_MAINTENANCE_REQUESTS));
        return INITIAL_MAINTENANCE_REQUESTS;
      }
      return JSON.parse(data);
    } catch {
      return INITIAL_MAINTENANCE_REQUESTS;
    }
  },

  updateMaintenanceStatus(id: string, status: 'Open' | 'In Progress' | 'Resolved'): MaintenanceRequest[] {
    const list = this.getMaintenanceRequests();
    const updated = list.map(item => {
      if (item.id === id) {
        return {
          ...item,
          status,
          resolvedDate: status === 'Resolved' ? new Date().toISOString().split('T')[0] : undefined,
        };
      }
      return item;
    });
    localStorage.setItem(STORAGE_KEYS.MAINTENANCE, JSON.stringify(updated));
    return updated;
  },

  addMaintenanceRequest(req: Omit<MaintenanceRequest, 'id' | 'reportedDate' | 'status'>): MaintenanceRequest {
    const list = this.getMaintenanceRequests();
    const newItem: MaintenanceRequest = {
      ...req,
      id: `maint-${Date.now()}`,
      status: 'Open',
      reportedDate: new Date().toISOString().split('T')[0],
    };
    list.unshift(newItem);
    localStorage.setItem(STORAGE_KEYS.MAINTENANCE, JSON.stringify(list));
    return newItem;
  },

  getCurrentUser(): User | null {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.CURRENT_USER);
      return data ? JSON.parse(data) : DEMO_USERS[0]; // Default to Demo Tenant
    } catch {
      return DEMO_USERS[0];
    }
  },

  setCurrentUser(user: User | null) {
    if (user) {
      localStorage.setItem(STORAGE_KEYS.CURRENT_USER, JSON.stringify(user));
    } else {
      localStorage.removeItem(STORAGE_KEYS.CURRENT_USER);
    }
  },

  resetDemoData() {
    localStorage.setItem(STORAGE_KEYS.PROPERTIES, JSON.stringify(INITIAL_PROPERTIES));
    localStorage.setItem(STORAGE_KEYS.RENT_RECORDS, JSON.stringify(INITIAL_RENT_RECORDS));
    localStorage.setItem(STORAGE_KEYS.MAINTENANCE, JSON.stringify(INITIAL_MAINTENANCE_REQUESTS));
    localStorage.setItem(STORAGE_KEYS.ENQUIRIES, JSON.stringify(INITIAL_ENQUIRIES));
  }
};
