import { IconUser } from '@tabler/icons-react';
import { Link, useRouter } from '@tanstack/react-router';
import type { User } from 'better-auth';
import { ChevronsUpDown, LogOut } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from '@/components/ui/sidebar';
import { authClient } from '@/lib/auth-client';

interface NavUserProps {
  user: User;
}

function LogoutButton() {
  const router = useRouter();

  const handleOnClick = async () => {
    await authClient.signOut({
      fetchOptions: {
        onSuccess: async () => {
          router.navigate({
            to: '/',
          });
        },
      },
    });
  };

  return (
    <DropdownMenuItem
      className="cursor-pointer"
      onClick={handleOnClick}
      variant="destructive"
    >
      <LogOut />
      Log out
    </DropdownMenuItem>
  );
}

export function NavUser({ user }: NavUserProps) {
  const { isMobile, state } = useSidebar();

  const isCollapsed = state === 'collapsed';

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <SidebarMenuButton
              className="border border-transparent text-sidebar-accent-foreground hover:border-border hover:bg-sidebar-accent data-[state=open]:border-border data-[state=open]:bg-sidebar-accent"
              size="lg"
            >
              <Avatar className="h-8 w-8 rounded-lg">
                <AvatarImage alt={user.name} src={user.image ?? ''} />
                <AvatarFallback className="rounded-lg">CN</AvatarFallback>
              </Avatar>
              <div className="grid flex-1 gap-1 text-left text-sm leading-tight">
                <span className="truncate font-semibold">{user.name}</span>
                <span className="truncate font-medium text-muted-foreground text-xxs">
                  {user.email}
                </span>
              </div>
              <ChevronsUpDown className="ml-auto size-4" />
            </SidebarMenuButton>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            align={isCollapsed ? 'start' : 'center'}
            className="w-(--radix-dropdown-menu-trigger-width) min-w-56 rounded-lg"
            side={isMobile ? 'bottom' : 'top'}
            sideOffset={4}
          >
            <DropdownMenuLabel>Minha conta</DropdownMenuLabel>
            <DropdownMenuItem asChild className="cursor-pointer">
              <Link preload="intent" to="/dashboard/account/settings">
                <IconUser />
                Configurações da conta
              </Link>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <LogoutButton />
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}
