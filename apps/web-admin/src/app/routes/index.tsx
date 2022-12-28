import { IconType } from 'react-icons';
import {
  createBrowserRouter,
  Navigate,
  RouteObject,
  RouterProvider,
} from 'react-router-dom';
import { HomePage } from '../page/Home';
import { SigninPage } from '../page/Signin';
import { SignupPage } from '../page/Signup';
import { UnauthenticatedHome } from '../page/UnauthenticatedHome';
import { adminRouteIds, AdminRoutes } from './admin.router';
import { KongRouteIds, KongRoutes } from './kong.router';
import { userRouteIds, UserRoutes } from './user.router';
import { Text } from '@chakra-ui/react';
import { FC, useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../state';
import { AuthSlice } from '../state/auth/auth.state';

export type CustomRouter = RouteObject & {
  name: string;
  isProtected: boolean;
  group: string;
  access?: string[];
  isShownInSidebar?: boolean;
  icon?: IconType;
};

export const RootRouterIds = {
  signin: 'signin',
  redirectSignin: 'redirectSignin',
  signup: 'signup',
  unauthenticatedHome: 'unauthenticatedHome',
  authenticatedHome: 'authenticatedHome',
  admin: adminRouteIds,
  user: userRouteIds,
  kong: KongRouteIds,
};

export const RouterList: CustomRouter[] = [
  {
    id: RootRouterIds.signin,
    name: 'Signin',
    path: '/signin',
    element: <SigninPage />,
    isProtected: false,
    group: 'auth',
  },
  {
    id: RootRouterIds.redirectSignin,
    name: 'RedirectSignin',
    path: '/signin',
    element: <Navigate to={'/'} />,
    isProtected: true,
    group: 'auth',
  },
  {
    id: RootRouterIds.signup,
    name: 'Signup',
    path: '/signup',
    element: <SignupPage />,
    isProtected: false,
    group: 'auth',
  },
  ...KongRoutes,
  ...AdminRoutes,
  ...UserRoutes,
  {
    id: RootRouterIds.unauthenticatedHome,
    name: 'Home',
    path: '/',
    element: <UnauthenticatedHome />,
    isProtected: false,
    group: 'common',
    errorElement: <Text>404 Error Not Found</Text>,
  },
  {
    id: RootRouterIds.authenticatedHome,
    name: 'Home',
    path: '/',
    element: <HomePage />,
    isProtected: true,
    group: 'common',
    errorElement: <Text>404 Error Not Found</Text>,
  },
];

export const getRouter = (isAuthenticated: boolean) => {
  return createBrowserRouter(
    RouterList.filter((x) => x.isProtected === isAuthenticated)
  );
};

export const AppRoutes: FC = () => {
  const auth = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(AuthSlice.actions.sync());
  }, [dispatch]);

  return (
    <RouterProvider
      router={getRouter(auth.data ? auth.data.isAuthenticated : false)}
      fallbackElement={<Text>404 Error Not Found</Text>}
    />
  );
};
