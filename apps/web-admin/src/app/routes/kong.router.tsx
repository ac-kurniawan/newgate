import {
  FiActivity,
  FiCode,
  FiNavigation,
  FiBriefcase,
  FiSunset,
} from 'react-icons/fi';
import { CustomRouter } from '.';
import { KongMonitoringPage } from '../page/Kong';

const routerGroup = 'kong';
const kongBasePath = '/kong/:kongId';

export const KongRouteIds = {
  monitoring: 'kong:monitoring',
  services: 'kong:services',
  routes: 'kong:routes',
  plugins: 'kong:plugins',
  consumers: 'kong:consumers',
};

export const KongRoutes: CustomRouter[] = [
  {
    id: KongRouteIds.monitoring,
    name: 'Monitoring',
    path: `${kongBasePath}`,
    element: <KongMonitoringPage />,
    isProtected: true,
    group: routerGroup,
    icon: FiActivity,
    isShownInSidebar: true,
  },
  {
    id: KongRouteIds.services,
    name: 'Services',
    path: `${kongBasePath}/services`,
    element: <KongMonitoringPage />,
    isProtected: true,
    group: routerGroup,
    icon: FiCode,
    isShownInSidebar: true,
  },
  {
    id: KongRouteIds.routes,
    name: 'Routes',
    path: `${kongBasePath}/routes`,
    element: <KongMonitoringPage />,
    isProtected: true,
    group: routerGroup,
    icon: FiNavigation,
    isShownInSidebar: true,
  },
  {
    id: KongRouteIds.plugins,
    name: 'Plugins',
    path: `${kongBasePath}/plugins`,
    element: <KongMonitoringPage />,
    isProtected: true,
    group: routerGroup,
    icon: FiBriefcase,
    isShownInSidebar: true,
  },
  {
    id: KongRouteIds.consumers,
    name: 'Consumers',
    path: `${kongBasePath}/consumers`,
    element: <KongMonitoringPage />,
    isProtected: true,
    group: routerGroup,
    icon: FiSunset,
    isShownInSidebar: true,
  },
];
