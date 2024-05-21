import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAtom } from 'jotai';
import { authAtom } from '../../context/authAtom';

const PrivateRoute = ({ component: Component }) => {
  const [auth] = useAtom(authAtom);

  return auth.token ? <Component/> : <Navigate to='/login' />;
};

export default PrivateRoute;