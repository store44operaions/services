import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { useVendor } from '../contexts/VendorContext';

interface VendorRouteProps {
  children: React.ReactNode;
}

const VendorRoute: React.FC<VendorRouteProps> = ({ children }) => {
  const { user, loading } = useAuth();
  const { isVendor } = useVendor();
  const location = useLocation();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600"></div>
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/auth" state={{ from: location }} replace />;
  }

  if (!isVendor) {
    return <Navigate to="/vendor/apply" state={{ from: location }} replace />;
  }

  return <>{children}</>;
};

export default VendorRoute;