import React, { createContext, useContext, useState } from 'react';

interface Service {
  id: string;
  name: string;
  category: string;
  location: string;
  price: number;
  rating: number;
  image: string;
  description: string;
  features: string[];
}

interface Booking {
  id: string;
  userId: string;
  userName: string;
  userEmail: string;
  service: Service;
  date: string;
  time: string;
  specialRequests: string;
  billingAddress: string;
  paymentMethod: 'razorpay' | 'cod';
  couponCode?: string;
  discount: number;
  total: number;
  status: 'pending' | 'confirmed' | 'completed' | 'cancelled';
  createdAt: string;
}

interface BookingContextType {
  currentService: Service | null;
  setCurrentService: (service: Service) => void;
  bookings: Booking[];
  addBooking: (booking: Omit<Booking, 'id' | 'createdAt'>) => void;
  getBookingHistory: () => Booking[];
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
  const [currentService, setCurrentService] = useState<Service | null>(null);
  const [bookings, setBookings] = useState<Booking[]>([]);

  // Load user-specific bookings when component mounts
  React.useEffect(() => {
    const currentUser = localStorage.getItem('user');
    if (currentUser) {
      const user = JSON.parse(currentUser);
      const userBookingsKey = `bookings_${user.id}`;
      const saved = localStorage.getItem(userBookingsKey);
      setBookings(saved ? JSON.parse(saved) : []);
    } else {
      setBookings([]);
    }
  }, []);

  const addBooking = (bookingData: Omit<Booking, 'id' | 'createdAt'>) => {
    const currentUser = localStorage.getItem('user');
    if (!currentUser) return;
    
    const user = JSON.parse(currentUser);
    const newBooking: Booking = {
      ...bookingData,
      id: Date.now().toString(),
      createdAt: new Date().toISOString(),
      userId: user.id,
      userName: user.name,
      userEmail: user.email
    };

    const updatedBookings = [...bookings, newBooking];
    setBookings(updatedBookings);
    
    // Save to user-specific storage
    const userBookingsKey = `bookings_${user.id}`;
    localStorage.setItem(userBookingsKey, JSON.stringify(updatedBookings));
    
    // Also save to global bookings for admin panel
    const globalBookings = JSON.parse(localStorage.getItem('allBookings') || '[]');
    globalBookings.push(newBooking);
    localStorage.setItem('allBookings', JSON.stringify(globalBookings));
  };

  const getBookingHistory = () => {
    return bookings.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
  };

  return (
    <BookingContext.Provider value={{
      currentService,
      setCurrentService,
      bookings,
      addBooking,
      getBookingHistory
    }}>
      {children}
    </BookingContext.Provider>
  );
};