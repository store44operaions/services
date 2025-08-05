import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { CheckCircle, Calendar, MapPin, Clock, Home, Receipt } from 'lucide-react';
import { useBooking } from '../contexts/BookingContext';

const Success = () => {
  const navigate = useNavigate();
  const { getBookingHistory } = useBooking();

  const latestBooking = getBookingHistory()[0];

  useEffect(() => {
    if (!latestBooking) {
      navigate('/');
    }
  }, [latestBooking, navigate]);

  if (!latestBooking) {
    return <div>Loading...</div>;
  }

  return (
    <div className="min-h-screen py-8">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-8"
        >
          <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="text-green-600" size={48} />
          </div>
          
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Booking Confirmed! 🎉
          </h1>
          
          <p className="text-lg text-gray-600 mb-8">
            Your service has been successfully booked. We'll contact you soon with further details.
          </p>
        </motion.div>

        {/* Booking Details Card */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="bg-white rounded-2xl shadow-lg p-8 mb-8"
        >
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-gray-900">Booking Details</h2>
            <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium">
              Confirmed
            </span>
          </div>

          <div className="space-y-6">
            {/* Service Info */}
            <div className="flex items-center space-x-4 p-4 bg-purple-50 rounded-xl">
              <img
                src={latestBooking.service.image}
                alt={latestBooking.service.name}
                className="w-16 h-16 rounded-lg object-cover"
              />
              <div className="flex-1">
                <h3 className="font-semibold text-gray-900">{latestBooking.service.name}</h3>
                <p className="text-sm text-gray-600 flex items-center">
                  <MapPin size={14} className="mr-1" />
                  {latestBooking.service.location}
                </p>
              </div>
              <div className="text-right">
                <div className="text-2xl font-bold text-purple-600">
                  ₹{latestBooking.total.toLocaleString()}
                </div>
                {latestBooking.discount > 0 && (
                  <div className="text-sm text-green-600">
                    Saved ₹{latestBooking.discount.toLocaleString()}
                  </div>
                )}
              </div>
            </div>

            {/* Booking Info */}
            <div className="grid md:grid-cols-2 gap-6">
              <div className="flex items-center space-x-3">
                <Calendar className="text-purple-600" size={20} />
                <div>
                  <div className="text-sm text-gray-600">Date</div>
                  <div className="font-semibold">
                    {new Date(latestBooking.date).toLocaleDateString('en-IN', {
                      weekday: 'long',
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    })}
                  </div>
                </div>
              </div>

              <div className="flex items-center space-x-3">
                <Clock className="text-purple-600" size={20} />
                <div>
                  <div className="text-sm text-gray-600">Time</div>
                  <div className="font-semibold">
                    {new Date(`2024-01-01T${latestBooking.time}`).toLocaleTimeString('en-IN', {
                      hour: '2-digit',
                      minute: '2-digit',
                      hour12: true
                    })}
                  </div>
                </div>
              </div>
            </div>

            {/* Payment Method */}
            <div className="flex items-center space-x-3">
              <Receipt className="text-purple-600" size={20} />
              <div>
                <div className="text-sm text-gray-600">Payment Method</div>
                <div className="font-semibold capitalize">
                  {latestBooking.paymentMethod === 'cod' ? 'Cash on Service' : 'Razorpay'}
                </div>
              </div>
            </div>

            {/* Special Requests */}
            {latestBooking.specialRequests && (
              <div>
                <div className="text-sm text-gray-600 mb-2">Special Requests</div>
                <div className="p-3 bg-gray-50 rounded-lg text-sm">
                  {latestBooking.specialRequests}
                </div>
              </div>
            )}

            {/* Booking ID */}
            <div className="pt-4 border-t border-gray-200">
              <div className="text-sm text-gray-600">Booking ID</div>
              <div className="font-mono text-lg font-semibold text-purple-600">
                #{latestBooking.id}
              </div>
            </div>
          </div>
        </motion.div>

        {/* Action Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="flex flex-col sm:flex-row gap-4"
        >
          <button
            onClick={() => navigate('/dashboard')}
            className="flex-1 bg-gradient-to-r from-purple-600 to-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:from-purple-700 hover:to-blue-700 transition-all duration-200 transform hover:scale-105 flex items-center justify-center space-x-2"
          >
            <Receipt size={20} />
            <span>View All Bookings</span>
          </button>
          
          <button
            onClick={() => navigate('/')}
            className="flex-1 border-2 border-purple-600 text-purple-600 px-8 py-3 rounded-lg font-semibold hover:bg-purple-50 transition-colors flex items-center justify-center space-x-2"
          >
            <Home size={20} />
            <span>Book Another Service</span>
          </button>
        </motion.div>

        {/* Next Steps */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="mt-12 bg-blue-50 rounded-2xl p-6"
        >
          <h3 className="text-lg font-semibold text-blue-900 mb-4">What happens next?</h3>
          <div className="space-y-3 text-blue-800">
            <div className="flex items-start space-x-3">
              <div className="w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-bold">1</div>
              <p>The service provider will contact you within 2 hours to confirm the appointment.</p>
            </div>
            <div className="flex items-start space-x-3">
              <div className="w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-bold">2</div>
              <p>You'll receive a confirmation call 1 day before your scheduled service.</p>
            </div>
            <div className="flex items-start space-x-3">
              <div className="w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-bold">3</div>
              <p>Enjoy your premium service experience!</p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Success;