import { zodResolver } from '@hookform/resolvers/zod';
import { IconCamera, IconUpload } from '@tabler/icons-react';
import { useRouter } from '@tanstack/react-router';
import type { User } from 'better-auth';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import z from 'zod';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { authClient } from '@/lib/auth-client';
import { InputCopy } from '../ui/input-copy';

interface ProfileSettingsProps {
  user: User;
}

interface ProfileSettingsSectionProps {
  label: string;
  description?: string;
  content: React.ReactElement;
}

const profileSettingsFormSchema = z.object({
  name: z.string().min(1, 'Campo obrigatório'),
  image: z.file().optional(),
});

function ProfileSettingsSection({
  label,
  description,
  content,
}: ProfileSettingsSectionProps) {
  return (
    <div className="grid grid-cols-2 items-center border-b py-3 first:border-y">
      {description ? (
        <div className="flex flex-col">
          <Label className="font-medium text-sm">{label}</Label>
          <p className="text-muted-foreground text-sm">{description}</p>
        </div>
      ) : (
        <Label className="font-medium text-sm">{label}</Label>
      )}

      {content}
    </div>
  );
}

export function ProfileSettings({ user }: ProfileSettingsProps) {
  const router = useRouter();

  const form = useForm<z.infer<typeof profileSettingsFormSchema>>({
    resolver: zodResolver(profileSettingsFormSchema),
    defaultValues: {
      name: user.name,
    },
  });

  const onSubmit = form.handleSubmit(async (data) => {
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
      success: 'Perfil atualizado com sucesso',
      error: 'Ocorreu um problema',
    });
  });

  return (
    <div className="mt-6 flex flex-col gap-6">
      <div className="flex flex-col gap-1">
        <p className="font-semibold dark:text-white">Gerenciar perfil</p>
        <p className="font-medium text-muted-foreground text-sm">
          Atualize sua foto de perfil, nome e sobrenome.
        </p>
      </div>

      <form onSubmit={onSubmit}>
        <ProfileSettingsSection
          content={
            <button
              className="group relative size-16 justify-self-end overflow-hidden rounded-full"
              type="button"
            >
              <div className="absolute inset-0 z-10 hidden size-full items-center justify-center bg-white opacity-85 group-hover:flex dark:bg-black">
                <IconUpload className="text-foreground" />
              </div>
              {user.image ? (
                <Avatar className="size-full">
                  <AvatarImage alt={user.name} src={user.image} />
                  <AvatarFallback>CN</AvatarFallback>
                </Avatar>
              ) : (
                <div className="flex size-full shrink-0 items-center justify-center rounded-full border bg-input">
                  <IconCamera className="text-muted-foreground" />
                </div>
              )}
            </button>
          }
          description="Todos da sua organização poderão ver sua foto de perfil"
          label="Foto de perfil"
        />
        <ProfileSettingsSection
          content={<Input value={user.name} />}
          label="Nome"
        />
        <ProfileSettingsSection
          content={<InputCopy disabled value={user.id} />}
          description="Identificador da sua conta no sistema"
          label="Identificador único"
        />
        <ProfileSettingsSection
          content={<InputCopy disabled value={user.email} />}
          label="Email"
        />

        <div className="flex justify-end py-3">
          <Button type="submit">Salvar</Button>
        </div>
      </form>
    </div>
  );
}
