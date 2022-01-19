import { MenuItem } from './menu.model';

export const MENU: MenuItem[] = [
  {
    label: 'Main',
    isTitle: true
  },
  {
    label: 'Dashboard',
    icon: 'home',
    link: '/dashboard'
  },
  {
    label: 'Calendar',
    icon: 'calendar',
    link: '/apps/calendar',
  },
  {
    label: 'Admin panel',
    icon: 'layout',
    link: '/tables/admin-panel'
  },
];
