import { useEffect } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { useDispatch } from 'react-redux';
import { login, logout } from '../features/userSlice';

export const useAuth = () => {
  const dispatch = useDispatch();
  const {
    isLoading,
    isAuthenticated,
    error,
    user,
    logout: logoutAuth0,
    loginWithRedirect,
  } = useAuth0();

  useEffect(() => {
    if (isAuthenticated) {
      dispatch(login(user));
    } else {
      dispatch(logout());
    }
  }, [isAuthenticated, user, dispatch]);

  return {
    isLoading,
    isAuthenticated,
    error,
    user,
    logout: () => logoutAuth0({ returnTo: window.location.origin }),
    loginWithRedirect,
  };
};
