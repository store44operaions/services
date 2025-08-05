import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, CheckCircle, XCircle, Clock, Eye } from 'lucide-react';
import { useAdmin } from '../../contexts/AdminContext';

const VendorApplicationsManagement = () => {
  const { vendorApplications, approveVendorApplication, rejectVendorApplication } = useAdmin();
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('');
  const [selectedApplication, setSelectedApplication] = useState<any>(null);

  const filteredApplications = vendorApplications.filter(application => {
    const matchesSearch = application.userName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         application.userEmail.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         application.businessName.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = !filterStatus || application.status === filterStatus;
    
    return matchesSearch && matchesStatus;
  });

  const handleApprove = (applicationId: string) => {
    if (window.confirm('Are you sure you want to approve this vendor application?')) {
      approveVendorApplication(applicationId);
    }
  };

  const handleReject = (applicationId: string) => {
    if (window.confirm('Are you sure you want to reject this vendor application?')) {
      rejectVendorApplication(applicationId);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'approved':
        return 'bg-green-100 text-green-800';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'rejected':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <h2 className="text-2xl font-bold text-gray-900">Vendor Applications</h2>
        <div className="text-sm text-gray-600">
          Total Applications: {vendorApplications.length}
        </div>
      </div>

      {/* Filters */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
          <input
            type="text"
            placeholder="Search applications..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none"
          />
        </div>

        <select
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value)}
          className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none"
        >
          <option value="">All Status</option>
          <option value="pending">Pending</option>
          <option value="approved">Approved</option>
          <option value="rejected">Rejected</option>
        </select>
      </div>

      {/* Applications List */}
      <div className="space-y-4">
        {filteredApplications.map((application, index) => (
          <motion.div
            key={application.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.05 }}
            className="bg-white rounded-xl shadow-sm p-6 hover:shadow-lg transition-shadow"
          >
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
              {/* Application Info */}
              <div className="flex-1 space-y-3">
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">
                      {application.businessName}
                    </h3>
                    <p className="text-sm text-gray-600 capitalize">
                      {application.businessType.replace('-', ' ')} Service
                    </p>
                  </div>
                  <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(application.status)}`}>
                    {application.status}
                  </span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <p className="text-sm text-gray-600">
                      <strong>Applicant:</strong> {application.userName}
                    </p>
                    <p className="text-sm text-gray-600">
                      <strong>Email:</strong> {application.userEmail}
                    </p>
                    <p className="text-sm text-gray-600">
                      <strong>Phone:</strong> {application.userPhone}
                    </p>
                  </div>

                  <div className="space-y-1">
                    <p className="text-sm text-gray-600">
                      <strong>Experience:</strong> {application.experience}
                    </p>
                    <p className="text-sm text-gray-600">
                      <strong>Applied:</strong> {new Date(application.appliedAt).toLocaleDateString()}
                    </p>
                  </div>
                </div>

                <div className="text-sm text-gray-600">
                  <strong>Business Description:</strong>
                  <p className="mt-1">{application.businessDescription}</p>
                </div>
              </div>

              {/* Actions */}
              <div className="flex flex-col space-y-2 lg:ml-6">
                <button
                  onClick={() => setSelectedApplication(application)}
                  className="flex items-center justify-center space-x-1 text-blue-600 hover:text-blue-700 transition-colors text-sm px-3 py-2 border border-blue-200 rounded-lg hover:bg-blue-50"
                >
                  <Eye size={14} />
                  <span>View Details</span>
                </button>

                {application.status === 'pending' && (
                  <div className="flex space-x-2">
                    <button
                      onClick={() => handleApprove(application.id)}
                      className="flex items-center justify-center space-x-1 text-green-600 hover:text-green-700 transition-colors text-sm px-3 py-2 border border-green-200 rounded-lg hover:bg-green-50"
                    >
                      <CheckCircle size={14} />
                      <span>Approve</span>
                    </button>
                    <button
                      onClick={() => handleReject(application.id)}
                      className="flex items-center justify-center space-x-1 text-red-600 hover:text-red-700 transition-colors text-sm px-3 py-2 border border-red-200 rounded-lg hover:bg-red-50"
                    >
                      <XCircle size={14} />
                      <span>Reject</span>
                    </button>
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Application Details Modal */}
      {selectedApplication && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-xl shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
          >
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-semibold text-gray-900">Application Details</h3>
                <button
                  onClick={() => setSelectedApplication(null)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <XCircle size={24} />
                </button>
              </div>

              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-medium text-gray-900 mb-3">Business Information</h4>
                    <div className="space-y-2 text-sm">
                      <p><strong>Business Name:</strong> {selectedApplication.businessName}</p>
                      <p><strong>Business Type:</strong> {selectedApplication.businessType}</p>
                      <p><strong>Experience:</strong> {selectedApplication.experience}</p>
                    </div>
                  </div>

                  <div>
                    <h4 className="font-medium text-gray-900 mb-3">Contact Information</h4>
                    <div className="space-y-2 text-sm">
                      <p><strong>Name:</strong> {selectedApplication.userName}</p>
                      <p><strong>Email:</strong> {selectedApplication.userEmail}</p>
                      <p><strong>Phone:</strong> {selectedApplication.userPhone}</p>
                    </div>
                  </div>
                </div>

                <div>
                  <h4 className="font-medium text-gray-900 mb-3">Business Address</h4>
                  <p className="text-sm text-gray-600">{selectedApplication.businessAddress}</p>
                </div>

                <div>
                  <h4 className="font-medium text-gray-900 mb-3">Business Description</h4>
                  <p className="text-sm text-gray-600">{selectedApplication.businessDescription}</p>
                </div>

                {selectedApplication.documents && (
                  <div>
                    <h4 className="font-medium text-gray-900 mb-3">Documents/Licenses</h4>
                    <p className="text-sm text-gray-600">{selectedApplication.documents}</p>
                  </div>
                )}

                <div className="flex items-center justify-between pt-4 border-t border-gray-200">
                  <div className="text-sm text-gray-600">
                    <p><strong>Applied:</strong> {new Date(selectedApplication.appliedAt).toLocaleString()}</p>
                    <p><strong>Status:</strong> <span className="capitalize">{selectedApplication.status}</span></p>
                  </div>

                  {selectedApplication.status === 'pending' && (
                    <div className="flex space-x-3">
                      <button
                        onClick={() => {
                          handleApprove(selectedApplication.id);
                          setSelectedApplication(null);
                        }}
                        className="flex items-center space-x-2 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors"
                      >
                        <CheckCircle size={16} />
                        <span>Approve</span>
                      </button>
                      <button
                        onClick={() => {
                          handleReject(selectedApplication.id);
                          setSelectedApplication(null);
                        }}
                        className="flex items-center space-x-2 bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors"
                      >
                        <XCircle size={16} />
                        <span>Reject</span>
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      )}

      {filteredApplications.length === 0 && (
        <div className="text-center py-12">
          <Clock className="mx-auto h-12 w-12 text-gray-400 mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">No applications found</h3>
          <p className="text-gray-600">
            {searchTerm || filterStatus ? 'Try adjusting your search or filter criteria.' : 'No vendor applications have been submitted yet.'}
          </p>
        </div>
      )}
    </div>
  );
};

export default VendorApplicationsManagement;