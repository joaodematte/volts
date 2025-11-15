import { createFileRoute } from '@tanstack/react-router';
import { AppearanceSettings } from '@/components/settings/appearance-settings';
import { ProfileSettings } from '@/components/settings/profile-settings';
import { getPageTitle } from '@/lib/get-page-title';

export const Route = createFileRoute('/dashboard/account/settings')({
  component: RouteComponent,
  head: () => ({
    meta: [
      {
        title: getPageTitle('Minha conta'),
      },
    ],
  }),
});

function RouteComponent() {
  const { session } = Route.useRouteContext();

  return (
    <div className="mx-auto w-full max-w-2xl space-y-8">
      <h1 className="pt-8 font-medium text-2xl dark:text-white">Minha conta</h1>

      <ProfileSettings user={session.user} />
      <AppearanceSettings />
    </div>
  );
}
