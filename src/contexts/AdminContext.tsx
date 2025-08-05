import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

// Types
export interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  city: string;
  isVendor: boolean;
  createdAt: string;
}

export interface Service {
  id: string;
  name: string;
  category: string;
  city: string;
  price: number;
  rating: number;
  image: string;
  description: string;
  features: string[];
  vendorId?: string;
  vendorName?: string;
}

export interface Booking {
  id: string;
  userId: string;
  userName: string;
  userEmail: string;
  serviceId: string;
  serviceName: string;
  vendorId?: string;
  vendorName?: string;
  date: string;
  time: string;
  status: 'pending' | 'confirmed' | 'completed' | 'cancelled';
  totalAmount: number;
  paymentMethod: string;
  specialRequests?: string;
  billingAddress: {
    street: string;
    city: string;
    state: string;
    pincode: string;
  };
}

export interface Category {
  id: string;
  name: string;
  icon: string;
  description: string;
}

export interface VendorApplication {
  id: string;
  userId: string;
  userName: string;
  userEmail: string;
  businessName: string;
  businessType: string;
  experience: string;
  city: string;
  phone: string;
  description: string;
  status: 'pending' | 'approved' | 'rejected';
  appliedAt: string;
  reviewedAt?: string;
}

export interface VendorProfile {
  id: string;
  userId: string;
  businessName: string;
  businessType: string;
  experience: string;
  city: string;
  phone: string;
  description: string;
  totalEarnings: number;
  totalBookings: number;
  rating: number;
  createdAt: string;
}

interface AdminContextType {
  isAdminAuthenticated: boolean;
  adminLogin: (email: string, password: string) => boolean;
  adminLogout: () => void;
  
  // Users management
  users: User[];
  addUser: (user: Omit<User, 'id' | 'createdAt'>) => void;
  updateUser: (id: string, user: Partial<User>) => void;
  deleteUser: (id: string) => void;
  
  // Services management
  services: Service[];
  addService: (service: Omit<Service, 'id'>) => void;
  updateService: (id: string, service: Partial<Service>) => void;
  deleteService: (id: string) => void;
  
  // Bookings management
  bookings: Booking[];
  updateBookingStatus: (id: string, status: Booking['status']) => void;
  deleteBooking: (id: string) => void;
  
  // Cities management
  cities: string[];
  addCity: (city: string) => void;
  updateCity: (oldCity: string, newCity: string) => void;
  deleteCity: (city: string) => void;
  
  // Categories management
  categories: Category[];
  addCategory: (category: Omit<Category, 'id'>) => void;
  updateCategory: (id: string, category: Partial<Category>) => void;
  deleteCategory: (id: string) => void;
  
  // Vendor applications management
  vendorApplications: VendorApplication[];
  approveVendorApplication: (id: string) => void;
  rejectVendorApplication: (id: string) => void;
  
  // Vendor profiles
  vendorProfiles: VendorProfile[];
  
  // Statistics
  getStats: () => {
    totalUsers: number;
    totalServices: number;
    totalBookings: number;
    totalRevenue: number;
    pendingBookings: number;
    completedBookings: number;
  };
}

const AdminContext = createContext<AdminContextType | undefined>(undefined);

export const useAdmin = () => {
  const context = useContext(AdminContext);
  if (context === undefined) {
    throw new Error('useAdmin must be used within an AdminProvider');
  }
  return context;
};

interface AdminProviderProps {
  children: ReactNode;
}

