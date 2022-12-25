import { FiActivity } from 'react-icons/fi';
import { CustomRouter } from '.';
import { AdminPermissionPage, AdminServersPage } from '../page/Admin';

const routerGroup = 'admin';
const adminBasePath = '/admin';

export const adminRouteIds = {
  permission: 'admin:permission',
  servers: 'admin:servers',
};

export const AdminRoutes: CustomRouter[] = [
  {
    id: adminRouteIds.permission,
    name: 'Permission',
    path: `${adminBasePath}/permission`,
    element: <AdminPermissionPage />,
    isProtected: true,
    group: routerGroup,
    icon: FiActivity,
    isShownInSidebar: true,
  },
  {
    id: adminRouteIds.servers,
    name: 'Servers',
    path: `${adminBasePath}/servers`,
    element: <AdminServersPage />,
    isProtected: true,
    group: routerGroup,
    icon: FiActivity,
    isShownInSidebar: true,
  },
];
