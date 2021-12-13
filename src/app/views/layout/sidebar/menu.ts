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
    label: 'Table',
    icon: 'layout',
    link: '/tables/data-table'
  },
];
