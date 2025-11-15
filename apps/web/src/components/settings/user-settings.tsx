import { zodResolver } from '@hookform/resolvers/zod';
import { IconCamera } from '@tabler/icons-react';
import { useRouter } from '@tanstack/react-router';
import type { User } from 'better-auth';
import { UploadIcon } from 'lucide-react';
import { useId, useMemo, useRef } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { toast } from 'sonner';
import z from 'zod';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Field, FieldError, FieldLabel } from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import { InputCopy } from '@/components/ui/input-copy';
import { Separator } from '@/components/ui/separator';
import { authClient } from '@/lib/auth-client';

interface UserSettingsProps {
  user: User;
}

const userSettingsFormSchema = z.object({
  name: z.string().min(1, 'Campo obrigatório'),
  image: z.file().optional(),
});

export function UserSettings({ user }: UserSettingsProps) {
  const router = useRouter();
  const nameFieldId = useId();

  const imageInputRef = useRef<HTMLInputElement>(null);

  const form = useForm<z.infer<typeof userSettingsFormSchema>>({
    resolver: zodResolver(userSettingsFormSchema),
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

          <Field>
            <FieldLabel>Email</FieldLabel>
            <Input disabled value={user.email} />
          </Field>

          <Separator />

          <div className="flex flex-col gap-4 md:flex-row md:gap-12">
            <Field className="w-fit min-w-16 shrink-0">
              <FieldLabel>Imagem</FieldLabel>
              <input
                accept="image/png,image/jpeg"
                className="hidden"
                onChange={handleOnImageChange}
                ref={imageInputRef}
                type="file"
              />
              <button
                className="group relative size-16 overflow-hidden rounded-full"
                onClick={handleOnImageClick}
                type="button"
              >
                <div className="absolute inset-0 z-10 hidden size-full items-center justify-center bg-black opacity-90 group-hover:flex">
                  <UploadIcon className="text-foreground" />
                </div>
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
            </Field>

            <Controller
              control={form.control}
              name="name"
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor={nameFieldId}>Nome</FieldLabel>
                  <Input
                    {...field}
                    aria-invalid={fieldState.invalid}
                    autoComplete="off"
                    id={nameFieldId}
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
          </div>
        </CardContent>
      </Card>

      <Button className="w-fit self-end" type="submit">
        Salvar informações do perfil
      </Button>
    </form>
  );
}
