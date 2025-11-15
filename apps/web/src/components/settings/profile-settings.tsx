import { zodResolver } from '@hookform/resolvers/zod';
import { IconCamera } from '@tabler/icons-react';
import { useRouter } from '@tanstack/react-router';
import type { User } from 'better-auth';
import { useId, useMemo, useRef } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import z from 'zod';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { InputCopy } from '@/components/ui/input-copy';
import { Separator } from '@/components/ui/separator';
import { authClient } from '@/lib/auth-client';

interface UserSettingsProps {
  user: User;
}

const profileSettingsFormSchema = z.object({
  name: z.string().min(1, 'Campo obrigatório'),
  image: z.file().optional(),
});

export function ProfileSettings({ user }: UserSettingsProps) {
  const router = useRouter();
  const nameFieldId = useId();

  const imageInputRef = useRef<HTMLInputElement>(null);

  const form = useForm<z.infer<typeof profileSettingsFormSchema>>({
    resolver: zodResolver(profileSettingsFormSchema),
    defaultValues: {
      name: user.name,
    },
  });

  const onFormSubmit = form.handleSubmit(async (data) => {
    const updateUserSettings = async () => {
      const toUpdate: { name: string; image?: string } = {
        name: data.name,
      };

      // if (data.image) {
      //   const fileExtension = data.image.name.split('.').pop() || 'png';
      //   const newFileName = `users/${user.id}/avatar.${fileExtension}`;

      //   const { url: uploadedUrl } = await upload(newFileName, data.image, {
      //     access: 'public',
      //     handleUploadUrl: '/api/upload-file',
      //   });

      //   toUpdate.image = uploadedUrl;
      // }

      await authClient.updateUser(toUpdate);

      router.invalidate();
    };

    toast.promise(updateUserSettings, {
      loading: 'Salvando informações...',
      success: 'Informações do perfil salvas com sucesso',
      error: 'Ocorreu um problema',
    });
  });

  const handleOnImageClick = () => {
    imageInputRef.current?.click();
  };

  const handleOnImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (!event.target.files) return;

    const file = event.target.files[0];

    form.setValue('image', file);
  };

  const watchedImage = form.watch('image');

  const imageUrl = useMemo(() => {
    if (!watchedImage) return user.image ?? '';

    return URL.createObjectURL(watchedImage);
  }, [watchedImage, user.image]);

  return (
    <form className="flex flex-col gap-4" onSubmit={onFormSubmit}>
      <h2 className="font-medium text-lg dark:text-white">Perfil</h2>

      <Card className="rounded-2xl bg-transparent shadow-none">
        <CardContent className="space-y-4">
          <div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">
            <div>
              <p className="font-medium text-sm dark:text-white">
                Foto de perfil
              </p>
              <p className="text-muted-foreground text-xs">
                Será visível para todos da sua organização
              </p>
            </div>
            <input
              accept="image/png,image/jpeg"
              className="hidden"
              onChange={handleOnImageChange}
              ref={imageInputRef}
              type="file"
            />
            <button
              className="relative size-16 rounded-full border hover:opacity-85 focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50"
              onClick={handleOnImageClick}
              type="button"
            >
              {user.image ? (
                <Avatar className="size-full">
                  <AvatarImage alt={user.name} src={imageUrl} />
                  <AvatarFallback>CN</AvatarFallback>
                </Avatar>
              ) : (
                <div className="flex size-full shrink-0 items-center justify-center rounded-full border bg-input">
                  <IconCamera className="text-muted-foreground" />
                </div>
              )}
            </button>
          </div>

          <Separator />

          <div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">
            <p className="font-medium text-sm dark:text-white">Nome</p>
            <Input className="w-full md:max-w-sm" value={user.name} />
          </div>

          <Separator />

          <div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">
            <div>
              <p className="font-medium text-sm dark:text-white">
                Identificador
              </p>
              <p className="text-muted-foreground text-xs">
                Identificador único da sua conta
              </p>
            </div>

            <InputCopy
              containerClassname="md:max-w-sm w-full"
              disabled
              value={user.id}
            />
          </div>

          <Separator />

          <div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">
            <div>
              <p className="font-medium text-sm dark:text-white">Email</p>
              <p className="text-muted-foreground text-xs">
                Atualmente não é possível atualizar o email
              </p>
            </div>

            <InputCopy
              containerClassname="md:max-w-sm w-full"
              disabled
              value={user.email}
            />
          </div>

          <Separator />
        </CardContent>

        <CardFooter className="justify-end">
          <Button className="w-fit self-end" type="submit">
            Salvar informações do perfil
          </Button>
        </CardFooter>
      </Card>
    </form>
  );
}
