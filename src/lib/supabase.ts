import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Types for our database
export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string;
          email: string;
          name: string;
          phone: string | null;
          address: string | null;
          role: 'user' | 'vendor' | 'admin';
          avatar_url: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id: string;
          email: string;
          name: string;
          phone?: string | null;
          address?: string | null;
          role?: 'user' | 'vendor' | 'admin';
          avatar_url?: string | null;
        };
        Update: {
          name?: string;
          phone?: string | null;
          address?: string | null;
          role?: 'user' | 'vendor' | 'admin';
          avatar_url?: string | null;
        };
      };
      categories: {
        Row: {
          id: string;
          name: string;
          slug: string;
          icon: string | null;
          description: string | null;
          is_active: boolean;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          name: string;
          slug: string;
          icon?: string | null;
          description?: string | null;
          is_active?: boolean;
        };
        Update: {
          name?: string;
          slug?: string;
          icon?: string | null;
          description?: string | null;
          is_active?: boolean;
        };
      };
      cities: {
        Row: {
          id: string;
          name: string;
          state: string;
          is_active: boolean;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          name: string;
          state?: string;
          is_active?: boolean;
        };
        Update: {
          name?: string;
          state?: string;
          is_active?: boolean;
        };
      };
      vendor_applications: {
        Row: {
          id: string;
          user_id: string;
          business_name: string;
          business_type: string;
          business_address: string;
          business_description: string;
          experience: string;
          documents: string | null;
          status: 'pending' | 'approved' | 'rejected';
          reviewed_by: string | null;
          reviewed_at: string | null;
          rejection_reason: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          user_id: string;
          business_name: string;
          business_type: string;
          business_address: string;
          business_description: string;
          experience: string;
          documents?: string | null;
        };
        Update: {
          business_name?: string;
          business_type?: string;
          business_address?: string;
          business_description?: string;
          experience?: string;
          documents?: string | null;
          status?: 'pending' | 'approved' | 'rejected';
          reviewed_by?: string | null;
          reviewed_at?: string | null;
          rejection_reason?: string | null;
        };
      };
      vendor_profiles: {
        Row: {
          id: string;
          user_id: string;
          business_name: string;
          business_type: string;
          business_address: string;
          business_description: string;
          experience: string;
          documents: string | null;
          total_earnings: number;
          total_bookings: number;
          rating: number;
          is_active: boolean;
          approved_at: string;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          user_id: string;
          business_name: string;
          business_type: string;
          business_address: string;
          business_description: string;
          experience: string;
          documents?: string | null;
          total_earnings?: number;
          total_bookings?: number;
          rating?: number;
          is_active?: boolean;
        };
        Update: {
          business_name?: string;
          business_type?: string;
          business_address?: string;
          business_description?: string;
          experience?: string;
          documents?: string | null;
          total_earnings?: number;
          total_bookings?: number;
          rating?: number;
          is_active?: boolean;
        };
      };
      services: {
        Row: {
          id: string;
          vendor_id: string | null;
          admin_created: boolean;
          name: string;
          category_id: string;
          city_id: string;
          price: number;
          rating: number;
          image_url: string;
          description: string;
          features: string[];
          status: 'active' | 'inactive';
          created_at: string;
          updated_at: string;
        };
        Insert: {
          vendor_id?: string | null;
          admin_created?: boolean;
          name: string;
          category_id: string;
          city_id: string;
          price: number;
          rating?: number;
          image_url: string;
          description: string;
          features?: string[];
          status?: 'active' | 'inactive';
        };
        Update: {
          name?: string;
          category_id?: string;
          city_id?: string;
          price?: number;
          rating?: number;
          image_url?: string;
          description?: string;
          features?: string[];
          status?: 'active' | 'inactive';
        };
      };
      bookings: {
        Row: {
          id: string;
          user_id: string;
          service_id: string;
          vendor_id: string | null;
          booking_date: string;
          booking_time: string;
          special_requests: string | null;
          billing_address: any;
          payment_method: 'razorpay' | 'cod';
          coupon_id: string | null;
          subtotal: number;
          discount_amount: number;
          total_amount: number;
          vendor_earning: number;
          platform_fee: number;
          status: 'pending' | 'confirmed' | 'completed' | 'cancelled';
          payment_status: string;
          payment_id: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          user_id: string;
          service_id: string;
          vendor_id?: string | null;
          booking_date: string;
          booking_time: string;
          special_requests?: string | null;
          billing_address: any;
          payment_method: 'razorpay' | 'cod';
          coupon_id?: string | null;
          subtotal: number;
          discount_amount?: number;
          total_amount: number;
          vendor_earning?: number;
          platform_fee?: number;
          status?: 'pending' | 'confirmed' | 'completed' | 'cancelled';
          payment_status?: string;
          payment_id?: string | null;
        };
        Update: {
          booking_date?: string;
          booking_time?: string;
          special_requests?: string | null;
          billing_address?: any;
          payment_method?: 'razorpay' | 'cod';
          coupon_id?: string | null;
          subtotal?: number;
          discount_amount?: number;
          total_amount?: number;
          vendor_earning?: number;
          platform_fee?: number;
          status?: 'pending' | 'confirmed' | 'completed' | 'cancelled';
          payment_status?: string;
          payment_id?: string | null;
        };
      };
      coupons: {
        Row: {
          id: string;
          code: string;
          description: string;
          discount_type: string;
          discount_value: number;
          min_amount: number;
          max_discount: number | null;
          usage_limit: number | null;
          used_count: number;
          is_active: boolean;
          expires_at: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          code: string;
          description: string;
          discount_type?: string;
          discount_value: number;
          min_amount?: number;
          max_discount?: number | null;
          usage_limit?: number | null;
          used_count?: number;
          is_active?: boolean;
          expires_at?: string | null;
        };
        Update: {
          code?: string;
          description?: string;
          discount_type?: string;
          discount_value?: number;
          min_amount?: number;
          max_discount?: number | null;
          usage_limit?: number | null;
          used_count?: number;
          is_active?: boolean;
          expires_at?: string | null;
        };
      };
      reviews: {
        Row: {
          id: string;
          booking_id: string;
          user_id: string;
          service_id: string;
          vendor_id: string | null;
          rating: number;
          comment: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          booking_id: string;
          user_id: string;
          service_id: string;
          vendor_id?: string | null;
          rating: number;
          comment?: string | null;
        };
        Update: {
          rating?: number;
          comment?: string | null;
        };
      };
    };
  };
}