import React, { createContext, useContext, useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import { useAuth } from './AuthContext';

interface BookingContextType {
  currentService: any | null;
  setCurrentService: (service: any) => void;
  bookings: any[];
  createBooking: (bookingData: any) => Promise<{ error: any; data?: any }>;
  applyCoupon: (code: string, amount: number) => Promise<{ error: any; coupon?: any }>;
  loading: boolean;
  refreshBookings: () => Promise<void>;
}

const BookingContext = createContext<BookingContextType | undefined>(undefined);

export const useBooking = () => {
  const context = useContext(BookingContext);
  if (!context) {
    throw new Error('useBooking must be used within a BookingProvider');
  }
  return context;
};

export const BookingProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user } = useAuth();
  const [currentService, setCurrentService] = useState<any>(null);
  const [bookings, setBookings] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchBookings = async () => {
    if (!user) return;

    setLoading(true);
    const { data, error } = await supabase
      .from('bookings')
      .select(`
        *,
        services(name, image_url, categories(name), cities(name)),
        vendor_profiles(business_name)
      `)
      .eq('user_id', user.id)
      .order('created_at', { ascending: false });

    if (!error && data) {
      setBookings(data);
    }
    setLoading(false);
  };

  const refreshBookings = async () => {
    await fetchBookings();
  };

  useEffect(() => {
    if (user) {
      fetchBookings();
    } else {
      setBookings([]);
    }
  }, [user]);

  const applyCoupon = async (code: string, amount: number) => {
    const { data, error } = await supabase
      .from('coupons')
      .select('*')
      .eq('code', code.toUpperCase())
      .eq('is_active', true)
      .single();

    if (error || !data) {
      return { error: new Error('Invalid coupon code') };
    }

    // Check if coupon is expired
    if (data.expires_at && new Date(data.expires_at) < new Date()) {
      return { error: new Error('Coupon has expired') };
    }

    // Check usage limit
    if (data.usage_limit && data.used_count >= data.usage_limit) {
      return { error: new Error('Coupon usage limit reached') };
    }

    // Check minimum amount
    if (amount < data.min_amount) {
      return { error: new Error(`Minimum order amount is ₹${data.min_amount}`) };
    }

    return { error: null, coupon: data };
  };

  const createBooking = async (bookingData: any) => {
    if (!user) {
      return { error: new Error('User not authenticated') };
    }

    // Calculate amounts
    const subtotal = bookingData.service.price;
    let discountAmount = 0;
    let couponId = null;

    if (bookingData.coupon) {
      couponId = bookingData.coupon.id;
      if (bookingData.coupon.discount_type === 'percentage') {
        discountAmount = Math.min(
          (subtotal * bookingData.coupon.discount_value) / 100,
          bookingData.coupon.max_discount || Infinity
        );
      } else {
        discountAmount = bookingData.coupon.discount_value;
      }
    }

    const totalAmount = Math.max(subtotal - discountAmount, 0);
    const platformFee = totalAmount * 0.15; // 15% platform fee
    const vendorEarning = totalAmount - platformFee;

    const booking = {
      user_id: user.id,
      service_id: bookingData.service.id,
      vendor_id: bookingData.service.vendor_id,
      booking_date: bookingData.date,
      booking_time: bookingData.time,
      special_requests: bookingData.specialRequests || null,
      billing_address: {
        address: bookingData.billingAddress,
      },
      payment_method: bookingData.paymentMethod,
      coupon_id: couponId,
      subtotal,
      discount_amount: discountAmount,
      total_amount: totalAmount,
      vendor_earning: vendorEarning,
      platform_fee: platformFee,
      status: 'pending',
      payment_status: bookingData.paymentMethod === 'cod' ? 'pending' : 'completed',
    };

    const { data, error } = await supabase
      .from('bookings')
      .insert([booking])
      .select(`
        *,
        services(name, image_url, categories(name), cities(name)),
        vendor_profiles(business_name)
      `)
      .single();

    if (error) {
      return { error };
    }

    // Update coupon usage count
    if (couponId) {
      await supabase
        .from('coupons')
        .update({ used_count: bookingData.coupon.used_count + 1 })
        .eq('id', couponId);
    }

    // Update local bookings
    setBookings(prev => [data, ...prev]);

    return { error: null, data };
  };

  const value = {
    currentService,
    setCurrentService,
    bookings,
    createBooking,
    applyCoupon,
    loading,
    refreshBookings,
  };

  return (
    <BookingContext.Provider value={value}>
      {children}
    </BookingContext.Provider>
  );
};