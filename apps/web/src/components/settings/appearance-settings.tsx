import { useTheme } from 'next-themes';
import { Card, CardContent } from '@/components/ui/card';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

export function AppearanceSettings() {
  const { theme, setTheme } = useTheme();

  return (
    <div className="flex flex-col gap-4">
      <div className="gap-2">
        <h2 className="font-medium text-lg dark:text-white">Preferências</h2>
        <p className="text-muted-foreground text-sm">
          Preferências atreladas a sua conta no sistema
        </p>
      </div>

      <Card className="rounded-2xl bg-transparent shadow-none">
        <CardContent className="space-y-4">
          <div className="flex flex-row items-center justify-between gap-4">
            <div>
              <p className="font-medium text-sm dark:text-white">Tema</p>
              <p className="text-muted-foreground text-xs">
                Substitua o tema padrão do sistema
              </p>
            </div>

            <Select onValueChange={setTheme} value={theme}>
              <SelectTrigger className="w-31.5">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectItem value="system">Sistema</SelectItem>
                  <SelectItem value="light">Claro</SelectItem>
                  <SelectItem value="dark">Escuro</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
