import { createFileRoute } from '@tanstack/react-router';
import { AppearanceSettings } from '@/components/settings/appearance-settings';
import { ProfileSettings } from '@/components/settings/profile-settings';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
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
      <div className="flex flex-col">
        <h1 className="font-semibold text-2xl dark:text-white">Minha conta</h1>
        <p className="font-medium text-muted-foreground text-sm">
          Visualize e gerencie sua conta
        </p>
      </div>

      <Tabs className="w-full" defaultValue="profile">
        <TabsList>
          <TabsTrigger value="profile">Perfil</TabsTrigger>
          <TabsTrigger value="appearance">Aparência</TabsTrigger>
        </TabsList>
        <TabsContent value="profile">
          <ProfileSettings user={session.user} />
        </TabsContent>
        <TabsContent value="appearance">
          <AppearanceSettings />
        </TabsContent>
      </Tabs>
    </div>
  );
}
