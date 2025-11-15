import { createFileRoute } from '@tanstack/react-router';
import { AccountPreferences } from '@/components/settings/account-preferences';
import { UserSettings } from '@/components/settings/user-settings';

export const Route = createFileRoute('/dashboard/account/settings')({
  component: RouteComponent,
});

function RouteComponent() {
  const { session } = Route.useRouteContext();

  return (
    <div className="mx-auto w-full max-w-2xl space-y-8">
      <h1 className="font-semibold text-2xl dark:text-white">
        Configurações da conta
      </h1>
      <AccountPreferences />
      <UserSettings user={session.user} />
    </div>
  );
}
