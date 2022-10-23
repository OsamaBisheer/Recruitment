import { INavData } from '@coreui/angular';
import {
  INavAttributes,
  INavBadge,
  INavLabel,
  INavLinkProps,
  INavWrapper,
} from '@coreui/angular/lib/sidebar/app-sidebar-nav';

export class NavData implements INavData {
  name?: string;
  url?: string | any[];
  href?: string;
  icon?: string;
  badge?: INavBadge;
  title?: boolean;
  children?: NavData[];
  variant?: string;
  attributes?: INavAttributes;
  divider?: boolean;
  class?: string;
  label?: INavLabel;
  wrapper?: INavWrapper;
  linkProps?: INavLinkProps;
}

export function getNavItems(): INavData[] {
  const displayNavItems = [
    // Customer
    {
      title: true,
      name: 'Job Title',
    },
    {
      name: 'Job Titles',
      url: '/job-titles',
      icon: 'icon-list',
    },
    // User
    {
      title: true,
      name: 'User',
    },
    {
      name: 'Logout',
      url: '/logout',
      icon: 'icon-logout',
    },
  ];

  return displayNavItems;
}
