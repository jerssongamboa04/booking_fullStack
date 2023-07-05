import React, { useContext } from 'react';
import { UserContext } from '../Context/AuthContext';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({children}) => {
  const { user, loading } = useContext(UserContext);

  if (loading) {
    return <h1>LOADING.....</h1>
  }

  if (!user) {
    return <Navigate to="/login"/>;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
