import { CustomRouter } from '.';
import { HomePage } from '../page/Home';

const routerGroup = 'user';
const userBasePath = '/user/:userId';

export const userRouteIds = {
  profile: 'user:profile',
};

export const UserRoutes: CustomRouter[] = [
  {
    id: userRouteIds.profile,
    name: 'Profile',
    path: `${userBasePath}`,
    element: <HomePage />,
    isProtected: true,
    group: routerGroup,
  },
];
