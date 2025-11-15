import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useTheme } from '@/hooks/use-theme';

export function AppearanceSettings() {
  const { theme, setTheme } = useTheme();

  return (
    <div className="mt-6 flex flex-col gap-6">
      <div className="flex flex-col gap-1">
        <p className="font-semibold dark:text-white">Aparência</p>
        <p className="font-medium text-muted-foreground text-sm">
          Customize a aparência do seu dashboard.
        </p>
      </div>

      <div className="grid grid-cols-2 border-y py-3">
        <Label>Tema</Label>

        <Select onValueChange={setTheme} value={theme}>
          <SelectTrigger className="w-31.5 justify-self-end">
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
    </div>
  );
}
