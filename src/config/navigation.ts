interface DropdownItem {
  name: string;
  path: string;
}

interface NavigationItem {
  name: string;
  path: string;
  dropdown?: DropdownItem[];
}

export const navigationItems: NavigationItem[] = [
  { name: 'About', path: '/about' },
  { name: 'Speakers', path: '/speakers' },
  { 
    name: 'Program', 
    path: '/program', 
    dropdown: [
      { name: 'Schedule', path: '/schedule' },
      { name: 'Workshop', path: '/workshop' },
      { name: 'Talks', path: '/talks' },
      { name: 'List of participants', path: '/participants' }
    ] 
  },
  { name: 'Registration', path: '/registration' },
  { name: 'General Information', path: '/info' },
  { name: 'Updates', path: '/updates' },
]; 