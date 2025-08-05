import React, { createContext, useContext, useState, useEffect } from 'react';

interface VendorApplication {
  id: string;
  userId: string;
  userName: string;
  userEmail: string;
  userPhone: string;
  businessName: string;
  businessType: string;
  businessAddress: string;
  businessDescription: string;
  experience: string;
  documents: string;
  status: 'pending' | 'approved' | 'rejected';
  appliedAt: string;
  reviewedAt?: string;
  reviewedBy?: string;
}

interface VendorProfile {
  id: string;
  userId: string;
  businessName: string;
  businessType: string;
  businessAddress: string;
  businessDescription: string;
  experience: string;
  documents: string;
  status: 'active' | 'inactive';
  approvedAt: string;
  totalEarnings: number;
  totalBookings: number;
}

interface VendorService {
  id: string;
  vendorId: string;
  name: string;
  category: string;
  location: string;
  price: number;
  rating: number;
  image: string;
  description: string;
  features: string[];
  status: 'active' | 'inactive';
  createdAt: string;
}

interface VendorBooking {
  id: string;
  vendorId: string;
  userId: string;
  userName: string;
  userEmail: string;
  service: VendorService;
  date: string;
  time: string;
  specialRequests: string;
  billingAddress: string;
  paymentMethod: 'razorpay' | 'cod';
  couponCode?: string;
  discount: number;
  total: number;
  vendorEarning: number;
  status: 'pending' | 'confirmed' | 'completed' | 'cancelled';
  createdAt: string;
}

interface VendorContextType {
  // Vendor Authentication
  isVendor: boolean;
  vendorProfile: VendorProfile | null;
  
  // Vendor Applications
  applications: VendorApplication[];
  applyForVendor: (applicationData: Omit<VendorApplication, 'id' | 'appliedAt' | 'status'>) => void;
  getUserApplication: (userId: string) => VendorApplication | null;
  
  // Vendor Services
  vendorServices: VendorService[];
  addVendorService: (serviceData: Omit<VendorService, 'id' | 'createdAt'>) => void;
  updateVendorService: (id: string, serviceData: Partial<VendorService>) => void;
  deleteVendorService: (id: string) => void;
  getVendorServices: (vendorId: string) => VendorService[];
  
  // Vendor Bookings
  vendorBookings: VendorBooking[];
  getVendorBookings: (vendorId: string) => VendorBooking[];
  
  // Vendor Stats
  getVendorStats: (vendorId: string) => {
    totalBookings: number;
    totalEarnings: number;
    pendingBookings: number;
    completedBookings: number;
  };
  
  // Check vendor status
  checkVendorStatus: (userId: string) => void;
}

const VendorContext = createContext<VendorContextType | undefined>(undefined);

export const useVendor = () => {
  const context = useContext(VendorContext);
  if (!context) {
    throw new Error('useVendor must be used within a VendorProvider');
  }
  return context;
};

export const VendorProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [applications, setApplications] = useState<VendorApplication[]>([]);
  const [vendorProfile, setVendorProfile] = useState<VendorProfile | null>(null);
  const [isVendor, setIsVendor] = useState(false);
  const [vendorServices, setVendorServices] = useState<VendorService[]>([]);
  const [vendorBookings, setVendorBookings] = useState<VendorBooking[]>([]);

  useEffect(() => {
    // Load applications
    const savedApplications = localStorage.getItem('vendorApplications');
    if (savedApplications) {
      setApplications(JSON.parse(savedApplications));
    }

    // Load vendor services
    const savedVendorServices = localStorage.getItem('vendorServices');
    if (savedVendorServices) {
      setVendorServices(JSON.parse(savedVendorServices));
    }

    // Load vendor bookings
    const savedVendorBookings = localStorage.getItem('vendorBookings');
    if (savedVendorBookings) {
      setVendorBookings(JSON.parse(savedVendorBookings));
    }

    // Check if current user is a vendor
    const currentUser = localStorage.getItem('user');
    if (currentUser) {
      const user = JSON.parse(currentUser);
      checkVendorStatus(user.id);
    }
  }, []);

  const checkVendorStatus = (userId: string) => {
    const savedVendors = localStorage.getItem('approvedVendors');
    if (savedVendors) {
      const vendors: VendorProfile[] = JSON.parse(savedVendors);
      const vendor = vendors.find(v => v.userId === userId);
      if (vendor) {
        setVendorProfile(vendor);
        setIsVendor(true);
      } else {
        setVendorProfile(null);
        setIsVendor(false);
      }
    } else {
      setVendorProfile(null);
      setIsVendor(false);
    }
  };

  const applyForVendor = (applicationData: Omit<VendorApplication, 'id' | 'appliedAt' | 'status'>) => {
    const newApplication: VendorApplication = {
      ...applicationData,
      id: Date.now().toString(),
      status: 'pending',
      appliedAt: new Date().toISOString()
    };

    const updatedApplications = [...applications, newApplication];
    setApplications(updatedApplications);
    localStorage.setItem('vendorApplications', JSON.stringify(updatedApplications));
  };

  const getUserApplication = (userId: string): VendorApplication | null => {
    return applications.find(app => app.userId === userId) || null;
  };

  const addVendorService = (serviceData: Omit<VendorService, 'id' | 'createdAt'>) => {
    const newService: VendorService = {
      ...serviceData,
      id: Date.now().toString(),
      createdAt: new Date().toISOString()
    };

    const updatedServices = [...vendorServices, newService];
    setVendorServices(updatedServices);
    localStorage.setItem('vendorServices', JSON.stringify(updatedServices));
  };

  const updateVendorService = (id: string, serviceData: Partial<VendorService>) => {
    const updatedServices = vendorServices.map(service =>
      service.id === id ? { ...service, ...serviceData } : service
    );
    setVendorServices(updatedServices);
    localStorage.setItem('vendorServices', JSON.stringify(updatedServices));
  };

  const deleteVendorService = (id: string) => {
    const updatedServices = vendorServices.filter(service => service.id !== id);
    setVendorServices(updatedServices);
    localStorage.setItem('vendorServices', JSON.stringify(updatedServices));
  };

  const getVendorServices = (vendorId: string): VendorService[] => {
    return vendorServices.filter(service => service.vendorId === vendorId);
  };

  const getVendorBookings = (vendorId: string): VendorBooking[] => {
    return vendorBookings.filter(booking => booking.vendorId === vendorId);
  };

  const getVendorStats = (vendorId: string) => {
    const bookings = getVendorBookings(vendorId);
    const totalEarnings = bookings
      .filter(booking => booking.status === 'completed')
      .reduce((sum, booking) => sum + booking.vendorEarning, 0);

    return {
      totalBookings: bookings.length,
      totalEarnings,
      pendingBookings: bookings.filter(b => b.status === 'pending').length,
      completedBookings: bookings.filter(b => b.status === 'completed').length
    };
  };

  return (
    <VendorContext.Provider value={{
      isVendor,
      vendorProfile,
      applications,
      applyForVendor,
      getUserApplication,
      vendorServices,
      addVendorService,
      updateVendorService,
      deleteVendorService,
      getVendorServices,
      vendorBookings,
      getVendorBookings,
      getVendorStats,
      checkVendorStatus
    }}>
      {children}
    </VendorContext.Provider>
  );
};