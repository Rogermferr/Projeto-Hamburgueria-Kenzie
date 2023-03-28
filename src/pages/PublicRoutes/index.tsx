import { useContext } from 'react';
import { Outlet, Navigate } from 'react-router-dom';
import { UserContext } from '../../providers/UserContext';

export const PublicRoutes = () => {
  const { token } = useContext(UserContext);

  return !token ? <Outlet /> : <Navigate to='/shop' />;
};
