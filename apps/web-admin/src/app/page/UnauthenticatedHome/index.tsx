import { FC } from 'react';
import { Navigate } from 'react-router-dom';

export const UnauthenticatedHome: FC = () => {
  return <Navigate to={'/signin'} replace={true} />;
};
