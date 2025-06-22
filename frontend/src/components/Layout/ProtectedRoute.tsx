import React from 'react';
import { Navigate } from 'react-router';
import { getToken } from '../../libs/storage';

interface Props {
  children: React.ReactNode;
}

const ProtectedRoute: React.FC<Props> = ({ children }) => {
  const token = getToken();
  if (!token) {
    return <Navigate to="/login" replace />;
  }
  return <>{children}</>;
};

export default ProtectedRoute;