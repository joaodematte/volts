import type { Icon } from '@tabler/icons-react';
import { Link, useLocation } from '@tanstack/react-router';
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/components/ui/collapsible';
import {
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from '@/components/ui/sidebar';
import type { FileRoutesByTo } from '@/routeTree.gen';

type ValidRoute = keyof FileRoutesByTo;

export interface NavItemProps {
  id: number;
  label: string;
  href: ValidRoute;
  icon: Icon;
  items?: Omit<NavItemProps, 'items'>[];
}

export function NavItem(item: NavItemProps) {
  const location = useLocation();

  const isActive = location.pathname === item.href;

  if (item.items) {
    const isOpen = location.pathname.includes(item.href);

    return (
      <Collapsible
        asChild
        className="group/collapsible"
        key={item.label}
        open={isOpen}
      >
        <SidebarMenuItem>
          <CollapsibleTrigger asChild>
            <SidebarMenuButton
              asChild
              isActive={isActive || isOpen}
              tooltip={item.label}
              variant="ghost"
            >
              <Link className="cursor-pointer" preload="intent" to={item.href}>
                {item.icon && <item.icon />}
                <span>{item.label}</span>
              </Link>
            </SidebarMenuButton>
          </CollapsibleTrigger>
          <CollapsibleContent className="mt-2">
            <SidebarMenuSub>
              {item.items?.map((subItem) => {
                const isSubItemActive = location.pathname === subItem.href;

                return (
                  <SidebarMenuSubItem key={subItem.label}>
                    <SidebarMenuSubButton asChild isActive={isSubItemActive}>
                      <Link preload="intent" to={subItem.href}>
                        <span>{subItem.label}</span>
                      </Link>
                    </SidebarMenuSubButton>
                  </SidebarMenuSubItem>
                );
              })}
            </SidebarMenuSub>
          </CollapsibleContent>
        </SidebarMenuItem>
      </Collapsible>
    );
  }

  return (
    <SidebarMenuItem>
      <SidebarMenuButton
        asChild
        isActive={isActive}
        tooltip={item.label}
        variant="ghost"
      >
        <Link className="cursor-pointer" preload="intent" to={item.href}>
          {item.icon && <item.icon />}
          <span>{item.label}</span>
        </Link>
      </SidebarMenuButton>
    </SidebarMenuItem>
  );
}
