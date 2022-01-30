import { NbMenuItem } from '@nebular/theme';

export const MENU_ITEMS: NbMenuItem[] = [
  {
    title: 'Dashboard',
    icon: '',
    link: '/pages/dashboard',
    home: true,
  },
  {
    title: 'Admin Panel',
    icon: '',
    link: '/pages/admin-panel',
    home: false,
    // hidden:
  },
  {
    title: 'Planner',
    icon: '',
    link: '/pages/planner',
    home: false,
  },
];
