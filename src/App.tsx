import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import { AdminProvider } from './contexts/AdminContext';
import { BookingProvider } from './contexts/BookingContext';
import { VendorProvider } from './contexts/VendorContext';
import Landing from './pages/Landing';
import Services from './pages/Services';
import ServiceDetails from './pages/ServiceDetails';
import Auth from './pages/Auth';
import Checkout from './pages/Checkout';
import Success from './pages/Success';
import UserDashboard from './pages/UserDashboard';
import ProtectedRoute from './components/ProtectedRoute';
import AdminRoute from './components/AdminRoute';
import VendorRoute from './components/VendorRoute';
import AdminLogin from './pages/admin/AdminLogin';
import AdminDashboard from './pages/admin/AdminDashboard';
import VendorApplication from './pages/vendor/VendorApplication';
import VendorDashboard from './pages/vendor/VendorDashboard';
import Navbar from './components/Navbar';

function App() {
  return (
    <AuthProvider>
      <VendorProvider>
        <AdminProvider>
          <BookingProvider>
            <Router>
              <Routes>
                {/* Admin Routes */}
                <Route path="/admin/login" element={<AdminLogin />} />
                <Route path="/admin/dashboard" element={
                  <AdminRoute>
                    <AdminDashboard />
                  </AdminRoute>
                } />
                
                {/* Vendor Routes */}
                <Route path="/vendor/apply" element={
                  <ProtectedRoute>
                    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
                      <Navbar />
                      <VendorApplication />
                    </div>
                  </ProtectedRoute>
                } />
                <Route path="/vendor/dashboard" element={
                  <VendorRoute>
                    <VendorDashboard />
                  </VendorRoute>
                } />
                
                {/* User Routes */}
                <Route path="/*" element={
                  <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
                    <Navbar />
                    <Routes>
                      <Route path="/" element={<Landing />} />
                      <Route path="/services/:location" element={<Services />} />
                      <Route path="/service/:id" element={<ServiceDetails />} />
                      <Route path="/auth" element={<Auth />} />
                      <Route path="/checkout" element={
                        <ProtectedRoute>
                          <Checkout />
                        </ProtectedRoute>
                      } />
                      <Route path="/success" element={
                        <ProtectedRoute>
                          <Success />
                        </ProtectedRoute>
                      } />
                      <Route path="/dashboard" element={
                        <ProtectedRoute>
                          <UserDashboard />
                        </ProtectedRoute>
                      } />
                    </Routes>
                  </div>
                } />
              </Routes>
            </Router>
          </BookingProvider>
        </AdminProvider>
      </VendorProvider>
    </AuthProvider>
  );
}

export default App;