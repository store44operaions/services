import React, { createContext, useContext, useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import { useAuth } from './AuthContext';

interface VendorContextType {
  // Vendor profile
  vendorProfile: any | null;
  isVendor: boolean;
  
  // Applications
  application: any | null;
  submitApplication: (applicationData: any) => Promise<{ error: any }>;
  
  // Services
  services: any[];
  addService: (service: any) => Promise<{ error: any }>;
  updateService: (id: string, updates: any) => Promise<{ error: any }>;
  deleteService: (id: string) => Promise<{ error: any }>;
  
  // Bookings
  bookings: any[];
  
  // Stats
  getStats: () => {
    totalBookings: number;
    totalEarnings: number;
    pendingBookings: number;
    completedBookings: number;
  };
  
  loading: boolean;
  refreshData: () => Promise<void>;
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
  const { user, profile } = useAuth();
  const [vendorProfile, setVendorProfile] = useState<any>(null);
  const [application, setApplication] = useState<any>(null);
  const [services, setServices] = useState<any[]>([]);
  const [bookings, setBookings] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const isVendor = profile?.role === 'vendor';

  const fetchVendorProfile = async () => {
    if (!user || !isVendor) return;

    const { data, error } = await supabase
      .from('vendor_profiles')
      .select('*')
      .eq('user_id', user.id)
      .single();

    if (!error && data) {
      setVendorProfile(data);
    }
  };

  const fetchApplication = async () => {
    if (!user) return;

    const { data, error } = await supabase
      .from('vendor_applications')
      .select('*')
      .eq('user_id', user.id)
      .single();

    if (!error && data) {
      setApplication(data);
    }
  };

  const fetchServices = async () => {
    if (!vendorProfile) return;

    const { data, error } = await supabase
      .from('services')
      .select(`
        *,
        categories(name, slug),
        cities(name)
      `)
      .eq('vendor_id', vendorProfile.id)
      .order('created_at', { ascending: false });

    if (!error && data) {
      setServices(data);
    }
  };

  const fetchBookings = async () => {
    if (!vendorProfile) return;

    const { data, error } = await supabase
      .from('bookings')
      .select(`
        *,
        profiles(name, email),
        services(name, image_url)
      `)
      .eq('vendor_id', vendorProfile.id)
      .order('created_at', { ascending: false });

    if (!error && data) {
      setBookings(data);
    }
  };

  const refreshData = async () => {
    setLoading(true);
    await fetchVendorProfile();
    await fetchApplication();
    if (vendorProfile) {
      await Promise.all([
        fetchServices(),
        fetchBookings(),
      ]);
    }
    setLoading(false);
  };

  useEffect(() => {
    if (user) {
      refreshData();
    }
  }, [user, profile]);

  useEffect(() => {
    if (vendorProfile) {
      fetchServices();
      fetchBookings();
    }
  }, [vendorProfile]);

  const submitApplication = async (applicationData: any) => {
    if (!user) return { error: new Error('No user logged in') };

    const { data, error } = await supabase
      .from('vendor_applications')
      .insert([{
        ...applicationData,
        user_id: user.id,
      }])
      .select()
      .single();

    if (!error && data) {
      setApplication(data);
    }

    return { error };
  };

  const addService = async (service: any) => {
    if (!vendorProfile) return { error: new Error('No vendor profile') };

    const { data, error } = await supabase
      .from('services')
      .insert([{
        ...service,
        vendor_id: vendorProfile.id,
      }])
      .select(`
        *,
        categories(name, slug),
        cities(name)
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
      .eq('vendor_id', vendorProfile?.id)
      .select(`
        *,
        categories(name, slug),
        cities(name)
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
      .eq('id', id)
      .eq('vendor_id', vendorProfile?.id);

    if (!error) {
      setServices(prev => prev.filter(service => service.id !== id));
    }

    return { error };
  };

  const getStats = () => {
    const totalEarnings = bookings
      .filter(booking => booking.status === 'completed')
      .reduce((sum, booking) => sum + booking.vendor_earning, 0);

    return {
      totalBookings: bookings.length,
      totalEarnings,
      pendingBookings: bookings.filter(b => b.status === 'pending').length,
      completedBookings: bookings.filter(b => b.status === 'completed').length,
    };
  };

  const value = {
    vendorProfile,
    isVendor,
    application,
    submitApplication,
    services,
    addService,
    updateService,
    deleteService,
    bookings,
    getStats,
    loading,
    refreshData,
  };

  return (
    <VendorContext.Provider value={value}>
      {children}
    </VendorContext.Provider>
  );
};