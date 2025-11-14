import { createFileRoute, Outlet, redirect } from '@tanstack/react-router';
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

    return session;
  },
});

function RouteComponent() {
  return <Outlet />;
}