export const AdminProvider: React.FC<AdminProviderProps> = ({ children }) => {
  const [isAdminAuthenticated, setIsAdminAuthenticated] = useState(false);
  const [users, setUsers] = useState<User[]>([]);
  const [services, setServices] = useState<Service[]>([]);
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [cities, setCities] = useState<string[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [vendorApplications, setVendorApplications] = useState<VendorApplication[]>([]);
  const [vendorProfiles, setVendorProfiles] = useState<VendorProfile[]>([]);

  // Load data from localStorage on mount
  useEffect(() => {
    const adminAuth = localStorage.getItem('adminAuthenticated');
    if (adminAuth === 'true') {
      setIsAdminAuthenticated(true);
    }

    // Load users from the main users storage
    const storedUsers = localStorage.getItem('users');
    if (storedUsers) {
      const allUsers = JSON.parse(storedUsers);
      // Convert to admin user format
      const adminUsers = allUsers.map((user: any) => ({
        id: user.id,
        name: user.name,
        email: user.email,
        phone: user.phone,
        address: user.address || '',
        status: 'active',
        createdAt: new Date().toISOString()
      }));
      setUsers(adminUsers);
    }

    const storedServices = localStorage.getItem('admin_services');
    if (storedServices) {
      setServices(JSON.parse(storedServices));
    }

    // Load all bookings from global storage
    const storedBookings = localStorage.getItem('allBookings');
    if (storedBookings) {
      setBookings(JSON.parse(storedBookings));
    }

    const storedCities = localStorage.getItem('admin_cities');
    if (storedCities) {
      setCities(JSON.parse(storedCities));
    } else {
      // Default Bihar cities
      const defaultCities = [
        'Patna', 'Gaya', 'Bhagalpur', 'Muzaffarpur', 'Purnia', 'Darbhanga',
        'Bihar Sharif', 'Arrah', 'Begusarai', 'Katihar', 'Munger', 'Chhapra',
        'Danapur', 'Saharsa', 'Hajipur', 'Sasaram', 'Dehri', 'Siwan',
        'Motihari', 'Nawada', 'Bagaha', 'Buxar', 'Kishanganj', 'Sitamarhi',
        'Jamalpur', 'Jehanabad', 'Aurangabad'
      ];
      setCities(defaultCities);
      localStorage.setItem('admin_cities', JSON.stringify(defaultCities));
    }

    const storedCategories = localStorage.getItem('admin_categories');
    if (storedCategories) {
      setCategories(JSON.parse(storedCategories));
    } else {
      // Default categories
      const defaultCategories = [
        { id: '1', name: 'Salon & Spa', icon: 'Scissors', description: 'Beauty and wellness services' },
        { id: '2', name: 'Event Decoration', icon: 'Sparkles', description: 'Event decoration and planning' },
        { id: '3', name: 'Car Rental', icon: 'Car', description: 'Vehicle rental services' },
        { id: '4', name: 'DJ Service', icon: 'Music', description: 'Music and entertainment' },
        { id: '5', name: 'Hotels', icon: 'Building', description: 'Accommodation services' },
        { id: '6', name: 'Catering', icon: 'ChefHat', description: 'Food and catering services' }
      ];
      setCategories(defaultCategories);
      localStorage.setItem('admin_categories', JSON.stringify(defaultCategories));
    }

    // Load vendor applications
    const storedVendorApplications = localStorage.getItem('vendorApplications');
    if (storedVendorApplications) {
      setVendorApplications(JSON.parse(storedVendorApplications));
    }

    const storedVendorProfiles = localStorage.getItem('approvedVendors');
    if (storedVendorProfiles) {
      setVendorProfiles(JSON.parse(storedVendorProfiles));
    }
  }, []);

  // Admin authentication
  const adminLogin = (email: string, password: string): boolean => {
    if (email === 'admin@biharservices.com' && password === 'admin123') {
      setIsAdminAuthenticated(true);
      localStorage.setItem('adminAuthenticated', 'true');
      return true;
    }
    return false;
  };

  const adminLogout = () => {
    setIsAdminAuthenticated(false);
    localStorage.removeItem('adminAuthenticated');
  };

  // Users management
  const addUser = (user: Omit<User, 'id' | 'createdAt'>) => {
    const newUser: User = {
      ...user,
      id: Date.now().toString(),
      createdAt: new Date().toISOString()
    };
    const updatedUsers = [...users, newUser];
    setUsers(updatedUsers);
    localStorage.setItem('admin_users', JSON.stringify(updatedUsers));
  };

  const updateUser = (id: string, userUpdate: Partial<User>) => {
    const updatedUsers = users.map(user => 
      user.id === id ? { ...user, ...userUpdate } : user
    );
    setUsers(updatedUsers);
    localStorage.setItem('admin_users', JSON.stringify(updatedUsers));
  };

  const deleteUser = (id: string) => {
    const updatedUsers = users.filter(user => user.id !== id);
    setUsers(updatedUsers);
    localStorage.setItem('admin_users', JSON.stringify(updatedUsers));
  };

  // Services management
  const addService = (service: Omit<Service, 'id'>) => {
    const newService: Service = {
      ...service,
      id: Date.now().toString()
    };
    const updatedServices = [...services, newService];
    setServices(updatedServices);
    localStorage.setItem('admin_services', JSON.stringify(updatedServices));
  };

  const updateService = (id: string, serviceUpdate: Partial<Service>) => {
    const updatedServices = services.map(service => 
      service.id === id ? { ...service, ...serviceUpdate } : service
    );
    setServices(updatedServices);
    localStorage.setItem('admin_services', JSON.stringify(updatedServices));
  };

  const deleteService = (id: string) => {
    const updatedServices = services.filter(service => service.id !== id);
    setServices(updatedServices);
    localStorage.setItem('admin_services', JSON.stringify(updatedServices));
  };

  // Bookings management
  const updateBookingStatus = (id: string, status: Booking['status']) => {
    const updatedBookings = bookings.map(booking => 
      booking.id === id ? { ...booking, status } : booking
    );
    setBookings(updatedBookings);
    localStorage.setItem('allBookings', JSON.stringify(updatedBookings));
  };

  const deleteBooking = (id: string) => {
    const updatedBookings = bookings.filter(booking => booking.id !== id);
    setBookings(updatedBookings);
    localStorage.setItem('allBookings', JSON.stringify(updatedBookings));
  };

  // Cities management
  const addCity = (city: string) => {
    if (!cities.includes(city)) {
      const updatedCities = [...cities, city].sort();
      setCities(updatedCities);
      localStorage.setItem('admin_cities', JSON.stringify(updatedCities));
    }
  };

  const updateCity = (oldCity: string, newCity: string) => {
    const updatedCities = cities.map(city => city === oldCity ? newCity : city).sort();
    setCities(updatedCities);
    localStorage.setItem('admin_cities', JSON.stringify(updatedCities));
    
    // Update services that use this city
    const updatedServices = services.map(service => 
      service.city === oldCity ? { ...service, city: newCity } : service
    );
    setServices(updatedServices);
    localStorage.setItem('admin_services', JSON.stringify(updatedServices));
  };

  const deleteCity = (city: string) => {
    const updatedCities = cities.filter(c => c !== city);
    setCities(updatedCities);
    localStorage.setItem('admin_cities', JSON.stringify(updatedCities));
    
    // Remove services from this city
    const updatedServices = services.filter(service => service.city !== city);
    setServices(updatedServices);
    localStorage.setItem('admin_services', JSON.stringify(updatedServices));
  };

  // Categories management
  const addCategory = (category: Omit<Category, 'id'>) => {
    const newCategory: Category = {
      ...category,
      id: Date.now().toString()
    };
    const updatedCategories = [...categories, newCategory];
    setCategories(updatedCategories);
    localStorage.setItem('admin_categories', JSON.stringify(updatedCategories));
  };

  const updateCategory = (id: string, categoryUpdate: Partial<Category>) => {
    const updatedCategories = categories.map(category => 
      category.id === id ? { ...category, ...categoryUpdate } : category
    );
    setCategories(updatedCategories);
    localStorage.setItem('admin_categories', JSON.stringify(updatedCategories));
  };

  const deleteCategory = (id: string) => {
    const categoryToDelete = categories.find(cat => cat.id === id);
    if (categoryToDelete) {
      const updatedCategories = categories.filter(category => category.id !== id);
      setCategories(updatedCategories);
      localStorage.setItem('admin_categories', JSON.stringify(updatedCategories));
      
      // Remove services from this category
      const updatedServices = services.filter(service => service.category !== categoryToDelete.name);
      setServices(updatedServices);
      localStorage.setItem('admin_services', JSON.stringify(updatedServices));
    }
  };

  // Vendor applications management
  const approveVendorApplication = (id: string) => {
    const application = vendorApplications.find(app => app.id === id);
    if (application) {
      // Update application status
      const updatedApplications = vendorApplications.map(app => 
        app.id === id ? { ...app, status: 'approved' as const, reviewedAt: new Date().toISOString() } : app
      );
      setVendorApplications(updatedApplications);
      localStorage.setItem('vendor_applications', JSON.stringify(updatedApplications));

      // Create vendor profile
      const newVendorProfile: VendorProfile = {
        id: Date.now().toString(),
        userId: application.userId,
        businessName: application.businessName,
        businessType: application.businessType,
        experience: application.experience,
        city: application.city,
        phone: application.phone,
        description: application.description,
        totalEarnings: 0,
        totalBookings: 0,
        rating: 0,
        createdAt: new Date().toISOString()
      };
      
      const updatedVendorProfiles = [...vendorProfiles, newVendorProfile];
      setVendorProfiles(updatedVendorProfiles);
      localStorage.setItem('vendor_profiles', JSON.stringify(updatedVendorProfiles));

      // Update user to vendor status
      const updatedUsers = users.map(user => 
        user.id === application.userId ? { ...user, isVendor: true } : user
      );
      setUsers(updatedUsers);
      localStorage.setItem('admin_users', JSON.stringify(updatedUsers));
    }
  };

  const rejectVendorApplication = (id: string) => {
    const updatedApplications = vendorApplications.map(app => 
      app.id === id ? { ...app, status: 'rejected' as const, reviewedAt: new Date().toISOString() } : app
    );
    setVendorApplications(updatedApplications);
    localStorage.setItem('vendor_applications', JSON.stringify(updatedApplications));
  };

  // Statistics function
  const getStats = () => {
    const totalRevenue = bookings.reduce((sum, booking) => sum + booking.totalAmount, 0);
    const pendingBookings = bookings.filter(booking => booking.status === 'pending').length;
    const completedBookings = bookings.filter(booking => booking.status === 'completed').length;
    
    return {
      totalUsers: users.length,
      totalServices: services.length,
      totalBookings: bookings.length,
      totalRevenue,
      pendingBookings,
      completedBookings
    };
  };

  const value: AdminContextType = {
    isAdminAuthenticated,
    adminLogin,
    adminLogout,
    users,
    addUser,
    updateUser,
    deleteUser,
    services,
    addService,
    updateService,
    deleteService,
    bookings,
    updateBookingStatus,
    deleteBooking,
    cities,
    addCity,
    updateCity,
    deleteCity,
    categories,
    addCategory,
    updateCategory,
    deleteCategory,
    vendorApplications,
    approveVendorApplication,
    rejectVendorApplication,
    vendorProfiles,
    getStats
  };

  return (
    <AdminContext.Provider value={value}>
      {children}
    </AdminContext.Provider>
  );
};