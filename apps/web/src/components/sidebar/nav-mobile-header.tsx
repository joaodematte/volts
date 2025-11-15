import { Icons } from '@/components/ui/icons';
import { SidebarTrigger } from '@/components/ui/sidebar';

export function NavMobileHeader() {
  return (
    <div className="flex items-center justify-between bg-secondary px-8 py-4 md:hidden">
      <Icons.Volts />
      <SidebarTrigger />
    </div>
  );
}
