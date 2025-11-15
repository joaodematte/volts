import { createFileRoute } from '@tanstack/react-router';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from '@/components/ui/card';
import { Icons } from '@/components/ui/icons';
import { Separator } from '@/components/ui/separator';
import { authClient } from '@/lib/auth-client';

export const Route = createFileRoute('/')({
  component: RouteComponent,
});

function RouteComponent() {
  const handleOnClick = async () => {
    await authClient.signIn.social({
      provider: 'google',
      callbackURL: `${import.meta.env.VITE_APP_URL}/dashboard`,
    });
  };

  return (
    <div className="grid h-dvh w-full place-items-center">
      <Card className="w-full max-w-xl border-0 bg-background md:p-8">
        <CardHeader>
          <Icons.Volts className="size-12 text-yellow-400" />
        </CardHeader>
        <CardContent className="mb-8">
          <h1 className="mb-4 font-medium text-2xl text-white">
            Bem-vindo à Volts
          </h1>
          <p className="text-muted-foreground">
            Gerencie todo o ciclo do seu negócio, da proposta comercial até a
            instalação final, em uma única plataforma
          </p>
        </CardContent>
        <CardFooter className="flex-col gap-4">
          <Button
            className="h-12 w-full cursor-pointer text-base"
            onClick={handleOnClick}
            variant="outline"
          >
            <Icons.Google />
            Continuar com Google
          </Button>
          <Separator />
          <p className="text-center text-muted-foreground text-xs">
            Ao continuar, você concorda com nossos{' '}
            <span className="underline">Termos de Serviço</span> e{' '}
            <span className="underline">Política de Privacidade</span>
          </p>
        </CardFooter>
      </Card>
    </div>
  );
}
