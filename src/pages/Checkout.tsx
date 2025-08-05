import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Calendar, Clock, MapPin, CreditCard, Tag, ArrowLeft } from 'lucide-react';
import { useBooking } from '../contexts/BookingContext';
import { useAuth } from '../contexts/AuthContext';
import { coupons } from '../data/mockData';

const Checkout = () => {
  const { currentService, addBooking } = useBooking();
  const { user } = useAuth();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    date: '',
    time: '',
    specialRequests: '',
    billingAddress: user?.address || '',
    paymentMethod: 'razorpay' as 'razorpay' | 'cod'
  });

  const [couponCode, setCouponCode] = useState('');
  const [appliedCoupon, setAppliedCoupon] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (!currentService) {
      navigate('/');
      return;
    }
  }, [currentService, navigate]);

  if (!currentService) {
    return <div>Loading...</div>;
  }

  const basePrice = currentService.price;
  const discount = appliedCoupon 
    ? appliedCoupon.discount > 100 
      ? appliedCoupon.discount 
      : (basePrice * appliedCoupon.discount) / 100
    : 0;
  const total = Math.max(basePrice - discount, 0);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const applyCoupon = () => {
    const coupon = coupons.find(c => c.code === couponCode.toUpperCase());
    if (coupon) {
      setAppliedCoupon(coupon);
    } else {
      alert('Invalid coupon code');
    }
  };

  const removeCoupon = () => {
    setAppliedCoupon(null);
    setCouponCode('');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.date || !formData.time || !formData.billingAddress) {
      alert('Please fill in all required fields');
      return;
    }

    setIsLoading(true);

    // Simulate booking process
    setTimeout(() => {
      const bookingData = {
        service: currentService,
        date: formData.date,
        time: formData.time,
        specialRequests: formData.specialRequests,
        billingAddress: formData.billingAddress,
        paymentMethod: formData.paymentMethod,
        couponCode: appliedCoupon?.code,
        discount,
        total,
        status: 'confirmed' as const
      };

      addBooking(bookingData);
      navigate('/success');
    }, 2000);
  };

  const today = new Date().toISOString().split('T')[0];

  return (
    <div className="min-h-screen py-4 md:py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Back Button */}
        <button
          onClick={() => navigate(-1)}
          className="flex items-center space-x-2 text-gray-600 hover:text-purple-600 mb-6 transition-colors"
        >
          <ArrowLeft size={20} />
          <span>Back</span>
        </button>

        <div className="grid lg:grid-cols-3 gap-6 lg:gap-8">
          {/* Main Form */}
          <div className="lg:col-span-2 order-2 lg:order-1">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="bg-white rounded-2xl shadow-lg p-4 md:p-6 lg:p-8"
            >
              <h2 className="text-xl md:text-2xl font-bold text-gray-900 mb-6 md:mb-8">Book Your Service</h2>

              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Service Details */}
                <div className="mb-6 p-3 md:p-4 bg-purple-50 rounded-xl">
                  <div className="flex flex-col sm:flex-row sm:items-center space-y-3 sm:space-y-0 sm:space-x-4">
                    <img
                      src={currentService.image}
                      alt={currentService.name}
                      className="w-full sm:w-16 h-32 sm:h-16 rounded-lg object-cover"
                    />
                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-900">{currentService.name}</h3>
                      <p className="text-sm text-gray-600 flex items-center">
                        <MapPin size={14} className="mr-1" />
                        {currentService.location}
                      </p>
                      <div className="text-lg font-bold text-purple-600 mt-1 sm:hidden">
                        ₹{currentService.price.toLocaleString()}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Date & Time */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      <Calendar size={16} className="inline mr-2" />
                      Preferred Date *
                    </label>
                    <input
                      type="date"
                      name="date"
                      value={formData.date}
                      onChange={handleChange}
                      min={today}
                      required
                      className="w-full px-3 md:px-4 py-2 md:py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition-all text-sm md:text-base"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      <Clock size={16} className="inline mr-2" />
                      Preferred Time *
                    </label>
                    <select
                      name="time"
                      value={formData.time}
                      onChange={handleChange}
                      required
                      className="w-full px-3 md:px-4 py-2 md:py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition-all text-sm md:text-base"
                    >
                      <option value="">Select Time</option>
                      <option value="09:00">09:00 AM</option>
                      <option value="10:00">10:00 AM</option>
                      <option value="11:00">11:00 AM</option>
                      <option value="12:00">12:00 PM</option>
                      <option value="14:00">02:00 PM</option>
                      <option value="15:00">03:00 PM</option>
                      <option value="16:00">04:00 PM</option>
                      <option value="17:00">05:00 PM</option>
                      <option value="18:00">06:00 PM</option>
                    </select>
                  </div>
                </div>

                {/* Billing Address */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Billing Address *
                  </label>
                  <textarea
                    name="billingAddress"
                    value={formData.billingAddress}
                    onChange={handleChange}
                    required
                    rows={3}
                    className="w-full px-3 md:px-4 py-2 md:py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition-all text-sm md:text-base resize-none"
                    placeholder="Enter your complete address"
                  />
                </div>

                {/* Special Requests */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Special Requests (Optional)
                  </label>
                  <textarea
                    name="specialRequests"
                    value={formData.specialRequests}
                    onChange={handleChange}
                    rows={3}
                    className="w-full px-3 md:px-4 py-2 md:py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition-all text-sm md:text-base resize-none"
                    placeholder="Any special requirements or preferences"
                  />
                </div>

                {/* Payment Method */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-4">
                    <CreditCard size={16} className="inline mr-2" />
                    Payment Method
                  </label>
                  <div className="space-y-3">
                    <label className="flex items-start p-3 md:p-4 border border-gray-300 rounded-lg cursor-pointer hover:bg-gray-50 transition-colors">
                      <input
                        type="radio"
                        name="paymentMethod"
                        value="razorpay"
                        checked={formData.paymentMethod === 'razorpay'}
                        onChange={handleChange}
                        className="mr-3 text-purple-600 mt-1"
                      />
                      <div>
                        <div className="font-medium text-sm md:text-base">Razorpay (Online Payment)</div>
                        <div className="text-sm text-gray-600">Pay securely using cards, UPI, or net banking</div>
                      </div>
                    </label>

                    <label className="flex items-start p-3 md:p-4 border border-gray-300 rounded-lg cursor-pointer hover:bg-gray-50 transition-colors">
                      <input
                        type="radio"
                        name="paymentMethod"
                        value="cod"
                        checked={formData.paymentMethod === 'cod'}
                        onChange={handleChange}
                        className="mr-3 text-purple-600 mt-1"
                      />
                      <div>
                        <div className="font-medium text-sm md:text-base">Cash on Service</div>
                        <div className="text-sm text-gray-600">Pay when the service is provided</div>
                      </div>
                    </label>
                  </div>
                </div>
              </form>
            </motion.div>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1 order-1 lg:order-2">
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="bg-white rounded-2xl shadow-lg p-4 md:p-6 lg:sticky lg:top-8"
            >
              <h3 className="text-lg md:text-xl font-bold text-gray-900 mb-4 md:mb-6">Order Summary</h3>

              <div className="space-y-3 md:space-y-4 mb-4 md:mb-6">
                <div className="flex justify-between">
                  <span className="text-sm md:text-base text-gray-600">Service Price</span>
                  <span className="font-semibold text-sm md:text-base">₹{basePrice.toLocaleString()}</span>
                </div>

                {appliedCoupon && (
                  <div className="flex justify-between text-green-600">
                    <span className="text-sm md:text-base">Discount ({appliedCoupon.code})</span>
                    <span className="text-sm md:text-base">-₹{discount.toLocaleString()}</span>
                  </div>
                )}

                <hr />

                <div className="flex justify-between text-base md:text-lg font-bold">
                  <span>Total</span>
                  <span className="text-purple-600">₹{total.toLocaleString()}</span>
                </div>
              </div>

              {/* Coupon Code */}
              <div className="mb-4 md:mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <Tag size={16} className="inline mr-2" />
                  Have a coupon code?
                </label>
                {appliedCoupon ? (
                  <div className="flex items-center justify-between p-2 md:p-3 bg-green-50 border border-green-200 rounded-lg">
                    <span className="text-green-700 font-medium text-sm md:text-base">{appliedCoupon.code} applied!</span>
                    <button
                      type="button"
                      onClick={removeCoupon}
                      className="text-red-600 hover:text-red-700 text-sm font-medium"
                    >
                      Remove
                    </button>
                  </div>
                ) : (
                  <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-2">
                    <input
                      type="text"
                      value={couponCode}
                      onChange={(e) => setCouponCode(e.target.value)}
                      placeholder="Enter coupon code"
                      className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none text-sm md:text-base"
                    />
                    <button
                      type="button"
                      onClick={applyCoupon}
                      className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors text-sm md:text-base whitespace-nowrap"
                    >
                      Apply
                    </button>
                  </div>
                )}
              </div>

              {/* Available Coupons */}
              <div className="mb-4 md:mb-6">
                <p className="text-sm font-medium text-gray-700 mb-3">Available Coupons:</p>
                <div className="space-y-2">
                  {coupons.map((coupon) => (
                    <div
                      key={coupon.code}
                      className="p-2 bg-purple-50 border border-purple-200 rounded-lg cursor-pointer hover:bg-purple-100 transition-colors"
                      onClick={() => setCouponCode(coupon.code)}
                    >
                      <div className="font-medium text-purple-700 text-sm">{coupon.code}</div>
                      <div className="text-xs text-purple-600">{coupon.description}</div>
                    </div>
                  ))}
                </div>
              </div>

              <button
                onClick={handleSubmit}
                disabled={isLoading || !formData.date || !formData.time || !formData.billingAddress}
                className="w-full bg-gradient-to-r from-purple-600 to-blue-600 text-white py-3 md:py-4 rounded-lg font-semibold hover:from-purple-700 hover:to-blue-700 transition-all duration-200 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none text-sm md:text-base"
              >
                {isLoading ? (
                  <div className="flex items-center justify-center">
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                    Processing...
                  </div>
                ) : (
                  `Confirm Booking - ₹${total.toLocaleString()}`
                )}
              </button>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;