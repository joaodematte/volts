import { createFileRoute } from '@tanstack/react-router';
import { getPageTitle } from '@/lib/seo';

export const Route = createFileRoute('/dashboard/')({
  component: RouteComponent,
  head: () => ({
    meta: [
      {
        title: getPageTitle('Dashboard'),
      },
    ],
  }),
});

function RouteComponent() {
  return <div>Hello "/dashboard/"!</div>;
}
