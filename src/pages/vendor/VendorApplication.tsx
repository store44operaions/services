import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Building, FileText, Clock, CheckCircle, XCircle } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { useVendor } from '../../contexts/VendorContext';

const VendorApplication = () => {
  const { user } = useAuth();
  const { applyForVendor, getUserApplication } = useVendor();
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState({
    businessName: '',
    businessType: '',
    businessAddress: '',
    businessDescription: '',
    experience: '',
    documents: ''
  });
  
  const [isLoading, setIsLoading] = useState(false);
  const [existingApplication, setExistingApplication] = useState<any>(null);

  useEffect(() => {
    if (user) {
      const application = getUserApplication(user.id);
      setExistingApplication(application);
    }
  }, [user, getUserApplication]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;

    setIsLoading(true);

    setTimeout(() => {
      applyForVendor({
        userId: user.id,
        userName: user.name,
        userEmail: user.email,
        userPhone: user.phone,
        ...formData
      });
      
      setIsLoading(false);
      // Refresh to show the new application status
      window.location.reload();
    }, 2000);
  };

  if (existingApplication) {
    return (
      <div className="min-h-screen py-8">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="bg-white rounded-2xl shadow-lg p-8 text-center"
          >
            {existingApplication.status === 'pending' && (
              <>
                <div className="w-20 h-20 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Clock className="text-yellow-600" size={32} />
                </div>
                <h1 className="text-3xl font-bold text-gray-900 mb-4">
                  Application Under Review
                </h1>
                <p className="text-lg text-gray-600 mb-8">
                  Your vendor application is currently being reviewed by our admin team. 
                  We'll notify you once a decision has been made.
                </p>
              </>
            )}

            {existingApplication.status === 'approved' && (
              <>
                <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <CheckCircle className="text-green-600" size={32} />
                </div>
                <h1 className="text-3xl font-bold text-gray-900 mb-4">
                  Application Approved! 🎉
                </h1>
                <p className="text-lg text-gray-600 mb-8">
                  Congratulations! Your vendor application has been approved. 
                  You can now access your vendor dashboard.
                </p>
                <button
                  onClick={() => navigate('/vendor/dashboard')}
                  className="bg-gradient-to-r from-purple-600 to-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:from-purple-700 hover:to-blue-700 transition-all duration-200 transform hover:scale-105"
                >
                  Go to Vendor Dashboard
                </button>
              </>
            )}

            {existingApplication.status === 'rejected' && (
              <>
                <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <XCircle className="text-red-600" size={32} />
                </div>
                <h1 className="text-3xl font-bold text-gray-900 mb-4">
                  Application Rejected
                </h1>
                <p className="text-lg text-gray-600 mb-8">
                  Unfortunately, your vendor application was not approved at this time. 
                  Please contact support for more information.
                </p>
              </>
            )}

            <div className="mt-8 p-4 bg-gray-50 rounded-lg">
              <h3 className="font-semibold text-gray-900 mb-2">Application Details</h3>
              <div className="text-sm text-gray-600 space-y-1">
                <p><strong>Business Name:</strong> {existingApplication.businessName}</p>
                <p><strong>Business Type:</strong> {existingApplication.businessType}</p>
                <p><strong>Applied:</strong> {new Date(existingApplication.appliedAt).toLocaleDateString()}</p>
                <p><strong>Status:</strong> <span className="capitalize">{existingApplication.status}</span></p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-8">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="text-center mb-8">
            <div className="w-20 h-20 bg-gradient-to-r from-purple-600 to-blue-600 rounded-full flex items-center justify-center mx-auto mb-6">
              <Building className="text-white" size={32} />
            </div>
            <h1 className="text-3xl font-bold text-gray-900 mb-4">
              Become a Vendor
            </h1>
            <p className="text-lg text-gray-600">
              Join our platform and start offering your services to customers across Bihar
            </p>
          </div>

          <div className="bg-white rounded-2xl shadow-lg p-8">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Business Name *
                </label>
                <input
                  type="text"
                  name="businessName"
                  value={formData.businessName}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition-all"
                  placeholder="Enter your business name"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Business Type *
                </label>
                <select
                  name="businessType"
                  value={formData.businessType}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition-all"
                >
                  <option value="">Select Business Type</option>
                  <option value="salon">Beauty & Salon</option>
                  <option value="decorator">Event Decorators</option>
                  <option value="car-rental">Car Rental</option>
                  <option value="dj">DJ Services</option>
                  <option value="hotel">Hotels</option>
                  <option value="catering">Catering</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Business Address *
                </label>
                <textarea
                  name="businessAddress"
                  value={formData.businessAddress}
                  onChange={handleChange}
                  required
                  rows={3}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition-all resize-none"
                  placeholder="Enter your complete business address"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Business Description *
                </label>
                <textarea
                  name="businessDescription"
                  value={formData.businessDescription}
                  onChange={handleChange}
                  required
                  rows={4}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition-all resize-none"
                  placeholder="Describe your business and services"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Years of Experience *
                </label>
                <select
                  name="experience"
                  value={formData.experience}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition-all"
                >
                  <option value="">Select Experience</option>
                  <option value="0-1">0-1 years</option>
                  <option value="1-3">1-3 years</option>
                  <option value="3-5">3-5 years</option>
                  <option value="5-10">5-10 years</option>
                  <option value="10+">10+ years</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Business Documents/Licenses
                </label>
                <textarea
                  name="documents"
                  value={formData.documents}
                  onChange={handleChange}
                  rows={2}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition-all resize-none"
                  placeholder="List any business licenses, certifications, or documents you have"
                />
              </div>

              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <div className="flex items-start space-x-3">
                  <FileText className="text-blue-600 mt-1" size={20} />
                  <div className="text-sm text-blue-800">
                    <p className="font-medium mb-1">Application Review Process:</p>
                    <ul className="space-y-1">
                      <li>• Your application will be reviewed by our admin team</li>
                      <li>• Review process typically takes 2-3 business days</li>
                      <li>• You'll be notified via email about the decision</li>
                      <li>• Once approved, you can access your vendor dashboard</li>
                    </ul>
                  </div>
                </div>
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-gradient-to-r from-purple-600 to-blue-600 text-white py-3 rounded-lg font-semibold hover:from-purple-700 hover:to-blue-700 transition-all duration-200 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
              >
                {isLoading ? (
                  <div className="flex items-center justify-center">
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                    Submitting Application...
                  </div>
                ) : (
                  'Submit Vendor Application'
                )}
              </button>
            </form>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default VendorApplication;