import { IconHome } from '@tabler/icons-react';
import { NavItem, type NavItemProps } from '@/components/sidebar/nav-item';
import { SidebarGroup, SidebarMenu } from '@/components/ui/sidebar';

const ITEMS: NavItemProps[] = [
  {
    id: 0,
    label: 'Página Inicial',
    href: '/dashboard',
    icon: IconHome,
  },
];

export function NavMain() {
  return (
    <SidebarGroup>
      <SidebarMenu>
        {ITEMS.map((item) => (
          <NavItem key={item.href} {...item} />
        ))}
      </SidebarMenu>
    </SidebarGroup>
  );
}
