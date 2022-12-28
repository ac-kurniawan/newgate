import { FC } from 'react';
import { Navigate } from 'react-router-dom';
import { useAppSelector } from '../../state';
import { HomePage } from '../Home';

export const UnauthenticatedHome: FC = () => {
  const auth = useAppSelector((state) => state.auth);

  if (
    !auth.data?.isAuthenticated &&
    !['INIT', 'PENDING'].includes(auth.status)
  ) {
    return <Navigate to={'/signin'} replace={true} />;
  }

  return <HomePage />;
};
