import React, { createContext, useContext, useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import { useAuth } from './AuthContext';

interface AdminContextType {
  // Categories
  categories: any[];
  addCategory: (category: any) => Promise<{ error: any }>;
  updateCategory: (id: string, updates: any) => Promise<{ error: any }>;
  deleteCategory: (id: string) => Promise<{ error: any }>;
  
  // Cities
  cities: any[];
  addCity: (city: any) => Promise<{ error: any }>;
  updateCity: (id: string, updates: any) => Promise<{ error: any }>;
  deleteCity: (id: string) => Promise<{ error: any }>;
  
  // Services
  services: any[];
  addService: (service: any) => Promise<{ error: any }>;
  updateService: (id: string, updates: any) => Promise<{ error: any }>;
  deleteService: (id: string) => Promise<{ error: any }>;
  
  // Users
  users: any[];
  updateUser: (id: string, updates: any) => Promise<{ error: any }>;
  deleteUser: (id: string) => Promise<{ error: any }>;
  
  // Bookings
  bookings: any[];
  updateBookingStatus: (id: string, status: string) => Promise<{ error: any }>;
  deleteBooking: (id: string) => Promise<{ error: any }>;
  
  // Vendor Applications
  vendorApplications: any[];
  approveVendorApplication: (id: string) => Promise<{ error: any }>;
  rejectVendorApplication: (id: string, reason?: string) => Promise<{ error: any }>;
  
  // Coupons
  coupons: any[];
  addCoupon: (coupon: any) => Promise<{ error: any }>;
  updateCoupon: (id: string, updates: any) => Promise<{ error: any }>;
  deleteCoupon: (id: string) => Promise<{ error: any }>;
  
  // Stats
  getStats: () => {
    totalUsers: number;
    totalServices: number;
    totalBookings: number;
    totalRevenue: number;
    pendingBookings: number;
    completedBookings: number;
  };
  
  // Loading states
  loading: boolean;
  refreshData: () => Promise<void>;
}

const AdminContext = createContext<AdminContextType | undefined>(undefined);

export const useAdmin = () => {
  const context = useContext(AdminContext);
  if (!context) {
    throw new Error('useAdmin must be used within an AdminProvider');
  }
  return context;
};

export const AdminProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { profile } = useAuth();
  const [categories, setCategories] = useState<any[]>([]);
  const [cities, setCities] = useState<any[]>([]);
  const [services, setServices] = useState<any[]>([]);
  const [users, setUsers] = useState<any[]>([]);
  const [bookings, setBookings] = useState<any[]>([]);
  const [vendorApplications, setVendorApplications] = useState<any[]>([]);
  const [coupons, setCoupons] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const isAdmin = profile?.role === 'admin';

  const fetchCategories = async () => {
    const { data, error } = await supabase
      .from('categories')
      .select('*')
      .order('name');
    
    if (!error && data) {
      setCategories(data);
    }
  };

  const fetchCities = async () => {
    const { data, error } = await supabase
      .from('cities')
      .select('*')
      .order('name');
    
    if (!error && data) {
      setCities(data);
    }
  };

  const fetchServices = async () => {
    const { data, error } = await supabase
      .from('services')
      .select(`
        *,
        categories(name, slug),
        cities(name),
        vendor_profiles(business_name, user_id)
      `)
      .order('created_at', { ascending: false });
    
    if (!error && data) {
      setServices(data);
    }
  };

  const fetchUsers = async () => {
    if (!isAdmin) return;
    
    const { data, error } = await supabase
      .from('profiles')
      .select('*')
      .order('created_at', { ascending: false });
    
    if (!error && data) {
      setUsers(data);
    }
  };

  const fetchBookings = async () => {
    if (!isAdmin) return;
    
    const { data, error } = await supabase
      .from('bookings')
      .select(`
        *,
        profiles(name, email),
        services(name, image_url),
        vendor_profiles(business_name)
      `)
      .order('created_at', { ascending: false });
    
    if (!error && data) {
      setBookings(data);
    }
  };

  const fetchVendorApplications = async () => {
    if (!isAdmin) return;
    
    const { data, error } = await supabase
      .from('vendor_applications')
      .select(`
        *,
        profiles(name, email, phone)
      `)
      .order('created_at', { ascending: false });
    
    if (!error && data) {
      setVendorApplications(data);
    }
  };

  const fetchCoupons = async () => {
    const { data, error } = await supabase
      .from('coupons')
      .select('*')
      .order('created_at', { ascending: false });
    
    if (!error && data) {
      setCoupons(data);
    }
  };

  const refreshData = async () => {
    setLoading(true);
    await Promise.all([
      fetchCategories(),
      fetchCities(),
      fetchServices(),
      fetchUsers(),
      fetchBookings(),
      fetchVendorApplications(),
      fetchCoupons(),
    ]);
    setLoading(false);
  };

  useEffect(() => {
    if (profile) {
      refreshData();
    }
  }, [profile]);

  // Category operations
  const addCategory = async (category: any) => {
    const { data, error } = await supabase
      .from('categories')
      .insert([category])
      .select()
      .single();

    if (!error && data) {
      setCategories(prev => [...prev, data]);
    }

    return { error };
  };

  const updateCategory = async (id: string, updates: any) => {
    const { data, error } = await supabase
      .from('categories')
      .update(updates)
      .eq('id', id)
      .select()
      .single();

    if (!error && data) {
      setCategories(prev => prev.map(cat => cat.id === id ? data : cat));
    }

    return { error };
  };

  const deleteCategory = async (id: string) => {
    const { error } = await supabase
      .from('categories')
      .delete()
      .eq('id', id);

    if (!error) {
      setCategories(prev => prev.filter(cat => cat.id !== id));
    }

    return { error };
  };

  // City operations
  const addCity = async (city: any) => {
    const { data, error } = await supabase
      .from('cities')
      .insert([city])
      .select()
      .single();

    if (!error && data) {
      setCities(prev => [...prev, data]);
    }

    return { error };
  };

  const updateCity = async (id: string, updates: any) => {
    const { data, error } = await supabase
      .from('cities')
      .update(updates)
      .eq('id', id)
      .select()
      .single();

    if (!error && data) {
      setCities(prev => prev.map(city => city.id === id ? data : city));
    }

    return { error };
  };

  const deleteCity = async (id: string) => {
    const { error } = await supabase
      .from('cities')
      .delete()
      .eq('id', id);

    if (!error) {
      setCities(prev => prev.filter(city => city.id !== id));
    }

    return { error };
  };

  // Service operations
  const addService = async (service: any) => {
    const { data, error } = await supabase
      .from('services')
      .insert([{ ...service, admin_created: true }])
      .select(`
        *,
        categories(name, slug),
        cities(name),
        vendor_profiles(business_name, user_id)
      `)
      .single();

    if (!error && data) {
      setServices(prev => [data, ...prev]);
    }

    return { error };
  };

  const updateService = async (id: string, updates: any) => {
    const { data, error } = await supabase
      .from('services')
      .update(updates)
      .eq('id', id)
      .select(`
        *,
        categories(name, slug),
        cities(name),
        vendor_profiles(business_name, user_id)
      `)
      .single();

    if (!error && data) {
      setServices(prev => prev.map(service => service.id === id ? data : service));
    }

    return { error };
  };

  const deleteService = async (id: string) => {
    const { error } = await supabase
      .from('services')
      .delete()
      .eq('id', id);

    if (!error) {
      setServices(prev => prev.filter(service => service.id !== id));
    }

    return { error };
  };

  // User operations
  const updateUser = async (id: string, updates: any) => {
    const { data, error } = await supabase
      .from('profiles')
      .update(updates)
      .eq('id', id)
      .select()
      .single();

    if (!error && data) {
      setUsers(prev => prev.map(user => user.id === id ? data : user));
    }

    return { error };
  };

  const deleteUser = async (id: string) => {
    const { error } = await supabase.auth.admin.deleteUser(id);

    if (!error) {
      setUsers(prev => prev.filter(user => user.id !== id));
    }

    return { error };
  };

  // Booking operations
  const updateBookingStatus = async (id: string, status: string) => {
    const { data, error } = await supabase
      .from('bookings')
      .update({ status })
      .eq('id', id)
      .select(`
        *,
        profiles(name, email),
        services(name, image_url),
        vendor_profiles(business_name)
      `)
      .single();

    if (!error && data) {
      setBookings(prev => prev.map(booking => booking.id === id ? data : booking));
    }

    return { error };
  };

  const deleteBooking = async (id: string) => {
    const { error } = await supabase
      .from('bookings')
      .delete()
      .eq('id', id);

    if (!error) {
      setBookings(prev => prev.filter(booking => booking.id !== id));
    }

    return { error };
  };

  // Vendor application operations
  const approveVendorApplication = async (id: string) => {
    const application = vendorApplications.find(app => app.id === id);
    if (!application) return { error: new Error('Application not found') };

    // Start transaction
    const { data: updatedApp, error: updateError } = await supabase
      .from('vendor_applications')
      .update({
        status: 'approved',
        reviewed_by: profile?.id,
        reviewed_at: new Date().toISOString(),
      })
      .eq('id', id)
      .select()
      .single();

    if (updateError) return { error: updateError };

    // Create vendor profile
    const { data: vendorProfile, error: vendorError } = await supabase
      .from('vendor_profiles')
      .insert([{
        user_id: application.user_id,
        business_name: application.business_name,
        business_type: application.business_type,
        business_address: application.business_address,
        business_description: application.business_description,
        experience: application.experience,
        documents: application.documents,
      }])
      .select()
      .single();

    if (vendorError) return { error: vendorError };

    // Update user role
    const { error: roleError } = await supabase
      .from('profiles')
      .update({ role: 'vendor' })
      .eq('id', application.user_id);

    if (roleError) return { error: roleError };

    // Update local state
    setVendorApplications(prev => 
      prev.map(app => app.id === id ? updatedApp : app)
    );

    return { error: null };
  };

  const rejectVendorApplication = async (id: string, reason?: string) => {
    const { data, error } = await supabase
      .from('vendor_applications')
      .update({
        status: 'rejected',
        reviewed_by: profile?.id,
        reviewed_at: new Date().toISOString(),
        rejection_reason: reason,
      })
      .eq('id', id)
      .select()
      .single();

    if (!error && data) {
      setVendorApplications(prev => 
        prev.map(app => app.id === id ? data : app)
      );
    }

    return { error };
  };

  // Coupon operations
  const addCoupon = async (coupon: any) => {
    const { data, error } = await supabase
      .from('coupons')
      .insert([coupon])
      .select()
      .single();

    if (!error && data) {
      setCoupons(prev => [data, ...prev]);
    }

    return { error };
  };

  const updateCoupon = async (id: string, updates: any) => {
    const { data, error } = await supabase
      .from('coupons')
      .update(updates)
      .eq('id', id)
      .select()
      .single();

    if (!error && data) {
      setCoupons(prev => prev.map(coupon => coupon.id === id ? data : coupon));
    }

    return { error };
  };

  const deleteCoupon = async (id: string) => {
    const { error } = await supabase
      .from('coupons')
      .delete()
      .eq('id', id);

    if (!error) {
      setCoupons(prev => prev.filter(coupon => coupon.id !== id));
    }

    return { error };
  };

  // Stats
  const getStats = () => {
    const totalRevenue = bookings.reduce((sum, booking) => sum + booking.total_amount, 0);
    const pendingBookings = bookings.filter(booking => booking.status === 'pending').length;
    const completedBookings = bookings.filter(booking => booking.status === 'completed').length;

    return {
      totalUsers: users.length,
      totalServices: services.length,
      totalBookings: bookings.length,
      totalRevenue,
      pendingBookings,
      completedBookings,
    };
  };

  const value = {
    categories,
    addCategory,
    updateCategory,
    deleteCategory,
    cities,
    addCity,
    updateCity,
    deleteCity,
    services,
    addService,
    updateService,
    deleteService,
    users,
    updateUser,
    deleteUser,
    bookings,
    updateBookingStatus,
    deleteBooking,
    vendorApplications,
    approveVendorApplication,
    rejectVendorApplication,
    coupons,
    addCoupon,
    updateCoupon,
    deleteCoupon,
    getStats,
    loading,
    refreshData,
  };

  return (
    <AdminContext.Provider value={value}>
      {children}
    </AdminContext.Provider>
  );
};