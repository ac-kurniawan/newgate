import { FC, PropsWithChildren } from 'react';
import SidebarWithHeader from '../../component/Sidebar';

export const DashboardLayout: FC<PropsWithChildren> = (props) => {
  return <SidebarWithHeader>{props.children}</SidebarWithHeader>;
};
