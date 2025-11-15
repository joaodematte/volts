import { createFileRoute, Outlet, redirect } from '@tanstack/react-router';
import { AppSidebar } from '@/components/sidebar/app-sidebar';
import { NavMobileHeader } from '@/components/sidebar/nav-mobile-header';
import { SidebarInset, SidebarProvider } from '@/components/ui/sidebar';
import { getSession } from '@/functions/get-session';

export const Route = createFileRoute('/dashboard')({
  component: RouteComponent,
  beforeLoad: async () => {
    const session = await getSession();

    if (!session) {
      throw redirect({
        to: '/',
      });
    }

    return { session };
  },
});

function RouteComponent() {
  const { session } = Route.useRouteContext();

  return (
    <SidebarProvider>
      <AppSidebar user={session.user} variant="inset" />
      <SidebarInset className="bg-white shadow-xs md:border dark:bg-background md:dark:bg-volts-900">
        <NavMobileHeader />
        <div className="p-8">
          <Outlet />
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
