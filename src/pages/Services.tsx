import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { useAdmin } from '../contexts/AdminContext';

const Services = () => {
  const { location } = useParams<{ location: string }>();
  const navigate = useNavigate();
  const { categories } = useAdmin();

  const handleServiceSelect = (categorySlug: string) => {
    navigate(`/service/${categorySlug}?location=${location}`);
  };

  return (
    <div className="min-h-screen py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Services in <span className="text-purple-600">{location}</span>
          </h1>
          <p className="text-lg text-gray-600">
            Choose from our wide range of premium services
          </p>
        </motion.div>

        {/* Services Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {categories.map((category, index) => (
            <motion.div
              key={category.slug}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              onClick={() => handleServiceSelect(category.slug)}
              className="relative group cursor-pointer bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:scale-105 overflow-hidden"
            >
              <div className="p-8 relative z-10">
                <div className="text-center mb-6">
                  <div className="text-6xl mb-4 group-hover:scale-110 transition-transform duration-300">
                    {category.icon}
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-2 group-hover:text-purple-600 transition-colors">
                    {category.name}
                  </h3>
                  <p className="text-gray-600 mb-6">
                    {category.description}
                  </p>
                </div>

                <div className="flex items-center justify-center text-purple-600 group-hover:text-purple-700 transition-colors">
                  <span className="font-medium mr-2">View Services</span>
                  <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                </div>
              </div>

              {/* Gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-br from-purple-600/10 to-blue-600/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-0"></div>
            </motion.div>
          ))}
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="text-center mt-16 bg-gradient-to-r from-purple-600 to-blue-600 rounded-2xl p-8 text-white"
        >
          <h3 className="text-2xl font-bold mb-4">
            Can't find what you're looking for?
          </h3>
          <p className="text-lg opacity-90 mb-6">
            Contact us and we'll help you find the perfect service provider in {location}
          </p>
          <button className="bg-white text-purple-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
            Contact Support
          </button>
        </motion.div>
      </div>
    </div>
  );
};

export default Services;
