export const MENU_ITEMS = [
  {
    key: 'dashboard',
    label: 'Dashboard',
    isTitle: true,
  },
  {
    key: 'dashboard',
    icon: 'iconamoon:home-duotone',
    label: 'Dashboard',
    url: '/dashboard',
  },
  {
    key: 'menu',
    label: 'Menu',
    isTitle: true,
  },
  {
    key: 'project',
    icon: 'eos-icons:project',
    label: 'Project',
    children: [
      {
        key: 'all-project',
        label: 'All Project',
        url: '/projects',
        parentKey: 'project',
      },
      {
        key: 'project-category',
        label: 'Project Categories',
        url: '/project-categories',
        parentKey: 'project',
      },
    ],
  },
  {
    key: 'education',
    icon: 'mdi:book-education',
    label: 'Education',
    url: '/educations',
  },
  {
    key: 'Experience',
    icon: 'material-symbols-light:work',
    label: 'Experience',
    url: '/experiences',
  },
  {
    key: 'Skill',
    icon: 'ant-design:code-filled',
    label: 'Skill',
    url: '/skills',
  },
  {
    key: 'Social',
    icon: 'typcn:social-at-circular',
    label: 'Socials Link',
    url: '/social-links',
  },
  {
    key: 'apps-todo',
    icon: 'iconamoon:ticket-duotone',
    label: 'Todo',
    url: '/apps/todo',
  },
  {
    key: 'icon',
    icon: 'iconamoon:lightning-1-duotone',
    label: 'Icons',
    url: '/icons/iconamoon',
  },
]
