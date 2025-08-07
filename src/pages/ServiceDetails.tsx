import React, { useState, useEffect } from 'react';
import { useParams, useSearchParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Star, MapPin, Calendar, Clock, ArrowLeft } from 'lucide-react';
import { useBooking } from '../contexts/BookingContext';
import { useAdmin } from '../contexts/AdminContext';
import { supabase } from '../lib/supabase';

const ServiceDetails = () => {
  const { id } = useParams<{ id: string }>();
  const [searchParams] = useSearchParams();
  const location = searchParams.get('location');
  const navigate = useNavigate();
  const { setCurrentService } = useBooking();
  const { categories, cities } = useAdmin();

  const [services, setServices] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchServices = async () => {
      if (!id || !location) return;
      
      setLoading(true);
      try {
        // Find the category by slug/id
        const category = categories.find(cat => cat.slug === id || cat.id === id);
        const city = cities.find(c => c.name === location);
        
        if (!category || !city) {
          setServices([]);
          setLoading(false);
          return;
        }

        const { data, error } = await supabase
          .from('services')
          .select(`
            *,
            categories(name, slug),
            cities(name),
            vendor_profiles(business_name)
          `)
          .eq('category_id', category.id)
          .eq('city_id', city.id)
          .eq('status', 'active');

        if (error) {
          console.error('Error fetching services:', error);
          setServices([]);
        } else {
          setServices(data || []);
        }
      } catch (error) {
        console.error('Error fetching services:', error);
        setServices([]);
      }
      setLoading(false);
    };

    fetchServices();
  }, [id, location, categories, cities]);

  const handleBookNow = (service: any) => {
    setCurrentService(service);
    navigate('/checkout');
  };

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        size={16}
        className={i < rating ? 'text-yellow-400 fill-current' : 'text-gray-300'}
      />
    ));
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600"></div>
      </div>
    );
  }

  const categoryName = categories.find(cat => cat.slug === id || cat.id === id)?.name || id;

  return (
    <div className="min-h-screen py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Back Button */}
        <button
          onClick={() => navigate(-1)}
          className="flex items-center space-x-2 text-gray-600 hover:text-purple-600 mb-6 transition-colors"
        >
          <ArrowLeft size={20} />
          <span>Back to Services</span>
        </button>

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            {categoryName} Services in {location}
          </h1>
          <p className="text-lg text-gray-600">
            Choose from our premium service providers
          </p>
        </motion.div>

        {/* Services List */}
        <div className="space-y-8">
          {services.map((service, index) => (
            <motion.div
              key={service.id}
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden"
            >
              <div className="md:flex">
                {/* Image */}
                <div className="md:w-1/3">
                  <img
                    src={service.image_url}
                    alt={service.name}
                    className="w-full h-64 md:h-full object-cover"
                  />
                </div>

                {/* Content */}
                <div className="md:w-2/3 p-8">
                  <div className="flex flex-col h-full">
                    <div className="flex-1">
                      <div className="flex items-start justify-between mb-4">
                        <div>
                          <h3 className="text-2xl font-bold text-gray-900 mb-2">
                            {service.name}
                          </h3>
                          <div className="flex items-center space-x-4 text-sm text-gray-600 mb-3">
                            <div className="flex items-center space-x-1">
                              <MapPin size={16} />
                              <span>{service.cities?.name}</span>
                            </div>
                            <div className="flex items-center space-x-1">
                              {renderStars(service.rating)}
                              <span className="ml-1">({service.rating})</span>
                            </div>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="text-3xl font-bold text-purple-600">
                            ₹{service.price.toLocaleString()}
                          </div>
                          <div className="text-sm text-gray-500">
                            starting from
                          </div>
                        </div>
                      </div>

                      <p className="text-gray-600 mb-6">
                        {service.description}
                      </p>

                      {/* Features */}
                      <div className="mb-6">
                        <h4 className="font-semibold text-gray-900 mb-3">Features:</h4>
                        <div className="flex flex-wrap gap-2">
                          {service.features.map((feature: string, idx: number) => (
                            <span
                              key={idx}
                              className="px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-sm"
                            >
                              {feature}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex flex-col sm:flex-row gap-4">
                      <button
                        onClick={() => handleBookNow(service)}
                        className="flex-1 bg-gradient-to-r from-purple-600 to-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:from-purple-700 hover:to-blue-700 transition-all duration-200 transform hover:scale-105"
                      >
                        Book Now
                      </button>
                      <button className="flex-1 border-2 border-purple-600 text-purple-600 px-8 py-3 rounded-lg font-semibold hover:bg-purple-50 transition-colors">
                        View Details
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {services.length === 0 && (
          <div className="text-center py-16">
            <div className="text-6xl mb-4">🚫</div>
            <h3 className="text-2xl font-bold text-gray-900 mb-2">
              No Services Available
            </h3>
            <p className="text-gray-600 mb-8">
              No services found for this category in {location}. Please try another location or service category.
            </p>
            <button
              onClick={() => navigate(-1)}
              className="bg-gradient-to-r from-purple-600 to-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:from-purple-700 hover:to-blue-700 transition-all"
            >
              Go Back
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ServiceDetails;