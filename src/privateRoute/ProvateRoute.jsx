/* eslint-disable react/prop-types */
import React, { useContext } from 'react'
import { Navigate, useLocation } from 'react-router-dom';
import { AuthContext } from '../context/AuthProvider';
import LoadingSpinner from '../components/LoadingSpinner';

const ProvateRoute = ({children}) => {
    const {user, loading} =  useContext(AuthContext);
    const location = useLocation();
    if(loading) {
        return (
          <LoadingSpinner/>
        )
    }
    if(user) {
        return children;
    }
  return <Navigate to="/singUp" state={{from: location}} replace></Navigate>
}

export default ProvateRoute